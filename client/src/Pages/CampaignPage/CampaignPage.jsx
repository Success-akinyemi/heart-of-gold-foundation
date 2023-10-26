import { Link, useLocation } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { campaignPage } from '../../data/campaingns'
import './CampaignPage.css'

function CampaignPage() {
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[2]
    const { _id, img, text, title, createdAt } = campaignPage
  return (
    <div className='campaignPage'>
        <Navbar />
        <div className="padding cp-container">
            <h2>{title}</h2>
            <span>Posted On: {}</span>

            <div className="card">
                <img src={img} alt={title} />

                <div className="text">
                    {text}
                </div>
            </div>
            <div className="foot">
                <Link to='/campaign' className='link f-link'>More Campaign</Link>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default CampaignPage