interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  onClick: () => void;
  color: 'indigo' | 'emerald';
}
const colorMap = {
  indigo: 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-300',
  emerald: 'bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-300',
};
function Button({ text, onClick, color }: ButtonProps) {
  return (
    <button
      className={`${colorMap[color]} w-full px-4 py-2 rounded-lg focus:outline-none focus:ring transition-all text-white`}
      onClick={onClick}
    >
      {text}
    </button>
  );
}

export default Button;
