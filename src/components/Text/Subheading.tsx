interface SubheadingProps {
  text: string;
}
function Subheading({ text }: SubheadingProps) {
  return <h3 className="text-2xl">{text}</h3>;
}

export default Subheading;
