import { FC } from "react";

type NoResultsProps = {
  text: string;
};

const NoResults: FC<NoResultsProps> = ({ text }) => {
  return (
    <div className="my-4 mx-auto text-center">
      <h2>{text}</h2>
    </div>
  );
};

export default NoResults;
