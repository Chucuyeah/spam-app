import React, { useEffect, useState } from 'react';
import api from '../api';

function History() {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Ambil data dari backend saat komponen pertama kali dimuat
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await api.get('/history');
        setData(res.data);
      } catch (err) {
        console.error('Gagal memuat history:', err);
      }
    };

    fetchHistory();
  }, []);

  // Filter dan pencarian
  const filteredData = data.filter((item) => {
    const isMatchFilter =
      filter === 'All' ||
      (filter === 'Spam' && item.prediction === '1') ||
      (filter === 'Non-Spam' && item.prediction === '0');

    const isMatchSearch = item.text.toLowerCase().includes(searchTerm.toLowerCase());

    return isMatchFilter && isMatchSearch;
  });

  // Pagination
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="container mt-3">
      <h2>Riwayat Preprocessing</h2>

      {/* Search & Filter */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="Cari teks..."
          className="form-control me-2"
          style={{ maxWidth: '300px' }}
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />

        <div>
          <select
            className="form-select"
            style={{ maxWidth: '200px' }}
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="All">Semua</option>
            <option value="Spam">Spam</option>
            <option value="Non-Spam">Non-Spam</option>
          </select>
        </div>
      </div>

      {/* Tabel Hasil */}
      <table className="table table-bordered table-striped">
        <thead>
          <tr>
            <th>Teks</th>
            <th>Cleaning</th>
            <th>Tokenizing</th>
            <th>Stopword</th>
            <th>Stemming</th>
            <th>Hasil</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((row, i) => (
            <tr key={i}>
              <td>{row.text}</td>
              <td>{row.cleaning}</td>
              <td>{row.tokenizing?.join(', ')}</td>
              <td>{row.stopword?.join(', ')}</td>
              <td>{row.stemming?.join(', ')}</td>
              <td>{row.prediction === '1' ? 'Spam' : 'Non-Spam'}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="d-flex justify-content-between">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="btn btn-primary"
        >
          Prev
        </button>
        <span>Halaman {currentPage} dari {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="btn btn-primary"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default History;
