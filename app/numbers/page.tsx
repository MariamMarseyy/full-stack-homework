"use client";
import React, { useState } from "react";
import {
  Table,
  Button,
  TableRow,
  TextField,
  TableHead,
  TableCell,
  TableBody,
  Container,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { unsetSymbolHandler } from "../src/utils";
import axios from "axios";

const tableCellData = ["ID 1", "Number 1", "ID 2", "Number 2", "Sum"];

const StyledNumberField = styled(TextField)({
  "& input[type=number]": {
    MozAppearance: "textfield",
    WebkitAppearance: "none",
    appearance: "none",
  },
  "& input[type=number]::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
  "& input[type=number]::-webkit-inner-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
});

interface INumberPageProps {
  id1: number;
  number1: number;
  id2: number;
  number2: number;
  sum: number;
}

const NumbersPage = () => {
  const [value, setValue] = useState<number | null>(null);
  const [pairs, setPairs] = useState<INumberPageProps[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const fetchPairs = async () => {
    setLoading(true);
    try {
      const response = await axios.get<INumberPageProps[]>(
        "/api/numbers/pairs"
      );
      setPairs(response.data);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const eventValue = e.currentTarget.value.replace(/\D/g, "-");
    const onlyNumbers = Number(eventValue);

    if (eventValue === "") {
      setValue(null);
      return;
    }

    if (
      !Number.isNaN(onlyNumbers) &&
      onlyNumbers <= 100 &&
      onlyNumbers >= -100
    ) {
      setValue(onlyNumbers);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const intValue = parseInt(String(value), 10);
    if (isNaN(intValue)) return;
    try {
      await axios.post("/api/numbers", { value: intValue });

      setValue(null);
      fetchPairs();
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Number Pair Calculator
      </Typography>

      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}
      >
        <StyledNumberField
          fullWidth
          type="number"
          value={value == null ? "" : value}
          label="Enter a number"
          onChange={onChangeHandler}
          onKeyDown={(e) => unsetSymbolHandler(e)}
        />
        <Button variant="contained" type="submit">
          Add
        </Button>
      </form>

      <Table>
        <TableHead>
          <TableRow>
            {tableCellData.map((item) => (
              <TableCell key={item}>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <TableBody>
          {loading ? (
            <TableRow>
              <TableCell colSpan={5}>Loading...</TableCell>
            </TableRow>
          ) : pairs?.length > 0 ? (
            pairs?.map((pair) => (
              <TableRow key={`${pair.id1}-${pair.id2}`}>
                <TableCell>{pair.id1}</TableCell>
                <TableCell>{pair.number1}</TableCell>
                <TableCell>{pair.id2}</TableCell>
                <TableCell>{pair.number2}</TableCell>
                <TableCell>{pair.sum}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={5}>No data</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default NumbersPage;
