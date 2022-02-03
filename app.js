const items = document.getElementById("items");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
let carrito = {};

//pintar los cards obtenidos de la api
document.addEventListener("DOMContentLoaded", () => {
    fetchData();
});

const fetchData = async () => {
    try {
        const res = await fetch("api.json");
        const data = await res.json();
        // console.log(data);
        paintCards(data); //we get the data from the api
    } catch (e) {
        console.log(e);
    }
};

const paintCards = (data) => {
    data.forEach((e) => {
        console.log(e);
        templateCard.querySelector("h5").textContent = e.title;
        templateCard.querySelector("p").textContent = e.precio;
        templateCard.querySelector("img").setAttribute("src", e.thumbnailUrl);
        templateCard.querySelector(".btn-dark").dataset.id = e.id;
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    });
    items.appendChild(fragment);
};

// click del carrito
items.addEventListener("click", (e) => {
    addCart(e);
});

const addCart = (e) => {
    if (e.target.classList.contains("btn-dark")) {
        // console.log(e.target.parentElement);
        setCarro(e.target.parentElement);
    }
    e.stopPropagation();
};

const setCarro = (objeto) => {
    const producto = {
        id: objeto.querySelector('.btn-dark').dataset.id,
        title: objeto.querySelector('h5').textContent,
        precio: objeto.querySelector('p').textContent,
        cantidad: 1
    }

    if(carrito.hasOwnProperty(producto.id)){
        producto.cantidad = carrito[carrito.id].cantidad + 1;
    }

    carrito[producto.id] = {...producto}

    console.log(carrito);
};
