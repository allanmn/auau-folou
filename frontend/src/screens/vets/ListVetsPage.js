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

const VetsPage = () => {
  const [loading, setLoading] = useState(true);
  const [vets, setVets] = useState([]);
  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await ApiService(navigate).get("/vets");

        setVets(response.Vets);

        setLoading(false);
      } catch (error) {
        showToastError(error.message);
      }
    }

    fetchData();
  }, [navigate]);

  const handleDelete = (vet) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar esse veterinário?"
    );

    if (confirm) {
      setLoader({ isOpen: true });
      deleteVet(vet.id).then(
        (response) => {
          setVets((prevVets) =>
          prevVets.filter((v) => v.id !== vet.id)
          );

          setLoader({ isOpen: false });

          showSuccess("Veterinário removido com sucesso!");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
    }
  };

  const deleteVet = (vetId) => {
    return ApiService().remove(`/vets/${vetId}`);
  };

  const goToNew = () => {
    navigate("/vets/create");
  };

  const handleEdit = (vetId) => {
    navigate(`/vets/update/${vetId}`);
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
          <Typography variant="h4">Veterinários</Typography>
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
                  <strong>CPF</strong>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </ListItem>
            {vets.map((vet) => (
              <ListItem key={vet.id} style={{ background: "#D9D9D9" }}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    {vet.id}
                  </Grid>
                  <Grid item xs={4}>
                    {vet.name}
                  </Grid>
                  <Grid item xs={3}>
                    {vet.doc}
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(vet.id)}
                      style={{ ...styles.listItemButton, ...styles.grayBtn }}
                    >
                      EDITAR
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      style={{ ...styles.listItemButton, ...styles.redBtn }}
                      onClick={() => handleDelete(vet)}
                    >
                      EXCLUIR
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            {!vets.length && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Typography variant="h5" color="textSecondary">
                  Nenhum veterinário encontrado
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

export default VetsPage;
