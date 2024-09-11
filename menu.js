const input = document.querySelectorAll('input')
const inProd = document.querySelector('.inProd')
const inName = document.querySelector('.inName')
const inPrice = document.querySelector('.inPrice')

const menuId = document.querySelector('#menu')
const orderId = document.querySelector('#order')
const adminId = document.querySelector('#admin')
const readBlock =  document.querySelector('.block')
const menuA = document.querySelector('.menuNAV')
const orderA = document.querySelector('.orderNAV')
const adminA = document.querySelector('.adminNAV')
const addBtn = document.querySelector('.addBtn')
const saveBtn = document.querySelector('.saveBtn')
const removeAll = document.querySelector('.removeAll')
const removeBtn = document.querySelector('.removeBtn')

menuA.addEventListener('click' , () => {
    menuId.style.display = 'flex'
    orderId.style.display = 'none'
    adminId.style.display = 'none'
   
})
orderA.addEventListener('click' , () => {
    orderId.style.display = 'flex'
    menuId.style.display = 'none'
    adminId.style.display = 'none'
   


})
adminA.addEventListener('click' , () => {
    adminId.style.display = 'flex'
    menuId.style.display = 'none'
    orderId.style.display = 'none'

})

readData()

//////////////////////////////////////////////////  CREATE PRODUCT /////////////////////////////////////////////////////////////////////////////////////////////////////////////



addBtn.addEventListener('click' , () => {
    createData()
    removeAll.style.display = 'flex'
})


function createData(){
    let newObj = {
        name:inName.value,
        img:inProd.value,
        age:inPrice.value,
        count: 1 ,
    }
    let storage = JSON.parse(localStorage.getItem('card')) || [];
    if(
        storage.some((el) => el.img === newObj.img  ||  el.name == newObj.name)
      )  {
        alert('Такой продукт уже есть');
        for(let inp of input ){
            inp.value = '';
        }
        return;
    
    }
    if(!inName.value && !inProd.value && !inPrice.value){
      alert('Заполните все поле')
      return;
    }
    storage.push(newObj)
    localStorage.setItem('card' , JSON.stringify(storage))
    for(let inp of input ){
        inp.value = '';
    }
    readData()
}



////////////////////////////////////////////////////////// READE//////////////////////////////////////////////////////////////////////////////////////////////////

function readData(){
    readBlock.innerHTML = '';  
let storage = JSON.parse(localStorage.getItem('card')) || [];
storage.forEach((el , idx) => {


    const mainBlock = document.createElement('div')
    mainBlock.classList = 'mainBlock'
    const div = document.createElement('div')
    div.classList = 'menuDiv'
    const img = document.createElement('img')
    img.classList = 'menuImg'
    
    const menutextDiv = document.createElement('div')
    menutextDiv.classList = 'menutextDiv'
    const h2 = document.createElement('h2')
    h2.classList = 'menuText'
    const span = document.createElement('span')
    span.classList = 'price'
    const btnDiv = document.createElement('div')
    btnDiv.classList = 'btnDiv'
    const delBtn = document.createElement('button')
    delBtn.classList = 'delBtn'
    const editBtn = document.createElement('button')
    editBtn.classList = 'editBtn'
    const  basBtn = document.createElement('button')
    basBtn.classList = 'basBtn'
    
    readBlock.append(mainBlock)
    mainBlock.append(div)
    div.append(img)
    div.append(menutextDiv)
    menutextDiv.append(h2)
    div.append(span)
    menutextDiv.append(btnDiv)
    btnDiv.append(basBtn)
    btnDiv.append(delBtn)
    btnDiv.append(editBtn)


    img.src = el.img;
    h2.innerText = el.name;
    span.innerText = `${el.age}$`;

//////////////////////////////////////////////////////// EDTIT CLICK ///////////////////////////////////////////////////////////////////////////////////////

editBtn.innerHTML = '<ion-icon name="create-outline"></ion-icon>'
editBtn.addEventListener('click' , () =>  {
        editData(idx)
    })

/////////////////////////////////////////////////////////////////// BASKET  CLICK //////////////////////////////////////////////////////////////////////////////////

basBtn.innerHTML = '<ion-icon name="cart-outline"></ion-icon>'
basBtn.addEventListener('click' , () => {
    basketData(el)
})

/////////////////////////////////////////////////////////////////// DELETE CLICK ///////////////////////////////////////////////////////////////////////////////////////////////////

delBtn.innerHTML = '<ion-icon name="trash-outline"></ion-icon>'
delBtn.addEventListener('click' , () => delData(idx))

})

}
  

    
/////////////////////////////////////////////////////////////// DElETE/////////////////////////////////////////////////////////////////////////


function delData(idx){
let storage = JSON.parse(localStorage.getItem('card')) || [];
storage.splice(idx , 1)
localStorage.setItem('card' , JSON.stringify(storage))
readData()
}

removeBtn.addEventListener('click' , ()  => {
    localStorage.removeItem('card')
    readData()
    removeBtn.style.display = 'none'

})

/////////////////////////////////////////////////////// EDIT ///////////////////////////////////////////////////////////////////////////////////////////////////////////////


function editData (ind){
 let storage = JSON.parse(localStorage.getItem('card')) || [];
 let onProd  = storage.splice(ind , 1)[0];
 inProd.value = onProd.img
 inName.value = onProd.name;
 inPrice.value = onProd.age;

 addBtn.style.display = 'none'
 saveBtn.style.display = 'block'

 inProd.setAttribute('id' , ind);
 inName.setAttribute('id' , ind);
 inPrice.setAttribute('id' , ind);

}

saveBtn.addEventListener('click' , () =>  {
saveData()
 addBtn.style.display = 'block'
 saveBtn.style.display = 'none'
})

function saveData (){
let id = inName.id;

let Obj = {
    id1: Date.now(),
    name: inName.value,
    img: inProd.value,
    age: inPrice.value,
}
let storage = JSON.parse(localStorage.getItem('card')) || [];
storage.splice(id , 1,  Obj );
localStorage.setItem('card' , JSON.stringify(storage))
readData();

for (let inp of input) {
          inp.value = ''; 
         }
}

////////////////////////////////////////////////////////////////// BASKET ///////////////////////////////////////////////////////////////////////

function basketData(newObj) {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    basket.push(newObj);
    localStorage.setItem("basket", JSON.stringify(basket));

    getBasket();
}

const orderBas = document.querySelector('.orderBas');
getBasket()
function getBasket() {
    orderBas.innerHTML = "";
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    basket.forEach((el, index) => {
        let orderBlock = document.createElement("div");
        orderBlock.classList.add("orderBlock");
        let orderBtns = document.createElement("div");
        orderBtns.classList.add("orderBtns");
        let orderImg = document.createElement("img");
        orderImg.classList.add("orderImg");
        let orderText = document.createElement("div");
        orderText.classList.add("orderText");

        let orderName = document.createElement("h3");
        orderName.classList.add("orderName");
        let orderPrice = document.createElement("h4");
        orderPrice.classList.add("orderPrice");
        let orderCount = document.createElement("div");
        orderCount.classList.add("orderCount");
        let count = document.createElement("h2");
        count.classList.add("count");

        let orderDelete = document.createElement("button");
        orderDelete.classList.add("orderDelete");
        let orderPlus = document.createElement("button");
        orderPlus.classList.add("orderPlus");
        let orderMinus = document.createElement("button");
        orderMinus.classList.add("orderMinus");

        orderImg.src = el.img;
        orderName.innerText = el.name;
        count.innerText = el.count;
        orderPrice.innerHTML = el.count * el.age;

        orderDelete.innerText = "delete";
        orderPlus.innerText = "+ ";
        orderMinus.innerText = "-";

        orderBas.append(orderBlock);
        orderBlock.append(orderImg);
        orderBlock.append(orderText);
        orderBlock.append(orderBtns);

        orderText.append(orderName);
        orderText.append(orderPrice);

        orderBtns.append(orderDelete);
        orderBtns.append(orderCount);

        orderCount.append(orderMinus);
        orderCount.append(count);
        orderCount.append(orderPlus);

        orderDelete.addEventListener("click", () => {
            delOrder(index);
            getBasket();
        });

        orderPlus.addEventListener("click", () => {
            el.count += 1;
            count.innerHTML = el.count;
            orderPrice.innerHTML = el.count * el.age;
            localStorage.setItem("basket", JSON.stringify(basket));
        });

        orderMinus.addEventListener("click", () => {
            if (el.count > 0) {
                el.count -= 1;
                count.innerHTML = el.count;
                orderPrice.innerHTML = el.count * el.age;
                localStorage.setItem("basket", JSON.stringify(basket));
            }
        });
    });
}

// Определите функцию delOrder здесь
function delOrder(index) {
    let basket = JSON.parse(localStorage.getItem("basket")) || [];
    basket.splice(index, 1);
    localStorage.setItem("basket", JSON.stringify(basket));
}































































// function deleteProduct(index) {
//     let data = JSON.parse(localStorage.getItem("food")) || [];
//     data.splice(index, 1);
//     localStorage.setItem("food", JSON.stringify(data));
//     newProduct();
//   } 
  
// function basketData(newObj){
   
//     let basket = JSON.parse(localStorage.getItem("basket")) || [];
//     basket.push(newObj);
//     localStorage.setItem("basket", JSON.stringify(basket));

//      getBasket();
  
// }

// const orderBas = document.querySelector('.orderBas')
// basketData()
// function getBasket() {
//       orderBas.innerHTML = "";
//       let basket = JSON.parse(localStorage.getItem("basket")) || [];
//       basket.forEach((el, index) => {
//       let orderBlock = document.createElement("div");
//       orderBlock.classList.add("orderBlock");
//       let orderBtns = document.createElement("div");
//       orderBtns.classList.add("orderBtns");
//       let orderImg = document.createElement("img");
//       orderImg.classList.add("orderImg");
//       let orderText = document.createElement("div");
//       orderText.classList.add("orderText");
  
//       let orderName = document.createElement("h3");
//       orderName.classList.add("orderName");
//       let orderPrice = document.createElement("h4");
//       orderPrice.classList.add("orderPrice");
//       let orderCount = document.createElement("div");
//       orderCount.classList.add("orderCount");
//       let num = document.createElement("h2");
  
//       let orderDelete = document.createElement("button");
//       orderDelete.classList.add("orderDelete");
//       let orderPlus = document.createElement("button");
//       orderPlus.classList.add("orderPlus");
//       let count = document.createElement("h2");
//       count.classList.add("count");
//       let orderMinus = document.createElement("button");
//       orderMinus.classList.add("orderMinus");
  
//       orderImg.src = el.inProd;
//       orderName.innerText = el.inName;
//       num = el.count;
//       orderPrice.innerHTML = el.count * el.inPrice;
  
//       orderDelete.innerText = "delete order";
//       orderPlus.innerText = "+";
//       orderMinus.innerText = "-";
//       num.innerHTML = el.count;
     
//        orderBas.append(orderBlock)
//       orderBlock.append(orderImg);
//       orderBlock.append(orderText);
//       orderBlock.append(orderBtns);
  
//       orderText.append(orderName);
//       orderText.append(orderPrice);
  
//       orderBtns.append(orderDelete);
//       orderBtns.append(orderCount);
  
//       orderCount.append(orderMinus);
//       orderCount.append(num);
//       orderCount.append(orderPlus);
//       console.log(el);
  
//       orderDelete.addEventListener("click", () => {
//         delOrder(index);
//         getBasket();
//       });
  
//       orderPlus.addEventListener("click", () => {
//         num += 1;
//       });
//       orderMinus.addEventListener("click", () => {
//         num -= 1;
//       });
//     });
    
//   }
