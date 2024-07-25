// src/pages/HealthData.js
import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HealthData = () => {
  const [healthData, setHealthData] = useState([]);
  const [date, setDate] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [temperature, setTemperature] = useState('');

  const fetchData = async () => {
    const { data, error } = await supabase
      .from('health_data')
      .select('*');
    if (error) console.error('Error fetching data:', error);
    else setHealthData(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase
      .from('health_data')
      .insert([{ date, weight, height, temperature }]);
    if (error) console.error('Error inserting data:', error);
    else fetchData();
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>健康データ</h1>
      <form onSubmit={handleSubmit}>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        <input type="text" placeholder="体重 (kg)" value={weight} onChange={(e) => setWeight(e.target.value)} required />
        <input type="text" placeholder="身長 (cm)" value={height} onChange={(e) => setHeight(e.target.value)} required />
        <input type="text" placeholder="体温 (℃)" value={temperature} onChange={(e) => setTemperature(e.target.value)} required />
        <button type="submit">記録</button>
      </form>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={healthData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="weight" stroke="#8884d8" />
          <Line type="monotone" dataKey="height" stroke="#82ca9d" />
          <Line type="monotone" dataKey="temperature" stroke="#ff7300" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HealthData;
