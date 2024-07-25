// src/pages/DiaperRecord.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import './PageStyles.css'; // 共通スタイルを追加

const DiaperRecord = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState('');
  const [condition, setCondition] = useState('');
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('diaper_records')
      .select('*');
    if (error) console.error('Error fetching data:', error);
    else setRecords(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('diaper_records')
      .insert([{ date, time, color, quantity, condition }]);
    if (error) console.error('Error inserting data:', error);
    else fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page">
      <Link to="/" className="home-button">ホーム</Link>
      <h1>おむつ交換記録</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <input type="text" placeholder="色" value={color} onChange={(e) => setColor(e.target.value)} required />
        <input type="text" placeholder="量" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <input type="text" placeholder="状態" value={condition} onChange={(e) => setCondition(e.target.value)} required />
        <button type="submit">記録</button>
      </form>
      <h2>過去の履歴一覧</h2>
      <ul className="record-list">
        {records.map((record) => (
          <li key={record.id} className="record-item">
            {record.date} {record.time}: 色 - {record.color}, 量 - {record.quantity}, 状態 - {record.condition}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DiaperRecord;
