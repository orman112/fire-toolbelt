import React from "react";

const IraDetails = ({ setPreTaxIraHandler }) => {
  return (
    <div className="d-none card form-group">
      <div className="card-body">
        <h5 className="card-title">IRA</h5>
        {/* TODO: add check mark to determine if it's Roth (after tax) or Traditional (Pre-tax) */}
        <label htmlFor="ira">
          If you contribute any money to an IRA (Roth or Traditional) please
          enter that amount next.
        </label>
        <input
          onChange={e => {
            setPreTaxIraHandler(parseInt(e.target.value));
          }}
          type="number"
          className="form-control"
          id="ira"
          placeholder="IRA Total"
        />
      </div>
    </div>
  );
};

export default IraDetails;
