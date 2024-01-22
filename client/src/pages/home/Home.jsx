import React, { useEffect, useState } from "react"
import "./Home.scss";
import {Link} from "react-router-dom"
import Featured from "../../components/featured/Featured";
import photo1 from "../../components/featured/img1.jpeg";
import photo2 from "../../components/featured/img2.jpeg";
import photo3 from "../../components/featured/img3.jpeg";
import photo4 from "../../components/featured/img4.jpeg";

const DataFetchingComponent = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`http://localhost:8080/api/PUBLIC/jobs/active`);
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.log('Veri çekme hatası:', error);
    }
  };

  const storedData = localStorage.getItem('user');
  let loggedIn = false;
  let userId = null;

  if (storedData){
  const parsedData = JSON.parse(storedData);
  userId = parsedData.data.userId;
  loggedIn = true;
  }
//link yolu
  return (
    <div>
  {loggedIn ? (
  <div className="loggedInDiv">
  {/* LoggedIn durumunda gösterilecek içerik */}
  <div className="container">
    <h1 style={{ margin: "10px" }}>İlanları Keşfet</h1>
    <hr />
    <div className="row justify-content-left">
      {data.map((item) => (
        <div key={item.id} className="col-6 col-md-6 col-lg-3 mb-4">
          <div className="product-card" style={{ height: "480px" }}>
            <img
              className="img-top"
              src={photo1}
              alt="Denim Jeans"
              style={{ width: "100%" }}
            />
            <div className="product-name">
              <img
                className="rounded-circle profil-photo"
                src={photo2}
                alt=""
              />
              <span>{item.user.firstName} {item.user.lastName}</span>
            </div>
            <Link className="link" to={`/job/${item.id}`}>
              <h1 className="product-title">{item.title}</h1>
            </Link>
            <div className="product-body">
              <p>{item.description}</p>
              <p className="price">{item.price} TL</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>
)  :
      (
        <div className="Home">
          <Featured />
          <div className="container-fluid">
            <div className="row my-2">
              <div className="col-sm-3">
                <div className="card">
                  <img src={photo1} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <p className="card-text text-center">
                      Kriptoparalarla <b>hızlı</b> ve <b>güvenilir</b> ödeme
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <img src={photo2} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <p className="card-text text-center">
                      İhtiyacın olan her konuda <b>yetenekli</b> ve <b>hızlı</b>{" "}
                      freelancerlar
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <img src={photo3} className="card-img-top" alt="..." />

                  <div className="card-body">
                    <p className="card-text text-center">
                      <b>10 saniyede</b> yapılabilen işler ve <b>anında</b>{" "}
                      kazanç
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-sm-3">
                <div className="card">
                  <img src={photo4} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <p className="card-text text-center">
                      Laptopunuzla <b>istediğiniz yerde</b> ve <b>zamanda</b>{" "}
                      çalışma rahatlığı
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const Home = () => {
  return (
    <DataFetchingComponent/>
  );
}

export default Home;