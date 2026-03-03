import { useState, useRef } from "react";
import Button from "./Button";
import { twMerge } from "tailwind-merge";
import {v4 as uuid4} from "uuid";

type Toast = {
  text: string,
  type: ToastType,
  id: string,
}

function ToastContainer() {
  const [toastList, setToastList] = useState<Toast[]>([]);
  const timersRef = useRef({});

  function handleAddToast(text: string, type: ToastType, duration: number = 5000){
    const id = uuid4();
    const newToast = {id, text, type, duration};
    setToastList([...toastList, newToast]);
    timersRef.current[id] = setTimeout(()=> handleCloseToast(id), duration);
  }

  function handleCloseToast(id: string) {
    clearTimeout(timersRef.current[id]);
    delete timersRef.current[id];
    setToastList((toastList) => toastList.filter((t) => t.id !== id ))
  }

  return (
    <div>
      <div className="fixed top-2 right-2">
        {toastList.map((toast)=> <Toast key={toast.id} id={toast.id} text={toast.text} type={toast.type} handleClose={handleCloseToast} />)}
      </div>
      <div className="bg-gray-50 flex flex-col md:flex-row items-center justify-center gap-4 p-4 rounded-md">
        <Button type="success" onClick={() => handleAddToast("Success Toast", "success", 1000)}>Success Button</Button>
        <Button type="warning" onClick={() => handleAddToast("Warning Toast", "warning", 8000)}>Warning Button</Button>
        <Button type="info" onClick={() => handleAddToast("Info Toast", "info", 10000)}>Info Button</Button>
        <Button type="error" onClick={() => handleAddToast("Error Toast", "error", 20000)}>Error Button</Button>
      </div>
    </div>
  );
}

type ToastType = "success" | "warning" | "info" | "error";

type ToastProps = {
  id: string,
  text: string,
  type: ToastType,
  handleClose: (id:string) => void
}

function Toast({id, text, type, handleClose}: ToastProps) {
  return (
    <div className={twMerge(
        "px-4 py-2 font-medium text-2xl border-2 rounded-md mb-2 w-80 flex justify-between",
        type === "success" && "border-green-500 text-green-500 bg-green-500/30",
        type === "warning" && "border-yellow-500 text-yellow-500 bg-yellow-500/50",
        type === "info" && "border-blue-500 text-blue-500 bg-blue-500/50",
        type === "error" && "border-red-500 text-red-500 bg-red-500/50",
        "animate-slide"
    )}>
      <span>{text}</span>
      <span className={"cursor-pointer"} onClick={() => handleClose(id)}>x</span>
    </div>
  )
}

export default ToastContainer;
