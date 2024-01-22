import React, { useEffect, useState } from "react";
import './Micro.scss'
import Microcard from "./Microcards";
import Popup from "reactjs-popup";
import 'reactjs-popup/dist/index.css';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);  

  const fetchData = async () => {
    try {
      const response = await fetch('http://localhost:7000/jobs');
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Veri çekme hatası:', error);
    }
  };

  return (
  <div className="jobs">
    <div className="job-container">
      <div className="job-header">
        <div className="title-container">
          <h1 className="job-title">Hızlı İşler</h1>
        </div>
      </div>
      <p>Hızlı ve kolayca para kazanmak isteyenler için!</p>
      <div className="job-cards">
        {data.map((card) => (
          <Microcard key={card.id} item={card} />
        ))}
      </div>
    </div>
  </div>
  );
};

export default App;