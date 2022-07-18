
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

// Array que contiene los productos en el carro, por ahora no se utiliza
const carrito = [];
let total = 0;

let productosFiltrados = [];

// Se agrega un producto al listado para probar el método push
productos.push({id:60, nombre:"Pantalones", marca:"Adidas", precio: 8000});

// Funcion para agregar un producto al carro, no se utiliza por el momento
function agregarAlCarro(producto){
    carrito.push(producto);
    console.log(carrito);
}

function borrarDelCarro(idProducto){
    const index = carrito.findIndex((producto) => producto.id == idProducto);
    
    if(index != -1){
        carrito.splice(index, 1);
    }

    console.log(carrito);
}

function calcularTotal(listadoCarro){
    // Se reinicia la variable
    total = 0;
    for(const producto of listadoCarro){
        total+= producto.precio;
    }
    console.log(total);
}

// Me crea una card de bootstrap por cada producto del listado
function mostrarProductos(listado){
    for(const producto of listado){
        divListado.innerHTML += `<div class="col"> <div class="card"><img src="public/img/000000.png" alt="imagen producto" class="card-img-top"><div class='card-body'><h5 class='card-title'> ${producto.nombre} ${producto.marca}</h5><h6 class='card-subtitle mb-2 text-muted'>$ ${producto.precio}</h6><div class="card-content d-flex justify-content-center align-items-center">
        <button href="#" class="btn btn-primary">Agregar al carro</button>
    </div></div></div></div>`;
    }    
    
}

// Se solicita que el usuario ingrese un producto o marca, y se guarda
const respuesta = prompt("Ingrese el producto o marca que está buscando. (Ingrese Todos para ver el listado completo)");

// Si el usuario ingreso TODOS
if (respuesta.toUpperCase() == "TODOS"){
    mostrarProductos(productos);
}
else {
    productosFiltrados = productos.filter((el) => el.nombre.toUpperCase() == respuesta.toUpperCase() || el.marca.toUpperCase() == respuesta.toUpperCase());
    if(productosFiltrados.length == 0){
        divListado.innerHTML = "<div class='display-5'> No se encontraron productos </div>"
    } else{
        mostrarProductos(productosFiltrados);
    }
}

// Simulacion del proceso

// Se agregan dos productos al carro, se calcula el total, y se eliminan algunos productos
agregarAlCarro({id:60, nombre:"Pantalones", marca:"Adidas", precio: 8000});
agregarAlCarro({ id:59, nombre:"Pantalones", marca:"Nike", precio:9500});

calcularTotal(carrito);
borrarDelCarro(60);
calcularTotal(carrito);

console.log(productos);
