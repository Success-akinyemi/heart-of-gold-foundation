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
                Welcome to Heart of Gold of Foundation, a compassionate community dedicated to empowering and supporting widows and women on their journey to resilience and independence. We believe in the strength and resilience of women, and our mission is to provide a nurturing environment where widows and women from all walks of life can find the support they need to rebuild and thrive.
<br />
<b>Our Commitment:</b>
At Heart of Gold of Foundation, we understand the unique challenges that widows and women face in the aftermath of loss. We are committed to creating a space that goes beyond sympathy, offering tangible solutions and resources to empower them on their path to healing and self-sufficiency.

<br />
<b>Empowerment Through Skills:</b>
One of our core focuses is to equip women with valuable skills that can enhance their professional and personal lives. Through skill-building workshops, training programs, and mentorship opportunities, we aim to foster a sense of independence and confidence, enabling them to navigate life's challenges with resilience.

<br />
<b>Financial Aid and Support:</b>
Financial stability is a crucial aspect of empowerment. We provide financial aid programs, grants, and resources to help women regain control of their financial destinies. Our goal is to break down economic barriers, empowering them to create a secure and sustainable future for themselves and their families.

<br />
<b>Community and Connection:</b>
Building a strong sense of community is at the heart of what we do. We encourage networking, mentorship, and the sharing of experiences among our members. Through our supportive community, women can find solace, encouragement, and valuable connections that contribute to their personal growth.

<br />
<b>Holistic Well-being:</b>
We believe in addressing the holistic well-being of widows and women. Our initiatives encompass mental health support, wellness programs, and resources to promote emotional healing. By fostering a sense of self-love and care, we empower women to embrace their journey towards a fulfilling and purposeful life.

Join us at Heart of Gold of Foundation as we embark on a transformative journey together. Let's inspire, uplift, and empower each other to turn the page to a new chapter
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