import { Link } from 'react-router-dom'
import './Info.css'

function Info({ image, text, title, subTitle}) {
  return (
    <div className='padding info'>
        <div className="content">
            <h3 className="title">{title}</h3>
            <div className="card">
                <div className="cardImg">
                    <img src={image} alt={title} />
                </div>
                <div className="cardInfo">
                    <h4>{subTitle}</h4>

                    <p>{text}</p>
                </div>
            </div>
            <div className="btn">
                <span><Link className='link' to='/donate'>Donate To Support Us</Link></span>
            </div>
        </div>
    </div>
  )
}

export default Info