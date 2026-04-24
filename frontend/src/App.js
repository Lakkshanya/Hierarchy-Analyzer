import { useState } from "react";
import "./styles.css";
import DashboardHeader from "./components/DashboardHeader";
import Sidebar from "./components/Sidebar";
import MainResults from "./components/MainResults";

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const performAnalysis = async (inputStr) => {
    setLoading(true);
    setError(null);
    try {
      const payload = inputStr.split(",").map(s => s.trim()).filter(Boolean);
      const res = await fetch("http://localhost:5000/bfhl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ data: payload })
      });

      if (!res.ok) throw new Error("Service Unavailable");
      const result = await res.json();
      
      // Calculate input stats on the frontend to keep backend strictly compliant
      const total_entries = payload.length;
      const invalid_format = result.invalid_entries ? result.invalid_entries.length : 0;
      const duplicates = result.duplicate_edges ? result.duplicate_edges.length : 0;
      const valid_format = total_entries - invalid_format;

      const frontendComputedStats = {
        total_entries,
        valid_format,
        invalid_format,
        duplicates
      };

      setData({ ...result, frontend_stats: frontendComputedStats });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="dashboard-container">
      <DashboardHeader />
      
      <div className="dashboard-content">
        <Sidebar 
          onAnalyze={performAnalysis} 
          loading={loading} 
          stats={data?.frontend_stats} 
        />
        
        <main className="main-viewport">
          <MainResults 
            data={data} 
            error={error} 
            loading={loading}
          />
        </main>
      </div>

    </div>
  );
}

export default App;