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

const CreateOwnerPage = () => {
  const [ownerData, setOwnerData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
  });

  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOwnerData({ ...ownerData, [name]: value });
  };

  const handleSaveOwner = () => {
    setLoader({ isOpen: true });

    if (id) {
      updateOwner();
    } else {
      createOwner();
    }
  };

  const createOwner = () => {
    ApiService()
      .post("/owners", ownerData)
      .then(
        (response) => {
          console.log(response);
          showSuccess("Propritário cadastrado com sucesso!");
          navigate("/owners");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  const updateOwner = () => {
    ApiService()
      .put(`/owners/${id}`, ownerData)
      .then(
        (response) => {
          setLoader({ isOpen: false });
          showSuccess("Propritário atualizado com sucesso!");
          navigate("/owners");
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
        .get(`/owners/${id}`)
        .then(
          (response) => {
            setOwnerData(response.owner);
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
          <Typography variant="h4">Novo proprietário</Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "20px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Nome"
              fullWidth
              value={ownerData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <InputMask
              mask="(99) 99999-9999"
              disabled={false}
              value={ownerData.phone}
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
              value={ownerData.email}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="address"
              label="Endereço"
              fullWidth
              value={ownerData.address}
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
              onClick={handleSaveOwner}
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

export default CreateOwnerPage;
