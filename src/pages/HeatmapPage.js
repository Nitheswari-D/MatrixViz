import { useLocation, useNavigate } from "react-router-dom";
import HeatmapGrid from "../Components/HeatmapGrid";
import "./HeatmapPage.css"; // Add CSS file for styling

export default function HeatmapPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const matrixData = location.state?.matrixData;

  if (!matrixData) {
    return (
      <div className="datagrid-container">
        <h2>No data found!</h2>
        <button className="back-btn" onClick={() => navigate("/")}>
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="datagrid-container">
      <h1>Data Grid Visualization</h1>
      <HeatmapGrid data={matrixData} />
      <button className="back-btn" onClick={() => navigate("/")}>
        Upload New File
      </button>
    </div>
  );
}
