import React from 'react'
import './Retirement.css'
import NavBar from '../Landing/NavBar'
import axios from 'axios'
import { useEffect, useState } from 'react'
import Right from './Right'

const Retirement = () => {

    const [currentAge, setCurrentAge] = useState(30);
    const [retirementAge, setRetirementAge] = useState(60);
    const [expectedLifespan, setExpectedLifespan] = useState(80);
    const [currentMonthlyExpenses, setCurrentMonthlyExpenses] = React.useState(50000);
    const [expectedInflation, setExpectedInflation] = useState(6);
    const [postRetirementInvestmentReturn, setPostRetirementInvestmentReturn] = useState(6);
    const [preRetirementInvestmentReturn, setPreRetirementInvestmentReturn] = useState(8);
    const [retirementCorpus, setRetirementCorpus] = useState();
    const [monthlyInvestment, setMonthlyInvestment] = useState();

        const fetchData = async () => {
        try {


            const response = await axios.post("https://calculator-backend-uwqj.onrender.com/retirement-calculator", {
                currentAge: Number(currentAge),
                retirementAge: Number(retirementAge),
                expectedLifespan: Number(expectedLifespan),
                monthlyExpense: Number(currentMonthlyExpenses),
                inflation: Number(expectedInflation),
                postretirement: Number(postRetirementInvestmentReturn),
                preretirement: Number(preRetirementInvestmentReturn)
            });
            console.log(response.data);
            if (response.status === 200) {
                setRetirementCorpus(response.data.corpus);
                setMonthlyInvestment(response.data.monthly);
            }
        } catch (e) {
            console.error(e);
            showError("Server error. Please try again later.");
            return;
        }
    };



    useEffect(() => {
        fetchData();
    }, [
        currentAge,
        retirementAge,
        expectedLifespan,
        currentMonthlyExpenses,
        expectedInflation,
        postRetirementInvestmentReturn,
        preRetirementInvestmentReturn
    ]);






    // Handlers for input changes
    const handleCurrentAgeChange = (e) => setCurrentAge(Number(e.target.value));
    const handleRetirementAgeChange = (e) => setRetirementAge(Number(e.target.value));
    const handleExpectedLifespanChange = (e) => setExpectedLifespan(Number(e.target.value));
    const handleCurrentMonthlyExpensesChange = (e) => setCurrentMonthlyExpenses(Number(e.target.value));
    const handleExpectedInflationChange = (e) => setExpectedInflation(Number(e.target.value));
    const handlePostRetirementInvestmentReturnChange = (e) => setPostRetirementInvestmentReturn(Number(e.target.value));
    const handlePreRetirementInvestmentReturnChange = (e) => setPreRetirementInvestmentReturn(Number(e.target.value));
   

    return (
        <>
            <NavBar />
            <div className="rethead"><h1 className='pop'>Retirement Calculator</h1>
                <p className='popp'>Plan your retirement with clarity. See how much you’ll need and prepare smartly.</p>
            </div>
            <div className="retbox">
                <div className="leftret">
                    <div className="displayret">
                        <div className='corpus'>
                            <div className="corpusorange">
                                <h1 className='estimated'>Retirement Corpus Required: </h1>
                                <p className='corpusamount'>₹ {retirementCorpus?.toLocaleString("en-IN")}</p>
                                <p className='this1'>Monthly Corpus: ₹ {(Number(monthlyInvestment)).toLocaleString("en-IN")} </p>
                            </div>
                        </div>
                    </div>
                    <div className='inputcorpus'>
                        <h2>Financial details</h2>
                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Current Age</p>
                                <div style={{ display: 'flex'}}>
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
                                <p className='what'>Retirement Age</p>
                                <div style={{ display: 'flex'}}>
                                
                                <input
                                    type="number"
                                    placeholder='enter age'
                                    value={retirementAge}
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
                                value={retirementAge}
                                onChange={handleRetirementAgeChange}
                            />
                        </div>
                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Life Expectancy</p>
                                <div style={{ display: 'flex'}}>
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
                                <div style={{ display: 'flex'}}>
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
                                min={10000}
                                max={1000000}
                                value={currentMonthlyExpenses}
                                onChange={handleCurrentMonthlyExpensesChange}
                            />
                        </div>
                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Inflation Rate</p>
                                <div style={{ display: 'flex'}}>
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
                                <p className='what'>Pre-Retirement Investment Return</p>
                                <div style={{ display: 'flex'}}>
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
                        <div className="retbox1">
                            <div className="retbox2">
                                <p className='what'>Post-Retirement Investment Return</p>
                                <div style={{ display: 'flex'}}>
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
                        <br /><br /><br /><br />
                    </div>
                </div>
                <div className="rightret">
                    <Right />
                </div>
            </div>
        </>
    )
}

export default Retirement   