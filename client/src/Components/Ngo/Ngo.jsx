import './Ngo.css'
import PhoneIcon  from '@mui/icons-material/LocalPhone'

function Ngo() {
  return (
    <div className='ngo'>
        <div className="padding content">
            <p className='intro'>We're non-profit organisation</p>

            <h1>Join Us Build a Happy Society</h1>

            <p className="text-1">
            The joy on the widows' faces coupled with the remarkable feedback we got after the first outreach propelled us to continue in this good cause and boom!
            </p>

            <p className="text-2">
                Heart of Gold Foundation was birthed with the burning desire to put smile on widows face. This foundation cuts across age, tribe and religion without any political barier.
            </p>

            <div className="btn">
                <span>Support Us</span>
            </div>

            <p className='footNote'>
                We Touch Many Lives
            </p>

            <div className="call">
                <h3>Call to Support us</h3>

                <a href="tel:+" className='link phoneIcon'><PhoneIcon className='icon' /></a>
                
                <a href="tel:+" className='link phoneText'>+2349012345678</a>
            </div>
        </div>
    </div>
  )
}

export default Ngo