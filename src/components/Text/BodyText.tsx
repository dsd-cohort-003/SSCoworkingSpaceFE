interface BodyTextProps {
  text: string;
}
function BodyText({ text }: BodyTextProps) {
  return <p className="text-base">{text}</p>;
}

export default BodyText;
