import React from "react";
import Authenticated from "../../utils/auth/Authenticated";
import BudgetNav from "./BudgetNav";
import { db } from "../../utils/firebase/firebase";

const Budget = () => {
  //TODO: use proptypes
  // const BudgetCategories = {
  //   Mortgage: 1200,
  //   Insurance: 200,
  //   Cable: 50,
  //   Grocery: 400,
  //   Water: 150,
  //   Electric: 200
  // };

  let handleClick = () => {
    db.collection("budget").add({
      year: 2019,
      month: "September",
      dateAdded: new Date()
    });
  };

  return (
    <Authenticated>
      <h2>Your 2019 Budget!</h2>
      <BudgetNav />
      <button className="btn btn-outline-success" onClick={() => handleClick()}>
        Click Me
      </button>
    </Authenticated>
  );
};

export default Budget;
