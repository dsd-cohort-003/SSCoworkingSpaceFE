interface HeadingProps {
  text: string;
}
function Heading({ text }: HeadingProps) {
  return <h2 className="text-3xl">{text}</h2>;
}

export default Heading;
