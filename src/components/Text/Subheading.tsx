interface SubheadingProps {
  text: string;
}
function Subheading({ text }: SubheadingProps) {
  return <div>{text}</div>;
}

export default Subheading;
