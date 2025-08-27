import * as XLSX from "xlsx";

export default function FileUpload({ onData }) {
  const handleFile = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (evt) => {
      const bstr = evt.target.result;
      const workbook = XLSX.read(bstr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });
      // Convert strings to numbers if possible
      const matrix = json.map((row) =>
        row.map((cell) => (isNaN(cell) ? 0 : Number(cell)))
      );
      onData(matrix);
    };

    reader.readAsBinaryString(file);
  };

  return (
    <div>
      <input type="file" accept=".xlsx, .xls" onChange={handleFile} />
    </div>
  );
}
