const singleContent = document.querySelector(".single__content");
const loading = document.querySelector(".load");

const API_URL = "https://fakestoreapi.com";

async function fetchData(url) {
    let param = new URLSearchParams(window.location.search);
    let id = param.get("id");

    let data = await fetch(`${url}/products/${id}`);
    data.json()
        .then((res) => createCard(res))
        .catch((err) => console.log(err))
        .finally(() => {
            loading.style.display = "none";
        });
}

fetchData(API_URL);

function createCard(product) {
    console.log(product);
    singleContent.innerHTML = `
        <div class="product__img">
            <img src='${product.image}' alt=''/>
        </div>
        <div class="product__info">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <h3>${product.price} $</h3>
            <button class="product__btn">Konzinka</button>
        </div>
    `;
}
