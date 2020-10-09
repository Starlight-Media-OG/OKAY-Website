export default {
    getSteps(state) {
        return state.steps
    },
    getText(state, index) {
        return state.text[index];
    },
    getTexts(state) {
        return state.text;
    }
}