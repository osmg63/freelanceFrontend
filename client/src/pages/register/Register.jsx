import React, { useState, useEffect} from "react";
import "./Register.scss";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [selectedButton, setSelectedButton] = useState('button1');
  const [chosenType, setChosenType] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleButtonSelect = (buttonName) => {
    setSelectedButton(buttonName);
  };

  const handleContinue = () => {
    if (selectedButton === 'button1') {
      setChosenType('ROLE_ISALAN');
    } else if (selectedButton === 'button2') {
      setChosenType('ROLE_ISVEREN');
    }
  };

  let age = null;

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    identityNumber: "",
    username: "",
    password: "",
    email: "",
    age: parseInt(age),
    authorities: [chosenType],
  });

  useEffect(() => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      authorities: [chosenType],
    }));
  }, [chosenType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Gönderilen Veriler: ", formData);

    axios
      .post('http://localhost:8080/api/PUBLIC/addNewUser', formData)
      .then((response) => {
        console.log("Backend'den gelen cevap: ", response.data);
        if (response.data) {
          navigate("/login")
        }
        else{
          setErrorMessage('Girdiğiniz Bilgiler Hatalı');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000); 
        }
      })
      .catch((error) => {
        console.error("Hata:", error);
        if (error.response && (error.response.status === 403 || error.response.status === 400 )) {
          setErrorMessage('Girdiğiniz Bilgiler Hatalı');
          setTimeout(() => {
            setErrorMessage('');
          }, 3000); // 3 sn sonra uyarı  kaybolacak
        }
      });

    setFormData({
      firstName: "",
      lastName: "",
      identityNumber: "",
      username: "",
      password: "",
      email: "",
      age: "", // Yaş alanı sıfırlanacak
      authorities: [chosenType],
    });
  };

  return (
    <div>
      {chosenType === null ? (
        <div className="choose">
          <div className="top-section">
            <button
              className={`button ${selectedButton === "button1" ? "selected" : ""}`}
              onClick={() => handleButtonSelect("button1")}
            >
              Freelancer olmak istiyorum.
            </button>
            <button
              className={`button ${selectedButton === "button2" ? "selected" : ""}`}
              onClick={() => handleButtonSelect("button2")}
            >
              İşveren olmak istiyorum.
            </button>
          </div>
          <div className="bottom-section">
            <button className="continue-button" onClick={handleContinue}>
              Devam Et
            </button>
          </div>
        </div>
      ) : (
      <div className="container d-flex justify-content-center align-items-center vh-100">
        <div className="card p-4">
          <h2 className="text-center mb-4">KAYIT OL</h2>
          {errorMessage && (
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        )}
          <form onSubmit={handleSubmit} autoComplete="off">
            <div className="row mb-3">
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ad"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Soyad"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="TC Kimlik Numarası"
                name="identityNumber"
                value={formData.identityNumber}
                onChange={handleChange}
                required
                minLength={11}
                maxLength={11}
                pattern="[0-9]*"
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                className="form-control"
                placeholder="Kullanıcı Adı"
                name="username"
                value={formData.username}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="password"
                className="form-control"
                placeholder="Şifre"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required 
              />
            </div>
            <div className="mb-2">
              <input
                type="email"
                className="form-control"
                placeholder="E-posta"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-2">
            <input type="number"
              className="form-control"
              placeholder="Doğum Yılı"
              name="age" 
              value={formData.age} 
              onChange={handleChange} 
              required 
              min= {1960}
              max= {2020}
              onKeyDown={(e) => {
                if (![46, 8, 9, 27, 13, 110, 190].includes(e.keyCode)) {
                  e.preventDefault();
                }
              }}
            />
            </div>
            <div className="d-grid">
              <button type="submit" className="btn btn-success">
                Kayıt Ol
              </button>              
            </div>

          </form>
        </div>
      </div>
      )}
    </div>
  );
};

export default Register;