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

const MedicinesPage = () => {
  const [loading, setLoading] = useState(true);
  const [medicines, setMedicines] = useState([]);
  const [loader, setLoader] = useState({
    isOpen: false,
  });


  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await ApiService(navigate).get("/medicines");

        setMedicines(response.Medicines);

        setLoading(false);
      } catch (error) {
        showToastError(error.message);
      }
    }

    fetchData();
  }, [navigate]);

  const handleDelete = (medicine) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar esse medicamento?"
    );

    if (confirm) {
      setLoader({ isOpen: true });
      deleteMedicine(medicine.id).then(
        (response) => {
          setMedicines((prev) => prev.filter((a) => a.id !== medicine.id));

          setLoader({ isOpen: false });

          showSuccess("Medicamento removido com sucesso!");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
    }
  };

  const deleteMedicine = (id) => {
    return ApiService().remove(`/medicines/${id}`);
  };

  const goToNew = () => {
    navigate("/medicines/create");
  };

  const handleEdit = (ID) => {
    navigate(`/medicines/update/${ID}`);
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
          <Typography variant="h4">Medicamentos</Typography>
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
                <Grid item xs={4}>
                  <strong>Nome</strong>
                </Grid>
                <Grid item xs={3}>
                  <strong>Fornecedor</strong>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </ListItem>
            {medicines.map((medicine) => (
              <ListItem key={medicine.id} style={{ background: "#D9D9D9" }}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    {medicine.id}
                  </Grid>
                  <Grid item xs={4}>
                    {medicine.name}
                  </Grid>
                  <Grid item xs={3}>
                    {medicine.supplier && medicine.supplier.name ? medicine.supplier.name : ""}
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(medicine.id)}
                      style={{ ...styles.listItemButton, ...styles.grayBtn }}
                    >
                      EDITAR
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      style={{ ...styles.listItemButton, ...styles.redBtn }}
                      onClick={() => handleDelete(medicine)}
                    >
                      EXCLUIR
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            {!medicines.length && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Typography variant="h5" color="textSecondary">
                  Nenhum medicamento encontrado
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

export default MedicinesPage;
