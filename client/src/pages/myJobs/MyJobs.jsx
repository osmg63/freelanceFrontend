import React, { useEffect, useState } from "react"
import "./MyJobs.scss"
import {Link} from "react-router-dom"
import deleteImg from "./delete.svg"
import Error from "../error/Error"
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const DataFetchingComponent = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = async () => {
      try {
        const response2 = await fetch(`http://localhost:8080/api/PUBLIC/jobs/user/${userN}`);
        const jsonData2 = await response2.json();
        setData(jsonData2);
    
      } catch (error) {
        console.log('Veri çekme hatası:', error);
      }
    };
   
    const handlePayment = async (offerId) => {
      try {
          const response = await fetch(`http://localhost:8080/api/ISVEREN/makePayment/${offerId}`, {
          method: 'POST',
          headers: {
              Authorization: myToken,
          },
        });
        
        if (response.ok) {
          console.log("başarılı")
        } else {
          console.log('POST isteği başarısız:', response.status);
          // Hata işlemlerini burada yapabilirsiniz
        }
      } catch (error) {
        console.log('POST isteği hatası:', error);
        // Hata işlemlerini burada yapabilirsiniz
      }
  };
  
    let loggedIn = false;
    const storedData = localStorage.getItem('user');
    let myToken = null;
    let userN = null;
    let type = null;
  
    if (storedData){
    const parsedData = JSON.parse(storedData);
    type = localStorage.getItem('usertype');
    myToken = parsedData.data.accessToken;
    userN = parsedData.data.userId;
    loggedIn = true;
    }

    return (
      <div>
        {loggedIn && type === 'ROLE_ISVEREN' ? (
          <div className="myjobs">
            <div className="myjobs-container">
                <div className="myjobs-title">
                    <h1>İşlerim</h1>
                </div>
                <table>
                    <tr>
                        <th>Fotoğraf</th>
                        <th>Başlık</th>
                        <th>Fiyat</th>
                        <th>İş Durumu</th>
                        <th>Teklifler</th>
                        <th>Onayla</th>                        
                    </tr>
                {data.map((item) => (
                <tr key={item[0]}>
                    <td>
                        <img className="img" src={deleteImg} alt="" />
                    </td>
                    <td>{item[1]}</td>
                    <td>{item.price}</td>
                    <td>Aktif</td>
                    <td>
                      <Link className="link" to={`/offers/${item[0]}`}>
                        <button>
                          Teklifleri Görüntüle
                        </button>
                      </Link>
                    </td>
                    <td>
                        <button onClick={() => handlePayment(item[0])}>Onayla</button>
                    </td>
                </tr>
                ))}
                </table>
            </div>
        </div>
      ) : (
        <div className="notlogged">
          <Error/>
        </div>
      )}
      </div>
    )
}

const MyJobs = () => {
    return (
      <DataFetchingComponent/>
    );
  }

export default MyJobs