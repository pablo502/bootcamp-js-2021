const form = document.getElementsByTagName("form")[0];
const tbody = document.getElementsByTagName("tbody")[0];
/** @type {HTMLInputElement} */
const txtNombre = document.getElementById("nombre");
const cantidadTotalElement = document.getElementById("cantidad-total");
const precioTotalElement = document.getElementById("precio-total");
const granTotalElement = document.getElementById("gran-total");
/** @type {HTMLInputElement} */
const txtPrecio = document.getElementById("precio");
/** @type {HTMLInputElement} */
const txtCantidad = document.getElementById("cantidad");
/** @type {HTMLInputElement} */
const selectedCategoria = document.getElementById("categoria");
/** @type {HTMLInputElement} */
const txtCodigo = document.getElementById("codigo");

const preloadedState = {
    producto: {},
    productos: []
};

let indice = 0;

const reducer = (state, action) => {
    if (action.type == "producto-agregado") {
        indice++;
        const producto = action.payload;
        const codigo = indice;
        const total = producto.cantidad * producto.precio;
        return {
            ...state,
            productos: [
                ...state.productos, { ...producto,
                codigo,
                total}
            ]
        };
    }

    if (action.type == "producto-modificado") {
        const producto = action.payload;
        const productos = state.productos.slice();
        const codigo = producto.codigo;
        const total = producto.cantidad * producto.precio;
        const old = productos.find((item) => item.codigo == codigo);
        const index = productos.indexOf(old);
        productos[index] = {...producto, total};
        return {
            ...state,
            productos
        };
    }

    if (action.type == "producto-eliminado") {
        const codigo = action.payload.codigo;
        const productos = state.productos.filter((item) => item.codigo != codigo);
        return {
            ...state,
            productos
        }
    }
    return state;
};

const store = Redux.createStore(reducer, preloadedState);

let latestState;

store.subscribe(() =>  {
    let currentState = store.getState();
    if (currentState !== latestState) {
        latestState = currentState;
        console.log("estado: ", store.getState());
        renderTable(currentState.productos)
    } 
});

function renderTable(productos) {

    

    const filas = productos.map((item) => {
        const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${item.codigo}</td>
        <td>${item.nombre}</td>
        <td>${item.cantidad}</td>
        <td>${item.precio}</td>
        <td>${item.total}</td>
        <td>
        <div class="btn-group">
            <a title="Editar" href="#" class="btn btn-sm btn-outline-secondary"><i class="bi bi-pencil-square"></i></a>
            <a title="Eliminar" href="#" class="btn btn-sm btn-outline-danger"><i class="bi bi-trash"></i></a>
        </div>
        </td>
    `;
    const [editar, eliminar] = tr.getElementsByTagName("a");

    eliminar.addEventListener("click" , (event) => {
        event.preventDefault();
        store.dispatch({
            type: "producto-eliminado",
            payload: { 
                codigo: item.codigo
            }
        })
    });

    return tr;
    });

    tbody.innerHTML = "";
    filas.forEach((tr) => {
        tbody.appendChild(tr);
    });

    cantidadTotalElement.innerText = sum(productos, x => x.cantidad);
    precioTotalElement.innerText = sum(productos, x => x.precio);
    granTotalElement.innerText = sum(productos, x => x.total);

    function sum(elementos, selector) {
        return elementos
            .map(selector)
            .reduce((a, b) => a + b, 0);
    }

}

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba a",
        cantidad: 3,
        precio: 10,
        cateogoria: 2
    }
});

store.dispatch({
    type: "producto-modificado",
    payload: {
        codigo: 1,
        nombre: "prueba a v2",
        cantidad: 6,
        precio: 8,
        cateogoria: 3
    }
});

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba b",
        cantidad: 6,
        precio: 8,
        cateogoria: 3
        
    }
});

store.dispatch({
    type: "producto-agregado",
    payload: {
        nombre: "prueba c",
        cantidad: 2,
        precio: 4,
        cateogoria: 4
    }
});

store.dispatch({
    type: "producto-eliminado",
    payload: {
        codigo: 2
    }
});