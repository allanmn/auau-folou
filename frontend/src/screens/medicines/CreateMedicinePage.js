import React, { useEffect, useState } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  AppBar,
  Toolbar,
  Grid,
  MenuItem,
  CircularProgress,
} from "@mui/material";

import styles from "../../css/styles";
import Loader from "../../components/Loader";
import ApiService from "../../services/api";
import {
  showSuccess,
  showToastError,
} from "../../services/helper";
import { useNavigate, useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import CurrencyTextField from "../../components/CurrencyFormat";
import { format, parse } from "date-fns";

const CreateMedicinePage = () => {
  const [medicineData, setMedicineData] = useState({
    name: "",
    supplier_id: null,
    supplier: {
      id: null,
      name: "",
    },
    description: "",
    dosage: "",
    expirationDate: "",
    stockAvailable: "",
    price: null,
  });

  const [isLoadingSuppliers, setIsLoadingSuppliers] = useState(true);

  const [suppliers, setSuppliers] = useState([]);

  const [selectedDate, setSelectedDate] = useState(null);

  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const { id } = useParams();

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMedicineData({ ...medicineData, [name]: value });
  };

  const handleSaveMedicine = () => {
    setLoader({ isOpen: true });

    if (id) {
      updateMedicine();
    } else {
      createMedicine();
    }
  };

  const createMedicine = () => {
    ApiService()
      .post("/medicines", medicineData)
      .then(
        (response) => {
          showSuccess("Medicamento cadastrado com sucesso!");
          navigate("/medicines");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  const updateMedicine = () => {
    ApiService()
      .put(`/medicines/${id}`, medicineData)
      .then(
        (response) => {
          setLoader({ isOpen: false });
          showSuccess("Medicamento atualizado com sucesso!");
          navigate("/medicines");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
  };

  useEffect(() => {
    function getSuppliers() {
      ApiService()
        .get("/suppliers")
        .then(
          (res) => {
            setSuppliers(res.Suppliers);
            setIsLoadingSuppliers(false);
          },
          (error) => {
            showToastError(error.message);
          }
        );
    }
  }, []);

  useEffect(() => {
    if (id) {
      ApiService()
        .get(`/medicines/${id}`)
        .then(
          (response) => {
            setMedicineData(response.Medicine);
          },
          (error) => {
            showToastError(error.message);
          }
        );
    }

    ApiService()
      .get("/suppliers")
      .then(
        (response) => {
          setSuppliers(response.Suppliers);
          setIsLoadingSuppliers(false);
        },
        (error) => {
          showToastError(error.message);
        }
      );
  }, [id]);

  const handleChangeSupplier = (event) => {
    setMedicineData({
      ...medicineData,
      supplier: suppliers.find((s) => s.id === event.target.value),
      supplier_id: event.target.value,
    });
  };

  const handleChangeScheduledTime = (date) => {
    if (isNaN(date)) return;
    setMedicineData({
      ...medicineData,
      expirationDate: format(date, "yyyy-MM-dd"),
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
            {id ? "Editando " : "Nova "}Medicamento
          </Typography>
        </Toolbar>
      </AppBar>
      <Container style={{ padding: "20px 20px", maxWidth: "100%" }}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              name="name"
              label="Nome"
              fullWidth
              value={medicineData.name}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="dosage"
              label="Dosagem"
              fullWidth
              value={medicineData.dosage}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="stockAvailable"
              label="Estoque disponível"
              type="number"
              fullWidth
              value={medicineData.stockAvailable}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Selecione a data"
              value={
                medicineData.id && medicineData.expirationDate
                  ? parse(medicineData.expirationDate, "yyyy-MM-dd", new Date())
                  : null
              }
              format="dd/MM/yyyy"
              onChange={handleChangeScheduledTime}
              className="full-width"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="supplier"
              label="Fornecedor"
              fullWidth
              value={medicineData.supplier_id ?? ""}
              onChange={handleChangeSupplier}
              disabled={isLoadingSuppliers}
              select={!isLoadingSuppliers}
            >
              {suppliers.map((supplier) => (
                <MenuItem key={supplier.id} value={supplier.id}>
                  {supplier.name}
                </MenuItem>
              ))}
            </TextField>
            {isLoadingSuppliers && (
              <CircularProgress
                size={20}
                style={{ position: "absolute", right: 35, top: 102 }}
              />
            )}
          </Grid>
          <Grid item xs={6}>
            <CurrencyTextField
              label="Preço"
              fullWidth
              value={medicineData.price ? medicineData.price : ""}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              multiline
              name="description"
              label="Descrição"
              fullWidth
              rows={3}
              value={medicineData.description}
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
              onClick={handleSaveMedicine}
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

export default CreateMedicinePage;
