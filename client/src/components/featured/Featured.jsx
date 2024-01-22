import React from "react";
import "./Featured.scss";
import photo from "./bitcoin.jpeg"

const Featured = () => {
  return (
  <div className="greenBox">
    <div className="title">
      <div className="header">
      <h1>Freelancer Çalışarak Kripto Para Kazanmak İster Misiniz?</h1>
      
      </div>
      
         <h5>Esnek çalışma saatleri ve yer bağımsızlığı 
        sayesinde özgür bir çalışma ortamı,
        kendi kazancınızı belirleyerek finansal özgürlük 
         elde etme imkanı ve farklı projelerde çalışarak kişisel ve mesleki gelişimi  destekleyen bir 
         deneyim sağlama şansı. </h5>
         
         
    </div>
   
    <img src={photo} className="float-right img-fluid mt-3 " alt=""></img>
 </div>
  )
};

export default Featured;
