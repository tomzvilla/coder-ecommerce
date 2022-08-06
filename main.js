class Producto{
    constructor(id, nombre, marca, precio){
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio
    }
}

// Listado de productos, se deberia obtener del backend
const productos =[
    new Producto(51, "Zapatillas", "Nike", 12000),
    new Producto(52, "Zapatillas", "Converse", 8500),
    new Producto(53, "Zapatillas", "Adidas", 12500),
    new Producto(54, "Remera", "Gucci", 19000),
    new Producto(55, "Remera", "Lacoste", 11000),
    new Producto(56, "Buzo", "Supreme", 22000),
    new Producto(57, "Buzo", "Gucci", 25000),
    new Producto(58, "Camisa", "Lacoste", 9500),
    new Producto(59, "Pantalones", "Nike", 9500),
];

// Se agrega un producto al listado para probar el método push
productos.push(new Producto(60, "Pantalones", "Adidas", 8000))


function guardarLocal(clave, valor){
    localStorage.setItem(clave,valor);
}

guardarLocal("listadoProductos", JSON.stringify(productos));


// Tomo el div donde se insertaran los productos
const divListado = document.getElementById("listadoProductos");

//Tomo el div donde se insertan los productos en el carro

const divCarro = document.getElementById("items-wrapper");

// Array que contiene los productos en el carro, por ahora no se utiliza
let carrito = JSON.parse(localStorage.getItem("carritoLS")) ?? [];
document.getElementById("cart-quantity").innerText = carrito.length;
renderCarro(carrito);

let total = 0;

let productosFiltrados = [];


mostrarProductos(productos);


function renderCarro(carro){
    divCarro.innerHTML = "";
    carro.forEach((producto) => {
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
    })
    
}

calcularTotal(carrito);

// Funcion para agregar un producto al carro
function agregarAlCarro(producto){
    // Agrega el producto al array del carro
    carrito.push(producto);
    guardarLocal("carritoLS", JSON.stringify(carrito));
    document.getElementById("cart-quantity").innerText = carrito.length;
    calcularTotal(carrito);
    renderCarro(carrito);
}

function borrarDelCarro(idProducto){
    const index = carrito.findIndex((producto) => producto.id == idProducto);
    
    if(index != -1){
        carrito.splice(index, 1);
        document.getElementById(`producto-${idProducto}`).remove();
    }
    document.getElementById("cart-quantity").innerText = carrito.length;
    guardarLocal("carritoLS", JSON.stringify(carrito));
    calcularTotal(carrito);
}



function calcularTotal(listadoCarro){
    // Se reinicia la variable
    total = listadoCarro.length > 0 ? listadoCarro.reduce((acc, el) => acc + Number(el.precio),0) : 0;
    document.getElementById("precio").innerText = `$ ${total}`;
    let cartDiv = document.getElementById("cart-info");
    if(total === 0){
        cartDiv.classList.remove("show");
        cartDiv.classList.add("hide")
    }else{
        cartDiv.classList.add("show");
        cartDiv.classList.remove("hide")
    }
    
}

function addEventos(listados){
    listados.forEach((producto)=>{
        document.getElementById(`add-cart-${producto.id}`).addEventListener("click",()=>{
        agregarAlCarro(producto)
    })
    })
}

// Me crea una card de bootstrap por cada producto del listado
function mostrarProductos(listado){
    divListado.innerHTML = "";
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
    addEventos(listado);
}

let barra = document.getElementById("searchForm");
barra.addEventListener('submit', filtrarProductos)

function filtrarProductos(event) {
    let filter = document.getElementById("searchBar").value.toUpperCase();
    if(filter === ""){
        mostrarProductos(productos);
    }
    else{
        productosFiltrados = productos.filter((el) => el.nombre.toUpperCase() == filter || el.marca.toUpperCase() == filter);
        if(productosFiltrados.length == 0){
            divListado.innerHTML = "<div class='display-5'> No se encontraron productos </div>"
        }
        else
        {
            mostrarProductos(productosFiltrados);
        }
    }

    event.preventDefault()
}







