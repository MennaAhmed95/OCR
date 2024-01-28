import React, { useState } from "react";
import { Button, Typography } from "@mui/material";
import Tesseract from "tesseract.js";

interface OCRReaderProps {
  onTextExtracted: (text: string[]) => void;
}

export const OCRReader: React.FC<OCRReaderProps> = ({ onTextExtracted }) => {
  const [image, setImage] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }
  };

  const handleExtractText = async () => {
    if (image) {
      const {
        data: { lines },
      } = await Tesseract.recognize(image, "eng");
      const text = lines.map((line) => line.text);

      onTextExtracted(text);
    }
  };

  return (
    <div>
      <Typography variant="h6">Upload Image:</Typography>
      <input type="file" accept="image/*" onChange={handleImageChange} />
      <Button onClick={handleExtractText} disabled={!image}>
        Extract Text
      </Button>
    </div>
  );
};
