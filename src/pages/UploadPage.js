import { useState } from "react";
import { useNavigate } from "react-router-dom";
import * as XLSX from "xlsx";
import "./UploadPage.css";

export default function UploadPage() {
  const [matrixData, setMatrixData] = useState(null);
  const [fileName, setFileName] = useState("");
  const navigate = useNavigate();

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setFileName(file.name);

    const reader = new FileReader();
    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

      const matrix = json.map((row) =>
        row.map((cell) => (isNaN(cell) ? 0 : Number(cell)))
      );

      setMatrixData(matrix);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = () => {
    if (matrixData) {
      navigate("/heatmap", { state: { matrixData } });
    } else {
      alert("Please upload Excel data first!");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h1>MatrixViz</h1>
        <p>Please upload a Datasheet (Excel) to generate your DataGrid.</p>

        <label className="file-label">
          <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
          <span>{fileName || "Click to choose file"}</span>
        </label>

        <button className="upload-btn" onClick={handleSubmit}>
          View Data Grid
        </button>

        <p className="sample-text">
          Don’t have a file?{" "}
          <a href="/sample.xlsx" download>
            Download sample file
          </a>
        </p>
      </div>
    </div>
  );
}
