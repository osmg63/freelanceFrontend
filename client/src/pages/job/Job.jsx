import React, { useEffect, useState } from "react"
import "./Job.scss"
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { Link, useParams ,BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import axios from "axios";

import 'swiper/css';
import 'swiper/css/navigation';

const DataFetchingComponent = () => {
  const { jobId } = useParams();
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, [jobId]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/PUBLIC/jobs/id/${jobId}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Veri çekme hatası:', error);
    }
  };

  let loggedIn = false;
  const storedData = localStorage.getItem('user');
  let myToken = null;
  let userN = null;
  let type = null;
  let isPending = false;

  if (storedData){
  const parsedData = JSON.parse(storedData);
  type = localStorage.getItem('usertype');
  myToken = parsedData.data.accessToken;
  userN = parsedData.data.userId;
  loggedIn = true;
  }

  const [error, setError] = useState(null);

  const [formData, setFormData] = useState({
      jobId : parseInt(jobId),
      userName : userN,
      amount: parseInt(""),
      offerStatus : "pending"
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData
    }));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const parsedValue = name === "amount" ? parseInt(value) : value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: parsedValue,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gönderilen Veriler: ", formData);
  
    // Kontrol isteği yapma
    axios
    .get(`http://localhost:8080/api/PUBLIC/offers/${jobId}`)
    .then((response) => {
      response.data.forEach((offer) => {
        if (offer.offerStatus === "pending" && offer.userName === userN) {
          throw new Error("Bu projeye zaten teklif yapmışsın.");
        }
      });
      return axios.post('http://localhost:8080/api/ISALAN/offers/create', formData, {
        headers: {
          Authorization: myToken,
        },
      });
    })
    .then((response) => {
      console.log("Backend'den gelen cevap: ", response.data);
      setError("Projeye başarıyla teklif yaptın.");
    })
    .catch((error) => {
      if (error.message === "Bu projeye zaten teklif yapmışsın.") {
        setError(error.message);
      } else {
        console.error("Hata:", error);
      }
    });
  
    setFormData((prevFormData) => ({
      ...prevFormData,
      amount: parseInt(prevFormData.amount),
    }));
  };
  
  return (
    <div className="job">
      <div className="jobcont">
        <div className="left">
          <h1>{data.title}</h1>
          <div className="user">
            <img
              className="pp"
              src="https://i.pinimg.com/736x/fa/60/51/fa6051d72b821cb48a8cc71d3481dfef.jpg"
              alt=""
            />
            <span>{data.user?.firstName} {data.user?.lastName}</span>
          </div>
          <Swiper
            navigation={true} 
            spaceBetween={0}
            modules={[Navigation]}
            className="slider"
          >
            <SwiperSlide>
              <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="Slide 1" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="Slide 2" />
            </SwiperSlide>
            <SwiperSlide>
              <img src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg" alt="Slide 3" />
            </SwiperSlide>
          </Swiper>
          <h2>İş Detayları</h2>
          <p>
            {data.description}
          </p>
          <div className="seller">
            <h2>Freelancer Hakkında</h2>
            <div className="user">
              <img
                src="https://i.pinimg.com/736x/fa/60/51/fa6051d72b821cb48a8cc71d3481dfef.jpg"
                alt=""
              />
              <div className="info">
                <span>{data.user?.firstName} {data.user?.lastName}</span>
                <Link to={`/profile/${data.userName}`}>
                <button>Bana Ulaş</button>
                </Link>

              </div>
            </div>
            <div className="box">
              <div className="items">
                <div className="item">
                  <span className="ttl">Konum:</span>
                  <span className="desc">{data.user?.location}</span>
                </div>
                <div className="item">
                  <span className="ttl">Dil</span>
                  <span className="desc">Türkçe</span>
                </div>
              </div>
              <hr />
              <p>
                {data.user?.biyografi}
              </p>
            </div>
          </div>
        </div>
        <div className="right">
          <div className="price">
            <h3>{data.title}</h3>
            <h2>{data.price} TL</h2>
          </div>
          <p>
            {data.description}
          </p>
          <div className="details">
            <div className="item">
              <img src="/img/clock.png" alt="" />
              <span>2 Günde Teslim</span>
            </div>
            <div className="item">
              <img src="/img/recycle.png" alt="" />
              <span>3 Revizyon</span>
            </div>
          </div>
          {(loggedIn === false || type === "ROLE_ISVEREN") ? (
            <button className="red">Teklif Yapamazsın</button>
            ) 
            : 
            (
            <Popup   
                  trigger= {<button> Devam Et</button>}
                  modal
                  nested>
                  {
                      close => (
                          <div className='modal-div'>
                              <div className='content-div'>
                                  {data.title} isimli işe teklif gönderiyorsun.
                              </div>
                              <form className="modal-form" onSubmit={handleSubmit}>
                                <label className="modal-label" htmlFor="amount">İstediğin Ücret:</label>
                                <input className="modal-input" type="number" id="amount" min = "1" max = {data.price} onChange={handleChange} required name="amount" />
                                {error && <p>{error}</p>}
                                <div>
                                  <button className = "bttn" onClick=
                                      {() => close()}>
                                          Vazgeç
                                  </button>
                                  <button className = "bttn" type="submit">
                                          Teklifi Gönder
                                  </button>
                                </div>
                              </form>
                          </div>
                      )
                  }
            </Popup>
            )}
        </div>
      </div>
    </div>
  );
}

const Job = () => {
  return (
      <Routes>
        <Route path="/" element={<DataFetchingComponent/>} />
      </Routes>
  );
}

export default Job