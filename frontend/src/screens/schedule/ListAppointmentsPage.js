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
import { DatePicker } from "@mui/x-date-pickers";

import "../../css/DatePicker.css";
import { format, parse } from "date-fns";

const AppointmentsPage = () => {
  const defaultDate = new Date();
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [loading, setLoading] = useState(true);
  const [appointments, setAppointments] = useState([]);
  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await ApiService(navigate).get("/by-day-appointments", { date: format(selectedDate, 'yyyy-MM-dd') });

        setAppointments(response.appointments);

        setLoading(false);
      } catch (error) {
        showToastError(error.message);
      }
    }

    fetchData();
  }, [selectedDate]);

  const handleDelete = (appointment) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar esse agendamento?"
    );

    if (confirm) {
      setLoader({ isOpen: true });
      deleteAppointment(appointment.id).then(
        (response) => {
          setAppointments((prev) =>
            prev.filter((o) => o.id !== appointment.id)
          );

          setLoader({ isOpen: false });

          showSuccess("Agendamento removido com sucesso!");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
    }
  };

  const deleteAppointment = (id) => {
    return ApiService().remove(`/appointments/${id}`);
  };

  const goToNew = () => {
    navigate("/appointments/create");
  };

  const handleEdit = (id) => {
    navigate(`/appointments/update/${id}`);
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
          <Typography variant="h4">Agendamentos</Typography>
          <DatePicker
            label="Selecione a data"
            defaultValue={selectedDate}
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            className="app-bar-datepicker"
          />
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
                <Grid item xs={3}>
                  <strong>Nome do veterinário</strong>
                </Grid>
                <Grid item xs={2}>
                  <strong>Status</strong>
                </Grid>
                <Grid item xs={2}>
                  <strong>Data/Hora</strong>
                </Grid>
                <Grid item xs={2}></Grid>
                <Grid item xs={2}></Grid>
              </Grid>
            </ListItem>
            {appointments.map((app) => (
              <ListItem key={app.id} style={{ background: "#D9D9D9" }}>
                <Grid container spacing={2}>
                  <Grid item xs={1}>
                    {app.id}
                  </Grid>
                  <Grid item xs={3}>
                    {app.vet.name}
                  </Grid>
                  <Grid item xs={2}>
                    {app.appointment_status.name}
                  </Grid>
                  <Grid item xs={2}>
                    {format(parse(app.scheduled_time, 'yyyy-MM-dd HH:mm:ss', new Date()), 'dd/MM/yyyy')}
                    <br />
                    {format(parse(app.scheduled_time, 'yyyy-MM-dd HH:mm:ss', new Date()), 'HH:mm')}
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      onClick={() => handleEdit(app.id)}
                      style={{ ...styles.listItemButton, ...styles.grayBtn }}
                    >
                      EDITAR
                    </Button>
                  </Grid>
                  <Grid item xs={2}>
                    <Button
                      variant="contained"
                      style={{ ...styles.listItemButton, ...styles.redBtn }}
                      onClick={() => handleDelete(app)}
                    >
                      EXCLUIR
                    </Button>
                  </Grid>
                </Grid>
              </ListItem>
            ))}
            {!appointments.length && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: 10,
                }}
              >
                <Typography variant="h5" color="textSecondary">
                  Nenhum agendamento encontrado
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

export default AppointmentsPage;
