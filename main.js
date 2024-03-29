// Definicion de producto

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

let productosML = [];;
// await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=sillas`).then((response) => response.json()).then((informacion) => productosML = informacion.results);

async function getData(busqueda){
    return await fetch(`https://api.mercadolibre.com/sites/MLA/search?q=${busqueda}`).then(response => response.json()).then((data)=>{return data});

}

async function iniciar(){
    document.getElementById("spn").innerHTML = 
    `<div class="d-flex justify-content-center mt-5">
        <div class="spinner-border" role="status">
            <span class="sr-only">Loading...</span>
        </div>
    </div>
    `;
    productosNike = await getData("nike");
    productosAdidas = await getData("adidas");
    productosTelefono = await getData("telefonos");
    productosML = productosNike.results.concat(productosAdidas.results, productosTelefono.results);
    mostrarProductos(productosML);
    document.getElementById("spn").innerHTML = "";
    renderCarro(carrito);
    calcularTotal(carrito);
}


// Se inician variables

// Tomo el div donde se insertaran los productos
const divListado = document.getElementById("listadoProductos");

//Tomo el div donde se insertan los productos en el carro

const divCarro = document.getElementById("items-wrapper");

// Array que contiene los productos en el carro
let carrito = JSON.parse(localStorage.getItem("carritoLS")) ?? [];

let total = 0;

let productosFiltrados = [];

let boton = document.getElementById("btn-buy")
let barra = document.getElementById("searchForm");
let lupa = document.getElementById("search-icon");
let trashbin = document.getElementById("delete-icon").addEventListener("click", vaciarCarro);
barra.addEventListener('submit', filtrarProductos);
lupa.addEventListener("click", filtrarProductos);
boton.addEventListener("click", realizarCompra);

function guardarLocal(clave, valor){
    localStorage.setItem(clave,valor);
}

function renderCarro(carro){
    divCarro.innerHTML = "";
    carro.forEach((productoCarro) => {
        let item =  productosML.find((producto)=> producto.id == productoCarro.id)
        const {id ,title, price} = item;
        let img = item.thumbnail;
        divCarro.innerHTML += 
        `<div class="cart-item row" id="producto-${id}">
            <div class="col-3 img-cart-wrapper">
                <img class="img-cart" src="${img}" alt="imagen producto" class="img-fluid">
            </div>
            <div class="col-9">
                <div class="w-100 card-item-data">
                    <div class="d-flex flex-row justify-content-between">
                        <h5>${title} </h5>
                        <div class="cart-icon-delete text-right">
                            <button onclick="borrarDelCarro('${id}')" id="del-cart-${id}" type="button" class="btn btn-delete">
                                <i class="fa-solid fa-trash-can"></i>
                            </button>
                        </div>
                    </div>
                    <div class="input-wrapper d-flex justify-content-between align-items-center">
                        <div id ="buttons">
                            <i class="fa-solid fa-minus" onclick=decrementar('${id}')></i>  
                            <div id="${id}" class="quantity"> ${productoCarro.cantidad} </div>
                            <i class="fa-solid fa-plus"onclick=incrementar('${id}')></i>
                        </div>
                        <h6 class="precio d-inline">$ ${price}</h6>
                    </div>
                </div>
            </div>
        </div>`;
    })
    
}

async function getItem(idProducto){
    return await fetch(`https://api.mercadolibre.com/items/${idProducto}`).then(response => response.json()).then((data)=>{return data});
}

// Funcion para agregar un producto al carro
function agregarAlCarro(producto){
    // Agrega el producto al array del carro

    const index = carrito.findIndex((productoCarro) => productoCarro.id == producto.id);
    if(index != -1){
        carrito[index].cantidad++;
    }
    else{
        carrito = [...carrito, {id: producto.id, cantidad: 1}];
    }
    guardarLocal("carritoLS", JSON.stringify(carrito));
    
    alertaCarro(producto);
    document.getElementById("cart-quantity").innerText = getCantidad(carrito);
    calcularTotal(carrito);
    renderCarro(carrito);
    
}


function alertaCarro(producto){
    const {title} = producto;
    Toastify({
        text: `Agregaste ${title} al carro`,
        duration: 1500,
        close: false,
        gravity: "top", 
        position: "right", 
        stopOnFocus: false,
        style: {
          background: "linear-gradient(to right, #00b09b, #96c93d)",
        },
      }).showToast();
}

function borrarDelCarro(idProducto){
    const index = carrito.findIndex((producto) => producto.id == idProducto);
    Swal.fire({
        title: `¿Desea eliminar el producto ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) =>{
        if(result.isConfirmed){
            if(index != -1){
                carrito.splice(index, 1);
                document.getElementById(`producto-${idProducto}`).remove();
            }
            document.getElementById("cart-quantity").innerText = getCantidad(carrito);
            guardarLocal("carritoLS", JSON.stringify(carrito));
            calcularTotal(carrito);
        }
    })

}

function vaciarCarro(event){
    if(carrito.length == 0) return;
    Swal.fire({
        title: `¿Desea vaciar el carro ?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) =>{
        if(result.isConfirmed){
            carrito = [];
            document.getElementById("cart-quantity").innerText = getCantidad(carrito);
            guardarLocal("carritoLS", JSON.stringify(carrito));
            renderCarro(carrito);
            calcularTotal(carrito);
        }
    })
}

function calcularTotal(listadoCarro){

    // Se reinicia la variable
    total = 0
    listadoCarro.forEach((productoCarro) =>{
        let item  = productosML.find((p)=> p.id == productoCarro.id)
        total += productoCarro.cantidad * item.price ;
        
    })
    // total = listadoCarro.length > 0 ? listadoCarro.reduce((acc, el) => acc + Number(el.precio),0) : 0;
    document.getElementById("precio").innerText = `$ ${total}`;
    let cartDiv = document.getElementById("cart-info");

    if(total === 0){
        cartDiv.classList.remove("show");
        boton.classList.remove("show");

        cartDiv.classList.add("hide");
        boton.classList.add("hide");
    }else{
        cartDiv.classList.add("show");
        boton.classList.add("show");

        cartDiv.classList.remove("hide")
        boton.classList.remove("hide")
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
        const {id ,title, price} = producto;
        let imgs = getImg(producto.thumbnail);
        divListado.innerHTML += 
        `<div class="col-md-4 col-lg-3"> 
            <div class="card-wrapper">
                <div class="card-front">
                    <div class="card h-100">
                        <img src="${imgs}" alt="imagen producto" class="card-img-top">
                        <div class='card-body d-flex flex-column justify-content-between'>
                            <h5 class='card-title'> ${title}</h5>
                        </div>
                    </div>
                </div>
                <div class="card-back">
                    <div class="card h-100">
                        <div class='card-body d-flex flex-column justify-content-center'>
                            <h6 class='card-subtitle text-center'>$${price}</h6>
                            <button id='add-cart-${id}' class="btn-add align-self-center"><i class="fa-solid fa-cart-shopping fa-2x"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    }) 
    addEventos(listado);
}

function getImg(img){
    return img.replace("I","O");
}


function filtrarProductos(event) {
    let filter = document.getElementById("searchBar").value.toUpperCase();
    if(filter === ""){
        mostrarProductos(productosML);
    }
    else{
        productosFiltrados = productosML.filter((el) => el.title.toUpperCase().includes(filter));
        if(productosFiltrados.length == 0){
            Swal.fire({
                title: `No se encontraron productos`,
                icon: "error",
            })
        }
        else
        {
            mostrarProductos(productosFiltrados);
        }
    }

    event.preventDefault()
}

function realizarCompra(event){
    // Codigo del backend para la compra
    Swal.fire({
        title: `¿Desea realizar la compra?`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Si",
        cancelButtonText: "No"
    }).then((result) =>{
        if(result.isConfirmed){
            Swal.fire({
                title: '¡Genial!',
                text: `Tu compra se realizo con éxito!!!`,
                icon: 'success',
                confirmButtonText: 'Ok'
            });
            // Se vacia el carro luego de la compra
            carrito = [];
            document.getElementById("cart-quantity").innerText = getCantidad(carrito);
            guardarLocal("carritoLS", JSON.stringify(carrito));
            calcularTotal(carrito);
            renderCarro(carrito);
        }
    })
    
    
}


function getCantidad(carro){
    let cantidad = 0;
    carro.forEach((producto)=>{
        cantidad += producto.cantidad;
    })
    return cantidad;
}

function incrementar(idProducto){
    let index = carrito.findIndex((producto) => producto.id == idProducto);
    carrito[index].cantidad++;
    guardarLocal("carritoLS", JSON.stringify(carrito));
    calcularTotal(carrito);
    renderCarro(carrito);
}

function decrementar(idProducto){
    let index = carrito.findIndex((producto) => producto.id == idProducto);
    if(carrito[index].cantidad - 1 != 0 ){
        carrito[index].cantidad--;
        guardarLocal("carritoLS", JSON.stringify(carrito));
        calcularTotal(carrito);
        renderCarro(carrito);
    }else{
        borrarDelCarro(idProducto);
        
    }
    
}

// Llamadas a funciones

guardarLocal("listadoProductos", JSON.stringify(productos));


document.getElementById("cart-quantity").innerText = getCantidad(carrito);


iniciar();

