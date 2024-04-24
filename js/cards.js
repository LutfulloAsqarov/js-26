const cards = document.querySelector(".cards");
const seeMoreBtn = document.querySelector(".see__more-btn");
const loading = document.querySelector(".loading");
let limitCount = 4;
let count = 1;

const API_URL = "https://fakestoreapi.com";

async function fetchData(url) {
    let data = await fetch(`${url}/products?limit=${count * limitCount}`, {
        method: "GET",
    });
    data.json()
        .then((res) => createCards(res))
        .catch((err) => console.log(err))
        .finally(() => {
            loading.style.display = "none";
            seeMoreBtn.innerHTML = "See more";
            seeMoreBtn.removeAttribute("disabled");
        });
}

fetchData(API_URL);

function createCards(data) {
    console.log(data);
    let productCards = "";
    data.forEach((product) => {
        productCards += `
            <div class="card">
                <div class="card__img" >
                    <img class="product-img" data-id=${product.id} src="${product.image}"  alt="" />
                </div>
                <div class="card__info">
                    <div class="card__rating df">
                        <img src='../images/cards/star.svg' alt=''/>
                        <img src='../images/cards/star.svg' alt=''/>
                        <img src='../images/cards/star.svg' alt=''/>
                        <img src='../images/cards/star2.svg' alt=''/>
                        <img src='../images/cards/star2.svg' alt=''/>
                        <p>${product.rating.rate}</p>
                    </div>
                    <p class="card__title">${product.title}</p>
                    <h3 class="card__price">${product.price}$</h3>
                    <button class="card__btn" data-id=${product.id}>Buy</button>
                </div>
            </div>
        `;
    });
    cards.innerHTML = productCards;
}

cards.addEventListener("click", (e) => {
    if (
        e.target.className === "product-img" ||
        e.target.className === "card__btn"
    ) {
        let id = e.target.dataset.id;
        window.open(`./pages/product.html?id=${id}`, "_self");
    }
});

seeMoreBtn.addEventListener("click", () => {
    count++;
    fetchData(API_URL);
    seeMoreBtn.innerHTML = "Loading...";
    seeMoreBtn.setAttribute("disabled", true);
});

function createLoadingItem(count) {
    let loadingItem = "";
    for (let i = 0; i < count; i++) {
        loadingItem += `
            <div class="loading__item">
                <div class="loading__image bg__animation"></div>
                <div class="loading__title bg__animation"></div>
                <div class="loading__title bg__animation"></div>
            </div>
        `;
    }
    loading.innerHTML = loadingItem;
}

createLoadingItem(limitCount);
