import React from "react";

const BudgetNav = () => {
  return (
    <ul className="nav nav-tabs">
      <li className="nav-item">
        <button className="nav-link" href="#">
          Link
        </button>
      </li>
      <li className="nav-item">
        <button className="nav-link active" href="#">
          Active
        </button>
      </li>
      <li className="nav-item">
        <button className="nav-link" href="#">
          Link
        </button>
      </li>
      <li className="nav-item">
        <button
          className="nav-link disabled"
          tabIndex="-1"
          aria-disabled="true"
        >
          Disabled
        </button>
      </li>
    </ul>
  );
};

export default BudgetNav;
