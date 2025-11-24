// PieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(ArcElement, Tooltip, Legend, ChartDataLabels);

function PieChart({ spam, nonSpam }) {
  const total = spam + nonSpam;
  const data = {
    labels: ['Spam', 'Non-Spam'],
    datasets: [{
      data: [spam, nonSpam],
      backgroundColor: ['#dc3545', '#28a745'],
      borderWidth: 1
    }]
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top'
      },
      datalabels: {
        color: '#fff',
        font: {
          weight: 'bold',
          size: 16
        },
        formatter: (value) => {
          const percentage = total === 0 ? 0 : (value / total) * 100;
          return `${percentage.toFixed(1)}%`;
        }
      }
    }
  };

  return (
    <div style={{ width: '400px', height: '400px', margin: '0 auto' }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;
