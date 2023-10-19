import { Link } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import './Slides.css'

function Slides({ data }) {
    const [current, setCurrent] = useState(0)
    const length = data.length
    const timeout = useRef(null)

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
            <div className="top">
                Heart Of Gold Foundation Causes
            </div>

            <div className="bottom">
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
            <div className="btn">
                    <span><Link className='link'>More Causes</Link></span>
            </div>
        </div>
    </div>
  )
}

export default Slides