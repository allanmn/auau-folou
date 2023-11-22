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

const CreateProviderPage = () => {
  const [providerData, setProviderData] = useState({
    name: "",
    social_name: "",
    phone: "",
    address: "",
    email: "",
    doc: "",
    product_type: "",
  });

  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProviderData({ ...providerData, [name]: value });
  };

  const handleSaveProvider = () => {
    setLoader({ isOpen: true });

    if (id) {
      updateProvider();
    } else {
      createProvider();
    }
  };

  const createProvider = () => {
    ApiService()
      .post("/suppliers", providerData)
      .then(
        (response) => {
          showSuccess("Fornecedor cadastrado com sucesso!");
          navigate("/providers");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  const updateProvider = () => {
    ApiService()
      .put(`/suppliers/${id}`, providerData)
      .then(
        (response) => {
          setLoader({ isOpen: false });
          showSuccess("Fornecedor atualizado com sucesso!");
          navigate("/suppliers");
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
        .get(`/suppliers/${id}`)
        .then(
          (response) => {
            setProviderData(response.provider);
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
            {id ? "Editando " : "Nova "}fornecedor
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "20px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Nome Fantasia"
              fullWidth
              value={providerData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="social_name"
              label="Razão Social"
              fullWidth
              value={providerData.social_name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="product_type"
              label="Tipo de produto"
              fullWidth
              value={providerData.product_type}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputMask
              mask="99.999.999/9999-99"
              disabled={false}
              name="doc"
              label="CNPJ"
              fullWidth
              value={providerData.doc}
              onChange={handleInputChange}
            >
              {(props) => <TextField fullWidth {...props} />}
            </InputMask>
          </Grid>
          <Grid item xs={6}>
            <InputMask
              mask="(99) 99999-9999"
              disabled={false}
              value={providerData.phone}
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
              value={providerData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="address"
              label="Endereço"
              fullWidth
              value={providerData.address}
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
              onClick={handleSaveProvider}
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

export default CreateProviderPage;
