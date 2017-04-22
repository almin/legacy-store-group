// MIT © 2017 azu
"use strict";
const { Store } = require("almin");
/**
 * @param {string} name
 * @param {*} state
 * @returns {TestStore}
 */
function createStore({
    name,
    state
}) {
    class TestStore extends Store {
        constructor() {
            super();
            this.name = name;
            this.state = state || "value";
        }

        updateState(newState) {
            this.state = newState;
        }

        getState() {
            return {
                [name]: this.state
            };
        }
    }
    return new TestStore();
}

module.exports.createStore = createStore;