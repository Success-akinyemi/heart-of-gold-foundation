import { useState } from 'react';
import './NewGallery.css'
import toast from 'react-hot-toast';
import { newGallery } from '../../helpers/api';

function NewGallery({userId}) {
  const [ desc, setDesc ] = useState('')
  const [ galleryImage, setGalleryImage] = useState(null)
  const [ isLoadingData, setisLoadingData ] = useState(false)
  
  const clearInputFields = () => {
    setDesc('');
    setGalleryImage(null);

}

    const handleGalleryImageChange = (e) => {
      setGalleryImage(e.target.files[0])
    }

      const uploadSingleImage = async (image) => {
        //const apiKey = '6d207e02198a847aa98d0a2a901485a5'
        //const format = 'json'

        const formData = new FormData();
        //formData.append('key', apiKey);
        formData.append('upload_preset', `${import.meta.env.VITE_CLOUDINARY_PRESET}`);
        formData.append('file', image);

        try {
            const response = await fetch(`https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_NAME}/image/upload` ,{
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

    const handleNewGallery = async (e) => {
      e.preventDefault()
      try {
        setisLoadingData(true)
        const ImageUrl = await uploadSingleImage(galleryImage)

        const response = await newGallery({ userId, ImageUrl, desc })

        if (response) {
          toast.success(response);
          // Clear input fields upon success
          clearInputFields();
      }
      } catch (error) {
        console.log('Error::', error)
        toast.error('Failed to upload');
      } finally {
        setisLoadingData(false)
      }
    } 

  return (
    <form className='newGallery' onSubmit={handleNewGallery}>
        <div className="inputGroup">
            <label htmlFor='image-upload'>Upload Image</label>
            <input type='file' id='image-upload' accept='image/jpeg image/png' onChange={handleGalleryImageChange}/>
        </div>

        <div className="inputGroup">
            <label htmlFor="">Brief Desciption</label>
            <input type="text" placeholder='description' value={desc} onChange={(e) => setDesc(e.target.value)} />
        </div>

        <button className='newBtn'>{isLoadingData ? 'Uploading' : 'Upload'}</button>
    </form>
  )
}

export default NewGallery