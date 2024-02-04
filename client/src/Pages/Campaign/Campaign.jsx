import { Link } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { campaigns } from '../../data/campaingns'
import './Campaign.css'
import { useFetch, useFetchCampaign } from '../../hooks/fetch.hooks'
import { formatDistanceToNow } from 'date-fns';

function Campaign() {
  const { apiCampaignData, isLoadingCampaign, campaignServerError } = useFetchCampaign();
  const campaign = apiCampaignData?.data;
  const { apiData } = useFetch()
  const userId = apiData?.data._id
  const adminUser = apiData?.data.isAdmin
  //console.log(campaign);
  return (
    <div className="campaign">
      <Navbar />
      <div className="padding campaign-container">
        {
          adminUser && (
            <div className="c-new">
              <Link to="/newCampaign" className="link c-new-link">
                New Campaingn
              </Link>
            </div>
          )
        }
        
        <h2>Our Campaigns</h2>

        <div className="content">
          {isLoadingCampaign ? (
            <h1>LOADING...</h1>
          ) : (
            <>
              {campaign?.map((item) => (
                <div className="card" key={item?._id}>
                  {item?.image ? (
                    <img src={item?.image} alt={item?.title} />
                  ) : (
                    <p>Loading</p>
                  )}
                  <div className="c-info">
                    <h4>{item?.title}</h4>
                    <span>
                      Posted: {formatDistanceToNow(new Date(item?.createdAt))}{" "}
                      Ago
                    </span>
                  </div>
                  <div className="c-btn">
                    <Link className="link c-link" to={`/campaign/${item._id}`}>
                      Learn More
                    </Link>
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Campaign