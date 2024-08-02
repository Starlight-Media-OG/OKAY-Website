interface menuStore {
  menuActive: boolean;
}

const initalMenuStoreState = {
  menuActive: false,
};

export const useMenuStore = defineStore("menu", {
  state: (): menuStore => initalMenuStoreState,
  actions: {
    toggleMenu() {
      this.menuActive = !this.menuActive;
    },
    hideMenu() {
      this.menuActive = false;
    },
  },
});
