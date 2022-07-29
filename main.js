
// Listado de productos, se deberia obtener del backend
const productos =[
    { id:51, nombre:"Zapatillas", marca:"Nike", precio:12000},
    { id:52, nombre:"Zapatillas", marca:"Adidas", precio:12500},
    { id:53, nombre:"Zapatillas", marca:"Converse", precio:8500},
    { id:54, nombre:"Remera", marca:"Gucci", precio:19000},
    { id:55, nombre:"Remera", marca:"Lacoste", precio:11000},
    { id:56, nombre:"Buzo", marca:"Supreme", precio:22000},
    { id:57, nombre:"Buzo", marca:"Gucci", precio:25000},
    { id:58, nombre:"Camisa", marca:"Lacoste", precio: 9500},
    { id:59, nombre:"Pantalones", marca:"Nike", precio:9500},
];

// Tomo el div donde se insertaran los productos
const divListado = document.getElementById("listadoProductos");

//Tomo el div donde se insertan los productos en el carro

const divCarro = document.getElementById("items-wrapper");

// Array que contiene los productos en el carro, por ahora no se utiliza
const carrito = [];
let total = 0;

let productosFiltrados = [];

// Se agrega un producto al listado para probar el método push
productos.push({id:60, nombre:"Pantalones", marca:"Adidas", precio: 8000});

// Funcion para agregar un producto al carro, no se utiliza por el momento
function agregarAlCarro(producto){
    // Agrega el producto al array del carro
    carrito.push(producto);
    console.log(carrito);

    // Dibuja el producto en el carro
    divCarro.innerHTML += 
    `<div class="cart-item row" id="producto-${producto.id}">
        <div class="col-3 img-cart-wrapper">
            <img class="img-cart" src="public/img/000000.png" alt="imagen producto" class="img-fluid">
        </div>
        <div class="col-9">
            <div class="w-100 card-item-data">
                <div class="d-flex flex-row justify-content-between">
                    <h5>${producto.nombre} ${producto.marca} </h5>
                    <div class="cart-icon-delete text-right">
                        <button onclick="borrarDelCarro(${producto.id})" id="del-cart-${producto.id}" type="button" class="btn btn-delete">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </div>
                </div>
                <h6 class="precio">$ ${producto.precio}</h6>
            </div>
        </div>
    </div>`;
    document.getElementById("cart-quantity").innerText = carrito.length;
}

function borrarDelCarro(idProducto){
    const index = carrito.findIndex((producto) => producto.id == idProducto);
    
    if(index != -1){
        carrito.splice(index, 1);
        document.getElementById(`producto-${idProducto}`).remove();
    }
    document.getElementById("cart-quantity").innerText = carrito.length;
    console.log(carrito);
}



function calcularTotal(listadoCarro){
    // Se reinicia la variable
    total = 0;
    listadoCarro.forEach((producto) =>{
        total+= producto.precio;
    })
    console.log(total);
}

// Me crea una card de bootstrap por cada producto del listado
function mostrarProductos(listado){
    listado.forEach((producto)=>{
        divListado.innerHTML +=
        `<div class="col"> 
            <div class="card">
                <img src="public/img/000000.png" alt="imagen producto" class="card-img-top">
                <div class='card-body'>
                    <h5 class='card-title'> ${producto.nombre} ${producto.marca}</h5>
                    <h6 class='card-subtitle mb-2 text-muted'>$ ${producto.precio}</h6>
                    <div class="card-content d-flex justify-content-center align-items-center">
                        <button id='add-cart-${producto.id}' class="btn btn-primary">Agregar al carro</button>
                    </div>
                </div>
            </div>
        </div>`;
    }) 
    
}


// Se solicita que el usuario ingrese un producto o marca, y se guarda
const respuesta = prompt("Ingrese el producto o marca que está buscando. (Ingrese Todos para ver el listado completo)");

// Si el usuario ingreso TODOS
if (respuesta.toUpperCase() == "TODOS"){
    productosFiltrados = productos
    mostrarProductos(productosFiltrados);
}
else {
    productosFiltrados = productos.filter((el) => el.nombre.toUpperCase() == respuesta.toUpperCase() || el.marca.toUpperCase() == respuesta.toUpperCase());
    if(productosFiltrados.length == 0){
        divListado.innerHTML = "<div class='display-5'> No se encontraron productos </div>"
    } else{
        mostrarProductos(productosFiltrados);
    }
}
productosFiltrados.forEach((producto)=>{
    document.getElementById(`add-cart-${producto.id}`).addEventListener("click",()=>{
        agregarAlCarro(producto);
    })
})

