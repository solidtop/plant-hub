import { FC } from "react";

type InCollectionLabelProps = {
  htmlFor?: string;
  className?: string;
};

const InCollectionLabel: FC<InCollectionLabelProps> = ({
  htmlFor,
  className,
}) => {
  return (
    <label
      htmlFor={htmlFor}
      className={`px-2 bg-primary-color bg-opacity-60 rounded-md backdrop-blur-xl ${className}`}
    >
      In your collection
    </label>
  );
};

export default InCollectionLabel;
