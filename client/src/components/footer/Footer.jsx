import React from 'react'
import "./Footer.scss"
import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
  return (
    <div className='footer'>
      <div className='container'>
        <div className="top-text">
          <a href="https://github.com/sh4riwsh4/freelancer">
            <img className='git-logo' src="https://pngimg.com/d/github_PNG47.png" alt="GitHub Linki" />
          </a> 
        </div>
        <div className="bot-text">
          <div className="links">
            <Link className='link' to="/">•Anasayfa</Link>
            <Link className='link' to="/jobs">•Aktif İlanlar</Link>
          </div>
          <div className='text'>
            <p>Ramazan Semih UĞUR</p>
            <p>Furkan SALDUZ</p>
            <p>Osman GÜMÜŞ</p>
            <p>Hamza MUTLU</p>
            <p>Mahsum YILDIZ</p>
          </div>
          <div className='copyright'>
            <p className='text'>enigmA © 2023</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer
