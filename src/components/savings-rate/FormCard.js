import React, { useCallback } from "react";

const FormCard = ({ children, title }) => {
  const nextHandler = useCallback(e => {
    e.preventDefault();
    console.log("Next clicked");
  }, []);

  return (
    <div className="card form-group">
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {children}

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
  );
};

export default FormCard;
