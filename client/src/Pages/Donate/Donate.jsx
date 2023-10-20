import { useState } from 'react'
import Footer from '../../Components/Footer/Footer'
import Navbar from '../../Components/Navbar/Navbar'
import { useFetch } from '../../hooks/fetch.hooks'
import './Donate.css'
import { donate } from '../../helpers/api'

function Donate(){
    const {isLoading, apiData} = useFetch()
    const {name, setName} = useState(apiData?.userName ? apiData?.userName : '')
    const { email, setEmail} = useState(apiData?.email ? apiData?.email : '')
    const { amount, setAmount} = useState('')
    const { error, setError} = useState('')
    const { isLoadingData, setIsloadingData } = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        if(name.length <= 1){
            setUsername('')
            setTimeout(() => {
              setError('')
            }, 3000)
            return setError('Invalid Name')
        }

        if(!name || !email || !amount ){
            setUsername('')
            setTimeout(() => {
              setError('')
            }, 3000)
            return setError('Please fill all input areas')
        }

        try {
            const response = await donate({name, email, amount})
        } catch (error) {
            
        } finally{
            setIsloadingData(false)
        }
        
    }

    return (
        <div className="donate">
            <Navbar />
            <div className="container">
                <h2>Donate To Us</h2>
                <p>We Appreciate every contribution given to us no matter the size</p>
                <b>All Donations will be use to touch the lives of the less previlage in our society</b>


                <form onSubmit={handleSubmit}>
                    <h3>Donations</h3>

                    {error && <p className='error'>{error}</p>}
                    <div className="form-content">
                        <div className="input-feild">
                            <label htmlFor="">Name:</label>
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                        </div>

                        <div className="input-feild">
                            <label htmlFor="">Email:</label>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </div>

                        <div className="input-feild">
                            <label htmlFor="">Amount:</label>
                            <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
                        </div>

                        <div className="submit input-feild">
                            <input type="submit" value={ isLoadingData ? 'Please wait' : 'Donate' } disabled={isLoadingData} />
                        </div>

                    </div>
                </form>
            </div>
            <Footer />
        </div>
    )
}

export  default Donate