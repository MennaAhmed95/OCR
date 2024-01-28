import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Typography,
} from "@mui/material";

export interface PassportData {
  Surname: string;
  "Document no.": string;
  "Given name": string;
  "Date of issue": string;
  "Date of birth": string;
  "Date of expiry": string;
  Nationality: string;
  Sex: string;
}

interface ResultTableProps {
  data: PassportData;
  tableKeys: (keyof PassportData)[];
}

export const ResultTable: React.FC<ResultTableProps> = ({
  data,
  tableKeys,
}) => {
  const rows = [];

  // Group keys into pairs
  for (let i = 0; i < tableKeys.length; i += 2) {
    const key1 = tableKeys[i];
    const key2 = tableKeys[i + 1];
    const rowData1 = data[key1];
    const rowData2 = data[key2];

    rows.push(
      <TableRow key={i}>
        <TableCell>{key1}</TableCell>
        <TableCell>{key2}</TableCell>
      </TableRow>
    );

    rows.push(
      <TableRow key={i + 1}>
        <TableCell>{rowData1}</TableCell>
        <TableCell>{rowData2}</TableCell>
      </TableRow>
    );
  }

  return (
    <div>
      <Typography variant="h6">Extracted Data:</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableBody>{rows}</TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};
