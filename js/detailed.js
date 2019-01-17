let db;
let template = $('[type="template1"]').html();
let imgSrcShort;
let productDb;
setQuantity()


$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(function (res) {
  db = res;
  //RENDER HTML
  //---PART 1
  imgSrcShort = localStorage.getItem('imgSrc').replace("img/products/", "").replace(".jpg", "");
  productDb = db.filter(function (e) {
    return e.imgSrc == imgSrcShort;
  })
  let text1 = render(productDb)
  //---PART 2
  //filter choosen product
  let product = db.filter(function (e) {
    return e.imgSrc == imgSrcShort;
  })
  //filter products with same gender except choosen one
  let products = db.filter(function (e) {
    return e.colection == product[0].colection && e.imgSrc != product[0].imgSrc;
  })
  //randomize
  let randProducts = randomize(products, 4);

  template = $('[type="template2"]').html();
  let text2 = render(randProducts)
  //---PART 3
  let text3 = `
              </div>
              </section>
              </div>
              </main>
              `
  let text = text1 + text2 + text3;
  $("main").html(text);
  //show detailed page and add product to cart
  $('.view').on('click', showDetailedPage)
  $('.shop').on('click', addToCartInstant)
  $('.add-to-cart').on('click', addToCart)
  //go back
  $('.back').on('click', function () {
    $(this).attr('href', 'index.html');
  })

})

function addToCart(e) {
  e.preventDefault()
  let quantityInput = $('[type="value"]').val()
  console.log(typeof quantityInput);
  console.log(quantityInput);
  if (quantityInput == "") {
    if (!localStorage.getItem('cartArr')) {
      let cartArr = [];
      cartArr.push(localStorage.getItem('imgSrc'));
      localStorage.setItem('cartArr', JSON.stringify(cartArr));
    } else {
      let cartArr = JSON.parse(localStorage.getItem('cartArr'))
      cartArr.push(localStorage.getItem('imgSrc'));
      localStorage.setItem('cartArr', JSON.stringify(cartArr));
    }
  } else {
    if (!localStorage.getItem('cartArr')) {
      let cartArr = [];
      for (let i = 0; i < parseInt(quantityInput); i++) {
        cartArr.push(localStorage.getItem('imgSrc'));
      }
      localStorage.setItem('cartArr', JSON.stringify(cartArr));
    } else {
      let cartArr = JSON.parse(localStorage.getItem('cartArr'))
      for (let i = 0; i < parseInt(quantityInput); i++) {
        cartArr.push(localStorage.getItem('imgSrc'));
      }
      localStorage.setItem('cartArr', JSON.stringify(cartArr));
    }
  }
  setQuantity()

}