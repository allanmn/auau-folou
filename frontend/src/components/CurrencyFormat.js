import React from "react";
import TextField from "@mui/material/TextField";
import { NumericFormat } from "react-number-format";

const CurrencyTextField = (props) => {
  return (
    <NumericFormat
      thousandSeparator="."
      decimalSeparator=","
      prefix="R$ "
      {...props}
      customInput={TextField}
    />
  );
};

export default CurrencyTextField;
