import { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { gallery } from '../../data/gallery'
import './Gallery.css'
import NewGallery from '../../Components/NewGallery/NewGallery'
import { useFetch, useFetchGallery } from '../../hooks/fetch.hooks'
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteImg } from '../../helpers/api'

function Gallery(){
    const [selectedCard, setSelectedCard] = useState(null)
    const { apiData } = useFetch()
    const { apiGalleryData, isLoadingGallery } = useFetchGallery()
    const userId = apiData?.data._id
    const adminUser = apiData?.data.isAdmin

    const galleryInfo = apiGalleryData?.data
    //console.log('GALLERY', galleryInfo)

    const renderPopupComponent = () => {
        switch(selectedCard) {
          case 'newGallery' :
            return (
              <div>
                    <NewGallery userId={userId} />
              </div>
            );
        }
      }
    
      useEffect(() => {
        const handleClickOutside = (event) => {
          if (event.target.classList.contains('popup-overlay')) {
            setSelectedCard(null);
          }
        };
    
        document.addEventListener('click', handleClickOutside);
    
        return () => {
          document.removeEventListener('click', handleClickOutside);
        };
      }, []);
    
      const closePopup = () => {
        setSelectedCard(null);
      };

      const handleDelete = async (id) => {
        const comfirm = window.confirm('Are you sure you want to delete this Image?')
        if(comfirm){
          try {
            const res = await deleteImg({id, userId})
          } catch (error) {
            
          }
        }
      }
    return (
      <div className="gallery">
        {selectedCard && (
          <>
            <div className="popup-overlay" onClick={closePopup}></div>
            <div className={`popup active`}>
              <span className="popup-close" onClick={closePopup}>
                Close
              </span>
              <div className="popup-content">{renderPopupComponent()}</div>
            </div>
          </>
        )}
        <Navbar />
        <div className="padding container">
          {
            adminUser && (
              <div className="add">
                <span onClick={() => setSelectedCard('newGallery')}>Add To Gallery</span>
              </div>
            )
          }

          <h2>Photo Gallery</h2>

          {
            isLoadingGallery ? (
              <h2>Loading</h2>
            ) : (
              <div className="cards">
                {galleryInfo?.map((item, idx) => (
                  <div key={idx} className="card">
                    <img src={item.image} alt={item.desc} />
                        <p>{item.desc}</p>
                      <div className="delete" onClick={handleDelete(item._id)}>
                        <DeleteIcon className='delIcon' />
                    </div>
                  </div>
                ))}
              </div>
            )
          }

        </div>
        <Footer />
      </div>
    );
}

export default Gallery