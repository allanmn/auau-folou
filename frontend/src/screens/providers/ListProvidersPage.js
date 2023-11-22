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

const ProvidersPage = () => {
  const [loading, setLoading] = useState(true);
  const [providers, setProviders] = useState([]);
  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await ApiService(navigate).get("/suppliers");

        setProviders(response.Suppliers);

        setLoading(false);
      } catch (error) {
        showToastError(error.message);
      }
    }

    fetchData();
  }, [navigate]);

  const handleDelete = (provider) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar esse fornecedor?"
    );

    if (confirm) {
      setLoader({ isOpen: true });
      deleteProvider(provider.id).then(
        (response) => {
          setProviders((prev) => prev.filter((o) => o.id !== provider.id));

          setLoader({ isOpen: false });

          showSuccess("Fornecedor removido com sucesso!");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
    }
  };

  const deleteProvider = (id) => {
    return ApiService().remove(`/suppliers/${id}`);
  };

  const goToNew = () => {
    navigate("/providers/create");
  };

  const handleEdit = (id) => {
    navigate(`/providers/update/${id}`);
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
                  <strong>CNPJ</strong>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </ListItem>
            {providers.map((provider) => (
              <ListItem key={provider.id} style={{ background: "#D9D9D9" }}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    {provider.id}
                  </Grid>
                  <Grid item xs={4}>
                    {provider.name}
                  </Grid>
                  <Grid item xs={3}>
                    {provider.doc}
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(provider.id)}
                      style={{ ...styles.listItemButton, ...styles.grayBtn }}
                    >
                      EDITAR
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      style={{ ...styles.listItemButton, ...styles.redBtn }}
                      onClick={() => handleDelete(provider)}
                    >
                      EXCLUIR
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            {!providers.length && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Typography variant="h5" color="textSecondary">
                  Nenhum fornecedor encontrado
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

export default ProvidersPage;
