"use client";

import type { SelectChangeEvent } from "@mui/material/Select";
import {
  Box,
  Paper,
  Table,
  Stack,
  styled,
  Select,
  Button,
  MenuItem,
  TableRow,
  TableCell,
  TableHead,
  TableBody,
  TextField,
  Typography,
  TableContainer,
} from "@mui/material";
import React from "react";
import { useState } from "react";
import { unsetSymbolHandler } from "../src/utils";
import axios from "axios";

type Grade = {
  id: number;
  class: string;
  grade: number;
};

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

interface ClassItem {
  id: number;
  name: string;
  selected: boolean;
}

const GradesPage = () => {
  const [grades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(false);
  const [grade, setGrade] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [classSelection, setClassSelection] = useState<ClassItem[]>([
    { id: 1, name: "Math", selected: true },
    { id: 2, name: "Science", selected: false },
    { id: 3, name: "History", selected: false },
  ]);

  const handleClassChange = (e: SelectChangeEvent<string>) => {
    const picked = e.target.value;
    setClassSelection((prev) =>
      prev.map((item) => ({
        ...item,
        selected: item.name === picked,
      }))
    );
  };
  const current = classSelection.find((item) => item?.selected);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value.replace(/\D/g, "-");
    const onlyNumbers = Number(value);

    if (value === "") {
      setGrade(null);
      return;
    }
    if (!Number.isNaN(onlyNumbers) && onlyNumbers <= 100) {
      setGrade(onlyNumbers);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/grades", {
        grade: Number(grade),
        classSelection: current?.id,
      });

      setGrade(res.data.grade);

      setLoading(false);

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.response?.data?.message || err.message || "Error");
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" gutterBottom>
        Grade Submission
      </Typography>

      <form onSubmit={handleSubmit}>
        <Stack
          spacing={2}
          direction={{ xs: "column", sm: "row" }}
          sx={{ mb: 4 }}
        >
          <Select
            fullWidth
            name={current?.name || ""}
            value={current?.name || ""}
            onChange={handleClassChange}
          >
            {classSelection.map((item) => (
              <MenuItem key={item.id} value={item.name}>
                {item.name}
              </MenuItem>
            ))}
          </Select>

          <StyledNumberField
            type="number"
            label="Grade"
            fullWidth
            value={grade == null ? "" : grade}
            onChange={onChangeHandler}
            onKeyDown={(e) => unsetSymbolHandler(e, true)}
          />

          <Button type="submit" variant="contained" disabled={loading}>
            {loading ? "Saving..." : "Submit"}
          </Button>
        </Stack>
      </form>

      {error && (
        <Typography color="error" sx={{ mb: 2 }}>
          {error}
        </Typography>
      )}

      <Typography variant="h6" sx={{ mb: 2 }}>
        Submitted Grades
      </Typography>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Class</TableCell>
              <TableCell>Grade</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {grades?.map((g) => (
              <TableRow key={g.id}>
                <TableCell>{g.id}</TableCell>
                <TableCell>{g.class}</TableCell>
                <TableCell>{g.grade}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default GradesPage;
