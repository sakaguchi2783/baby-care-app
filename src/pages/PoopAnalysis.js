// src/pages/PoopAnalysis.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import './PageStyles.css';

const PoopAnalysis = () => {
  const [date, setDate] = useState('');
  const [color, setColor] = useState('');
  const [consistency, setConsistency] = useState('');
  const [notes, setNotes] = useState('');
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('poop_analysis')
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
      .from('poop_analysis')
      .insert([{ date, color, consistency, notes }]);
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
      <h1>うんち分析</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="text" placeholder="色" value={color} onChange={(e) => setColor(e.target.value)} required />
        <input type="text" placeholder="状態" value={consistency} onChange={(e) => setConsistency(e.target.value)} required />
        <input type="text" placeholder="メモ" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <button type="submit">記録</button>
      </form>
      <h2>過去の履歴一覧</h2>
      <ul className="record-list">
        {records.map((record) => (
          <li key={record.id} className="record-item">
            {record.date}: 色 - {record.color}, 状態 - {record.consistency}, メモ - {record.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PoopAnalysis;
