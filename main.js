let title = document.getElementById('title');
let price = document.getElementById('price');
let taxes = document.getElementById('taxes');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');
let mood = 'create';
let tmp;
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
        title: title.value.toLowerCase(),
        price: price.value,
        taxes: taxes.value, 
        ads: ads.value,
        discount: discount.value,
        total: total.innerHTML,
        count: count.value,
        category: category.value.toLowerCase(),
    };
    if(title.value != '' && price.value != ''&& category.value != '' && count.value < 100){
    if(mood === 'create'){
        if(newPro.count > 1){
            // Count
            for(let i = 0; i < newPro.count; i++){
                dataPro.push(newPro);
            }
        }else{
            dataPro.push(newPro);
            submit.innerHTML = 'Create'
            count.style.display = 'block'
        }
    }else{
        dataPro[tmp] = newPro;
        mood = 'create';
        count.style.display =  'block'
        submit.innerHTML = 'Create'
    }
    clearInputs();
}else{
}
// Save Localstorage
    localStorage.setItem("Products", JSON.stringify(dataPro))
    showData()
}
submit.addEventListener("click", creatPro)
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
function showData(){
    getTotal()
    let table = '';
    let counter = 0;
    for(let i = 0; i < dataPro.length; i++){
        table += `
        <tr>
            <td>${++counter}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].taxes}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
            <td><button onclick='updateData(${i})' id="update">update</button></td>
            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
        </tr>
        `
    }
    document.getElementById('tbody').innerHTML = table;
    if(table != ''){
    document.getElementById('deleteAll').innerHTML = `<button onclick='deleteAll()'>Delete All (${dataPro.length})</button>`
    }else{
        document.getElementById('deleteAll').innerHTML = ''
    }
}
showData()
// Delete
function deleteData(i){
    dataPro.splice(i,1)
    localStorage.Products = JSON.stringify(dataPro)
    showData()
}
function deleteAll(){
    localStorage.clear()
    dataPro.splice(0)
    showData()
}
// Update
function updateData(i){
    title.value = dataPro[i].title;
    price.value = dataPro[i].price;
    taxes.value = dataPro[i].taxes
    ads.value = dataPro[i].ads
    discount.value = dataPro[i].discount
    getTotal();
    count.style.display = 'none';
    category.value = dataPro[i].category
    submit.innerHTML = "Update"
    mood = "update"
    tmp = i;
    scroll({
        top: 0,
        behavior: "smooth",
    })
    
}
// Search
let searchMode = 'title';
function getSearchMode(id){
    let search = document.getElementById('search');
    if(id == 'searchTitle'){
        searchMode = 'title';
    }else{
        searchMode = 'category';
    }
    search.placeholder = `Search by ${searchMode}`  
    search.focus()
    search.value = ''
    showData()
}
function searchData(value){
    let table = '';
    for(let i =0; i < dataPro.length; i++){
    if(searchMode == 'title'){
            if(dataPro[i].title.includes(value.toLowerCase())){
                let counter = i;
                    table += `
                            <tr>
                            <td>${counter++}</td>
                            <td>${dataPro[i].title}</td>
                            <td>${dataPro[i].price}</td>
                            <td>${dataPro[i].taxes}</td>
                            <td>${dataPro[i].ads}</td>
                            <td>${dataPro[i].discount}</td>
                            <td>${dataPro[i].total}</td>
                            <td>${dataPro[i].category}</td>
                            <td><button onclick='updateData(${i})' id="update">update</button></td>
                            <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                        </tr>
                        `
                }
            }else{
                if(dataPro[i].category.includes(value.toLowerCase())){
                    let counter = i;
                        table += `
                                <tr>
                                <td>${++counter}</td>
                                <td>${dataPro[i].title}</td>
                                <td>${dataPro[i].price}</td>
                                <td>${dataPro[i].taxes}</td>
                                <td>${dataPro[i].ads}</td>
                                <td>${dataPro[i].discount}</td>
                                <td>${dataPro[i].total}</td>
                                <td>${dataPro[i].category}</td>
                                <td><button onclick='updateData(${i})' id="update">update</button></td>
                                <td><button onclick="deleteData(${i})" id="delete">delete</button></td>
                            </tr>
                            `
                    }   
            }
        }
        document.getElementById('tbody').innerHTML = table;
    }
