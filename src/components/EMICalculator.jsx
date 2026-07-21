import { useState } from "react";

// Self-contained EMI calculator. Takes the flat's price as a prop and
// keeps its own local state — does not touch any App-level state.
function EMICalculator({ price }) {
  const safePrice = price && price > 100000 ? price : 5000000;

  const [loanAmount, setLoanAmount] = useState(Math.round(safePrice * 0.8));
  const [interestRate, setInterestRate] = useState(8.5);
  const [tenure, setTenure] = useState(20); // years

  const monthlyRate = interestRate / 12 / 100;
  const months = tenure * 12;

  const emi =
    monthlyRate === 0
      ? loanAmount / months
      : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, months)) /
        (Math.pow(1 + monthlyRate, months) - 1);

  const totalPayment = emi * months;
  const totalInterest = totalPayment - loanAmount;

  const fmt = (n) => `₹${Math.round(n).toLocaleString("en-IN")}`;

  return (
    <div className="emi-calc">
      <h3 className="emi-calc__title">🏦 EMI Calculator</h3>

      <div className="emi-calc__field">
        <div className="emi-calc__label-row">
          <span>Loan Amount</span>
          <span className="emi-calc__value">{fmt(loanAmount)}</span>
        </div>
        <input
          type="range"
          min={100000}
          max={safePrice}
          step={50000}
          value={loanAmount}
          onChange={(e) => setLoanAmount(Number(e.target.value))}
          className="emi-calc__slider"
        />
      </div>

      <div className="emi-calc__field">
        <div className="emi-calc__label-row">
          <span>Interest Rate</span>
          <span className="emi-calc__value">{interestRate}%</span>
        </div>
        <input
          type="range"
          min={6}
          max={15}
          step={0.1}
          value={interestRate}
          onChange={(e) => setInterestRate(Number(e.target.value))}
          className="emi-calc__slider"
        />
      </div>

      <div className="emi-calc__field">
        <div className="emi-calc__label-row">
          <span>Tenure</span>
          <span className="emi-calc__value">{tenure} yrs</span>
        </div>
        <input
          type="range"
          min={1}
          max={30}
          step={1}
          value={tenure}
          onChange={(e) => setTenure(Number(e.target.value))}
          className="emi-calc__slider"
        />
      </div>

      <div className="emi-calc__result">
        <div className="emi-calc__result-main">
          <span>Monthly EMI</span>
          <strong>{fmt(emi)}</strong>
        </div>
        <div className="emi-calc__result-sub">
          <div>
            <span>Total Interest</span>
            <p>{fmt(totalInterest)}</p>
          </div>
          <div>
            <span>Total Payment</span>
            <p>{fmt(totalPayment)}</p>
          </div>
        </div>
      </div>

      <p className="emi-calc__disclaimer">
        Estimate only — actual EMI depends on lender terms and eligibility.
      </p>
    </div>
  );
}

export default EMICalculator;
