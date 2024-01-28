import React, { useState } from "react";
import { Container, CssBaseline, Typography } from "@mui/material";
import { OCRReader, PassportData, ResultTable } from "./components";

const App: React.FC = () => {
  const [extractedData, setExtractedData] = useState<PassportData>({
    Surname: "",
    "Document no.": "",
    "Given name": "",
    "Date of issue": "",
    "Date of birth": "",
    "Date of expiry": "",
    Nationality: "",
    Sex: "",
  });

  const handleTextExtracted = (lines: string[]) => {
    const passportData: PassportData = {
      Surname: "",
      "Document no.": "",
      "Given name": "",
      "Date of issue": "",
      "Date of birth": "",
      "Date of expiry": "",
      Nationality: "",
      Sex: "",
    };

    lines.forEach((line) => {
      const trimmedLine = line.trim();

      const surnameMatch = trimmedLine.match(/^(\w+)/);
      const documentNoMatch = trimmedLine.match(/^(?:\d+\s)?SPECI(\d+)/);
      const givenNameMatch = trimmedLine.match(/^[^\d]+$/);
      const dateMatch = trimmedLine.match(/\d{2} [A-Z]+\/[A-Z]+ \d{4}/);
      const nationalityMatch = trimmedLine.match(/^[^\d]+$/);
      const sexMatch = trimmedLine.match(/^[^\d]+$/);

      if (surnameMatch) passportData.Surname = surnameMatch[1];
      if (documentNoMatch) passportData["Document no."] = documentNoMatch[1];
      if (givenNameMatch) passportData["Given name"] = trimmedLine;
      if (dateMatch) {
        const [day, month, year] = dateMatch[0].split(" ");
        passportData["Date of issue"] = `${day} ${month} ${year}`;
        passportData["Date of birth"] = `${day} ${month} ${year}`;
        passportData["Date of expiry"] = `${day} ${month} ${year}`;
      }
      if (nationalityMatch && nationalityMatch[0].trim() === "Nederlandse") {
        passportData.Nationality = "Nederlandse";
      }
      if (sexMatch && sexMatch[0].trim() === "V/F") {
        passportData.Sex = "V/F";
      }
    });

    setExtractedData(passportData);
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Typography variant="h4">OCR App</Typography>
      <OCRReader onTextExtracted={handleTextExtracted} />
      {Object.values(extractedData).filter(Boolean).length > 0 && (
        <ResultTable
          data={extractedData}
          tableKeys={Object.keys(extractedData) as (keyof PassportData)[]}
        />
      )}
    </Container>
  );
};

export default App;
