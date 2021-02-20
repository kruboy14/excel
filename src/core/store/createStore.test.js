const { createStore } = require("./createStore");

const initialState = {
  count: 0,
};

const reducer = (state = 0, action) => {
  if (action.type === "ADD") {
    return { ...state, count: state.count + 1 };
  }
  return state;
};

describe("createStore:", () => {
  let store;
  let handler;

  beforeEach(() => {
    store = createStore(reducer, initialState);
    handler = jest.fn();
  });
  test("should return store object", () => {
    expect(store.dispatch).toBeDefined();
    expect(store.subscribe).toBeDefined();
    expect(store.getState).not.toBeUndefined();
  });

  test("should return object as a state", () => {
    expect(store.getState()).toBeInstanceOf(Object);
  });

  test("should return default state", () => {
    expect(store.getState()).toEqual(initialState);
  });

  test("should change state if action exist", () => {
    store.dispatch({ type: "ADD" });
    expect(store.getState().count).toBe(1);
  });

  test("should call sub function", () => {
    store.subscribe(handler);

    store.dispatch({ type: "ADD" });
    expect(handler).toHaveBeenCalled()
    expect(handler).toHaveBeenCalledWith(store.getState())
  });

  test("should dispatch async", () => {
    return new Promise(resolve => {
      setTimeout(() => {
        store.dispatch({ type: "ADD" });
      }, 500);

      setTimeout(() => {
        expect(store.getState().count).toBe(1)
        resolve()
      }, 1000);
    })
  })
});