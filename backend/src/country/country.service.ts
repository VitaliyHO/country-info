import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class CountryService {
  constructor(
    private readonly httpService: HttpService,
    private configService: ConfigService,
  ) {}

  getAvailableContriesBaseUrl(): string {
    return (
      this.configService.get<string>('AVAILABLE_COUNTRIES_BASE_URL') ||
      'https://date.nager.at/api/v3'
    );
  }

  getContryDetailsBaseUrl(): string {
    return (
      this.configService.get<string>('COUNTRY_DETAILS_BASE_URL') ||
      'https://countriesnow.space/api/v0.1'
    );
  }

  async getAvailableCountries() {
    try {
      const response = await firstValueFrom(
        this.httpService.get(
          `${this.getAvailableContriesBaseUrl()}/AvailableCountries`,
        ),
      );

      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch available countries',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }

  async getCountryInfo(countryCode: string) {
    try {
      const countryInfoResponse = await firstValueFrom(
        this.httpService.get(
          `${this.getAvailableContriesBaseUrl()}/CountryInfo/${countryCode}`,
        ),
      );
      const countryInfo = countryInfoResponse.data;

      let populationData: string[] | null = null;
      try {
        const populationResponse = await firstValueFrom(
          this.httpService.post(
            `${this.getContryDetailsBaseUrl()}/countries/population`,
            {
              country: countryInfo.commonName,
            },
          ),
        );
        populationData = populationResponse.data?.data?.populationCounts;
      } catch (populationError) {
        console.warn(
          `Failed to fetch population for ${countryCode}:`,
          populationError.message,
        );
        populationData = null;
      }

      let flagUrl: string | null = null;
      try {
        const flagResponse = await firstValueFrom(
          this.httpService.post(
            `${this.getContryDetailsBaseUrl()}/countries/flag/images`,
            {
              country: countryInfo.commonName,
            },
          ),
        );
        flagUrl = flagResponse.data?.data?.flag || null;
      } catch (flagError) {
        console.warn(
          `Failed to fetch flag for ${countryCode}:`,
          flagError.message,
        );
        flagUrl = null;
      }

      return {
        name: countryInfo.commonName,
        borders: countryInfo.borders || [],
        population: populationData,
        flag: flagUrl,
      };
    } catch (error) {
      throw new HttpException(
        `Failed to fetch data for country ${countryCode}`,
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
