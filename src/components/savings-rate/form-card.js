import React from "react";

const FormCard = ({ children, title, visibleStep, currentStep }) => {
  return (
    <>
      {visibleStep === currentStep ? (
        <div className="card form-group w-50 h-100 mx-auto">
          <div className="card-body">
            <h5 className="card-title">{title}</h5>
            {children}
          </div>
        </div>
      ) : null}
    </>
  );
};

export default FormCard;
