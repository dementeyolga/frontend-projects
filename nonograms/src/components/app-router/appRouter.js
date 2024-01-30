class AppRouter {
  constructor(pageEl) {
    this.page = pageEl;
    this.page;
  }

  changeRout(rout) {
    history.pushState(rout, '', rout);
  }
}

export { appRouter };
