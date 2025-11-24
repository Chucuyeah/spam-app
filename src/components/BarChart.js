// BarChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Tooltip, Legend } from 'chart.js';
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function BarChart({ tfidfData }) {
  const data = {
    labels: tfidfData.map(item => item.word),
    datasets: [{
      label: 'Skor TF-IDF',
      data: tfidfData.map(item => item.score),
      backgroundColor: '#007bff'
    }]
  };

  return <Bar data={data} />;
}

export default BarChart;
