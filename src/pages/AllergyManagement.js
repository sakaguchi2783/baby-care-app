// src/pages/AllergyManagement.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const AllergyManagement = () => {
  const [allergen, setAllergen] = useState('');
  const [reaction, setReaction] = useState('');
  const [dateDiscovered, setDateDiscovered] = useState('');
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('allergy_management')
      .select('*');
    if (error) {
      console.error('Error fetching data:', error);
    } else {
      setRecords(data);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('allergy_management')
      .insert([{ allergen, reaction, date_discovered: dateDiscovered }]);
    if (error) {
      console.error('Error inserting data:', error);
    } else {
      fetchData();
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page">
      <Link to="/" className="home-button">ホーム</Link>
      <h1>アレルギー管理</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="アレルゲン" value={allergen} onChange={(e) => setAllergen(e.target.value)} required />
        <input type="text" placeholder="反応" value={reaction} onChange={(e) => setReaction(e.target.value)} required />
        <input type="date" value={dateDiscovered} onChange={(e) => setDateDiscovered(e.target.value)} required />
        <button type="submit">記録</button>
      </form>
      <h2>過去の履歴一覧</h2>
      <ul className="record-list">
        {records.map((record) => (
          <li key={record.id} className="record-item">
            アレルゲン - {record.allergen}, 反応 - {record.reaction}, 発見日 - {record.date_discovered}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllergyManagement;
