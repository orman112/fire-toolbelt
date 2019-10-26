import React from "react";

const AdditionalSavingsDetails = ({ setAdditionalSavingsHandler }) => {
  return (
    <div className="d-none card form-group">
      <div className="card-body">
        <h5 className="card-title">Additional Savings</h5>
        <label htmlFor="additionalSavings">
          Finally, please add include additional savings you make outside of a
          401k, IRA, or HSA. This could include a normal savings account,
          brokerage account, CD, etc.
        </label>
        <input
          onChange={e => {
            setAdditionalSavingsHandler(parseInt(e.target.value));
          }}
          type="number"
          className="form-control"
          id="additionalSacings"
          placeholder="Additional Savings"
        />
      </div>
    </div>
  );
};

export default AdditionalSavingsDetails;
