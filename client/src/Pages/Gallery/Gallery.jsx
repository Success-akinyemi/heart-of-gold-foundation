import { useEffect, useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { gallery } from '../../data/gallery'
import './Gallery.css'
import NewGallery from '../../Components/NewGallery/NewGallery'

function Gallery(){
    const [selectedCard, setSelectedCard] = useState(null)

    const renderPopupComponent = () => {
        switch(selectedCard) {
          case 'newGallery' :
            return (
              <div>
                    <NewGallery />
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
          <div className="add">
            <span onClick={() => setSelectedCard('newGallery')}>Add To Gallery</span>
          </div>

          <h2>Photo Gallery</h2>

          <div className="cards">
            {gallery.map((item, idx) => (
              <div key={idx} className="card">
                <img src={item.img} alt={item.title} />
                <p>{item.title}</p>
              </div>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    );
}

export default Gallery