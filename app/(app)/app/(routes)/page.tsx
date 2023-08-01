import React from "react";
import Heading from "../components/Heading";
import AppClient from "../components/AppClient";
import AddTodoDialog from "../components/AddCanvaDialog";
import { Metadata } from "next";
import StoreProvider from "@/redux/StoreProvider";
import { PreloadedState } from "@/redux/preloader/preloader";
import preloaderActions from "@/redux/preloader/actions";
import getCanvas from "@/shared/actions/getCanvas";

type Props = {};
export const metadata: Metadata = {
  title: "Dashboard - Todi",
  description: "You can create your own to-do list and manage it easily.",
};

const AppPage = async (props: Props) => {
  // await preloaderActions.getCanvas();
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
      <AppClient canvas={canvas} />
    </div>
  );
};

export default AppPage;
