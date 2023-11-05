import React, { useEffect, useRef, useState } from "react";
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
import { DateField } from "@mui/x-date-pickers";

const CreateAnimalPage = () => {
  const [animalData, setAnimalData] = useState({
    name: "",
    owner_id: null,
    owner: {
      id: null,
      name: "",
    },
    race: {
      id: null,
      name: "",
      specie_id: "",
    },
    race_id: null,
    birth_date: "",
  });

  const prevAnimalData = usePrevious({ animalData });

  const [isLoadingSpecies, setIsLoadingSpecies] = useState(true);
  const [isLoadingRaces, setIsLoadingRaces] = useState(true);
  const [isLoadingOwners, setIsLoadingOwners] = useState(true);

  const [species, setSpecies] = useState([]);
  const [races, setRaces] = useState([]);

  const [owners, setOwners] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const [selectedSpecie, setSelectedSpecie] = useState({
    id: null,
    name: "",
  });

  const prevSpecies = usePrevious({ species });

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

    if (selectedDate) {
      let month = `${selectedDate.getMonth() + 1}`;
      if (month.length === 1) {
        month = `0${month}`;
      }

      let formated = `${selectedDate.getFullYear()}-${month}-${selectedDate.getDate()}`;

      animalData.birth_date = formated;
    }

    console.log(animalData);

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
          showSuccess("Animal atualizado com sucesso!");
          navigate("/animals");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  function usePrevious(value) {
    const ref = useRef();
    useEffect(() => {
      ref.current = value;
    });
    return ref.current;
  }

  useEffect(() => {
    if (
      prevAnimalData &&
      prevAnimalData.animalData &&
      prevAnimalData.animalData.race &&
      prevAnimalData.animalData.race.specie_id !== animalData.race.specie_id
    ) {
      getSpecies();
    }

    if (
      prevAnimalData &&
      prevAnimalData.animalData &&
      prevAnimalData.animalData.birth_date !== animalData.birth_date
    ) {
      const dateString = animalData.birth_date;

      const dateParts = dateString.split("-");

      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1;
      const day = parseInt(dateParts[2], 10);
      const dateObject = new Date(year, month, day);

      setSelectedDate(dateObject);
    }

    if (
      prevSpecies &&
      prevSpecies.species &&
      prevSpecies.species.length !== species.length
    ) {
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
      }
    }
    function getRaces() {
      ApiService()
        .get(`races-by-specie/${selectedSpecie.id}`)
        .then(
          (response) => {
            setRaces(response.races);
            setIsLoadingRaces(false);
          },
          (error) => {
            showToastError(error);
          }
        );
    }

    function getSpecies() {
      ApiService()
        .get("/species")
        .then(
          (res) => {
            setSpecies(res.species);
            setIsLoadingSpecies(false);
          },
          (error) => {
            showToastError(error.message);
          }
        );
    }
  }, [animalData, species]);

  useEffect(() => {
    if (id) {
      getAnimal();
    } else {
      getSpecies();
    }

    getOwners();

    function getAnimal() {
      ApiService()
        .get(`/animals/${id}`)
        .then(
          (response) => {
            setAnimalData(response.animal);
          },
          (error) => {
            showToastError(error.message);
          }
        );
    }

    function getOwners() {
      ApiService()
        .get("/owners")
        .then(
          (response) => {
            setOwners(response.owners);
            setIsLoadingOwners(false);
          },
          (error) => {
            showToastError(error.message);
          }
        );
    }

    function getSpecies() {
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
            }
            setIsLoadingSpecies(false);
          },
          (error) => {
            showToastError(error.message);
          }
        );
    }
  }, [id]);

  useEffect(() => {
    const getRaces = () => {
      ApiService()
        .get(`races-by-specie/${selectedSpecie.id}`)
        .then(
          (response) => {
            setRaces(response.races);
            setIsLoadingRaces(false);
          },
          (error) => {
            showToastError(error);
          }
        );
    };

    if (selectedSpecie && selectedSpecie.id && selectedSpecie.id !== "") {
      getRaces();
    }
  }, [selectedSpecie]);

  const handleChangeSpecies = (event) => {
    setSelectedSpecie(species.find((s) => s.id === event.target.value));
  };

  const handleChangeRace = (event) => {
    setAnimalData({
      ...animalData,
      race: races.find((r) => r.id === event.target.value),
      race_id: event.target.value,
    });
  };

  const handleChangeOwner = (event) => {
    setAnimalData({
      ...animalData,
      owner: owners.find((o) => o.id === event.target.value),
      owner_id: event.target.value,
    });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
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
          <Grid item xs={6} style={{ position: "relative" }}>
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
          <Grid item xs={6} style={{ position: "relative" }}>
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
          <Grid item xs={6} style={{ position: "relative" }}>
            <TextField
              name="owner"
              label="Dono"
              fullWidth
              value={animalData?.owner?.id ?? ""}
              onChange={handleChangeOwner}
              disabled={isLoadingOwners}
              select={!isLoadingOwners}
            >
              {owners.map((owner) => (
                <MenuItem key={owner.id} value={owner.id}>
                  {owner.name}
                </MenuItem>
              ))}
            </TextField>
            {isLoadingOwners && (
              <CircularProgress
                size={20}
                style={{ position: "absolute", right: 30, top: 35 }}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <DateField
              name="birth_date"
              label="Data de nascimento"
              value={selectedDate}
              fullWidth
              shouldRespectLeadingZeros
              onChange={handleDateChange}
            />
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
