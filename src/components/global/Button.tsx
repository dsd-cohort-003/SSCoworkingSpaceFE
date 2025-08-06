interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: () => void;
  color: 'indigo' | 'emerald' | 'gray' | 'secondary';
}
const colorMap = {
  indigo: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300',
  emerald: 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-300',
  gray: 'bg-gray-900 text-white hover:bg-gray-800 hover:shadow-lg',
  secondary:
    'bg-[#E4EDEC80] text-gray-900 border border-gray-400 hover:bg-[#E4EDEC] hover:scale-105',
};
function Button({ text, color, ...rest }: ButtonProps) {
  return (
    <button
      className={`${colorMap[color]} w-full max-w-[250px] px-4 py-2 rounded-lg focus:outline-none focus:ring transition-all font-medium`}
      {...rest}
    >
      {text}
    </button>
  );
}

export default Button;
