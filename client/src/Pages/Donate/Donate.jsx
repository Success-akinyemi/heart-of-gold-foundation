import { useEffect, useState } from 'react';
import Footer from '../../Components/Footer/Footer';
import Navbar from '../../Components/Navbar/Navbar';
import { useFetch } from '../../hooks/fetch.hooks';
import './Donate.css';
import { donate } from '../../helpers/api';

function Donate() {
  const { isLoading, apiData } = useFetch();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [amount, setAmount] = useState('');
  const [purpose, setPurpose] = useState('')
  const [error, setError] = useState('');
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    if (apiData && apiData.data.username) {
      setName(apiData.data.username);
    }

    if (apiData && apiData.data.email) {
      setEmail(apiData.data.email);
    }

    setPurpose('Charity')
  }, [apiData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (name.length <= 1) {
      setName('');
      setTimeout(() => {
        setError('');
      }, 3000);
      return setError('Invalid Name');
    }

    if (!name || !email || !amount) {
      setName('');
      setTimeout(() => {
        setError('');
      }, 3000);
      return setError('Please fill all input areas');
    }

    try {
        const errorMsg = await donate({ name, email, amount, purpose });
    
        if(errorMsg){
            setError(errorMsg)
            setTimeout(() => {
              setError('')
            }, 3000)
          } else{
            navigate('/Appericiation')
          }
    } catch (error) {
      // Handle the error
    } finally {
      setIsLoadingData(false);
    }
  }

  return (
    <div className="donate">
      <Navbar />
      <div className="padding container">
        <h2>Donate To Us</h2>
        <p>We appreciate every contribution given to us no matter the size</p>
        <b>All Donations will be used to touch the lives of the less privileged in our society</b>

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

            <div className="input-feild">
              <label htmlFor="">Purpose:</label>
              <input type="text" value={purpose} onChange={(e) => setPurpose(e.target.value)} />
            </div>

            <div className="submit input-feild">
              <button type="submit" disabled={isLoadingData}>
                {isLoadingData ? 'Please wait' : 'Donate'}
              </button>
            </div>
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}

export default Donate;
