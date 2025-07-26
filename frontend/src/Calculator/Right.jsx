import "./RightNew.css"
import { Link } from 'react-router-dom'

const Right = () => {
    return (
        <>
            <div className='rightouter'>
                <div className="righthead">
                    <p className='calcp'>Other Fello CFO Calculators</p>
                </div>
                <div className="rightlow">
                    <div className='qwe'>
                        <Link to="/" className='link'>
                        <h2 className='rightlowp'>Retirement Calculator</h2>
                        </Link>
                        <p className='plolo'>Plan your retirement with clarity. See how much you’ll need and prepare smartly</p>

                    </div>


                    <div className='qwe'>
                        <Link to="/Financial-calculator" className='link'>
                        <h2 className='rightlowp'>Financial Independent Calculator</h2>
                        </Link>
                        <p className='plolo'>Discover When You Can Stop Working and Start Living on Your Terms</p>

                    </div>

                    <div className='qwe'>
                        <Link to="/SIP-Calculator" className='link'>
                        <h2 className='rightlowp'>SIP Calculator</h2>
                        </Link>
                        <p className='plolo'>Estimate how your small monthly investments can grow into wealth over time</p>

                    </div>

                    <div className='qwe'>
                        
                        <Link to="/MutualFund-Calculator" className='link'>
                        <h2 className='rightlowp'>MutualFund Calculator</h2>
                        </Link>
                        <p className='plolo'>Plan Smart, Invest Consistently – Your SIP Returns, Visualized</p>

                    </div>

                    
                </div>
            </div>
        </>
    )
}

export default Right