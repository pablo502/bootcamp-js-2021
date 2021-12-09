const preloadedState = {
    producto: {},
    productos: []
};

const middleware = Redux.applyMiddleware(loggerMiddleware);
const store = Redux.createStore(reducer, preloadedState, middleware);

let latestState;

store.subscribe(() =>  {
    let currentState = store.getState();
    if (currentState !== latestState) {
        latestState = currentState;
        ui.renderForm(currentState.producto);
        ui.renderTable(currentState.productos);
    } 
});

ui.onFormSubmit = (payload) => {
    if (payload.codigo) {
        store.dispatch(productoModificado(payload));
    } else {
     store.dispatch(productoAgregado(payload));
    }
 
    store.dispatch(productoSeleccionado(null));
};

ui.onEliminarClick = (codigo) => {
    store.dispatch(productoEliminado(codigo))
};

ui.onEditarClick = (codigo) => {
    store.dispatch(productoSeleccionado(codigo))
};