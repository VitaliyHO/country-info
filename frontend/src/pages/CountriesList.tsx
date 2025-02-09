import React, { useEffect, useState } from "react";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  CircularProgress,
  Box,
} from "@mui/material";
import { Link } from "react-router-dom";
import { getCountries } from "../services/apiService";

const CountriesList: React.FC = () => {
  const [countries, setCountries] = useState<
    { countryCode: string; name: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const data = await getCountries();
        setCountries(data);
      } catch (error) {
        console.error("Failed to fetch countries");
      } finally {
        setLoading(false);
      }
    };
    fetchCountries();
  }, []);

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

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Available Countries
      </Typography>
      <List>
        {countries.map((country) => (
          <ListItem key={country.countryCode} disablePadding>
            <ListItemButton
              component={Link}
              to={`/country/${country.countryCode}`}
            >
              <ListItemText primary={country.name} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CountriesList;
