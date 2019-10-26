import React from "react";

const HsaDetails = ({ setPreTaxHsaHandler }) => {
  return (
    <div className="d-none card form-group">
      <div className="card-body">
        <h5 className="card-title">HSA</h5>
        <label htmlFor="hsa">
          Does your health plan offer an HSA? If so, and you contribute to it,
          please enter that amount below. Also remember to include any
          contributions that your employer makes as well.
        </label>
        <input
          onChange={e => {
            setPreTaxHsaHandler(parseInt(e.target.value));
          }}
          type="number"
          className="form-control"
          id="hsa"
          placeholder="HSA Total"
        />
      </div>
    </div>
  );
};

export default HsaDetails;
