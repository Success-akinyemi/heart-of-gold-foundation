import { useLocation } from 'react-router-dom'
import { useFetch, useFetchCampaign } from '../../hooks/fetch.hooks'
import './EditCampaign.css'
import { editCampaign } from '../../helpers/api'
import { useEffect, useState } from 'react'
import Navbar from '../../Components/Navbar/Navbar'
import Footer from '../../Components/Footer/Footer'
import toast from 'react-hot-toast'

function EditCampaign() {
    const loc = useLocation()
    const id = loc.pathname.split('/')[2]

    const { apiData } = useFetch()
    const { isLoadingCampaign, apiCampaignData, campaignServerError} = useFetchCampaign(id)

    const [formData, setFormData] = useState({})
    const [isLoading, setIsLoading] = useState(false)

    const { title, message, image } = apiCampaignData?.data || {}

    useEffect(() => {
        if (apiCampaignData && apiCampaignData?.data && apiCampaignData?.data) {
          const campaignData = apiCampaignData?.data;
          setFormData({
            title: campaignData.title || '',
            message: campaignData.message || '',
            image: campaignData.image || ''
          });
        }
      }, [apiCampaignData]);
      
    
      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
          ...formData,
          [name]: value,
        });
      };

      const handleFormSubmit = async (e) => {
        e.preventDefault();
        // Create an object containing only the fields that have changed
        const updatedFields = {};
        for (const key in formData) {
          if (formData[key] !== (apiCampaignData?.data[key] || '')) {
            updatedFields[key] = formData[key];
          }
        }
        // Send updatedFields to your API for updating the house
        console.log('updatedFields>>',updatedFields);
        try {
          setIsLoading(true)
          const  userId = apiData?.data._id
          console.log('DATA>>', userId, id)
          const errorMsg = await editCampaign({ userId, id, ...updatedFields})
          
          if(errorMsg){
            toast.error(errorMsg)
          }
        } catch (error) {
          toast.error('Failed To Update House')
          console.log(error)
        } finally{
          setIsLoading(false)
        }
      };

  return (
    <div className='editCampaign'>
        <Navbar />
        <div className="padding container">
            <h2>Edit Campaign</h2>

            <div className="content">
              <form className='campaignForm' onSubmit={handleFormSubmit}>
                <div className="formInputs">
                  <label htmlFor="">Campaign Title</label>
                  <input required type="text" name='title' value={formData.title} onChange={handleInputChange} />
                </div>

                <div className="formInputs">
                  <label htmlFor="">Campaign Message:</label>
                  <textarea required type="text" name='message' value={formData.message} onChange={handleInputChange} ></textarea>
                </div>

                <div className="formInputs">
                    <img />
                </div> 

                <div className="fBtn">
                  <button className='fbutton'>{ isLoading ? 'Uploading...' : 'Upload'}</button>
                </div>               
              </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default EditCampaign