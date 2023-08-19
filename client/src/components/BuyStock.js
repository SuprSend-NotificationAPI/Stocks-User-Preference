import React from 'react'
import Navbar from './Navbar'
import {useNavigate} from 'react-router-dom';
import suprsend from "@suprsend/web-sdk";
export default function BuyStock(props) {
  const [formData,setFormData] = React.useState({
    StockName:"",
    quantity:"",
  })

  let navigate = useNavigate();
  const handleSubmit = async(event)=>{
    event.preventDefault();
    const property = {
      name : formData.StockName,
      quantity : formData.quantity
    }
    suprsend.track("ORDER-STOCKS", property);
    navigate("/");
  }

  function handleChange(event){
    const {name,value} = event.target;
    setFormData((prev)=>{
      return{
         ...prev,
         [name]:value
      }
    })
 }
  return (
    <div>
        <Navbar />
        <div className=' border border-dark text-center rounded' style={{maxWidth:"500px",margin : "100px auto", borderColor: "red"}}>
      <h4 className=" text-primary fw-bold text-center bg-dark text-light p-3 rounded">{props.ntype} STOCKS</h4>
      <form onSubmit={handleSubmit} className='mx-3'>
        <div className="mb-3 mt-4">
          <div>Enter the Name of the Stock</div>
          <input 
          type="StockName" 
          className="form-control"
          onChange={handleChange}
          value={formData.StockName}
          name="StockName" />
          </div>

        <div className="mb-4">
          <div>Quantity of Stock</div>
          <input 
           type="quantity"
           className="form-control"
            id="exampleInputquantity1"
            onChange={handleChange}
            value={formData.quantity}
            name="quantity" 
            />
        </div>

        <button type="submit" className="btn mb-5 btn-dark">{props.ntype === "BUY" ? "Purchase Stock" : "Sell Stock"}</button>

      </form>
    </div>
    </div>
  )
}
