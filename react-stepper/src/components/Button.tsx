import { twMerge } from "tailwind-merge";

type ButtonProps = {
  children: React.ReactNode;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
};

function Button({
  children,
  disabled = false,
  onClick,
  className,
}: ButtonProps) {
  return (
    <button
      className={twMerge(
        "px-4 py-2 text-2xl bg-blue-700 text-gray-100 rounded-md cursor-pointer",
        disabled && "cursor-not-allowed grayscale-100",
        className,
      )}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
