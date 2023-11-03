import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import './Slides.css'
import Aos from 'aos'
import 'aos/dist/aos.css'

function Slides({ data }) {
    const [current, setCurrent] = useState(0)
    const length = data.length
    const timeout = useRef(null)

    useEffect(() => {
        Aos.init({ duration: 2000 })
    }, [])
    
    useEffect(() => {
        const nextSlide = () => {
            setCurrent(current => (current === length - 1 ? 0 : current + 1))
        }


        timeout.current = setTimeout(nextSlide, 3000)

        return function () {
            if(timeout.current){
                clearTimeout(timeout.current)
            }
        }
    },[current, length])

  return (
    <div className='padding slides'>
        <div className="container">
            <div data-aos='fade-down' className="top">
                Heart Of Gold Foundation Programmes
            </div>

            <div data-aos='fade-up' className="bottom">
                <div className="slide">
                    {
                        data.map((item, idx) => {
                            return (
                                <div className="card" key={item._id}>
                                    { idx === current && (
                                        <div className="cardContent">
                                            <div className="up">{item.text}</div>
                                            <div className="down">
                                                <img src={item.image} alt={item.text} />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <div data-aos='zoom-out' className="btn">
                    <span><Link to='/gallery' className='link'>More Programes</Link></span>
            </div>
        </div>
    </div>
  )
}

export default Slides