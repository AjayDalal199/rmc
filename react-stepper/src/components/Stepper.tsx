import { useState } from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";

const data = [
  {
    num: 1,
    title: "Personal Info",
    details: "Enter your Personal Info details.",
  },
  { num: 2, title: "Account Info", details: "Enter your Accountdetails." },
  { num: 3, title: "Payment", details: "Enter your Payment Info details." },
  {
    num: 4,
    title: "Confirmation",
    details: "Here is your Confirmation details.",
  },
];

function Stepper() {
  const [currStep, setCurrStep] = useState<number>(1);

  function handleBack() {
    if (currStep > 1) setCurrStep((step) => step - 1);
  }
  function handleNext() {
    if (currStep < data.length) setCurrStep((step) => step + 1);
  }
  return (
    <div className="border-2 border-red-700 bg-gray-200 p-2 md:p-8 h-auto grid grid-rows-3 grid-cols-1 md:grid-rows-1 w-full md:max-w-3/4 md:grid-cols-3">
      <div className="flex flex-col justify-center gap-12">
        {data.map((step) => (
          <StepItem
            key={step.num}
            stepNum={step.num}
            stepTitle={step.title}
            currStep={currStep}
          />
        ))}
      </div>
      <div className="flex gap-2 items-center justify-center text-3xl font-bold text-center">
        {data?.[currStep - 1]?.details}
      </div>
      <div className="flex gap-2 items-center justify-center">
        <Button onClick={handleBack} disabled={currStep === 1}>
          Back
        </Button>
        <Button onClick={handleNext} disabled={currStep === data.length}>
          Next
        </Button>
      </div>
    </div>
  );
}

type StepItemProps = {
  stepNum: number;
  stepTitle: string;
  currStep: number;
};
function StepItem({ stepNum, stepTitle, currStep }: StepItemProps) {
  return (
      <div className="flex gap-4 items-center text-2xl">
        <div
          className={twMerge(
            "h-12 w-12 rounded-full bg-gray-500 text-gray-50 flex items-center justify-center relative",
            currStep >= stepNum && "bg-blue-500 font-bold",
          )}
        >
          {stepNum}
          {stepNum < data.length && <div className={twMerge("w-1 h-12 bg-gray-500 absolute -bottom-full", currStep > stepNum && "bg-blue-500")}></div>}
        </div>
        <div
          className={twMerge(
            "",
            currStep >= stepNum && "text-blue-700 font-bold",
          )}
        >
          {stepTitle}
        </div>
      </div>
  );
}

export default Stepper;
