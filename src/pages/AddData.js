import React, { useState } from 'react';
import api from '../api';

function AddData() {
  const [text, setText] = useState('');
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (text.trim() === '') {
      alert('Masukkan kalimat terlebih dahulu.');
      return;
    }

    try {
      const res = await api.post('/predict', { text });
      setResult(res.data);
    } catch (err) {
      console.error('Gagal melakukan prediksi:', err);
      alert('Terjadi kesalahan saat melakukan prediksi.');
    }
  };

  const getLabelStyle = (label) => {
    return {
      color: 'white',
      backgroundColor: label === '1' ? '#dc3545' : '#28a745', // merah untuk spam, hijau untuk non-spam
      padding: '4px 12px',
      borderRadius: '5px',
      fontWeight: 'bold',
    };
  };

  return (
    <div className="container mt-3">
      <h2>Masukkan Kalimat Untuk Cek Status Klasifikasi</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <textarea
            className="form-control"
            rows="3"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Masukkan kalimat di sini..."
          />
        </div>
        <button className="btn btn-primary" type="submit">Klasifikasi</button>
      </form>

      {result && (
        <div className="mt-4">
          <h4>Hasil:</h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th>Label</th>
                <td>
                  <span style={getLabelStyle(result.prediction)}>
                    {result.prediction === '1' ? 'Spam' : 'Non-Spam'}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Cleaning</th>
                <td>{result.preprocessing?.cleaned || '-'}</td>
              </tr>
              <tr>
                <th>Tokenizing</th>
                <td>{result.preprocessing?.tokens?.join(', ') || '-'}</td>
              </tr>
              <tr>
                <th>Stopword Removal</th>
                <td>{result.preprocessing?.removed_stopwords?.join(', ') || '-'}</td>
              </tr>
              <tr>
                <th>Stemming</th>
                <td>{result.preprocessing?.stemmed?.join(', ') || '-'}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AddData;
