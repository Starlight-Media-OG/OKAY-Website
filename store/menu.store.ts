interface menuStore {
  menuActive: boolean;
}

export const useMenuStore = defineStore("menu", {
  state: (): menuStore => ({
    menuActive: false,
  }),
  actions: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    hideMenu() {
      this.menuActive = false;
    },
  },
});
