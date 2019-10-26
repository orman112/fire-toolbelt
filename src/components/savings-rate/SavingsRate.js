import React, { useState, useMemo, useCallback } from "react";
//Components
import Four01kDetails from "./401kDetails";
import HsaDetails from "./HsaDetails";
import IraDetails from "./IraDetails";
import AdditionalSavingsDetails from "./AdditionalSavingsDetails";

const SavingsRate = () => {
  const [takeHomePay, setTakeHomePay] = useState(0);
  const [preTax401k, setPreTax401k] = useState(0);
  const [preTaxHsa, setPreTaxHsa] = useState(0);
  const [preTaxIra, setPreTaxIra] = useState(0);
  const [additionalSavings, setAdditionalSavings] = useState(0);

  const preTaxSavings = preTax401k + preTaxHsa;
  const grossPay = takeHomePay + preTaxSavings;

  const totalSavings = useMemo(() => {
    return preTaxSavings + preTaxIra + additionalSavings;
  }, [preTaxSavings, preTaxIra, additionalSavings]);

  const savingsRate = useMemo(() => {
    return ((totalSavings / (takeHomePay + preTaxSavings)) * 100).toFixed(2);
  }, [totalSavings, takeHomePay, preTaxSavings]);

  const nextHandler = useCallback(e => {
    e.preventDefault();
    console.log("Next clicked");
  }, []);

  return (
    <>
      <h2>All of the below is on a per-paycheck basis</h2>
      <form>
        <div className="card form-group">
          <div className="card-body">
            <h5 className="card-title">Take Home Pay</h5>
            <label htmlFor="takeHomePay">
              Enter your total take home pay. This is the amount that shows up
              on your paycheck.
            </label>
            <input
              onChange={e => {
                setTakeHomePay(parseInt(e.target.value));
              }}
              type="number"
              className="form-control"
              id="takeHomePay"
              aria-describedby="takeHomeHelp"
              placeholder="Enter take home pay"
            />
            <small id="takeHomeHelp" className="form-text text-muted">
              This is the amount that shows up on your paycheck.
            </small>
            <button
              className="btn btn-success"
              onClick={e => {
                nextHandler(e);
              }}
            >
              Next
            </button>
          </div>
        </div>
        <Four01kDetails setPreTax401kHandler={setPreTax401k} />
        <HsaDetails setPreTaxHsaHandler={setPreTaxHsa} />
        <IraDetails setPreTaxIraHandler={setPreTaxIra} />
        <AdditionalSavingsDetails
          setAdditionalSavingsHandler={setAdditionalSavings}
        />
        {/* <div class="form-group form-check">
          <input type="checkbox" class="form-check-input" id="exampleCheck1" />
          <label class="form-check-label" htmlFor="exampleCheck1">
            Check me out
          </label>
        </div> */}
        <div className="d-none card form-group">
          <div className="card-body">
            <select className="custom-select">
              <option defaultValue>How often are you paid?</option>
              <option value="1">Annually</option>
              <option value="2">Monthly</option>
              <option value="3">Semi-Monthly</option>
              <option value="1">Biweekly</option>
              <option value="2">Weekly</option>
              <option value="3">Hourly</option>
            </select>
          </div>
        </div>
        {/* <button type="submit" class="btn btn-primary">
          Submit
        </button> */}
        <h2>Gross Pay: {isNaN(grossPay) ? 0 : grossPay}</h2>
        <h2>
          Pre-Tax Contributions: {isNaN(preTaxSavings) ? 0 : preTaxSavings}
        </h2>
        <h2>Paycheck After Taxes: {isNaN(takeHomePay) ? 0 : takeHomePay}</h2>
        <h2>Total Savings: {isNaN(totalSavings) ? 0 : totalSavings}</h2>
        <h2>Total Savings Rate {isNaN(savingsRate) ? 0 : savingsRate}%</h2>
      </form>
    </>
  );
};

export default SavingsRate;
