const mainElement = document.querySelector('main');
const searchParams = new URLSearchParams(window.location.search);
const api = 'https://api.punkapi.com/v2/beers';
const id = searchParams.get('name');
// const url = `${api}/${id}`;
const url = api + "/" + id;

getData(url, render);

function getData(url, callback) {
    
    fetch(url)
    .then(res => res.json())
    .then(data => {

        callback(data);
    })
    .catch(error => console.log(error));
}

    let foodParing = []
    let hops = []
function render(data) {
    const beer = data[0];

    //const ingredients = beer.ingredients;
    //const hops = beer.hops;
    /* beer.ingredients.forEach(element => {
        hops.push(element)
    }); */
        beer.food_pairing.forEach(element => {
            foodParing.push(element)
        });
            console.log(foodParing.length)
            populateDetailView(beer, foodParing)
}

function populateDetailView(beer, foodParing) {
     const brewers_tips = beer.brewers_tips;
    const description = beer.description;

    const detailView = document.createElement('div')
    detailView.setAttribute('class', 'detail-view')
    const imgTag = document.createElement('img');
    detailView.setAttribute('class', 'beer-image')
    const descriptionTag = document.createElement('p');
    descriptionTag.setAttribute('class', 'beer-desciption')
    const h1Tag = document.createElement('h1');
    const vTag = document.createElement('p');
    const ingredietsTag = document.createElement('h1');
    const hopsTag = document.createElement('p');
    const foodPairingTag = document.createElement('h1');
    const brewersTag = document.createElement('p');

    imgTag.src = beer.image_url
    h1Tag.textContent = beer.name;
    vTag.textContent = beer.volume.value
    descriptionTag.textContent =beer.description
    brewersTag.textContent = beer.brewers_tips

    
    //ingredietsTag.textContent = ingrediets
    //hopsTag.textContent = hops
    //foodPairingTag.textContent = beer.food_pairing
    const ulElement = document.createElement('ul');

    detailView.appendChild(imgTag);
    detailView.appendChild(h1Tag);
    detailView.appendChild(vTag);
    detailView.appendChild(brewersTag);
    detailView.appendChild(descriptionTag);
    document.querySelector('main').appendChild(detailView);
    foodParing.forEach(value => showListView(value))

}
function showListView(value) {
    const ulElement = document.createElement('ul');
    const liElement = document.createElement('li');
        //liElement.setAttribute('foodPairing', foodParing[i]);
        liElement.textContent = value;

        ulElement.appendChild(liElement);
        document.querySelector('main').appendChild(ulElement)
}