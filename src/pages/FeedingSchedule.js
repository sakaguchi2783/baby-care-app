// src/pages/FeedingSchedule.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { Link } from 'react-router-dom';
import './PageStyles.css'; // 共通スタイルを追加

const FeedingSchedule = () => {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [food, setFood] = useState('');
  const [quantity, setQuantity] = useState('');
  const [notes, setNotes] = useState('');
  const [records, setRecords] = useState([]);

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('feeding_schedule')
      .select('*');
    if (error) console.error('Error fetching data:', error);
    else setRecords(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('feeding_schedule')
      .insert([{ date, time, food, quantity, notes }]);
    if (error) console.error('Error inserting data:', error);
    else fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="page">
      <Link to="/" className="home-button">ホーム</Link>
      <h1>食事スケジュール</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
        <input type="text" placeholder="食べ物" value={food} onChange={(e) => setFood(e.target.value)} required />
        <input type="text" placeholder="量" value={quantity} onChange={(e) => setQuantity(e.target.value)} required />
        <input type="text" placeholder="メモ" value={notes} onChange={(e) => setNotes(e.target.value)} />
        <button type="submit">記録</button>
      </form>
      <h2>過去の履歴一覧</h2>
      <ul className="record-list">
        {records.map((record) => (
          <li key={record.id} className="record-item">
            {record.date} {record.time}: 食べ物 - {record.food}, 量 - {record.quantity}, メモ - {record.notes}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FeedingSchedule;
