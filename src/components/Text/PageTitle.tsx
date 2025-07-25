interface PageTitleProps {
  text: string;
}

function PageTitle({ text }: PageTitleProps) {
  return <h1 className="text-4xl">{text}</h1>;
}

export default PageTitle;
