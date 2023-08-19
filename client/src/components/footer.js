import React from 'react'
import "../index.css"
export default function footer() {
  return (
    <div>
        <nav className='navbar fixed-bottom navbar-expand-lg'style={{backgroundColor : "lightgrey"}}>
            <div className="container3 text-center">
            <a className="github" href="https://github.com/SuprSend-NotificationAPI/Stocks-User-Preference"  target="_blank"></a>
            <a className="suprsend" href="https://www.suprsend.com"  target="_blank"></a>
            </div>
            <h4 style={{display : 'flex',right : 50,position : 'absolute'}}>Please Register Or Login to use this Site !</h4>
        </nav>
    </div>
  )
}
