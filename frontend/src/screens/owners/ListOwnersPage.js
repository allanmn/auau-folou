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

const OwnersPage = () => {
  const [loading, setLoading] = useState(true);
  const [owners, setOwners] = useState([]);
  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await ApiService(navigate).get("/owners");

        setOwners(response.owners);

        setLoading(false);
      } catch (error) {
        showToastError(error.message);
      }
    }

    fetchData();
  }, [navigate]);

  const handleDelete = (owner) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar esse proprietário?"
    );

    if (confirm) {
      setLoader({ isOpen: true });
      deleteOwner(owner.id).then(
        (response) => {
          setOwners((prevOwners) =>
            prevOwners.filter((o) => o.id !== owner.id)
          );

          setLoader({ isOpen: false });

          showSuccess("Proprietário removido com sucesso!");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
    }
  };

  const deleteOwner = (ownerId) => {
    return ApiService().remove(`/owners/${ownerId}`);
  };

  const goToNew = () => {
    navigate("/owners/create");
  };

  const handleEdit = (ownerId) => {
    navigate(`/owners/update/${ownerId}`);
  };

  const viewAnimals = (owner) => {
    navigate(`/owners/${owner.id}/animals`);
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
          <Typography variant="h4">Proprietários</Typography>
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
            {owners.map((owner) => (
              <ListItem key={owner.id} style={{ background: "#D9D9D9" }}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    {owner.id}
                  </Grid>
                  <Grid item xs={4}>
                    {owner.name}
                  </Grid>
                  <Grid item xs={3}>
                    {owner.email}
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(owner.id)}
                      style={{ ...styles.listItemButton, ...styles.grayBtn }}
                    >
                      EDITAR
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      style={{ ...styles.listItemButton, ...styles.redBtn }}
                      onClick={() => handleDelete(owner)}
                    >
                      EXCLUIR
                    </Button>
                  </Grid>
                  
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      style={{ ...styles.listItemButton, ...styles.blueBtn }}
                      onClick={() => viewAnimals(owner)}
                    >
                      VER ANIMAIS
                    </Button>
                  </Grid>

                </Grid>

              </ListItem>
            ))}
            {!owners.length && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Typography variant="h5" color="textSecondary">
                  Nenhum proprietário encontrado
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

export default OwnersPage;
