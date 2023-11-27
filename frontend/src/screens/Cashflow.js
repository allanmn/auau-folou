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
  Card,
  CardContent,
  Icon,
} from "@mui/material";
import ApiService from "../services/api.js";
import { showSuccess, showToastError } from "../services/helper.js";

import styles from "../css/styles.js";
import Loader from "../components/Loader.js";
import { useNavigate } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";

import "../css/DatePicker.css";
import { format, parse } from "date-fns";
import { AttachMoney } from "@mui/icons-material";

const CashflowsPage = () => {
  const defaultDate = new Date();
  const [selectedDate, setSelectedDate] = useState(defaultDate);
  const [loading, setLoading] = useState(true);
  const [cashflows, setCashflows] = useState([]);
  const [loader, setLoader] = useState({
    isOpen: false,
  });

  const [totalPaid, setTotalPaid] = useState(0.0);
  const [totalUnpaid, setTotalUnpaid] = useState(0.0);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const navigate = useNavigate();

  useEffect(() => {
    function getTotal() {
      if (cashflows) {
        let unpaid = 0.0;
        let paid = 0.0;
        for (let cashflow of cashflows) {
          if (cashflow.paid_at) {
            paid += parseFloat(cashflow.value) * 1;
          } else {
            unpaid += parseFloat(cashflow.value) * 1;
          }
        }

        setTotalPaid(paid);
        setTotalUnpaid(unpaid);
      }
    }

    getTotal();
  }, [cashflows]);

  useEffect(() => {
    async function fetchData() {
      try {
        let response = await ApiService(navigate).get("/by-day-cashflows", {
          date: format(selectedDate, "yyyy-MM-dd"),
        });

        setCashflows(response.cashflows);

        setLoading(false);
      } catch (error) {
        showToastError(error.message);
      }
    }

    fetchData();
  }, [selectedDate]);

  const handleDelete = (cashflow) => {
    const confirm = window.confirm(
      "Tem certeza que deseja deletar esse fluxo?"
    );

    if (confirm) {
      setLoader({ isOpen: true });
      deleteCashflow(cashflow.id).then(
        (response) => {
          setCashflows((prev) => prev.filter((o) => o.id !== cashflow.id));

          setLoader({ isOpen: false });

          showSuccess("fluxo removido com sucesso!");
        },
        (error) => {
          setLoader({ isOpen: false });
          showToastError(error.message);
        }
      );
    }
  };

  const pay = (cashflow) => {
    const confirm = window.confirm("Tem certeza que deseja pagar esse fluxo?");

    if (confirm) {
      setLoader({ isOpen: true });

      cashflow.paid_at = format(new Date(), "yyyy-MM-dd HH:mm:ss");

      ApiService()
        .put(`/cashflows/${cashflow.id}`, cashflow)
        .then(
          (response) => {
            setLoader({ isOpen: false });
            showSuccess("Fluxo atualizado com sucesso!");
          },
          (error) => {
            setLoader({ isOpen: false });
            showToastError(error.message);
          }
        );

      // deleteCashflow(cashflow.id).then(
      //   (response) => {
      //     setCashflows((prev) => prev.filter((o) => o.id !== cashflow.id));

      //     setLoader({ isOpen: false });

      //     showSuccess("fluxo removido com sucesso!");
      //   },
      //   (error) => {
      //     setLoader({ isOpen: false });
      //     showToastError(error.message);
      //   }
      // );
    }
  };

  const deleteCashflow = (id) => {
    return ApiService().remove(`/cashflows/${id}`);
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
          <Typography variant="h4">Fluxo de caixa</Typography>
          <DatePicker
            label="Selecione a data"
            defaultValue={selectedDate}
            format="dd/MM/yyyy"
            value={selectedDate}
            onChange={handleDateChange}
            className="app-bar-datepicker"
          />
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
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Card sx={{ backgroundColor: "#74BA2E", margin: 3 }}>
                <CardContent>
                  <div style={{ display: "flex", alignItems: "center" }}>
                    <Icon fontSize="large">
                      <AttachMoney fontSize="large" />
                    </Icon>
                    <Typography
                      variant="h6"
                      sx={{ flexGrow: 1, marginLeft: 5, fontWeight: "bolder" }}
                    >
                      Entrada
                    </Typography>
                    <div>
                      <Typography variant="body2">
                        Previsto:{" "}
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(totalPaid + totalUnpaid)}
                      </Typography>
                      <Typography variant="body2">
                        Efetivo:{" "}
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(totalPaid)}
                      </Typography>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12}>
              <List style={{ padding: 0 }}>
                {cashflows.map((cash) => (
                  <ListItem key={cash.id} style={{ background: "#D9D9D9" }}>
                    <Grid container spacing={2}>
                      <Grid item xs={5}>
                        {cash.comment}
                      </Grid>
                      <Grid item xs={1}>
                        {new Intl.NumberFormat("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }).format(parseFloat(cash.value))}
                      </Grid>
                      <Grid item xs={1}>
                        {format(
                          parse(
                            cash.due_date,
                            "yyyy-MM-dd HH:mm:ss",
                            new Date()
                          ),
                          "dd/MM/yyyy"
                        )}
                      </Grid>
                      <Grid item xs={1}>
                        {cash.paid_at ? (
                          <Typography variant="p" color="#74BA2E">
                            {format(
                              parse(
                                cash.paid_at,
                                "yyyy-MM-dd HH:mm:ss",
                                new Date()
                              ),
                              "dd/MM/yyyy"
                            )}
                          </Typography>
                        ) : (
                          "Não pago"
                        )}
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          variant="contained"
                          onClick={() => pay(cash)}
                          disabled={cash.paid_at}
                          style={{
                            ...styles.listItemButton,
                            ...styles.grayBtn,
                            float: "right",
                          }}
                        >
                          {cash.paid_at ? "PAGO" : "PAGAR"}
                        </Button>
                      </Grid>
                      <Grid item xs={2}>
                        <Button
                          variant="contained"
                          style={{
                            ...styles.listItemButton,
                            ...styles.redBtn,
                            float: "right",
                          }}
                          onClick={() => handleDelete(cash)}
                        >
                          EXCLUIR
                        </Button>
                      </Grid>
                    </Grid>
                  </ListItem>
                ))}
                {!cashflows.length && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      marginTop: 10,
                    }}
                  >
                    <Typography variant="h5" color="textSecondary">
                      Nenhum fluxo encontrado
                    </Typography>
                  </div>
                )}
              </List>
            </Grid>
          </Grid>
        )}
      </Container>
      <Loader open={loader.isOpen} />
    </div>
  );
};

export default CashflowsPage;
