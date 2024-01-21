import { Children, FC, ReactElement, cloneElement } from "react";

type ReactElementProps = {
  className: string;
};

type DropdownProps = {
  children: ReactElement<ReactElementProps>[];
};

const Dropdown: FC<DropdownProps> = ({ children }) => {
  return (
    <menu className="absolute top-full right-0 w-32 bg-accent-color rounded-md">
      {Children.map(children, (child, index) => (
        <li key={index}>
          {cloneElement(child, {
            className: "flex justify-between w-full p-2 text-left",
          })}
        </li>
      ))}
    </menu>
  );
};

export default Dropdown;
