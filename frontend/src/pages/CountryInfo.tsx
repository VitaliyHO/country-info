import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemButton,
  Button,
  Box,
} from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getCountryInfo } from "../services/apiService";

interface CountryData {
  name: string;
  flag: string;
  borders: Border[];
  population: { year: number; value: number }[];
}

interface Border {
  commonName: string;
  countryCode: string;
}

const CountryInfo: React.FC = () => {
  const { code } = useParams();
  const [country, setCountry] = useState<CountryData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCountry = async () => {
      try {
        const data = await getCountryInfo(code as string);
        setCountry(data);
      } catch (error) {
        console.error(`Failed to fetch country: ${code}`);
      } finally {
        setLoading(false);
      }
    };
    fetchCountry();
  }, [code]);

  if (loading)
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  if (!country) return <Typography>No data found</Typography>;

  return (
    <div>
      <Button
        variant="contained"
        color="primary"
        sx={{ marginBottom: 2 }}
        onClick={() => navigate("/")}
      >
        Back to Countries List
      </Button>

      <Card>
        <CardContent>
          <Typography variant="h4">{country.name}</Typography>
          {country.flag ? (
            <img src={country.flag} alt={`${country.name} flag`} width={150} />
          ) : (
            <></>
          )}
        </CardContent>
      </Card>

      <Typography variant="h5" sx={{ mt: 3 }}>
        Border Countries
      </Typography>
      <List>
        {country.borders.length > 0 ? (
          country.borders.map((border) => (
            <ListItem key={border.countryCode} disablePadding>
              <ListItemButton
                component={Link}
                to={`/country/${border.countryCode}`}
                onClick={() => setLoading(true)}
              >
                {border.commonName}
              </ListItemButton>
            </ListItem>
          ))
        ) : (
          <Typography>No border countries</Typography>
        )}
      </List>

      <Typography variant="h5" sx={{ mt: 3 }}>
        Population Over Time
      </Typography>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={country.population}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis
            dataKey="value"
            tickFormatter={(value) =>
              value >= 1_000_000_000
                ? `${(value / 1_000_000_000).toFixed(1)}B`
                : value >= 1_000_000
                ? `${(value / 1_000_000).toFixed(1)}M`
                : value
            }
          />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CountryInfo;
