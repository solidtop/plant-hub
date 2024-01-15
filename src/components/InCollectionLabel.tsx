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
      className={`p-1 bg-primary-color bg-opacity-30 rounded-md ${className}`}
    >
      In your collection
    </label>
  );
};

export default InCollectionLabel;
