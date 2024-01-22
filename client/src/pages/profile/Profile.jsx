import React, { useEffect, useRef, useState } from "react";
import "./Profile.scss";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import Error from "../error/Error";

const Profile = () => {
  const { userN } = useParams();
  console.log("username", userN)
  const storedData = localStorage.getItem("user");
  let loggedIn = false;
  let myToken = null;

  if (storedData) {
    const parsedData = JSON.parse(storedData);
    loggedIn = true;
    myToken = parsedData.data.accessToken;
  }

  const [data, setData] = useState([]);

  useEffect(() => {
    fetchData();
  }, [userN]);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:3001/users/${userN}`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Veri çekme hatası:', error);
    }
  };
  const [data2, setData2] = useState([]);

  useEffect(() => {
    fetchData2();
  }, []);

  const fetchData2 = async () => {
    try {
      const response2 = await fetch(`http://localhost:8080/api/PUBLIC/comment/${userN}`);
      const jsonData2 = await response2.json();
      setData2(jsonData2);
      console.log("yanıt:", response2)
    } catch (error) {
      console.log('Veri çekme hatası:', error);
    }
  };

  return (
    <div>
      {
        <div className="container mt-3">
          <div className="row">
            <div className="col-md-4">
              <div className="card mb-2 ">
                <img
                  src="https://i.pinimg.com/736x/fa/60/51/fa6051d72b821cb48a8cc71d3481dfef.jpg"
                  className="card-img-top resized-image"
                  alt="hata"
                />

                <ul
                  className="list-group list-group-flush list-group-item-light">
                  <li className="list-group-item">
                    {data.first_name} {data.last_name}
                  </li>
                  <li className="list-group-item">Yaş:{2024 - data.age}</li>
                  <li className="list-group-item">Okul:{data.school}</li>
                  <li className="list-group-item">
                    E-mail:{data.email}
                  </li>
                  <li className="list-group-item">
                    <FaMapMarkerAlt /> {data.location}
                  </li>
                  <li className="list-group-item  ">
                    <h5>Yetenekler</h5>
                  </li>
                  <li className="list-group-item">
                    <p>{data.skills}</p>
                  </li>
                  <li className="list-group-item ">
                    <h5>Hakkımda</h5>
                  </li>
                  <li className="list-group-item">
                    {" "}
                    <p>{data.biyografi}</p>
                  </li>
                </ul>
                
              </div>
            </div>
            <div className="col-md-8">
              <h2>Kullanıcı Yorumları</h2>
              {data2.map((comment) => (
                <div key ={comment.id} className="user-comments">
                  <img src="https://i.pinimg.com/736x/fa/60/51/fa6051d72b821cb48a8cc71d3481dfef.jpg" alt="Avatar" />
                  <p>{comment.content}</p>
                  <span className="userName">{comment.commenter.firstName} {comment.commenter.lastName}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default Profile;