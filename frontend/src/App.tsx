import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from "@mui/material";
import CountriesList from "./pages/CountriesList";
import CountryInfo from "./pages/CountryInfo";

function App() {
  return (
    <Router>
      <Container>
        <Routes>
          <Route path="/" element={<CountriesList />} />
          <Route path="/country/:code" element={<CountryInfo />} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
