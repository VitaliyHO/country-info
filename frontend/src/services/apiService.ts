import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const getCountries = async () => {
  try {
    const response = await api.get("/countries");
    return response.data;
  } catch (error) {
    console.error("Error fetching countries:", error);
    throw error;
  }
};

export const getCountryInfo = async (countryCode: string) => {
  try {
    const response = await api.get(`/countries/${countryCode}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching country ${countryCode}:`, error);
    throw error;
  }
};
