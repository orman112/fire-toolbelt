import React from "react";

const Four01kDetails = ({ setPreTax401kHandler }) => {
  return (
    <div className="d-none card form-group">
      <div className="card-body">
        <h5 className="card-title">401k</h5>
        {/* TODO: add check mark to determine if it's Roth (after tax) or Traditional (Pre-tax) */}
        <label htmlFor="401k">
          If you contribute to a 401k, enter that amount here. Please include
          any match that your employer may contribute.
        </label>
        <input
          onChange={e => {
            setPreTax401kHandler(parseInt(e.target.value));
          }}
          type="number"
          className="form-control"
          id="401k"
          placeholder="401k Total"
        />
      </div>
    </div>
  );
};

export default Four01kDetails;
