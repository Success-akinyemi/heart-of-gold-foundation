import { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './Appericiation.css'
import { verifyDonation } from '../../helpers/api';

function Appericiation() {
  const [ isLoadingData, setIsLoadingData ] = useState(false)
  const [ data, setData] = useState({})
  
  useEffect(() => {
    const fetchData = async () => {
      // Parse the URL parameters
      const queryParams = new URLSearchParams(window.location.search);
      const reference = queryParams.get('reference');
      
      if (reference) {
        try {
          console.log('REF??',reference)
          setIsLoadingData(true)
          const res = await verifyDonation({reference})
          console.log("RED",res)
          setData(res)
          
        } catch (errorMsg) {
          console.log(errorMsg)
        } finally{
          setIsLoadingData(false)
        }
      }
    }

    fetchData();
  }, []);

console.log('DATA',data)
  return (
    <div className='appericiation'>
        <Navbar />
        <div className="padding container">
            {
              isLoadingData ? (
                <h1>LOADING...</h1>
              ) : (
                <>                
                <h1>Appericiation</h1>
                <h2>We Appericiate Your Donation Towards Making Impact In our Society</h2>
                
                <div className="footNote">
                    <h1>we say a big thank you</h1>
                </div>

                <div className="card">
                    <span><h1>{data?.data.name}</h1></span>
                    <p>We Treasure and value your Donation</p>
                    <p>Purpose of Donation: {data?.data.purpose}</p>
                </div>
                </>
              )
            }
        </div>
        <Footer />
    </div>
  )
}

export default Appericiation