import React, { useEffect } from 'react'
import NavBar from '../Landing/NavBar'
import Right from './Right'
import axios from 'axios';
import { Chart as ChartJs } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2";

const MutualFund = () => {


    const [investment, setInvestment] = React.useState(1000);
    const [duration, setDuration] = React.useState(10);
    const [expectedAnnual, setExpectedAnnual] = React.useState(12);
    const [corpus, setCorpus] = React.useState(0);
    let [profit, setProfit]= React.useState(0);
    let [total, setTotal]=React.useState(0);
    const [formated, setFormated]= React.useState(0);

    const handleInvestmentChange = (e) => setInvestment(Number(e.target.value));
    const handleDurationChange = (e) => setDuration(Number(e.target.value));
    const handleExpectedAnnualChange = (e) => setExpectedAnnual(Number(e.target.value));
    const handleCorpusChange = (e) => setCorpus(Number(e.target.value));


    const fetchData = async () =>{
        let response= await axios.post("https://calculator-backend-uwqj.onrender.com/MutualFund-Calculator", {investment, duration, expectedAnnual} )
        console.log(response)
        setCorpus(response.data.corpus)
        setProfit(response.data.profit)
        setTotal(response.data.totalInvested)
        setFormated(response.data.formattedcorpus)
    }


    useEffect (()=>{
        const getData= async () =>{
            await fetchData();
        };
        getData();
    }, [
        investment,
        duration, 
        expectedAnnual
    ])



      const data = {
        labels: ['Invested', 'Returns'],
        datasets: [
            {
                // label: '# of Votes',
                data: [total, corpus],
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





    return (
        <>
            <NavBar />
            <div className="rethead"><h1 className='pop'>Mutual Fund SIP Calculator</h1>
                <p className='popp'>Estimate the future value of your mutual fund investments with ease.</p>
            </div>
            <div className="retbox">
                <div className="leftret">
                    <div className="displayret">
                        <div className='corpus'>
                            <div className="corpusorange">
                                <h1 className='estimated'>Expected Maturity Value: </h1>
                                <p className='corpusamount'>₹ {formated}</p>
                                <p className='this1'> </p>
                            </div>
                        </div>
                    </div>
                    <div className='inputcorpus'>
                        <h2>Investment Details</h2>
                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Monthly investments</p>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="number"
                                        value={investment}
                                        min={100}
                                        max={500000}
                                        onChange={handleInvestmentChange}
                                    />
                                    <span>₹</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                className='rangeinput'
                                min={100}
                                max={50000}
                                step={100}
                                value={investment}
                                onChange={handleInvestmentChange}
                            />
                        </div>
                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Investment Duration</p>
                                <div style={{ display: 'flex' }}>

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
                                <p className='what'>Expected Annual Return</p>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="number"
                                        placeholder='enter age'
                                        value={expectedAnnual}
                                        min={1}
                                        max={30}
                                        onChange={handleExpectedAnnualChange}
                                    />
                                    <span>%</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                className='rangeinput'
                                min={1}
                                max={30}
                                value={expectedAnnual}
                                onChange={handleExpectedAnnualChange}
                            />
                        </div>
                    </div>
                
                 <div style={{ display: 'flex', justifyContent: 'center', marginTop:'30px' }}>
                                            <Doughnut className='dognut' data={data} options={options} />
                                            
                                        </div>
                                        <h1 className='profithead' >Profit: ₹{profit?.toLocaleString("en-IN")}</h1>

                
                </div>
                 <div className="rightret">
                    <Right />
                </div>
            </div>
        </>
    )
}

export default MutualFund