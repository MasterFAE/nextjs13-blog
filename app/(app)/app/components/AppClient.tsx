"use client";
import {
  Card,
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
} from "@/components/ui/card";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import { ICanva } from "@/shared/interface";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import axios from "axios";
import { toast } from "react-hot-toast";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";
import { useDispatch, useSelector } from "react-redux";
import { deleteCanva } from "@/redux/stores/canvas";
import axiosInstance from "@/shared/axios";

interface Props {
  children?: React.ReactNode;
  canvas: ICanva[];
}

const AppClient: React.FC<Props> = ({ children, canvas }) => {
  const [canvasList, setCanvasList] = React.useState<ICanva[]>(canvas);
  const pathName = usePathname();
  const router = useRouter();
  const currentCanvaId = pathName.split("/")[2];
  const handleDeleteButton = async (id: string) => {
    // dispatch(deleteCanva(id));
    await axiosInstance.delete(`/canva/${id}`);
    setCanvasList(canvasList.filter((e) => e._id !== id));
    router.refresh();
    toast.success("Canva deleted");
  };

  return (
    <div className="grid grid-cols-10 mt-4 gap-8 min-h-[70vh]">
      <div className="col-span-4 md:col-span-3 xl:col-span-2 h-full">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>Canvas</CardTitle>
            <CardDescription>You can see all your canvas here</CardDescription>
            <Separator />
          </CardHeader>
          <CardContent>
            <div className="flex flex-col divide-y">
              {canvas.map((e) => (
                <div
                  key={e._id}
                  className={cn(
                    "flex w-full justify-between p-1 font-medium text-muted-foreground hover:text-primary items-center hover:bg-muted",
                    e._id === currentCanvaId &&
                      "hover:text-muted-foreground text-primary bg-muted transition-colors"
                  )}>
                  <div className="w-full">
                    <Link key={e._id} href={`/app/${e._id}`} className="">
                      <h3
                        className={cn(
                          "text-medium text-lg truncate",
                          e._id === currentCanvaId && "text-primary"
                        )}>
                        {e.title}
                      </h3>
                    </Link>
                  </div>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button size={"icon"} variant={"ghost"} className="">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent side="bottom" className="w-24">
                      <button
                        onClick={() => handleDeleteButton(e._id)}
                        className="text-center hover:text-destructive focus:text-destructive cursor-pointer">
                        Delete
                      </button>
                    </PopoverContent>
                  </Popover>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Canva */}
      <div className="col-span-6 h-full md:col-span-7 xl:col-span-8">
        {children}
      </div>
    </div>
  );
};

export default AppClient;
