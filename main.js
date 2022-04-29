let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');

// Get Total
function getTotal(){
    if(price.value != ''){
        total.innerHTML = (+price.value + +taxes.value + +ads.value) - +discount.value;
        total.style.background = "#040"
    }else{
        total.innerHTML = '';
        total.style.background = "#a00d02"
    }
}
// Creat Product
let dataPro;
if(localStorage.Products != null){
    dataPro = JSON.parse(localStorage.Products)
}else{
    dataPro = [];
}

function creatPro(){
    let newPro = {
        title: title.value,
        price: price.value,
        taxes: taxes.value, 
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value,
    };
    dataPro.push(newPro);
    localStorage.setItem("Products", JSON.stringify(dataPro))
    clearInputs();
}
submit.addEventListener("click", creatPro)
// Save Localstorage
// Clear Inputs
function clearInputs(){
    title.value = '';
    price.value = '';
    taxes.value = '';
    ads.value = '';
    discount.value = '';
    total.innerHTML = '';
    count.value = '';
    category.value = '';
}
// Read
// Count
// Delete
// Update
// Search
// Clean Data