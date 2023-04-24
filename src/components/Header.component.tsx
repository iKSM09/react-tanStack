import { ReactNode } from "react";

type headerType = {
  children: ReactNode;
};

export const Header1 = ({ children }: headerType) => {
  return <h1 className="text-4xl m-2 font-black text-center">{children}</h1>;
};
