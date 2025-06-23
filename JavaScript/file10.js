// //cart and products

// // const cart = {
// //     1: 5,
// //     5: 3,

// // };
// // const newCart=({...cart,2:1})
// // console.log(newCart)

// // const new1Cart=({...cart,4:3,9:3})
// // console.log(new1Cart)



// let cart ={};
// const products = [
//     { id: 1, name: "product1", price: 25 },
//     { id: 2, name: "product2", price: 50 },
//     { id: 3, name: "product3", price: 100 },
// ];

// function addToCart(id){
//     cart = {...cart, [id]:1};
// }

// function increase(id){
//     cart = {...cart,[id]:cart[id]+1}
// }
// function decrease(id){
//     cart = {...cart,[id]:cart[id]-1}
// }

// addToCart(1)
// increase(1)
// increase(1)
// console.log(cart)
// decrease(1)
// console.log(cart)


// // const newCart=({...products[0]})
// // console.log(newCart)
// // console.log(cart)

// // const nProduct = [...products,{id: 4, name: "product4", price: 110}]
// // console.log(nProduct)




let cart = {};
const products = [
  { id: 1, name: "product1", price: 25 },
  { id: 2, name: "product2", price: 50 },
  { id: 3, name: "product3", price: 100 },
];

// Get product by id
function getProductById(id) {
  return products.find(p => p.id === id);
}

// Add product to the cart
function addToCart(id) {
  const product = getProductById(id);
  if (!product) {
    console.error(`Product with id ${id} not found`);
    return;
  }
  // if product already exists in cart, increment
  cart = { ...cart, [id]: (cart[id] || 0) + 1 };
}

// Increase quantity
function increase(id) {
  if (!cart[id]) return addToCart(id); // add new if not present
  cart = { ...cart, [id]: cart[id] + 1 };
}

// Decrease quantity, remove if it reaches 0
function decrease(id) {
  if (!cart[id]) return; 
  const newCount = cart[id] - 1;
  if (newCount <= 0) {
    const { [id]: _, ...rest } = cart; // remove product if 0
    cart = rest;
  } else {
    cart = { ...cart, [id]: newCount };
  }
}

// Print cart details
function printCart() {
  console.log(
    Object.keys(cart).map(id => {
      const product = getProductById(Number(id));
      return {
        ...product,
        quantity: cart[id],
        total: product.price * cart[id],
      };
    })
  );
}

// 🚀 Usage example
addToCart(1);   // add product1
increase(1);    // product1 quantity = 2
increase(1);    // product1 quantity = 3
printCart();

decrease(1);    // product1 quantity = 2
printCart();

decrease(1);    // product1 quantity = 1
decrease(1);    // product1 removed from cart
printCart();
