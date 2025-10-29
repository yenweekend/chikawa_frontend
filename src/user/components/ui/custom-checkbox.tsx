interface CustomCheckboxProps {
  isSelected: boolean;
  disabled?: boolean;
  className?: string;
}

const CustomCheckbox = ({ isSelected, disabled = false, className = "" }: CustomCheckboxProps) => {
  return (
    <div
      className={`w-4 h-4 border flex items-center justify-center relative cursor-pointer ${
        isSelected
          ? "border-black bg-white"
          : "border-gray-400 bg-white"
      } ${disabled ? "opacity-50 cursor-not-allowed" : ""} ${className}`}
    >
      {isSelected && (
        <img className="w-2.5 h-2.5" src="https://www.svgrepo.com/show/73672/correct.svg" alt="" />
      )}
    </div>
  );
};

export default CustomCheckbox;