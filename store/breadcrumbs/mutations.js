export default {
    addPositionedBreadcrumb(state, {todo}) {
        if(state.steps < todo.step) {
            console.log("Push Item");
            state.steps++;
            state.items.push({text: todo.text, link: todo.link});
        } else if (todo.step === 1) {
            console.log("Push Item after Emptying");
            state.steps = todo.step;
            state.items.push({text: todo.text, link: todo.link});
        } else {
            console.log("Replace Item");
            state.items[todo.step - 1].text = todo.newText;
            state.items[todo.step - 1].link = todo.link;
            state.steps = todo.step;
        }
    },
    clear(state) {
        state.steps = 0;
        state.items = [];
    }
}