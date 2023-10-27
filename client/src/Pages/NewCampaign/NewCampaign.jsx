import { useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './NewCampaign.css'
import { newCampaign } from '../../helpers/api'
import toast from 'react-hot-toast'
import { useFetch } from '../../hooks/fetch.hooks'

function NewCampaign() {
  const [ title, setTitle ] = useState('')
  const [ message, setMessage ] = useState('') 
  const [ campaignImage, setCampaignImage ] = useState(null)
  const [isLoadingData, setIsLoadingData ] = useState(false)

  const { isLoading, apiData } = useFetch();

  const handleImageChange = (e) => {
    setCampaignImage(e.target.files[0])
  }

      const uploadSingleImage = async (image) => {
        //const apiKey = '6d207e02198a847aa98d0a2a901485a5'
        //const format = 'json'

        const formData = new FormData();
        //formData.append('key', apiKey);
        formData.append('upload_preset', 'wtqdxw06');
        formData.append('file', image);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/dsjwuwjm1/image/upload` ,{
                method: 'POST',
                body: formData,
            })
            if(response.ok){
                const imageData = await response.json();
                return imageData.url;
            } else {
                const errorResponse = await response.json();
                throw new Error(`Failed to upload image: ${errorResponse.error.message}`);
            }
        } catch (error) {
            console.log('Error Uploading image>>', error)
            throw error;
        }
    };

    const clearInputFields = () => {
        setTitle('');
        setMessage('');
        setCampaignImage(null);
    }

    const handleNewCampaign = async (e) => {
      e.preventDefault();

      try {
        setIsLoadingData(true)
        const imageUrl = await uploadSingleImage(campaignImage)
        const image = imageUrl
        const id = apiData?.data._id


        const errorMsg = await newCampaign({ id, title, message, image, })
        clearInputFields()
        
        if(errorMsg){
          toast.error(errorMsg)
        } else{
        }
      } catch (error) {
        console.log('ERROR',error)
        toast.error('Fail to Upload')
      } finally {
        setIsLoadingData(false)
      }

    }

  return (
    <div className='newCampaign'>
        <Navbar />
        <div className="padding container">
            <h2>New Campaign</h2>

            <div className="content">
              <form className='campaignForm' onSubmit={handleNewCampaign}>
                <div className="formInputs">
                  <label htmlFor="">Campaign Title</label>
                  <input required type="text" placeholder='Title' value={title} onChange={(e)=>setTitle(e.target.value)} />
                </div>

                <div className="formInputs">
                  <label htmlFor="">Campaign Message:</label>
                  <textarea required type="text" placeholder='Message' value={message} onChange={(e)=>setMessage(e.target.value)} ></textarea>
                </div>

                <div className="formInputs">
                  <label htmlFor="image-upload">Campaign Photo:</label>
                  <input required type="file" name='image-upload' id='image-upload' accept='image/jpeg image/png' onChange={handleImageChange}/>
                </div> 

                <div className="fBtn">
                  <button className='fbutton'>{ isLoadingData ? 'Uploading...' : 'Save'}</button>
                </div>               
              </form>
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default NewCampaign