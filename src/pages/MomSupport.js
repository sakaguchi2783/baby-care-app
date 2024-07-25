// src/pages/MomSupport.js
import React, { useState } from 'react';

const supportMessages = [
  "あなたは素晴らしいお母さんです！",
  "毎日の努力に感謝します。",
  "少しの休憩も大切です。",
  "あなたの笑顔が赤ちゃんを幸せにします。",
  "頑張りすぎないで、あなたは十分頑張っています。",
];

const MomSupport = () => {
  const [message, setMessage] = useState('');

  const handleButtonClick = () => {
    const randomMessage = supportMessages[Math.floor(Math.random() * supportMessages.length)];
    setMessage(randomMessage);
  };

  return (
    <div>
      <h1>お母さん応援コール</h1>
      <button onClick={handleButtonClick}>育児に疲れたらココをタップ</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default MomSupport;
