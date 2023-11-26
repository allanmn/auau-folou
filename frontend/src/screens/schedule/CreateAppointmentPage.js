import React, { useEffect, useRef, useState } from "react";
import {
  Container,
  Typography,
  Button,
  AppBar,
  Toolbar,
  Grid,
  MenuItem,
  TextField,
  CircularProgress,
  FormControlLabel,
  Switch,
} from "@mui/material";

import styles from "../../css/styles";
import Loader from "../../components/Loader";
import ApiService from "../../services/api";
import { showSuccess, showToastError } from "../../services/helper";
import { useNavigate, useParams } from "react-router-dom";
import { DateTimePicker } from "@mui/x-date-pickers";
import { format, parse } from "date-fns";

import "../../css/DatePicker.css";
import { NumericFormat } from "react-number-format";
import CurrencyTextField from "../../components/CurrencyFormat";

const CreateAppointmentPage = () => {
  const [vets, setVets] = useState([]);

  const [animals, setAnimals] = useState([]);

  const [statuses, setStatuses] = useState([]);

  const [packages, setPackages] = useState([]);

  const [services, setServices] = useState([]);

  const [appData, setAppData] = useState({
    vet_id: null,
    vet: {
      id: null,
      name: null,
    },
    scheduled_time: null,
    animal_id: null,
    animal: {
      id: null,
      name: null,
    },
    appointment_status_id: null,
    appointment_status: {
      id: null,
      name: null,
    },
    price: null,
    package_id: null,
    package: {
      id: null,
      name: null,
    },
    services: [],
    appointment_status_id: null,
    appointment_status: {
      id: null,
      name: null,
    },
  });

  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const [isLoadingVets, setIsLoadingVets] = useState(true);

  const [isLoadingAnimals, setIsLoadingAnimals] = useState(true);

  const [isLoadingPackages, setIsLoadingPackages] = useState(true);

  const [isLoadingServices, setIsLoadingServices] = useState(true);

  const [isLoadingStatuses, setIsLoadingStatuses] = useState(true);

  const [checked, setChecked] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAppData({ ...appData, [name]: value });
  };

  const handleSaveAppointment = () => {
    setLoader({ isOpen: true });

    if (id) {
      updateAppointment();
    } else {
      createAppointment();
    }
  };

  const handleChangeChecked = () => {
    setAppData({
      ...appData,
      package: {
        id: null,
        name: null,
      },
      package_id: null,
      services: [],
    });
    setChecked((prev) => !prev);
  };

  const createAppointment = () => {
    appData.price = parseFloat(price);

    if (appData.services.length) {
      appData.services = appData.services.map((s) => s.id);
    }

    ApiService()
      .post("/appointments", appData)
      .then(
        (response) => {
          showSuccess("Agendamento cadastrado com sucesso!");
          navigate("/appointments");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  const updateAppointment = () => {
    appData.price = parseFloat(price);

    if (appData.services.length) {
      appData.services = appData.services.map((s) => s.id);
    }

    ApiService()
      .put(`/appointments/${id}`, appData)
      .then(
        (response) => {
          setLoader({ isOpen: false });
          showSuccess("Agendamento atualizado com sucesso!");
          navigate("/appointments");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  const handleChangeVet = (event) => {
    setAppData({
      ...appData,
      vet_id: event.target.value,
      vet: vets.find((v) => v.id === event.target.value),
    });
  };

  const handleChangeStatus = (event) => {
    setAppData({
      ...appData,
      appointment_status_id: event.target.value,
      appointment_status: statuses.find((s) => s.id === event.target.value),
    });
  };

  const handleChangeAnimal = (event) => {
    setAppData({
      ...appData,
      animal_id: event.target.value,
      animal: animals.find((a) => a.id === event.target.value),
    });
  };

  const [price, setPrice] = useState(null);

  const handleChangePackage = (event) => {
    setAppData({
      ...appData,
      package_id: event.target.value,
      package: packages.find((p) => p.id === event.target.value),
    });
  };

  useEffect(() => {
    function calc() {
      if (appData.package_id && appData.package.id) {
        setPrice(appData.package.price);
      } else if (appData.services.length) {
        let price = 0;

        for (let service of appData.services) {
          if (service && service.price) {
            price += parseInt(service.price) * 1;
          }
        }

        setPrice(price);
      } else {
        setPrice(null);
      }
    }

    calc();
  }, [appData]);

  const handleChangeScheduledTime = (date) => {
    if (isNaN(date)) return;
    setAppData({
      ...appData,
      scheduled_time: format(date, "yyyy-MM-dd HH:mm:ss"),
    });
  };

  useEffect(() => {
    if (id) {
      ApiService()
        .get(`/appointments/${id}`)
        .then(
          (response) => {
            setAppData(response.appointment);
            if (
              response.appointment.services &&
              response.appointment.services.length
            ) {
              setChecked(false);
            }
          },
          (error) => {
            showToastError(error.message);
          }
        );
    }

    ApiService()
      .get("/vets")
      .then(
        (response) => {
          setVets(response.Vets);
          setIsLoadingVets(false);
        },
        (error) => {
          showToastError(error.message);
        }
      );

    ApiService()
      .get("/animals")
      .then(
        (response) => {
          setAnimals(response.animals);
          setIsLoadingAnimals(false);
        },
        (error) => {
          showToastError(error.message);
        }
      );

    ApiService()
      .get("/packages")
      .then(
        (response) => {
          setPackages(response.packages);
          setIsLoadingPackages(false);
        },
        (error) => {
          showToastError(error.message);
        }
      );

    ApiService()
      .get("/services")
      .then(
        (response) => {
          setServices(response.services);
          setIsLoadingServices(false);
        },
        (error) => {
          showToastError(error.message);
        }
      );

    ApiService()
      .get("/appointments-statuses")
      .then(
        (response) => {
          setStatuses(response.appointment_statuses);
          setIsLoadingStatuses(false);
        },
        (error) => {
          showToastError(error.message);
        }
      );
  }, [id]);

  const handleAddService = () => {
    let services = appData.services;

    services.push({
      id: null,
      name: null,
      price: null,
    });

    setAppData({
      ...appData,
      services: services,
    });
  };

  const handleChangeService = (data, index) => {
    let models = appData.services;

    let service = services.find((s) => s.id === data.target.value);

    models[index] = service;

    setAppData({
      ...appData,
      services: models,
    });
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
            justifyContent: "center",
            padding: "0 10px 0 10px",
          }}
        >
          <Typography variant="h4">
            {id ? "Editando " : "Novo "}Agendamento
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "20px 20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="vet"
              label="Veterinário"
              fullWidth
              value={appData.vet_id ?? ""}
              onChange={handleChangeVet}
              disabled={isLoadingVets}
              select={!isLoadingVets}
            >
              {vets.map((vet) => (
                <MenuItem key={vet.id} value={vet.id}>
                  {vet.name}
                </MenuItem>
              ))}
            </TextField>
            {isLoadingVets && (
              <CircularProgress
                size={20}
                style={{ position: "absolute", right: 35, top: 102 }}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="animal"
              label="Animal"
              fullWidth
              value={appData.animal_id ?? ""}
              onChange={handleChangeAnimal}
              disabled={isLoadingAnimals}
              select={!isLoadingAnimals}
            >
              {animals.map((animal) => (
                <MenuItem key={animal.id} value={animal.id}>
                  {animal.name}
                </MenuItem>
              ))}
            </TextField>
            {isLoadingAnimals && (
              <CircularProgress
                size={20}
                style={{ position: "absolute", right: 35, top: 102 }}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="status"
              label="Status"
              fullWidth
              value={appData.appointment_status_id ?? ""}
              onChange={handleChangeStatus}
              disabled={isLoadingStatuses}
              select={!isLoadingStatuses}
            >
              {statuses.map((status) => (
                <MenuItem key={status.id} value={status.id}>
                  {status.name}
                </MenuItem>
              ))}
            </TextField>
            {isLoadingStatuses && (
              <CircularProgress
                size={20}
                style={{ position: "absolute", right: 35, top: 102 }}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <DateTimePicker
              label="Selecione a data/hora"
              value={
                appData.id && appData.scheduled_time
                  ? parse(
                      appData.scheduled_time,
                      "yyyy-MM-dd HH:mm:ss",
                      new Date()
                    )
                  : null
              }
              format="dd/MM/yyyy HH:mm"
              onChange={handleChangeScheduledTime}
              className="full-width"
            />
          </Grid>
          <Grid item xs={6}>
            <CurrencyTextField
              label="Preço"
              fullWidth
              disabled={true}
              value={price ? price : ""}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControlLabel
              label={checked ? "Pacote" : "Serviços"}
              control={
                <Switch checked={checked} onChange={handleChangeChecked} />
              }
            />
          </Grid>
          {checked && (
            <Grid item xs={6}>
              <TextField
                name="package"
                label="Pacote"
                fullWidth
                value={appData.package_id ?? ""}
                onChange={handleChangePackage}
                disabled={isLoadingPackages}
                select={!isLoadingPackages}
              >
                {packages.map((pack) => (
                  <MenuItem key={pack.id} value={pack.id}>
                    {pack.name}
                  </MenuItem>
                ))}
              </TextField>
              {isLoadingPackages && (
                <CircularProgress
                  size={20}
                  style={{ position: "absolute", right: 35, top: 102 }}
                />
              )}
            </Grid>
          )}
          {!checked && (
            <Grid item xs={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={handleAddService}
                    style={{
                      ...styles.grayBtn,
                      ...styles.listItemButton,
                      float: "right",
                    }}
                  >
                    Adicionar novo serviço
                  </Button>
                </Grid>
              </Grid>
              {appData.services.map((s, i) => (
                <Grid
                  style={{ padding: "10px 0px" }}
                  item
                  xs={12}
                  key={"service-" + i}
                >
                  <div>
                    <div>
                      <TextField
                        name={"service-" + i}
                        label="Serviço"
                        fullWidth
                        value={s.id ?? ""}
                        onChange={(data) => {
                          handleChangeService(data, i);
                        }}
                        disabled={isLoadingServices}
                        select={!isLoadingServices}
                      >
                        {services.map((service) => (
                          <MenuItem key={service.id} value={service.id}>
                            {service.name}
                          </MenuItem>
                        ))}
                      </TextField>
                    </div>
                    <div></div>
                  </div>
                </Grid>
              ))}
            </Grid>
          )}
          <Grid
            style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
            item
            xs={12}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleSaveAppointment}
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

export default CreateAppointmentPage;
