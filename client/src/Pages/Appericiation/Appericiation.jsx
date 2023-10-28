import { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './Appericiation.css'
import { verifyDonation } from '../../helpers/api';

function Appericiation() {

  useEffect(() => {
    const fetchData = async () => {
      // Parse the URL parameters
      const queryParams = new URLSearchParams(window.location.search);
      const reference = queryParams.get('reference');
      
      if (reference) {
        try {
          console.log('REF??',reference)
    
          const res = await verifyDonation({reference})
          console.log("RED",res)
          
        } catch (errorMsg) {
          console.log(errorMsg)
        }
      }
    }

    fetchData();
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