import React from 'react'
import { Link } from 'react-router-dom'
import Stockdata from './stockdata'
import Navbar from "./Navbar"
import Footer from './footer'


export default function Information() {
  const [symb,setSymb] = React.useState("IBM")
  const A_API = process.env.REACT_APP_ALPHA
  const [stockArray,setStock] =  React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symb}&apikey=${A_API}`;
        let data = await fetch(url);
        let parseddata = await data.json();
        if (parseddata) {
          const timeSeriesDaily = [];
            for (const date in parseddata["Time Series (Daily)"]) {
              const values = parseddata["Time Series (Daily)"][date];
              values["date"] = date;
              timeSeriesDaily.push(values);
            }
            setStock(timeSeriesDaily);
        } else {
          console.log("API response is null or undefined");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);


  
  const changeSymb = async(event)=>{
    setSymb(event.target.name);
    try {
      let url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${event.target.name}&apikey=${{A_API}}`;
      let data = await fetch(url);
      let parseddata = await data.json();
      if (parseddata) {
        const timeSeriesDaily = [];
          for (const date in parseddata["Time Series (Daily)"]) {
            const values = parseddata["Time Series (Daily)"][date];
            values["date"] = date;
            timeSeriesDaily.push(values);
          }
          setStock(timeSeriesDaily);
      } else {
        console.log("API response is null or undefined");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }
  
  return (
    <div>
      <Navbar/>
      <h2 className='text-center my-5'>Stock Price variations of {symb}</h2>
      <hr className='hr'></hr>
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <h4>Last Updated on : {new Date().toLocaleDateString()}</h4>
          </div>
          <div className="col text-center">
          <div className="dropdown">
              <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                {symb}
              </button>
              <div className="dropdown-menu primary" aria-labelledby="dropdownMenuButton">
                <Link className="dropdown-item" name = "IBM" onClick={changeSymb} to="/">IBM</Link>
                <Link className="dropdown-item" name = "TSCO.LON" onClick={changeSymb} to="/">TSCO.LON</Link>
                <Link className="dropdown-item" name = "SHOP.TRT" onClick={changeSymb} to="/">SHOP.TRT</Link>
                <Link className="dropdown-item" name = "GPV.TRV" onClick={changeSymb} to="/">GPV.TRV</Link>
                <Link className="dropdown-item" name = "DAI.DEX" onClick={changeSymb} to="/">DAI.DEX</Link>
              </div>
              
              {localStorage.getItem('token')&&<Link className="btn btn-primary mx-3"  to="/buystock">Buy Stock</Link>}
              {localStorage.getItem('token')&&<Link className="btn btn-primary"  to="/sellstock">Sell Stock</Link>}
            </div>
          </div>
        </div>
        </div> 
        <hr className='hr'></hr>
        <Stockdata Array={stockArray}/>
         {!localStorage.getItem('token')&&<Footer />}
    </div>
  )
}
