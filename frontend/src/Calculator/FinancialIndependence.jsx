import React from 'react'
import NavBar from '../Landing/NavBar'
import { useState } from 'react';
import Right from './Right';
import axios from "axios"
import { Chart as ChartJs } from "chart.js/auto"
import { Doughnut } from "react-chartjs-2";
import { useEffect } from 'react';


const FinancialIndependence = () => {


    const [currentAge, setCurrentAge] = useState(28);
    const [IndependencsAge, setindependenceAge] = useState(45);
    const [expectedLifespan, setExpectedLifespan] = useState(85);
    const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = React.useState(5000);
    const [expectedInflation, setExpectedInflation] = useState(3);
    const [postRetirementInvestmentReturn, setPostRetirementInvestmentReturn] = useState(6);
    const [preRetirementInvestmentReturn, setPreRetirementInvestmentReturn] = useState(10);
    const [corpus, setCorpus] = useState();
    const [future, setFuture] = useState();
    const [year, setYear] = useState()
    const [piecharcorpus, setPiechatcorpus] = useState();


    const handleCurrentAgeChange = (e) => setCurrentAge(Number(e.target.value));
    const handleRetirementAgeChange = (e) => setindependenceAge(Number(e.target.value));
    const handleExpectedLifespanChange = (e) => setExpectedLifespan(Number(e.target.value));
    const handleCurrentMonthlyExpensesChange = (e) => setCurrentMonthlyExpenses(Number(e.target.value));
    const handleExpectedInflationChange = (e) => setExpectedInflation(Number(e.target.value));
    const handlePostRetirementInvestmentReturnChange = (e) => setPostRetirementInvestmentReturn(Number(e.target.value));

    const handlePreRetirementInvestmentReturnChange = (e) => setPreRetirementInvestmentReturn(Number(e.target.value));


    const fetchData = async () => {

        let response = await axios.post("https://calculator-backend-uwqj.onrender.com/Financial-calculator", { currentAge, IndependencsAge, expectedLifespan, currentMonthlyExpenses, expectedInflation, postRetirementInvestmentReturn, preRetirementInvestmentReturn })
        console.log(response);
        setCorpus(response.data.corpus)
        setFuture(response.data.monthlyInvestment)
        let x=(response.data.monthsAfterFI);
        let y= response.data.monthlyInvestment*x;
        setYear(y)
        setPiechatcorpus(response.data.piechat)


    }

    useEffect(() => {
        const getData = async () => {
            await fetchData();
        };
        getData();

    }, [
        currentAge, IndependencsAge, expectedLifespan, currentMonthlyExpenses, expectedInflation, postRetirementInvestmentReturn, preRetirementInvestmentReturn
    ]);
    console.log(year)
    console.log(corpus)


    const data = {
        labels: ['Invested', 'Returns'],
        datasets: [
            {
                // label: '# of Votes',
                data: [year, piecharcorpus],
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
            <div className="rethead"><h1 className='pop'>Financial Independence Calculator</h1>
                <p className='popp'>Find out how much money you need to retire early and live financially free.</p>
            </div>
            <div className="retbox">
                <div className="leftret">
                    <div className="displayret">
                        <div className='corpus'>
                            <div className="corpusorange">
                                <h1 className='estimated'>Financial Independence Corpus Required:</h1>
                                <p className='corpusamount'>₹ {corpus?.toLocaleString("en-IN")}</p>
                                <p className='this1'>Monthly Investment required ₹ {future?.toLocaleString("en-IN")}. </p>
                            </div>
                        </div>
                    </div>
                    <div className='inputcorpus'>
                        <h2>Enter your details</h2>
                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Current Age</p>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="number"
                                        placeholder='enter age'
                                        value={currentAge}
                                        min={18}
                                        max={65}
                                        onChange={handleCurrentAgeChange}
                                    />
                                    <span>years</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                className='rangeinput'
                                min={18}
                                max={65}
                                value={currentAge}
                                onChange={handleCurrentAgeChange}
                            />
                        </div>
                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Financial Independence Age</p>
                                <div style={{ display: 'flex' }}>

                                    <input
                                        type="number"
                                        placeholder='enter age'
                                        value={IndependencsAge}
                                        min={40}
                                        max={80}
                                        onChange={handleRetirementAgeChange}
                                    />
                                    <span>years</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                className='rangeinput'
                                min={40}
                                max={80}
                                value={IndependencsAge}
                                onChange={handleRetirementAgeChange}
                            />
                        </div>
                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Life Expectancy</p>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="number"
                                        placeholder='enter age'
                                        value={expectedLifespan}
                                        min={60}
                                        max={120}
                                        onChange={handleExpectedLifespanChange}
                                    />
                                    <span>years</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                className='rangeinput'
                                min={60}
                                max={120}
                                value={expectedLifespan}
                                onChange={handleExpectedLifespanChange}
                            />
                        </div>
                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Monthly Expenses</p>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="number"
                                        placeholder='enter expenses'
                                        value={currentMonthlyExpenses}
                                        min={100}
                                        max={1000000}
                                        onChange={handleCurrentMonthlyExpensesChange}
                                    />
                                    <span>₹</span>
                                </div>
                            </div>
                            <input
                                type="range"
                                className='rangeinput'
                                min={100}
                                max={1000000}
                                value={currentMonthlyExpenses}
                                onChange={handleCurrentMonthlyExpensesChange}
                            />
                        </div>
                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Inflation Rate</p>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="number"
                                        placeholder='enter inflation'
                                        value={expectedInflation}
                                        min={1}
                                        max={12}
                                        onChange={handleExpectedInflationChange}
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
                                value={expectedInflation}
                                onChange={handleExpectedInflationChange}
                            />
                        </div>

                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Post-Retirement Investment Return</p>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="number"
                                        placeholder='enter return'
                                        value={postRetirementInvestmentReturn}
                                        min={1}
                                        max={30}

                                        onChange={handlePostRetirementInvestmentReturnChange}
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
                                value={postRetirementInvestmentReturn}
                                onChange={handlePostRetirementInvestmentReturnChange}
                            />
                        </div>




                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Pre-Retirement Investment Return</p>
                                <div style={{ display: 'flex' }}>
                                    <input
                                        type="number"
                                        placeholder='enter return'
                                        value={preRetirementInvestmentReturn}
                                        min={1}
                                        max={30}
                                        onChange={handlePreRetirementInvestmentReturnChange}
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
                                value={preRetirementInvestmentReturn}
                                onChange={handlePreRetirementInvestmentReturnChange}
                            />
                        </div>

                        <br /><br /><br /><br />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <Doughnut className='dognut' data={data} options={options} />

                    </div>
                </div>
                <div className="rightret">
                    <Right />
                </div>
            </div>
        </>
    )
}

export default FinancialIndependence