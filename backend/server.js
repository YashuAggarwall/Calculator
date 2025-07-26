const express = require('express');
const cors = require('cors');
const formatData = require('./FormatData'); // Keep this only if you use it

const app = express();
app.use(cors());
app.use(express.json());

app.post("/retirement-calculator", (req, res) => {
    let {
        currentAge,
        retirementAge,
        expectedLifespan,
        monthlyExpense,
        inflation,
        postretirement,
        preretirement
    } = req.body;

    try {
        const yearToRetire = retirementAge - currentAge;
        const retirementYears = expectedLifespan - retirementAge;

        let corpus, monthly;


        const futureExpense = monthlyExpense * Math.pow(1 + (inflation / 100), yearToRetire);
        const r = postretirement / 12 / 100; // post-retirement return/month
        const g = inflation / 12 / 100;      // inflation/month
        const n = retirementYears * 12;      // number of months after retirement

        if (r === g) {
            corpus = futureExpense * n; // if r == g, simplified formula
        } else {
            corpus = futureExpense * (1 - Math.pow((1 + g) / (1 + r), n)) / (r - g);
        }

        
        const r2 = preretirement / 12 / 100;  // pre-retirement return/month
        const n2 = yearToRetire * 12;         // months to retirement
        const t2 = Math.pow(1 + r2, n2);

        if (r2 === 0) {
            monthly = corpus / n2;
        } else {
            monthly = (corpus * r2) / ((t2 - 1) * (1 + r2));
        }

        corpus = Math.round(corpus);
        monthly = Math.round(monthly);

        return res.status(200).json({
            success: true,
            corpus: formatData(corpus),
            monthly: formatData(monthly),
            raw: { corpus, monthly } // optional: include raw values if needed
        });

    } catch (e) {
        console.error("Retirement Calculator Error:", e);
        return res.status(500).json({ error: "Server error" });
    }
});

app.post("/SIP-calculator", (req, res) => {
    let { investment, duration, annual } = req.body;

    try {
        let r = annual / 12 / 100;
        let n = duration * 12;
        let maturity = Math.round(investment * ((Math.pow((1 + r), (n)) - 1) / r) * (1 + r));
        let total = investment * n;
        let profit = maturity - total;
        let formatedmaturity = formatData(maturity);
        let formatedtotal = formatData(total);
        let formatedprofit = formatData(profit);

        return res.status(200).json({
            success: true,
            message: "SIP calculated", maturity, total, profit, formatedmaturity, formatedprofit, formatedtotal
        })
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: 'Server error' });
    }
})


app.post("/Financial-calculator", (req, res) => {
    try {
        let {
            currentAge,
            IndependencsAge,
            expectedLifespan,
            currentMonthlyExpenses,
            expectedInflation,
            postRetirementInvestmentReturn,
            preRetirementInvestmentReturn
        } = req.body;

        let futureMonthlyExpense = currentMonthlyExpenses *
            Math.pow(1 + expectedInflation / 100, IndependencsAge - currentAge);

        let monthsAfterFI = (expectedLifespan - IndependencsAge) * 12;
        let r = postRetirementInvestmentReturn / 12 / 100;

        let corpus = futureMonthlyExpense * ((1 - Math.pow(1 + r, -monthsAfterFI)) / r);

        const rPre = preRetirementInvestmentReturn / 12 / 100;
        const n = (IndependencsAge - currentAge) * 12;

        const monthlyInvestment = corpus / (((Math.pow(1 + rPre, n) - 1) / rPre) * (1 + rPre));

        return res.status(200).json({
            success: true,
            monthsAfterFI,
            futureMonthlyExpense: Math.round(futureMonthlyExpense),
            corpus: formatData(Math.round(corpus)),
            monthlyInvestment: Math.round(monthlyInvestment),
            piechat: Math.round(corpus)

        });
    } catch (error) {
        console.error("Calculation error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
});


app.post("/MutualFund-Calculator", (req, res) => {
    let { investment, duration, expectedAnnual } = req.body;

    try {
        let r = expectedAnnual / 12 / 100;
        let n = duration * 12;
        let p = investment;

        let totalInvested = p * n;
        let corpus = Math.round(p * (Math.pow((1 + r), n) - 1) / r * (1 + r));
        let profit = formatData(corpus - totalInvested);
        let formattedcorpus = formatData(corpus)

        return res.status(200).json({ success: true, corpus, profit, totalInvested, formattedcorpus })
    } catch (error) {
        console.error("Calculation error:", error);
        return res.status(500).json({ success: false, error: "Internal Server Error" });
    }
})


app.listen(3000, () => {
  console.log('Calculator backend running on port 3000');
});