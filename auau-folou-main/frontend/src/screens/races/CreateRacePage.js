import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import styles from "../../css/styles";
import Loader from "../../components/Loader";
import ApiService from "../../services/api";
import { showSuccess, showToastError } from "../../services/helper";
import { useNavigate, useParams } from "react-router-dom";

const CreateRacePage = () => {
  const [raceData, setRaceData] = useState({
    name: "",
    specie: {
      name: null,
    },
    specie_id: null,
  });

  const [isLoadingSpecies, setIsLoadingSpecies] = useState(true);

  const [options, setOptions] = useState([]);

  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRaceData({ ...raceData, [name]: value });
  };

  const handleSaveRace = () => {
    setLoader({ isOpen: true });

    if (id) {
      updateRace();
    } else {
      createRace();
    }
  };

  const createRace = () => {
    ApiService()
      .post("/races", raceData)
      .then(
        (response) => {
          showSuccess("Raça cadastrada com sucesso!");
          navigate("/races");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  const updateRace = () => {
    ApiService()
      .put(`/races/${id}`, raceData)
      .then(
        (response) => {
          setLoader({ isOpen: false });
          showSuccess("Raça atualizada com sucesso!");
          navigate("/races");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  useEffect(() => {
    if (id) {
      ApiService()
        .get(`/races/${id}`)
        .then(
          (response) => {
            setRaceData(response.race);
          },
          (error) => {
            showToastError(error.message);
          }
        );
    }

    ApiService()
      .get("/species")
      .then(
        (response) => {
          setOptions(response.species);
          setIsLoadingSpecies(false);
        },
        (error) => {
          showToastError(error.message);
        }
      );
  }, [id]);

  const handleChangeSpecies = (event) => {
    setRaceData({
      ...raceData,
      specie_id: event.target.value,
      specie: options.find((o) => o.id === event.target.value),
    });
  };

  return (
    <div>
      <AppBar
        position="static"
        style={{ background: "#D9D9D9", color: "#000" }}
      >
        <Toolbar
          style={{
            display: "flex",
            justifyContent: "center",
            padding: "0 10px 0 10px",
          }}
        >
          <Typography variant="h4">{id ? "Editando " : "Nova "}raça</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "20px 20px", maxWidth: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Nome"
              fullWidth
              value={raceData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="specie"
              label="Espécie"
              fullWidth
              value={raceData.specie_id ?? ""}
              onChange={handleChangeSpecies}
              disabled={isLoadingSpecies}
              select={!isLoadingSpecies}
            >
              {options.map((option) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
            {isLoadingSpecies && (
              <CircularProgress
                size={20}
                style={{ position: "absolute", right: 35, top: 102 }}
              />
            )}
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
            item
            xs={12}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveRace}
              style={{ ...styles.grayBtn, ...styles.listItemButton }}
            >
              SALVAR
            </Button>
          </Grid>
        </Grid>
      </Container>
      <Loader open={loader.isOpen} />
    </div>
  );
};

export default CreateRacePage;
