import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Grid,
} from "@mui/material";

import styles from "../../css/styles";
import Loader from "../../components/Loader";
import ApiService from "../../services/api";
import { showSuccess, showToastError } from "../../services/helper";
import { useNavigate, useParams } from "react-router-dom";

const CreateSpeciePage = () => {
  const [specieData, setSpecieData] = useState({
    name: "",
  });

  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSpecieData({ ...specieData, [name]: value });
  };

  const handleSaveSpecie = () => {
    setLoader({ isOpen: true });

    if (id) {
      updateSpecie();
    } else {
      createSpecie();
    }
  };

  const createSpecie = () => {
    ApiService()
      .post("/species", specieData)
      .then(
        (response) => {
          showSuccess("Espécie cadastrada com sucesso!");
          navigate("/species");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  const updateSpecie = () => {
    ApiService()
      .put(`/species/${id}`, specieData)
      .then(
        (response) => {
          setLoader({ isOpen: false });
          showSuccess("Espécie atualizadacom sucesso!");
          navigate("/species");
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
        .get(`/species/${id}`)
        .then(
          (response) => {
            setSpecieData(response.specie);
          },
          (error) => {
            showToastError(error.message);
          }
        );
    }
  }, [id]);

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
          <Typography variant="h4">{id ? 'Editando ' : 'Nova '}espécie</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "20px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              name="name"
              label="Nome"
              fullWidth
              value={specieData.name}
              onChange={handleInputChange}
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
              onClick={handleSaveSpecie}
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

export default CreateSpeciePage;
