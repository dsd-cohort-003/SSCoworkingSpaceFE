interface BodyTextProps {
  text: string;
  className?: string;
  color: 'accent' | 'link';
}
const colorMap = {
  accent: 'text-blue-400',
  link: 'text-blue-600 hover:text-blue-400',
};

function BodyText({ text, color, className = '' }: BodyTextProps) {
  return <p className={`text-base ${colorMap[color]} ${className}`}>{text}</p>;
}

export default BodyText;
