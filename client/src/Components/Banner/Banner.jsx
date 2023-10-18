import './Banner.css'

function Banner() {
  return (
    <div className='banner'>
        <div className="overlay"></div>
        <div className="content">
            <div className="left">
                <p>We are here to improve lives</p>
                <h2>
                Some Widows and Vulnerable in our Society Need Help And We Give It!
                </h2>
                <span>We support many people in communities</span>
            </div>

            <div className="right">
              <div className="btn">
                <span>Explore More</span>
              </div>
            </div>
        </div>
    </div>
  )
}

export default Banner