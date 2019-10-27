import React, { useState, useMemo } from "react";
//Components
import FormCard from "./FormCard";

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

  return (
    <>
      <h2>All of the below is on a per-paycheck basis</h2>
      <form>
        <FormCard title={"Take Home Pay"}>
          <label htmlFor="takeHomePay">
            Enter your total take home pay. This is the amount that shows up on
            your paycheck.
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
        </FormCard>
        <FormCard title={"401k"}>
          {/* TODO: add check mark to determine if it's Roth (after tax) or Traditional (Pre-tax) */}
          <label htmlFor="401k">
            If you contribute to a 401k, enter that amount here. Please include
            any match that your employer may contribute.
          </label>
          <input
            onChange={e => {
              setPreTax401k(parseInt(e.target.value));
            }}
            type="number"
            className="form-control"
            id="401k"
            placeholder="401k Total"
          />
        </FormCard>
        <FormCard title={"HSA"}>
          <label htmlFor="hsa">
            Does your health plan offer an HSA? If so, and you contribute to it,
            please enter that amount below. Also remember to include any
            contributions that your employer makes as well.
          </label>
          <input
            onChange={e => {
              setPreTaxHsa(parseInt(e.target.value));
            }}
            type="number"
            className="form-control"
            id="hsa"
            placeholder="HSA Total"
          />
        </FormCard>
        <FormCard title={"IRA"}>
          {/* TODO: add check mark to determine if it's Roth (after tax) or Traditional (Pre-tax) */}
          <label htmlFor="ira">
            If you contribute any money to an IRA (Roth or Traditional) please
            enter that amount next.
          </label>
          <input
            onChange={e => {
              setPreTaxIra(parseInt(e.target.value));
            }}
            type="number"
            className="form-control"
            id="ira"
            placeholder="IRA Total"
          />
        </FormCard>
        <FormCard title={"Additional Savings"}>
          <label htmlFor="additionalSavings">
            Finally, please add include additional savings you make outside of a
            401k, IRA, or HSA. This could include a normal savings account,
            brokerage account, CD, etc.
          </label>
          <input
            onChange={e => {
              setAdditionalSavings(parseInt(e.target.value));
            }}
            type="number"
            className="form-control"
            id="additionalSacings"
            placeholder="Additional Savings"
          />
        </FormCard>
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
