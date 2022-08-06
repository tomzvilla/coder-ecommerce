class Producto{
    constructor(id, nombre, marca, precio, img){
        this.id = id;
        this.nombre = nombre;
        this.marca = marca;
        this.precio = precio
        this.img = img;
    }
}

// Listado de productos, se deberia obtener del backend
const productos =[
    new Producto(51, "Zapatillas", "Nike", 12000,"https://static.nike.com/a/images/f_auto/dpr_1.0,cs_srgb/w_581,c_limit/0211c46f-29ec-4662-8674-2a654ee9224d/nike-air-huarache-liverpool.png"),
    new Producto(52, "Zapatillas", "Converse", 8500,"https://backend.converse.com.ar/media/image/8c/f8/faf5e538823196481f411e778ea6.jpg"),
    new Producto(53, "Zapatillas", "Adidas", 12500,"https://assets.adidas.com/images/w_600,f_auto,q_auto/09c5ea6df1bd4be6baaaac5e003e7047_9366/Zapatillas_Forum_Low_Blanco_FY7756_01_standard.jpg"),
    new Producto(54, "Remera", "Gucci", 19000, "https://media.gucci.com/style/DarkGray_South_0_160_316x316/1654727449/703439_XJEIY_9095_001_100_0000_Light-Gucci-pear-print-cotton-T-shirt.jpg"),
    new Producto(55, "Remera", "Lacoste", 11000, "//imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw6fb91508/TH7391_786_24.jpg?imwidth=915&impolicy=product"),
    new Producto(56, "Buzo", "Supreme", 22000, "//assets.supremenewyork.com/227599/zo/Xcqf1CCpmu9.jpg"),
    new Producto(57, "Buzo", "Gucci", 25000, "//media.gucci.com/style/DarkGray_South_0_160_316x316/1620743404/454585_X5J57_9541_001_100_0000_Light-Oversize-sweatshirt-with-Gucci-logo.jpg"),
    new Producto(58, "Camisa", "Lacoste", 9500, "//imagesa1.lacoste.com/dw/image/v2/BCWL_PRD/on/demandware.static/-/Sites-master/default/dw00377eff/CH4990_166_24.jpg?imwidth=915&impolicy=product"),
    new Producto(59, "Pantalones", "Nike", 9500, "https://www.dexter.com.ar/on/demandware.static/-/Sites-dabra-catalog/default/dw0f2dbf51/products/NI_CU5525-010/NI_CU5525-010-1.JPG"),
];

// Se agrega un producto al listado para probar el método push
productos.push(new Producto(60, "Pantalones", "Adidas", 8000,"https://assets.adidas.com/images/w_600,f_auto,q_auto/00d0eeedcadb44a1b1c9ae0d0102f02a_9366/Pantalon_Adicolor_Classics_Firebird_Primeblue_Azul_HB9386_21_model.jpg"))


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
        const {id ,nombre, marca, precio, img} = producto;
        divCarro.innerHTML += 
        `<div class="cart-item row" id="producto-${id}">
            <div class="col-3 img-cart-wrapper">
                <img class="img-cart" src="${img}" alt="imagen producto" class="img-fluid">
            </div>
            <div class="col-9">
                <div class="w-100 card-item-data">
                    <div class="d-flex flex-row justify-content-between">
                        <h5>${nombre} ${marca} </h5>
                        <div class="cart-icon-delete text-right">
                            <button onclick="borrarDelCarro(${id})" id="del-cart-${id}" type="button" class="btn btn-delete">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                    <h6 class="precio">$ ${precio}</h6>
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
        const {id ,nombre, marca, precio, img} = producto;
        divListado.innerHTML +=
        `<div class="col"> 
            <div class="card">
                <img src="${img}" alt="imagen producto" class="card-img-top card-image">
                <div class='card-body'>
                    <h5 class='card-title'> ${nombre} ${marca}</h5>
                    <h6 class='card-subtitle mb-2 text-muted'>$ ${precio}</h6>
                    <div class="card-content d-flex justify-content-center align-items-center">
                        <button id='add-cart-${id}' class="btn btn-primary">Agregar al carro</button>
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







