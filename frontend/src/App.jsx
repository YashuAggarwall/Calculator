import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css'
import Retirement from './Calculator/Retirement';
import SIP from './Calculator/SIP';
import FinancialIndependence from './Calculator/FinancialIndependence';
import MutualFund from './Calculator/MutualFund';


function App() {

  return (
   <div className='app-container'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Retirement />} />
          <Route path='/SIP-calculator' element={<SIP />} />
          <Route path='/Financial-calculator' element={<FinancialIndependence />} />
          <Route path='/MutualFund-Calculator' element={ <MutualFund />} />
        </Routes>
      </BrowserRouter>
    </div>  )
}

export default App
