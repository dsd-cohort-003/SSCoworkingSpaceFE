import Heading from '../Text/Heading';

interface DeskCardProps {
  officeName: string;
  isLoading: boolean;
  isError: boolean;
}

function DeskCard({ officeName, isLoading, isError }: DeskCardProps) {
  return (
    <div className="flex flex-row sm:flex-col">
      {isLoading ? (
        <div>Loading...</div>
      ) : isError ? (
        <div>There was an error loading</div>
      ) : (
        <Heading text={`Book a desk at ${officeName}`} />
      )}
    </div>
  );
}

export default DeskCard;
