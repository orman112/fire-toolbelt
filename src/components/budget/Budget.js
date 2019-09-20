import React from "react";
import Authenticated from "../../utils/auth/Authenticated";
import BudgetNav from "./BudgetNav";

const Budget = () => {
  //TODO: use proptypes
  const BudgetCategories = {
    Mortgage: 1200,
    Insurance: 200,
    Cable: 50,
    Grocery: 400,
    Water: 150,
    Electric: 200
  };

  return (
    <Authenticated>
      <h2>Your 2019 Budget!</h2>
      <BudgetNav />
    </Authenticated>
  );
};

export default Budget;
