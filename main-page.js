const api = 'https://api.punkapi.com/v2/beers';
const formElement = document.querySelector('form');
const mainElement = document.querySelector('main');

const topArticle = document.querySelector('.top-article .randomBeer-view');
document.querySelector('#showRandom-btn').onclick = showRandom
document.querySelector('#showAdvanced-btn').onclick = showAdvancedSearch
function showAdvancedSearch(params) {
    document.querySelector('#first-search-form').style.display = 'none'
    document.querySelector('.advanced-search-section').style.display = 'block'

}
/* window.onload = function() {
    topArticle.style.display = 'none'} */

function showRandom(params) {
    getData(api, renderRandomView)
    topArticle.style.display = 'block'
}
function renderRandomView(data) {
    let random = Math.floor(Math.random() * data.length)
    const randomBeer = data[random]
    createRandomView(randomBeer)
}
let randomBeerDetails = ''
function createRandomView(randomBeer) {
    randomBeerDetails = randomBeer
    const beerImage = document.createElement('img');
    beerImage.setAttribute('class', '')
    const cardBody = document.createElement('div');
    cardBody.setAttribute('class', 'card-body')
    const h1Tag = document.createElement('h1');
    const beerName = document.createElement('p');
    const detailLink = document.createElement('a');
    detailLink.textContent = "Show detail"
    detailLink.setAttribute('class', 'show-details')

    beerImage.src = randomBeer.image_url
    h1Tag.textContent = randomBeer.name
    beerName.textContent = randomBeer.tagline
    
    topArticle.appendChild(beerImage)
    cardBody.appendChild(h1Tag)
    cardBody.appendChild(beerName)
    cardBody.appendChild(detailLink)

    topArticle.appendChild(cardBody)
    document.querySelector('#showRandom-btn').style.display = 'none'
    document.querySelector('.show-details').onclick = showRamdomBeerDetail
}
function showRamdomBeerDetail() {
    const url = `beerInfoPage.html?name=${randomBeerDetails.id}`;
    document.location.href = url;
}

formElement.addEventListener('submit', onSubmit);

function onSubmit(evt) {

    const searchStr = evt.target[0].value;
    const url = `${api}?beer_name=${searchStr}`;

    getData(url, render);    
    evt.preventDefault();
}
function getData(url, callback) {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {

        callback(data);
    })
    .catch(error => console.log(error));
}
function render(data) {
    
    const ulElement = document.createElement('ul');

    ulElement.addEventListener('click', onUlClicked);

    for (let i = 0; i < data.length; i++) {
        
        const beer = data[i];
        
        const liElement = document.createElement('li');
        liElement.setAttribute('name', beer.id);
        liElement.textContent = beer.name;

        ulElement.appendChild(liElement);
    }

    mainElement.appendChild(ulElement);
}

function renderFirstBeer(data) {

    const firstBeer = data[0];

    const pElement = document.createElement('p');

    pElement.textContent = firstBeer.name;
    
    mainElement.appendChild(pElement);
}

function onUlClicked(evt) {
    
    const id = evt.target.getAttribute('name');
    const url = `myView.html?name=${id}`;
    document.location.href = url;
}