import React from "react";

import { Separator } from "@/components/ui/separator";
import { ListPlus, Loader2 } from "lucide-react";
import CreateTodoDialog from "./components/CreateTodoDialog";

import { Metadata } from "next";

import { PreloadedState } from "@/redux/preloader/preloader";
import StoreProvider from "@/redux/StoreProvider";
import TodosList from "./components/TodosList";
import preloaderActions from "@/redux/preloader/actions";

import axiosInstance from "@/shared/axios";
import getCanvas from "@/shared/actions/getCanvas";
import getCanvaById from "@/shared/actions/getCanvaById";
import CanvaClient from "./components/CanvaClient";

type Props = {
  params: {
    canvaId: string;
  };
};

export const metadata: Metadata = {
  title: "Canva - Todi",
  description: "You can create your own to-do list and manage it easily.",
};

const CanvaPage: React.FC<Props> = async ({ params }) => {
  const canva = await getCanvaById(params.canvaId);
  if (!canva)
    return (
      <div className="flex justify-center h-full items-center gap-x-2">
        <ListPlus className="w-4 h-4 text-muted-foreground" />
        <p className="text-base text-muted-foreground">Canva not found</p>
      </div>
    );
  if (canva.loading) {
    return (
      <div className="flex justify-center h-full items-center gap-x-2">
        <Loader2 className="animate-spin w-5 h-5" />
      </div>
    );
  }
  return <CanvaClient canva={canva} />;
};

export default CanvaPage;
