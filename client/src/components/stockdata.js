import React from 'react'

export default function Stockdata(props) {
  return (
    <div className='container'>
      <table className="table table-striped">
  <thead>
    <tr>
      <th scope="col">Date</th>
      <th scope="col">Open</th>
      <th scope="col">Close</th>
      <th scope="col">Low</th>
      <th scope="col">High</th>
      <th scope="col">Volume</th>

    </tr>
  </thead>
  <tbody>
      {props.Array.map((element)=>{
        return(
          <tr key={element.date}>
          <th scope="row">{element.date}</th>
              <td>{element["1. open"]}</td>
              <td>{element["4. close"]}</td>
              <td>{element["3. low"]}</td>
              <td>{element["2. high"]}</td>
              <td>{element["5. volume"]}</td>
            </tr>
        )
      })}
  </tbody>
</table>
    </div>
  )
}
