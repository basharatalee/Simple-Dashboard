// src/pages/Home.jsx
import React from "react";
import { Routes, Route, Link } from "react-router-dom";


const Home = () => {
  return (
    <div style={{display:"flex",flexDirection:"row",background: "linear-gradient(to right, #233d57ff, #db7a1fff)" }}>
    <div style={{width:"200px",gap:"20px",borderRight:"1px solid black",minHeight:"100vh"}}>
      <h1 >Dashboard</h1>
        <div style={{display:"flex",minHeight:"100vh",background: "linear-gradient(to right, #545658ff, #db7a1fff)", flexDirection:"column",width:"200px",gap:"20px",borderRight:"1px solid black",borderTop:"1px solid black",}}>
      <Link to="/products" style={{ fontSize:"30px"}}>Products</Link>
      <div style={{width: "200px",height: "2px",backgroundColor: "black"}}></div>

      <Link to="/users"   style={{ fontSize:"30px"}}>Users </Link>
            <div style={{width: "200px",height: "2px",backgroundColor: "black"}}></div>

      <Link to="/github" style={{ fontSize:"30px"}}>Github Finder</Link>
      </div>
    </div>


    <div style={{width:"100%",gap:"20px",borderRight:"1px solid black",minHeight:"100vh"}}>
       <h1 style={{textAlign:"center"}}>Home Page</h1>
        <div style={{display:"flex",minHeight:"100vh",background: "linear-gradient(to right, #18191aff, #db7a1fff)", flexDirection:"column",width:"100%",gap:"20px",borderRight:"1px solid black",borderTop:"1px solid black",}}>
      <div style={{padding:20}}>
        <p style={{fontSize:"40px"}}>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cupiditate soluta laborum iure libero, voluptas repellendus, et sit omnis neque accusantium enim ipsam dolorem autem, architecto atque maxime non voluptatem error?</p>
      </div>
      </div>
    </div>
        

    </div>
  );
};

export default Home;
