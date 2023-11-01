import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  List,
  ListItem,
  Button,
  Grid,
  CircularProgress,
  Toolbar,
  AppBar,
} from "@mui/material";
import ApiService from "../../services/api";
import { showSuccess, showToastError } from "../../services/helper";

import styles from "../../css/styles.js";
import Loader from "../../components/Loader";
import { useNavigate } from "react-router-dom";

const AnimalsPage = () => {
  const [loading, setLoading] = useState(true);
  const [animals, setAnimals] = useState([]);
  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await ApiService(navigate).get("/animals");

        setAnimals(response.animals);

        setLoading(false);
      } catch (error) {
        showToastError(error.message);
      }
    }

    fetchData();
  }, [navigate]);

  const handleDelete = (animal) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar esse animal?"
    );

    if (confirm) {
      setLoader({ isOpen: true });
      deleteAnimal(animal.id).then(
        (response) => {
          setAnimals((prevAnimals) =>
            prevAnimals.filter((a) => a.id !== animal.id)
          );

          setLoader({ isOpen: false });

          showSuccess("Animal removido com sucesso!");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
    }
  };

  const deleteAnimal = (animalId) => {
    return ApiService().remove(`/animals/${animalId}`);
  };

  const goToNew = () => {
    navigate("/animals/create");
  };

  const handleEdit = (animalId) => {
    navigate(`/animals/update/${animalId}`);
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
            justifyContent: "space-between",
            padding: "0 10px 0 10px",
          }}
        >
          <Typography variant="h4">Animais</Typography>
          <Button
            color="primary"
            variant="contained"
            style={styles.listItemButton}
            onClick={goToNew}
          >
            NOVO
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="none" style={{ padding: 0 }}>
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
          <List style={{ padding: 0 }}>
            <ListItem style={{ background: "#000", color: "#fff" }}>
              <Grid container spacing={2}>
                <Grid item xs={1}>
                  <strong>ID</strong>
                </Grid>
                <Grid item xs={2}>
                  <strong>Nome</strong>
                </Grid>
                <Grid item xs={3}>
                  <strong>Dono</strong>
                </Grid>
                <Grid item xs={2}>
                  <strong>Raça</strong>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </ListItem>
            {animals.map((animal) => (
              <ListItem key={animal.id} style={{ background: "#D9D9D9" }}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    {animal.id}
                  </Grid>
                  <Grid item xs={2}>
                    {animal.name}
                  </Grid>
                  <Grid item xs={3}>
                    {animal.owner.name}
                  </Grid>
                  <Grid item xs={2}>
                    {animal.race.name}
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(animal.id)}
                      style={{ ...styles.listItemButton, ...styles.grayBtn }}
                    >
                      EDITAR
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      style={{ ...styles.listItemButton, ...styles.redBtn }}
                      onClick={() => handleDelete(animal)}
                    >
                      EXCLUIR
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            {!animals.length && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Typography variant="h5" color="textSecondary">
                  Nenhum animal encontrado
                </Typography>
              </div>
            )}
          </List>
        )}
      </Container>
      <Loader open={loader.isOpen} />
    </div>
  );
};

export default AnimalsPage;
