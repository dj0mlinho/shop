let db;
let template = $('[type="template1"]').html();
let imgSrcShort;
let productDb;
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

  console.log(product);
  console.log(products);
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
  //show detailed page
  $('.view').on('click', showDetailedPage)
  //go back
  $('.back').on('click', function () {
    $(this).attr('href', 'index.html');
  })

})