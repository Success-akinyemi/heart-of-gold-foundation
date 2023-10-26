import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './NewCampaign.css'

function NewCampaign() {
  return (
    <div className='newCampaign'>
        <Navbar />
        <div className="padding container">
            <h2>New Campaign</h2>

            <div className="content">
              <form className='campaignForm'>
                <div className="formInputs">
                  <label htmlFor="">Campaign Title</label>
                  <input type="text" placeholder='Title' />
                </div>

                <div className="formInputs">
                  <label htmlFor="">Campaign Message:</label>
                  <textarea type="text" placeholder='Message'></textarea>
                </div>

                <div className="formInputs">
                  <label htmlFor="image-upload">Campaign Photo:</label>
                  <input type="file" name='image-upload' id='image-upload' accept='image/jpeg image/png'/>
                </div> 

                <div className="fBtn">
                  <button className='fbutton'>Save</button>
                </div>               
              </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default NewCampaign