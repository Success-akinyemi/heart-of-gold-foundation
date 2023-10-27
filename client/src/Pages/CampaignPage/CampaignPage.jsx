import { Link, useLocation } from 'react-router-dom'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { campaignPage } from '../../data/campaingns'
import './CampaignPage.css'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useFetch, useFetchCampaign } from '../../hooks/fetch.hooks'
import { deleteCampaign } from '../../helpers/api'
import toast, { Toaster } from 'react-hot-toast'
import { formatDistanceToNow } from 'date-fns';

function CampaignPage() {
    const loc = useLocation()
    const pathName = loc.pathname.split('/')[2]

    //const { _id, img, text, title, createdAt } = campaignPage

    const { apiData } = useFetch()
    const { apiCampaignData, isLoadingCampaign, campaignServerError, campaignDataStatus } = useFetchCampaign(pathName)
    const { _id, image, message, title, createdAt } = apiCampaignData?.data || {}

    const handleDelete = async () => {
        try {
            const comfirm = window.confirm('Are you sure you want to delete this campaing?')
            const userId = apiData?.data._id
            const id = pathName
            if(comfirm){
                const errorMsg = await deleteCampaign({ userId, id })
                
                if(errorMsg){
                    toast.error(errorMsg)
                }
            }
            
        } catch (error) {
            toast.error('Failed')
        }
    }

    return (
    <div className='campaignPage'>
        <Toaster position='top-center' ></Toaster>
        <Navbar />
        <div className="padding cp-container">
            {
                isLoadingCampaign ? (
                    <h2>LOADING...</h2>
                ) : (
                    <>
                        <h2>{title}</h2>
                        <div className="middle">
                            <span>Posted: {formatDistanceToNow(new Date(createdAt))} Ago</span>

                            <div className="buttons">
                                <span><Link className='link' to={`/editCampaign/${pathName}`}><EditIcon className='icon' /></Link></span>
                                <span onClick={handleDelete}><DeleteIcon  className='icon'/></span>
                            </div>

                        </div>

                        <div className="card">
                            <img src={image} alt={title} />

                            <div className="text">
                                {message}
                            </div>
                        </div>
                    </>
                )
            }

            <div className="foot">
                <Link to='/campaign' className='link f-link'>More Campaign</Link>
            </div>
        </div>

        <Footer />
    </div>
  )
}

export default CampaignPage