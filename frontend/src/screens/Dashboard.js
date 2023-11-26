import React, { useEffect, useState } from "react";
import "../css/Dashboard.css";
import {
  AppBar,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Grid,
  Icon,
  Toolbar,
  Typography,
} from "@mui/material";
import ApiService from "../services/api";
import { useNavigate } from "react-router-dom";
import {
  CalendarMonth,
  Healing,
  LocalShipping,
  PentagonSharp,
  People,
  Pets,
  Vaccines,
} from "@mui/icons-material";

const DashboardPage = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [countAnimals, setCountAnimals] = useState(0);
  const [countMedicines, setCountMedicines] = useState(0);
  const [countOwners, setCountOwners] = useState(0);
  const [countProviders, setCountProviders] = useState(0);
  const [countRaces, setCountRaces] = useState(0);
  const [countSchedules, setCountSchedules] = useState(0);
  const [countSpecies, setCountSpecies] = useState(0);
  const [countVets, setCountVets] = useState(0);

  useEffect(() => {
    function getAnimals() {
      return ApiService(navigate).get("/animals");
    }

    function getMedicines() {
      return ApiService(navigate).get("/medicines");
    }

    function getOwners() {
      return ApiService(navigate).get("/owners");
    }

    function getProviders() {
      return ApiService(navigate).get("/suppliers");
    }

    function getRaces() {
      return ApiService(navigate).get("/races");
    }

    function getSchedules() {
      return ApiService(navigate).get("/appointments");
    }

    function getSpecies() {
      return ApiService(navigate).get("/species");
    }

    function getVets() {
      return ApiService(navigate).get("/vets");
    }

    Promise.all([
      getAnimals(),
      getMedicines(),
      getOwners(),
      getProviders(),
      getRaces(),
      getSchedules(),
      getSpecies(),
      getVets(),
    ]).then((response) => {
      for (let res of response) {
        // Animals
        if (res.animals) {
          setCountAnimals(res.animals.length);
        }

        // Medicines
        if (res.Medicines) {
          setCountMedicines(res.Medicines.length);
        }

        // Onwers
        if (res.owners) {
          setCountOwners(res.owners.length);
        }

        // Providers
        if (res.Suppliers) {
          setCountProviders(res.Suppliers.length);
        }

        // Races
        if (res.races) {
          setCountRaces(res.races.length);
        }

        // Appointments
        if (res.appointments) {
          setCountSchedules(res.appointments.length);
        }

        // Species
        if (res.species) {
          setCountSpecies(res.species.length);
        }

        // Vets
        if (res.Vets) {
          setCountVets(res.Vets.length);
        }

        setLoading(false);
      }
    });
  }, []);

  return (
    <div>
      <AppBar
        position="static"
        style={{ background: "#D9D9D9", color: "#000" }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 10px 0 10px",
          }}
        >
          <Typography variant="h4">Dashboard</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="none" style={{ padding: "20px 20px" }}>
        {loading ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
            }}
          >
            <CircularProgress />
          </div>
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={4}>
              <Card sx={{ backgroundColor: "#e0e0e0" }}>
                <CardContent>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon color="secondary">
                      <Pets />
                    </Icon>
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={{ flexGrow: 1, marginLeft: 5 }}
                    >
                      Animais
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Total: {countAnimals}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ backgroundColor: "#e0e0e0" }}>
                <CardContent>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon color="secondary">
                      <Vaccines />
                    </Icon>
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={{ flexGrow: 1, marginLeft: 5 }}
                    >
                      Medicamentos
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Total: {countMedicines}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ backgroundColor: "#e0e0e0" }}>
                <CardContent>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon color="secondary">
                      <People />
                    </Icon>
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={{ flexGrow: 1, marginLeft: 5 }}
                    >
                      Proprietários
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Total: {countOwners}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ backgroundColor: "#e0e0e0" }}>
                <CardContent>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon color="secondary">
                      <LocalShipping />
                    </Icon>
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={{ flexGrow: 1, marginLeft: 5 }}
                    >
                      Fornecedores
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Total: {countProviders}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ backgroundColor: "#e0e0e0" }}>
                <CardContent>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon color="secondary">
                      <Pets />
                    </Icon>
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={{ flexGrow: 1, marginLeft: 5 }}
                    >
                      Raças
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Total: {countRaces}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ backgroundColor: "#e0e0e0" }}>
                <CardContent>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon color="secondary">
                      <CalendarMonth />
                    </Icon>
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={{ flexGrow: 1, marginLeft: 5 }}
                    >
                      Agendamentos
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Total: {countSchedules}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ backgroundColor: "#e0e0e0" }}>
                <CardContent>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon color="secondary">
                      <Pets />
                    </Icon>
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={{ flexGrow: 1, marginLeft: 5 }}
                    >
                      Espécies
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Total: {countSpecies}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={4}>
              <Card sx={{ backgroundColor: "#e0e0e0" }}>
                <CardContent>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon color="secondary">
                      <Healing />
                    </Icon>
                    <Typography
                      variant="h6"
                      color="secondary"
                      sx={{ flexGrow: 1, marginLeft: 5 }}
                    >
                      Veterinários
                    </Typography>
                    <Typography variant="body2" color="secondary">
                      Total: {countVets}
                    </Typography>
                  </div>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}
      </Container>
    </div>
  );
};

export default DashboardPage;
