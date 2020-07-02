// 배경
const UNSPLASH_API_KEY = "y-lyjZP7NrllLLVWVW4B07ohK_NItnsn7ynr2hSK4r4";
const UNSPLASH_URL = `https://api.unsplash.com/photos/random/?client_id=${UNSPLASH_API_KEY}&query=landscape&orientation=landscape`;

const body = document.querySelector("body");
const locationContainer = document.querySelector(".js-location span");

function loadBackground() {
    const savedImage = localStorage.getItem("bg");
    if (savedImage === null) {
        getBackground();
    } else {
        const parsedImage = JSON.parse(savedImage);
        const today = new Date();
        if (today > parsedImage.expiresOn) {
            getBackground();
        } else {
            body.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.4),rgba(0, 0, 0, 0.4)), url(${parsedImage.url})`;
            locationContainer.innerHTML = `${parsedImage.name}, ${parsedImage.city}, ${parsedImage.country}`;
        }
    }
    return;
}

function saveBackGround(imageUrl, city, country, name) {
    const savedImage = localStorage.getItem("bg");
    if (savedImage !== null) {
        localStorage.removeItem("bg");
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 1);
    const imageObject = {
        url: imageUrl,
        expiresOn: expirationDate,
        city,
        country,
        name
    };
    localStorage.setItem("bg", JSON.stringify(imageObject));
    loadBackground();
    return;
}

function getBackground() {
    fetch(UNSPLASH_URL)
        .then(response => response.json())
        .then(json => {
            const image = json;
            if (image.urls && image.urls.full && image.location) {
                const fullUrl = image.urls.full;
                const location = image.location;
                const city = location.city;
                const country = location.country;
                const name = location.name;
                saveBackGround(fullUrl, city, country, name);
            } else {
                getBackground();
            }
        });
    return;
}

function initApp() {
    loadBackground();
    return;
}

initApp();
