import React from 'react'
import { Link } from 'react-router-dom'
import suprsend from "@suprsend/web-sdk";
import {useNavigate} from 'react-router-dom';
import SuprSendInbox from "@suprsend/react-inbox"

export default function Navbar(props) {
  const port = process.env.REACT_APP_PORT;
  const [data,setdetails] = React.useState({});

  function Logoutuser(){
    localStorage.removeItem("token");
    let navigate = useNavigate();
    suprsend.reset();
    setdetails({});
    navigate("/");
  }

  const Getdetail = async(req,res)=>{
     const response = await fetch(`${port}/getuser`,{
      method : "POST",
      headers:{
        "auth-token" : localStorage.getItem('token')
      },
     })
     const json = await response.json();
     setdetails(json);
  }
  
  React.useEffect(()=>{
     if(localStorage.getItem('token')){
      Getdetail();
     }
     else console.log("user not logged in");
  },[])


  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light" style={{backgroundColor : "lightgrey"}}>
        <div className="container-fluid">
        <Link className="navbar-brand" to="/" style={{fontWeight: "bold"}}>Stock Information</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" style={{display : 'flex',right : 50,position : 'absolute'}}>
                {!localStorage.getItem('token')&& <li className= "nav-item"> <Link className="nav-link" style={{fontWeight: "bold",backgroundColor : "lightgrey"}} to="/register">Register</Link></li>}
                {!localStorage.getItem('token')&& <li className= "nav-item"> <Link className="nav-link" style={{fontWeight: "bold",backgroundColor : "lightgrey"}} to="/login">Login</Link></li>}
                {localStorage.getItem('token')&& <li className= "nav-item"> <Link className="nav-link" style={{fontWeight: "bold",backgroundColor : "lightgrey"}} to="/" 
                 onClick={Logoutuser}>Logout</Link></li>}
                {localStorage.getItem('token')&& <li className= "nav-item"> <Link className="nav-link" style={{fontWeight: "bold",backgroundColor : "lightgrey"}} to="/setting">Settings</Link></li>}
            </ul>
            </div>
        </div>
        {localStorage.getItem('token')&&<SuprSendInbox
          workspaceKey= {process.env.REACT_APP_WKEY}
          subscriberId= {data.key}
          distinctId= {data.email}
        />}
        </nav>
      </div>
  )
}
