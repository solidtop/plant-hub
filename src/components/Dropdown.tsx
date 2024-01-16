import { Children, FC, ReactElement, cloneElement, useState } from "react";

type ReactElementProps = {
  className: string;
};

type DropdownProps = {
  children: ReactElement<ReactElementProps>;
};

const Dropdown: FC<DropdownProps> = ({ children }) => {
  return (
    <div className="absolute top-full right-0 w-32 bg-cyan-950 z-50 rounded-md">
      <menu className=" flex flex-col">
        {Children.map(children, (child, index) => (
          <li key={index}>
            {cloneElement(child, {
              className: "flex justify-between w-full p-2 text-left",
            })}
          </li>
        ))}
      </menu>
    </div>
  );
};

export default Dropdown;
