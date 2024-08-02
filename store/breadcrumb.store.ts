import { assert } from "@vue/compiler-core";
import type { Breadcrumb } from "~/models/breadcrumb.model";

interface BreadcrumbStoreState {
  steps: number;
  items: Breadcrumb[];
}

export const useBreadcrumbStore = defineStore("breadcrumb", {
  state: (): BreadcrumbStoreState => ({
    steps: 0,
    items: [],
  }),
  actions: {
    addBreadcrumb(breadcrumb: Breadcrumb) {
      if (!breadcrumb.step) {
        return;
      }

      if (this.steps < breadcrumb.step) {
        this.steps = breadcrumb.step;
        this.items.push({ text: breadcrumb.text, link: breadcrumb.link });
      } else {
        this.items[breadcrumb.step - 1].text = breadcrumb.text;
        this.items[breadcrumb.step - 1].link = breadcrumb.link;
        this.steps = breadcrumb.step;
      }
    },
  },
});
