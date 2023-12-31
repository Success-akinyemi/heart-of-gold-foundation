import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import './About.css'
import EmailIcon from '@mui/icons-material/Email';
import PlaceIcon from '@mui/icons-material/Place';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import Chatbubble from '@mui/icons-material/ChatBubble'
import LanguageIcon from '@mui/icons-material/Language';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { contact } from '../../data/contact';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

function About(){
    const [ isLoading, setIsLoading ] = useState(false)
    const form = useRef();
    console.log(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, import.meta.env.VITE_USER_ID)

    const sendEmail = (e) => {
      e.preventDefault();
    
      try {
            setIsLoading(true)
            console.log('STARDTED')
            emailjs.sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, import.meta.env.VITE_USER_ID)
            .then((result) => {
                console.log(result.text);
                e.target.reset()
                toast.success('Message Sent Successful')
            }, (error) => {
                console.log(error.text);
                toast.error('Unable to send Messages')
            });
      } catch (error) {
        console.log('ERROR', error)
      } finally {
        setIsLoading(false)
      }
    };

    const { phoneNumber, smsNumber, email } = contact
    return (
        <div className="about">
            <Toaster position='top-center'></Toaster>
            <Navbar />
            <div className="padding container">
                <h2>Who Are We?</h2>
                <p>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Exercitationem ea, blanditiis ad esse corrupti totam harum ipsam praesentium quis? Cupiditate iste cumque, consectetur itaque sint voluptatibus dolorem mollitia delectus, vitae beatae harum nesciunt adipisci similique necessitatibus nihil velit ut id nemo repellendus libero. Corrupti nostrum debitis fuga hic. Esse quibusdam laboriosam quis porro. Voluptate vitae ab quas in ipsa, nemo laboriosam laborum maxime error excepturi, cumque nobis enim sit est autem nesciunt at deleniti veritatis accusamus perspiciatis! Deserunt itaque, porro voluptatibus delectus nisi saepe, similique totam id tempora sunt magni cum accusantium? Animi autem vitae, ipsa beatae perferendis repellendus recusandae veritatis enim odio consequatur, doloremque culpa nisi incidunt aperiam suscipit eius modi cumque expedita. Quibusdam, odio totam sed atque fuga incidunt qui voluptatem sit non aliquid nulla doloremque! Iste sit eaque dignissimos, cumque reprehenderit non explicabo quas adipisci quidem ipsam quae eos assumenda enim dolorem sunt earum. Ex, cum perspiciatis.
                </p>

                <div className="formContact">
                    <form ref={form} onSubmit={sendEmail}>
                        <div className="formTitle">
                            <h3>Message Us</h3>
                        </div>

                        <div className="inputField">
                            <label htmlFor="">Name:</label>
                            <input type="text" id='name' name='user_name' />
                        </div>

                        <div className="inputField">
                            <label htmlFor="">Email:</label>
                            <input type="email" id='email' name='user_email' />
                        </div>

                        <div className="inputField">
                            <label htmlFor="">Phone Number:</label>
                            <input type="number" id='number' name='user_phone' />
                        </div>

                        <div className="inputField">
                            <label htmlFor="">Message:</label>
                            <textarea type="text" id='message' name='message' ></textarea>
                        </div>

                        <div className="inputField">
                            <input type="submit" value={ isLoading ? 'Sending...' : 'Message'} disabled={isLoading} />
                        </div>
                    </form>
                </div>

                <div className="contacts">
                    <h2>Get In Touch With Us</h2>
                    
                    <div className="cards">
                        <div className="card card-1">
                            <h4>Call Us</h4>
                            <a href={`tel:+${phoneNumber}`} className='link'>
                                <span className="box-1"><LocalPhoneIcon className='icon' /></span>
                                <span className="box-2">{phoneNumber}</span>
                            </a>
                        </div>

                        <div className="card card-2">
                            <h4>Message Via Sms</h4>
                            <a href={`sms:+${smsNumber}?&body=Hello`} className='link'>
                                <span className="box-1"><Chatbubble className='icon' /></span>
                                <span className="box-2">{smsNumber}</span>
                            </a>
                        </div>

                        <div className="card card-2">
                            <h4>Email Us</h4>
                            <a href={`mailto:${email}`} className='link'>
                                <span className="box-1"><EmailIcon className='icon' /></span>
                                <span className="box-2">{email}</span>
                            </a>
                        </div>

                        <div className="card card-3">
                            <h4><PlaceIcon className='icon'/> Office Address</h4>
                            
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default About