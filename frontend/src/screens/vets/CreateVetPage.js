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

import InputMask from "react-input-mask";

import styles from "../../css/styles";
import Loader from "../../components/Loader";
import ApiService from "../../services/api";
import { showSuccess, showToastError } from "../../services/helper";
import { useNavigate, useParams } from "react-router-dom";

const CreateVetPage = () => {
  const [vetData, setVetData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    CRMV: "",
    specialty: "",
    doc: "",
  });

  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVetData({ ...vetData, [name]: value });
  };

  const handleSaveVet = () => {
    setLoader({ isOpen: true });

    if (id) {
      updateVet();
    } else {
      createVet();
    }
  };

  const createVet = () => {
    ApiService()
      .post("/vets", vetData)
      .then(
        (response) => {
          console.log(response);
          showSuccess("Veterinário cadastrado com sucesso!");
          navigate("/vets");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  const updateVet = () => {
    ApiService()
      .put(`/vets/${id}`, vetData)
      .then(
        (response) => {
          setLoader({ isOpen: false });
          showSuccess("Veterinário atualizado com sucesso!");
          navigate("/vets");
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
        .get(`/vets/${id}`)
        .then(
          (response) => {
            setVetData(response.vet);
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
          <Typography variant="h4">
            {id ? "Editando " : "NovO "}veterinário
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
              value={vetData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputMask
              mask="(99) 99999-9999"
              disabled={false}
              value={vetData.phone}
              name="phone"
              label="Telefone"
              maskChar=" "
              onChange={handleInputChange}
            >
              {(props) => <TextField fullWidth {...props} />}
            </InputMask>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="email"
              label="E-mail"
              fullWidth
              value={vetData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="specialty"
              label="Especialidade"
              fullWidth
              value={vetData.specialty}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputMask
              mask="999.999.999-99"
              disabled={false}
              value={vetData.doc}
              name="doc"
              label="Documento (CPF)"
              maskChar=" "
              onChange={handleInputChange}
            >
              {(props) => <TextField fullWidth {...props} />}
            </InputMask>
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="CRMV"
              label="CRMV"
              fullWidth
              value={vetData.CRMV}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="address"
              label="Endereço"
              fullWidth
              value={vetData.address}
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
              onClick={handleSaveVet}
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

export default CreateVetPage;
