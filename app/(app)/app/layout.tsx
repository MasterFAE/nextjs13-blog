import React from "react";
import Navbar from "./components/Navbar";
import { usePathname, useParams } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const AppLayout: React.FC<Props> = ({ children }) => {
  return (
    <div>
      <Navbar />
      <div className="w-[95%] lg:w-[90%] xl::w-[80%] m-auto mt-4">
        {children}
      </div>
    </div>
  );
};

export default AppLayout;
