export class PreloadedState {
  public static state: any = {};

  constructor() {
    PreloadedState.state = {};
  }

  public static getState(reset: Boolean = false) {
    const state = PreloadedState.state;
    if (reset) {
      console.log("RESET TRIGGERED");
      PreloadedState.resetState();
    }
    return state;
  }

  public static pushState(item: object) {
    PreloadedState.state = { ...PreloadedState.state, ...item };
  }

  public static resetState() {
    PreloadedState.state = {};
  }
}
