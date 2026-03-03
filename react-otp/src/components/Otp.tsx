import { useEffect, useRef, useState, type KeyboardEvent } from "react";

type Props = {
  fieldLength: number;
};

function Otp({ fieldLength }: Props) {
  const [otpFields, setOtpFields] = useState(new Array(fieldLength).fill(""));
  const refs = useRef<HTMLInputElement[]>([]);

  useEffect(() => {refs.current[0]?.focus()}, [])

  function handleAddKey(event: KeyboardEvent<HTMLInputElement>, index: number) {
    const key = event.key;
    let value = event.key;
    if (key === "Backspace" || key === "Delete") value = "";
    else if (key === "ArrowLeft" && index > 0) return refs.current[index-1].focus();
    else if (key === "ArrowRight" && index+1 < otpFields.length) return refs.current[index+1].focus();
    else if (isNaN(Number(key))) return;
    setOtpFields((prevFields) => {
      const newFields = [...prevFields];
      newFields[index] = value;
      if(index > 0 && key === "Backspace") refs.current[index-1].focus();
      else if(index === 0 && key === "Backspace") value = "";
      else if(key === "Delete") value = "";
      else if(index+1 < newFields.length) refs.current[index+1].focus();
      return newFields;
    })
  }
  return (
    <div className="flex gap-4 w-200 h-100 items-center justify-center bg-red-800 border-4 border-dashed border-red-400">
      {otpFields.map((value, index) => (
        <input
          key={index}
          ref={(currentInput: HTMLInputElement) => {refs.current[index] = currentInput}}
          type="text"
          className="bg-gray-50 h-12 w-12 border border-gray-700 text-center text-gray-800 text-2xl focus:outline-none focus:ring-4 focus:ring-blue-500 focus:border-none focus:scale-110 focus:text-[26px] rounded-md cursor-text"
          value={value}
          onChange={() => {}}
          onKeyDown={(event) => handleAddKey(event, index)}
        />
      ))}
    </div>
  );
}

export default Otp;
