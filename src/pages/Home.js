import React, { useEffect, useState } from 'react';
import api from '../api';
import PieChart from '../components/PieChart';

function Home() {
  const [stats, setStats] = useState({ spam: 0, non_spam: 0 });
  const [kernel, setKernel] = useState('linear');

  // Data metrik statis untuk tiap kernel
  const modelMetrics = {
    linear: {
      name: 'Linear (C=1)',
      metrics: {
        Akurasi: '98.27%',
        'Precision': '0.98',
        'Recall': '0.98',
        'F1-Score': '0.98'
      }
    },
    rbf: {
      name: 'RBF (C=1, gamma=1)',
      metrics: {
        Akurasi: '98.62%',
        'Precision': '0.99',
        'Recall': '0.98',
        'F1-Score': '0.98'
      }
    },
    poly: {
      name: 'Polynomial (C=1, gamma=1, degree=3, coef0=0.1)',
      metrics: {
        Akurasi: '98.62%',
        'Precision': '0.99',
        'Recall': '0.98',
        'F1-Score': '0.98'
      }
    },
    sigmoid: {
      name: 'Sigmoid (C=1, coef0=0.1)',
      metrics: {
        Akurasi: '98.62%',
        'Precision': '0.98',
        'Recall': '0.99',
        'F1-Score': '0.98'
      }
    }
  };

  useEffect(() => {
    api.get('/stats').then(res => setStats(res.data));
  }, []);

  return (
    <main style={{
      flexGrow: 1,
      background: '#f5f5f5',
      padding: 30,
      overflowY: 'auto',
      height: '100vh',
      fontFamily: 'Segoe UI, Tahoma, Geneva, Verdana, sans-serif'
    }}>
      {/* PIE CHART */}
      <section style={{ marginBottom: 40 }}>
        <h2 style={{ fontWeight: '600' }}>Grafik Klasifikasi</h2>
        <p style={{ color: '#555', marginBottom: 20 }}>
          Komposisi klasifikasi spam dan non-spam dari komentar web Dinas Penanaman Modal Terpadu Kabupaten Sidoarjo
        </p>
        <PieChart spam={stats.spam} nonSpam={stats.non_spam} width={400} height={400} />
      </section>

      {/* EVALUASI METRIK */}
      <section style={{
        background: 'white',
        borderRadius: 12,
        padding: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: 40,
        textAlign: 'center'
      }}>
        <h2 style={{ fontWeight: '600', marginBottom: 20 }}>Evaluasi Model</h2>

        {/* Dropdown Kernel */}
        <div style={{ marginBottom: 20 }}>
          <label style={{ fontWeight: 500 }}>Pilih Kernel:</label><br />
          <select value={kernel} onChange={e => setKernel(e.target.value)} style={selectStyle}>
            <option value="linear">Linear</option>
            <option value="rbf">RBF</option>
            <option value="poly">Polynomial</option>
            <option value="sigmoid">Sigmoid</option>
          </select>
        </div>

        <p><strong>Konfigurasi:</strong> {modelMetrics[kernel].name}</p>

        {/* Tabel Metrik */}
        <div style={{ overflowX: 'auto' }}>
          <table className="table table-bordered mt-3" style={{ minWidth: 600 }}>
            <thead>
              <tr>
                {Object.keys(modelMetrics[kernel].metrics).map((m, idx) => (
                  <th key={idx}>{m}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                {Object.values(modelMetrics[kernel].metrics).map((v, idx) => (
                  <td key={idx}>{v}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* WORD CLOUD */}
      <section style={{
        background: 'white',
        borderRadius: 12,
        padding: 20,
        boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        marginBottom: 40
      }}>
        <h2 style={{ fontWeight: '600', marginBottom: 20 }}>Word Cloud</h2>
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 20
        }}>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h3 style={{ marginBottom: 10 }}>Spam</h3>
            <img
              src="/wc_spam.png"
              alt="Word Cloud Spam"
              style={{ width: '100%', maxWidth: 600, borderRadius: 8 }}
            />
          </div>
          <div style={{ flex: 1, textAlign: 'center' }}>
            <h3 style={{ marginBottom: 10 }}>Non-Spam</h3>
            <img
              src="/wc_nonspam.png"
              alt="Word Cloud Non-Spam"
              style={{ width: '100%', maxWidth: 600, borderRadius: 8 }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

// STYLE TAMBAHAN
const selectStyle = {
  padding: 8,
  borderRadius: 6,
  border: '1px solid #ccc',
  fontSize: 14
};

export default Home;
