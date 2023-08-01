import { store } from "@/redux";
import { PreloadedState } from "./preloader";
import { getCanvaById, getCanvas } from "@/redux/stores/canvas";
import { getCurrentUser } from "../stores/user";

const preloaderActions = {
  getCanvas: async () => {
    await store.dispatch(getCanvas());
    const { canvas } = store.getState().canva;
    PreloadedState.pushState({
      canva: {
        ...PreloadedState.getState().canva,
        canvas,
      },
    });
    console.log("Canvas Action: " + PreloadedState.getState());
  },
  getCanvaById: async (id: string) => {
    await store.dispatch(getCanvaById(id));
    const { currentCanva } = store.getState().canva;
    PreloadedState.pushState({
      canva: {
        ...PreloadedState.getState().canva,
        currentCanva,
      },
    });
  },
  getUser: async () => {
    await store.dispatch(getCurrentUser());
    const user = store.getState().user;
    PreloadedState.pushState({
      user,
    });
  },
};

export default preloaderActions;
