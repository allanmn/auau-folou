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
import {
  showSuccess,
  showToastError,
  showWarning,
} from "../../services/helper";
import { useNavigate, useParams } from "react-router-dom";

const CreateAnimalPage = () => {
  const [animalData, setAnimalData] = useState({
    name: "",
    owner: {
      name: "",
    },
    race: {
      id: null,
      name: "",
      specie_id: "",
    },
    birth_date: "",
  });

  const [gotAnimal, setGotAnimal] = useState(false);
  const [gotSpecies, setGotSpecies] = useState(false);
  const [gotRaces, setGotRaces] = useState(false);

  const [isLoadingSpecies, setIsLoadingSpecies] = useState(true);
  const [isLoadingRaces, setIsLoadingRaces] = useState(true);

  const [species, setSpecies] = useState([]);
  const [races, setRaces] = useState([]);

  const [selectedSpecie, setSelectedSpecie] = useState({
    id: null,
    name: "",
  });

  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAnimalData({ ...animalData, [name]: value });
  };

  const handleSaveAnimal = () => {
    setLoader({ isOpen: true });

    if (id) {
      updateAnimal();
    } else {
      createAnimal();
    }
  };

  const createAnimal = () => {
    ApiService()
      .post("/animals", animalData)
      .then(
        (response) => {
          showSuccess("Animal cadastrado com sucesso!");
          navigate("/animals");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  const updateAnimal = () => {
    ApiService()
      .put(`/animals/${id}`, animalData)
      .then(
        (response) => {
          setLoader({ isOpen: false });
          showSuccess("Propritário atualizado com sucesso!");
          navigate("/animals");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  useEffect(() => {
    if (id && !gotAnimal) {
      getAnimal();
    } else {
      getSpecies();
    }

    function getAnimal() {
      if (gotAnimal) return;
      ApiService()
        .get(`/animals/${id}`)
        .then(
          (response) => {
            setAnimalData(response.animal);
            getSpecies();
            setGotAnimal(true);
          },
          (error) => {
            showToastError(error.message);
          }
        );
    }

    function getRaces() {
      if (gotRaces) return;
    }

    function getSpecies() {
      if (gotSpecies) return;
      ApiService()
        .get("/species")
        .then(
          (res) => {
            setSpecies(res.species);
            if (
              animalData &&
              animalData.id &&
              animalData.id !== "" &&
              animalData.race
            ) {
              let s = species.find((s) => s.id === animalData.race.specie_id);
              if (s) {
                setSelectedSpecie({
                  ...selectedSpecie,
                  name: s.name,
                  id: s.id,
                });
              }
              setGotSpecies(true);
            }
            setIsLoadingSpecies(false);
          },
          (error) => {
            showToastError(error.message);
          }
        );
    }
  }, [id]);

  const handleChangeSpecies = (event) => {
    setSelectedSpecie(species.find((s) => s.id === event.target.value));
  };

  const handleChangeRace = (event) => {
    setAnimalData({
      ...animalData,
      race: races.find((r) => r.id === event.target.value),
    });
  };

  const clickRaces = (event) => {
    if (!selectedSpecie || !selectedSpecie.id) {
      showWarning("Selecione uma espécie primeiro");
    }
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
          <Typography variant="h4">
            {id ? "Editando " : "Novo "}Animal
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "20px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Nome"
              fullWidth
              value={animalData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6} style={{ position: 'relative' }}>
            <TextField
              name="specie"
              label="Espécie"
              fullWidth
              value={selectedSpecie?.id ?? ""}
              onChange={handleChangeSpecies}
              disabled={isLoadingSpecies}
              select={!isLoadingSpecies}
            >
              {species.map((specie) => (
                <MenuItem key={specie.id} value={specie.id}>
                  {specie.name}
                </MenuItem>
              ))}
            </TextField>
            {isLoadingSpecies && (
              <CircularProgress
                size={20}
                style={{ position: "absolute", right: 30, top: 35 }}
              />
            )}
          </Grid>
          <Grid item xs={6} style={{ position: 'relative' }}>
            <div onClick={clickRaces}>
              <TextField
                name="race"
                label="Raça"
                fullWidth
                value={animalData?.race?.id ?? ""}
                onChange={handleChangeRace}
                style={{
                  pointerEvents:
                    isLoadingRaces || !selectedSpecie || !selectedSpecie.id
                      ? "none"
                      : "auto",
                }}
                disabled={
                  isLoadingRaces ||
                  !selectedSpecie ||
                  !selectedSpecie.id ||
                  selectedSpecie.id === ""
                }
                select={
                  !isLoadingRaces &&
                  selectedSpecie &&
                  selectedSpecie.id &&
                  selectedSpecie.id !== ""
                }
              >
                {races.map((race) => (
                  <MenuItem key={race.id} value={race.id}>
                    {race.name}
                  </MenuItem>
                ))}
              </TextField>
            </div>
            {isLoadingRaces && (
              <CircularProgress
                size={20}
                style={{ position: "absolute", right: 30, top: 35 }}
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
              onClick={handleSaveAnimal}
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

export default CreateAnimalPage;
