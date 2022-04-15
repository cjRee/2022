const btn = document.querySelector('#submit');
const resultMessage = document.querySelector('#resultMessage');
const list = document.querySelector('#list');

btn.addEventListener('click', () => {
    const search = document.querySelector('#searchVal').value;
    meridianFunction(search);
})

async function meridianFunction(search) {
    //clear list
    removeAllChildNodes(list);
    //api call for data
    const data = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${search}`);
    const json = await data.json();
    //closest option to the search
    const drink = json.drinks[0];
    //empty array to be populated
    const objectKeys = Object.keys(drink);
    const processedArr = patternMatch(objectKeys);

    const ingredient = [];

    processedArr.forEach(e => {
        if (drink[e]) {
            ingredient.push(drink[e]);
        }
    })

    populateList(ingredient);
    resultMessage.innerText = `For ${search}, you will need :`;
}
//to find ingredient key
function patternMatch(objKeyArr) {
    const pattern = /strIngredient[0-9]/;
    const rtnKeyArr = [];
    objKeyArr.forEach(element => {
        if (pattern.test(element)) {
            rtnKeyArr.push(element);
        };
    });
    return rtnKeyArr;
}

function populateList(arr) {
    arr.forEach(ingredient => {
        const item = document.createElement("li");
        item.innerText = `${ingredient}`;
        list.appendChild(item);
    })
}
//This one was copied from the web. Used to refresh the list
function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}