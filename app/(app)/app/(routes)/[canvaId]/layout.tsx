import Heading from "../../components/Heading";
import React from "react";
import AddTodoDialog from "../../components/AddCanvaDialog";
import AppClient from "../../components/AppClient";
import StoreProvider from "@/redux/StoreProvider";
import { PreloadedState } from "@/redux/preloader/preloader";
import preloaderActions from "@/redux/preloader/actions";
import getCanvas from "@/shared/actions/getCanvas";

type Props = {
  children: React.ReactNode;
};

const Layout: React.FC<Props> = async ({ children }) => {
  const canvas = await getCanvas();

  return (
    <div>
      <div className="w-full flex justify-between">
        <Heading
          title="Dashboard"
          description="The home page of the application"
        />
        <AddTodoDialog />
      </div>
      <AppClient canvas={canvas}>{children}</AppClient>
    </div>
  );
};

export default Layout;
