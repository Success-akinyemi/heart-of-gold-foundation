import { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './Appericiation.css'

function Appericiation() {

  useEffect(() => {
    // Handle the redirection when the component mounts
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const redirectUrl = urlParams.get('redirectUrl');

    if (redirectUrl) {
      console.log('Received redirectUrl:', redirectUrl);
      // Use window.location to navigate to the redirect URL
      window.location.href = redirectUrl;
    }
  }, []);


  return (
    <div className='appericiation'>
        <Navbar />
        <div className="padding container">
            <h1>Appericiation</h1>
            <h2>We Appericiate Your Donation Towards Making Impact In our Society</h2>

            <div className="card">
                <span><h1>Success</h1></span>
                <p>We Treasure and value your Donation</p>
            </div>

            <div className="footNote">
                <h1>we say a big thank you</h1>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Appericiation