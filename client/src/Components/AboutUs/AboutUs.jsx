import './AboutUs.css'

function AboutUs({ image, text, subTitle, title}) {
  return (
    <div className='padding aboutUs'>
      <div className="content">
        <h3 className='title'>{title}</h3>
        <div className="card">
          <div className="cardInfo">
            <h4>{subTitle}</h4>

            <p>{text}</p>
          </div>

          <div className="cardImg">
            <img src={image} alt={title} />
          </div>
        </div>
        <div className="btn">
          <span>Learn More About Us</span>
        </div>
      </div>
    </div>
  )
}

export default AboutUs