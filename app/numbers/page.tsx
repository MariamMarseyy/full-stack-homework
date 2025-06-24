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
  Skeleton,
} from "@mui/material";
import axios from "axios";
import { styled } from "@mui/material/styles";

import { unsetSymbolHandler } from "../src/utils";

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
  const [loading, setLoading] = useState<boolean>(false);
  const [value, setValue] = useState<number | null>(null);
  const [pairs, setPairs] = useState<INumberPageProps[]>([]);

  const fetchPairs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get<INumberPageProps[]>(
        "/api/numbers/pairs"
      );
      setPairs(data);
    } catch (err) {
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
    if (value == null) return;

    setLoading(true);
    try {
      await axios.post<INumberPageProps>("/api/numbers", { value });
      await fetchPairs();
      setValue(null);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
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
        <Button variant="contained" type="submit" loading={loading}>
          Add
        </Button>
      </form>

      <Table sx={{ tableLayout: "fixed", width: "100%" }}>
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
              <Skeleton variant="rectangular" width={210} height={118} />
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
              <TableCell
                colSpan={5}
                sx={{
                  width: "100%",
                  textAlign: "center",
                }}
              >
                No data
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </Container>
  );
};

export default NumbersPage;
