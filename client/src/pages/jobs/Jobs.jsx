import React, { useEffect, useRef, useState } from "react";
import "./Jobs.scss";
import bookmark from './bookmark.png';
import { Link } from 'react-router-dom';
import Card from "../../components/card/Card";

const Jobs = () => {
    const DataFetchingComponent = () => {
    const [data, setData] = useState([]);
    const [sort, setSort] = useState("sales");
    const [open, setOpen] = useState(false);
    const minRef = useRef();
    const maxRef = useRef();
  

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/PUBLIC/jobs/active');
        const jsonData = await response.json();
        setData(jsonData);
      } catch (error) {
        console.log('Veri çekme hatası:', error);
      }
    };

    const reSort = (type) => {
      setSort(type);
      setOpen(false);
    };
  
    const apply = ()=>{
      console.log(minRef.current.value)
      console.log(maxRef.current.value)
    }

    const calculateDateDifference = (startDate, endDate) => {
      const diffInMilliseconds = Math.abs(endDate - startDate);
      const diffInDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));
    
      return diffInDays;
    };

    const currentDate = new Date();
    const formattedDate = currentDate.toLocaleDateString('tr-TR');

    return (
    <div className="jobs">
      <div className="job-container">
        <h1>Aktif İlanlar</h1>
        <p>
          Yeteneğine en uygun işe başvur ve kazanmaya başla!
        </p>
        <div className="job-cards">
          {data.map((card) => (
            <Card key={card.id} item={card} />
          ))}
        </div>
      </div>
    </div>
      );
    };

  return (
    <DataFetchingComponent />
  );
};

export default Jobs;