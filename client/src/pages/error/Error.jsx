import React from "react";
import { Link } from "react-router-dom";
import './Error.scss'

export default function Error() {
    return (
        <div className="main-div">
            <div className="main-error">
                Aradığın sayfaya ulaşılamıyor.
                <div className="bottom">
                    <div className="bottom-text">
                        <Link to="/" className="link">
                            <button className="buttons">Anasayfaya Dön</button>
                        </Link>
                    </div>
                    <div className="bottom-login">
                        <Link to="/login" className="link">
                            <button className="buttons">Giriş Yap</button>    
                        </Link>                
                    </div>    
                </div>
            </div>
        </div>
    )
}