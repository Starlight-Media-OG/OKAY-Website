export default {
    toggle(state) {
        state.menuActive = !state.menuActive
    },
    hide(state) {
        state.menuActive = false;
    }
}