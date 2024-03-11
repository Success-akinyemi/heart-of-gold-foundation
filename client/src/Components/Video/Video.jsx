import './Video.css'
import VidOne from '../../assets/video/good.mp4'
import VidTwo from '../../assets/video/video.mp4'



function Video() {
  return (
    <div className='videoCard'>
        <div className="head">
            Our propose site for the construction of mini-flats that will provide temporary accommodation to displaced widows, when the need arise.
        </div>
        <video src={VidOne} autoPlay loop muted controls ></video>
    </div>
  )
}

export default Video