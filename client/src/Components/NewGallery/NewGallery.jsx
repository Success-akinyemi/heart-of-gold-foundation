import { useState } from 'react';
import './NewGallery.css'
import toast from 'react-hot-toast';

function NewGallery() {
  const [ desc, setDesc ] = useState('')
  const [houseImage, setHouseImage] = useState(null)
  const [ isLoading, setIsLoading ] = useState(false)
  
  const clearInputFields = () => {
    setDesc('');
    setHouseImage(null);

}

    const handleHouseImageChange = (e) => {
      setHouseImage(e.target.files[0])
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

    const handleNewGallery = async () => {
      try {
        setIsLoading(true)
        const ImageUrl = await uploadSingleImage(image)

        const AddNewGallery = await ''

        if (AddNewGallery === 'success') {
          toast.success('House Uploaded');
          // Clear input fields upon success
          clearInputFields();
      }
      } catch (error) {
        console.log('Error::', error)
        toast.error('Failed to upload');
      } finally {
        setIsLoading(false)
      }
    } 

  return (
    <form className='newGallery'>
        <div className="inputGroup">
            <label htmlFor='image-upload'>Upload Image</label>
            <input type='file' id='image-upload' accept='image/jpeg image/png' onChange={handleHouseImageChange}/>
        </div>

        <div className="inputGroup">
            <label htmlFor="">Brief Desciption</label>
            <input type="text" placeholder='description' value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <button className='newBtn'>Upload</button>
    </form>
  )
}

export default NewGallery