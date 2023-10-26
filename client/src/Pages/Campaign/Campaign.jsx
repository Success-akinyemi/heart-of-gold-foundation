import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { campaigns } from '../../data/campaingns'
import './Campaign.css'

function Campaign() {
  return (
    <div className='campaign'>
        <Navbar />
        <div className="padding campaign-container">
            <div className="c-new">
              <Link to='/newCampaign' className='link c-new-link'>New Campaingn</Link>
            </div>
            <h2>Our Campaigns</h2>

            <div className="content">
              {
                campaigns.map((item) => (
                  <div className="card" key={item._id}>
                    <img src={item.img} alt={item.title} />
                    <div className="c-info">
                      <h4>{item.title}</h4>
                      <span>Posted on: {}</span>
                    </div>
                    <div className="c-btn">
                      <Link className='link c-link' to={`/campaign/${item._id}`}>Learn More</Link>
                    </div>
                  </div>
                ))
              }
            </div>
        </div>
        <Footer />
    </div>
  )
}

export default Campaign