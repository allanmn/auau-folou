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
import ApiService from "../../services/api.js";
import { showSuccess, showToastError } from "../../services/helper.js";

import styles from "../../css/styles.js";
import Loader from "../../components/Loader.js";
import { useNavigate } from "react-router-dom";

const SupliersPage = () => {
  const [loading, setLoading] = useState(true);
  const [supliers, setSupliers] = useState([]);
  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await ApiService(navigate).get("/suppliers");

        setSupliers(response.supliers);

        setLoading(false);
      } catch (error) {
        showToastError(error.message);
      }
    }

    fetchData();
  }, [navigate]);

  const handleDelete = (specie) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar essa espécie?"
    );

    if (confirm) {
      setLoader({ isOpen: true });
      deleteSpecie(specie.id).then(
        (response) => {
          setSupliers((prevsupliers) =>
            prevsupliers.filter((s) => s.id !== specie.id)
          );

          setLoader({ isOpen: false });

          showSuccess("Espécie removida com sucesso!");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
    }
  };

  const deleteSpecie = (specieId) => {
    return ApiService().remove(`/supliers/${specieId}`);
  };

  const goToNew = () => {
    navigate("/supliers/create");
  };

  const handleEdit = (specieId) => {
    navigate(`/supliers/update/${specieId}`);
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
          <Typography variant="h4">Fornecedores</Typography>
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
                  <strong>Email</strong>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </ListItem>
            {supliers.map((specie) => (
              <ListItem key={supliers.id} style={{ background: "#D9D9D9" }}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    {specie.id}
                  </Grid>
                  <Grid item xs={4}>
                    {specie.name}
                  </Grid>
                  <Grid item xs={3}>
                    {specie.email}
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(specie.id)}
                      style={{ ...styles.listItemButton, ...styles.grayBtn }}
                    >
                      EDITAR
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      style={{ ...styles.listItemButton, ...styles.redBtn }}
                      onClick={() => handleDelete(specie)}
                    >
                      EXCLUIR
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            {!supliers.length && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Typography variant="h5" color="textSecondary">
                  Nenhuma fornecedor encontrada
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

export default SupliersPage;
