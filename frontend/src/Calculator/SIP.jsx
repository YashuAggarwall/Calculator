import React, { useEffect } from 'react'
import axios from "axios"
import { Chart as ChartJs } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2";
import NavBar from '../Landing/NavBar'
import Right from './Right'
const SIP = () => {


    const [investment, setInvestment] = React.useState(25000);
    const [duration, setDuration] = React.useState(10);
    const [annual, setAnnual] = React.useState(12);
    const [maturity, setMaturity] = React.useState(1379674)
    const [total, setTotal] = React.useState()
    const [profit, setProfit] = React.useState();
    const [pie1,setPie1]= React.useState();
    const [formatedmaturity, setformatedmaturity]= React.useState();
    const [formatedprofit, setformatedprofit] = React.useState();
    const [formatedtotal, setformatedtotal]=React.useState()

    const handleInvestmentChange = (e) => {
        setInvestment(Number(e.target.value));
    };

    const handleDurationChange = (e) => {
        setDuration(Number(e.target.value));
    };

    const handleAnnualChange = (e) => {
        setAnnual(Number(e.target.value));
    };


    const fetchData = async () => {
        let response = await axios.post("https://calculator-backend-uwqj.onrender.com/SIP-calculator", {
            investment,
            duration,
            annual
        })
        console.log(response)

        setMaturity(response.data.maturity);
        setTotal(response.data.total);
        setProfit(response.data.profit)
        setformatedmaturity(response.data.formatedmaturity)
        setformatedprofit(response.data.formatedprofit)
        setformatedtotal(response.data.formatedtotal)



    }

    useEffect(() => {
        const getData = async () => {
            await fetchData();
        };
        getData();

    }, [
        investment,
        duration,
        annual
    ]);



    const data = {
        labels: ['Invested', 'Returns'],
        datasets: [
            {
                // label: '# of Votes',
                data: [total, maturity],
                backgroundColor: [
                    'rgba(255, 165, 0, 1)',
                    'rgba(0, 196, 159, 1)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',

                ],
                borderWidth: 0,
            },
        ],
    };
    
    
    const options = {
  maintainAspectRatio: false,
};




    //     useEffect(() => {
    //     fetchData();
    // }, []);

    return (
        <>
            <NavBar />
            <div className="rethead"><h1 className='pop'>SIP Calculator</h1>
                <p className='popp'>Estimate how your small monthly investments can grow into wealth over time</p>
            </div>
            <div className="retbox">
                <div className="leftret">
                    <div className="displayret">
                        <div className='corpus'>
                            <div className="corpusorange">
                                <h1 className='estimated'>Estimated Wealth Created </h1>
                                <p className='corpusamount'>₹ {formatedmaturity}</p>
                                <p className='this1'>You have invested {formatedtotal} in {duration} years </p>
                            </div>
                        </div>
                    </div>
                    <div className='inputcorpus'>
                        <h2>Investment details</h2>
                        <div className="retbox1">
                            <div className="retbox2">
                                <div className="lkjh">
                                    <p className='what'>Monthly Investment Amount</p></div>
                                <div className='lll' style={{ display: 'flex' }}>
                                    <input
                                        type="number"
                                        value={investment}
                                        min={100}
                                        max={1000000}
                                        onChange={handleInvestmentChange}
                                    />
                                    <span>₹</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                className='rangeinput'
                                min={100}
                                max={1000000}
                                value={investment}
                                onChange={handleInvestmentChange}
                            />
                        </div>
                        <div className="retbox1">
                            <div className="retbox2">
                                <div className="lkjh">
                                    <p className='what'>Investment Duration</p></div>
                                <div className='lll' style={{ display: 'flex' }}>

                                    <input
                                        type="number"
                                        value={duration}
                                        min={1}
                                        max={40}
                                        onChange={handleDurationChange}
                                    />
                                    <span>Yr</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                className='rangeinput'
                                min={1}
                                max={40}
                                value={duration}
                                onChange={handleDurationChange}
                            />
                        </div>
                        <div className="retbox1">
                            <div className="retbox2">
                                <div className="lkjh">
                                    <p className='what'>Expected Annual Return</p></div>
                                <div className='lll' style={{ display: 'flex' }}>
                                    <input
                                        type="number"
                                        value={annual}
                                        min={1}
                                        max={30}
                                        onChange={handleAnnualChange}
                                    />
                                    <span>%</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                className='rangeinput'
                                min={1}
                                max={30}
                                step={0.1}
                                value={annual}
                                onChange={handleAnnualChange}
                            />
                        </div>



                     



                       <br />
                    </div>
                    {total && profit && (
                        <div style={{ display: 'flex', justifyContent: 'center', marginTop:'30px' }}>
                            <Doughnut className='dognut' data={data} options={options} />
                            
                        </div>
                       
                    )}
                    <h1 className='profithead' >Profit: ₹{formatedprofit}</h1>




                </div>
                <div className="rightret">
                    <Right />
                </div>

            </div>
        </>
    )
}

export default SIP