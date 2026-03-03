import { twMerge } from "tailwind-merge"

type btnType = "success" | "warning" | "info" | "error"

type Props = {
    children: React.ReactNode,
    type: btnType,
    onClick?: () => void;
}

function Button({children, type, onClick}: Props) {
  return (
    <button className={twMerge(
        "px-4 py-2 font-medium text-2xl border-2 rounded-md cursor-pointer",
        type === "success" && "border-green-500 text-green-500 bg-green-500/30",
        type === "warning" && "border-yellow-500 text-yellow-500 bg-yellow-500/50",
        type === "info" && "border-blue-500 text-blue-500 bg-blue-500/50",
        type === "error" && "border-red-500 text-red-500 bg-red-500/50",
    )}
    onClick={onClick}
    >{children}</button>
  )
}

export default Button