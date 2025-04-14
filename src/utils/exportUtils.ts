
import { Patient } from "../types";

export const exportToExcel = (patients: Patient[]) => {
  // Convert patients to CSV format
  const headers = ["ID", "Name", "Age", "Gender", "Diagnosis", "Last Test Date", "Medical History"];
  
  // Create CSV content
  let csvContent = headers.join(",") + "\n";
  
  patients.forEach(patient => {
    const row = [
      patient.id,
      `"${patient.name.replace(/"/g, '""')}"`, // Escape quotes in CSV
      patient.age,
      patient.gender,
      `"${patient.diagnosis.replace(/"/g, '""')}"`,
      patient.lastTestDate || "Never",
      `"${patient.medicalHistory.replace(/"/g, '""')}"`
    ];
    
    csvContent += row.join(",") + "\n";
  });
  
  // Create blob and download
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  
  // Set up download link
  link.setAttribute("href", url);
  link.setAttribute("download", `patient_database_${new Date().toISOString().split('T')[0]}.csv`);
  link.style.visibility = "hidden";
  
  // Append, click to download, and remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
