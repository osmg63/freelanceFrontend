import React, { useEffect, useState } from 'react'
import "./Navbar.scss"
import { Link, useLocation } from 'react-router-dom';


const Navbar = () => {
  const [active,setActive] = useState(false);
  const [open,setOpen] = useState(false);

  const {pathname} = useLocation()

  const isActive = () =>{
    window.scrollY > 0 ? setActive(true) : setActive(false)
  }

  let loggedIn = false;
  const storedData = localStorage.getItem('user');
  let myToken = null;
  let userId = null;
  let type = null;
  let wallet = null;

  const handleRefresh = () => {
    window.location.reload();
  };

  if (storedData){
  const parsedData = JSON.parse(storedData);
  type = localStorage.getItem('usertype');
  wallet = localStorage.getItem('usermoney');
  console.log(wallet)
  myToken = parsedData.data.accessToken;
  userId = parsedData.data.userId;
  loggedIn = true;
  }

  const handleLogout = () => {
    loggedIn = false;
    userId = null;
    localStorage.clear();
    handleRefresh();
  };

  useEffect(() =>{
    window.addEventListener("scroll", isActive);

    return () =>{
      window.removeEventListener("scroll", isActive);
    };
  }, []);

  const currentUser= {
    id:1,
    userName: userId ? userId : "a",
    isSeller: (type === "ROLE_ISVEREN"),
  };

  return (
    <div className={active || pathname !== "/" ? "navbar active" : "navbar"}>
      <div className="container">
        <div className="logo">
          <Link to="/" className='link'>
            <span className='text'>YetenekAğı</span>
          </Link>
        </div>
        <div className="links">
          <Link className='link' to="/micro">Hızlı İşler</Link>
          <Link className='link' to="/jobs">Aktif İlanlar</Link>
          {!loggedIn && (
            <>
              <Link className="link" to="/login">Giriş Yap</Link>
              <Link className="link" to="/register">Kayıt Ol</Link>
            </>
          )}
          {loggedIn && (
            <div className="user" onClick={()=>setOpen(!open)}>
              <img src="https://i.pinimg.com/736x/fa/60/51/fa6051d72b821cb48a8cc71d3481dfef.jpg" alt="" />
              <span>{currentUser?.userName}</span>
              {open && <div className="options">
                <span>Bakiye:{wallet}</span>
                <Link className='link' to={`/profile/${currentUser?.userName}`}>Profilim</Link>
                {currentUser?.isSeller ? (
                  <>
                    <Link className='link' to="/myjobs">Oluşturulan İşler</Link>
                    <Link className='link' to="/add">Yeni İş Oluştur</Link>
                  </>
                ):(
                  <>
                    <Link className='link' to="/orders">Aldığım İşler</Link>
                  </> 
                )}
                <Link className='link' to="/" onClick={handleLogout}>Çıkış Yap</Link>
              </div>}
            </div>
          )}
        </div>
      </div>
      {((active || pathname !== "/") && (pathname !== "/messages" && pathname !== "/orders" && pathname !== "/myjobs")) && (
        <>
          <hr />
          <div className="menu">
          <div className="coinStream">
    <marquee direction="right" >
      <ul>
        <li><a></a>Bitcoin:</li>
        <li><a id="BTC">BTC</a> RCT - Ethereum:</li>
        <li><a id="ETH">ETH</a> RCT - Litecoin:</li>
        <li><a id="LTC">LTC</a> RCT - Ripple:</li>
        <li><a id="XRP">XRP</a> RCT - Neo:</li>
        <li><a id="NEO">NEO</a> RCT</li>
      </ul>
    </marquee>
  </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar