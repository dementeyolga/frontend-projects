class AppRouter {
  constructor(pageEl) {
    this.page = pageEl;
  }

  changeRout(rout) {
    // history.pushState(rout, '', rout);
    this.currentRout = rout;
  }
}

export { AppRouter };
