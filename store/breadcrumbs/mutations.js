export default {
    addPositionedBreadcrumb(state, {todo}) {
        if(state.steps < todo.step) {
            state.steps = todo.step;
            state.items.push({text: todo.text, link: todo.link});
        } else {
            state.items[todo.step - 1].text = todo.text;
            state.items[todo.step - 1].link = todo.link;
            state.steps = todo.step;
        }
    },
    clear(state) {
        state.steps = 0;
        state.items = [];
    }
}