export default {
    addBreadcrumb(state, newText) {
        state.steps++;
        state.text.push(newText);
    },
    clearBreadcrumb(state) {
        state.steps = 0;
        state.text = [];
    },
    addPositionedBreadcrumb(state, { todo }) {
        state.text[todo.step-1] = todo.newText;
        state.steps = todo.step;
    }
}