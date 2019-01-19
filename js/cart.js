let db;
let template = $('[type="template2"]').html();
setQuantity();

$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(function (res) {
  db = res;
  //RENDER HTML
  //create array with all different products
  if (localStorage.getItem("cartArr")) {
    let cartArr = JSON.parse(localStorage.getItem("cartArr"));
    let differentProductsArr = [];
    for (let i = 0; i < cartArr.length; i++) {
      if (differentProductsArr.indexOf(cartArr[i]) == -1) {
        differentProductsArr.push(cartArr[i]);
      }
    }
    //create array from db for render html
    let differentProductsDb = db.filter(function (e) {
      return differentProductsArr.indexOf(`img/products/${e.imgSrc}.jpg`) != -1;
    });
    //create html
    let text1 = `<div class="container">      
                <section class="products-section">
                  <h3 class="top-picked active">Korpa:</h3>
                  <div class="row">`;
    let text2 = render(differentProductsDb);
    let text3 = `
              </div>
                </section>
                <div style="margin-bottom:20px;">
                  <button style="padding-bottom:50px; border-color: yellow; border-size: 5px; background-color:#ddd;color:#333; font-weight:bold;font-size:30px;" type="button"
                  class="btn btn-outline-danger btn-lg form-control"> Ukupna cena: <span class="fullPrice"></span> RSD</button>
                </div>
                </div>
              </main>
              `;
    let text = text1 + text2 + text3;
    if (text2 != "") {
      $("main").html(text);
    } else {
      $("main").html(
        `<h4 style="color:grey;text-align:center;line-height:600px;">Niste izabrali nijedan proizvod.</h4>`
      );
    }
  } else {
    $("main").html(
      `<h4 style="color:grey;text-align:center;line-height:600px;">Niste izabrali nijedan proizvod.</h4>`
    );
  }

  //set quantity in html span of every products
  getProductsQuantity();

  function getProductsQuantity() {
    cartArr = JSON.parse(localStorage.getItem("cartArr"));

    let numbers = document.querySelectorAll(".number");
    for (let i = 0; i < numbers.length; i++) {
      numbers[i].innerHTML = cartArr.filter(function (e) {
        return (
          e ==
          numbers[
            i
          ].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.getAttribute(
            "src"
          )
        );
      }).length;
    }
  }
  getProductPrice();

  function getProductPrice() {
    cartArr = JSON.parse(localStorage.getItem("cartArr"));
    let prices = document.querySelectorAll(".pp");
    let num = 0;
    for (let i = 0; i < prices.length; i++) {
      prices[i].innerHTML =
        parseInt(
          db.filter(function (e) {
            return (
              e.imgSrc ==
              prices[
                i
              ].parentElement.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild
              .getAttribute("src")
              .replace("img/products/", "")
              .replace(".jpg", "")
            );
          })[0].price
        ) *
        parseInt(
          document.querySelectorAll(".pp")[i].parentElement.parentElement
          .children[0].children[0].innerHTML
        ) *
        1000;
      num += parseInt(prices[i].innerHTML);
    }
    document.querySelector('.fullPrice').innerHTML = num;
  }
  // remove product
  $(".remove").on("click", removeProduct);

  function removeProduct() {
    let imgSrc = this.parentElement.parentElement.firstElementChild.firstElementChild.firstElementChild.getAttribute(
      "src"
    );
    let cartArr = JSON.parse(localStorage.getItem("cartArr"));
    let index = cartArr.indexOf(imgSrc);
    cartArr.splice(index, 1);

    let differentProductsArr = [];
    for (let i = 0; i < cartArr.length; i++) {
      if (differentProductsArr.indexOf(cartArr[i]) == -1) {
        differentProductsArr.push(cartArr[i]);
      }
    }
    //create array from db for render html
    let differentProductsDb = db.filter(function (e) {
      return differentProductsArr.indexOf(`img/products/${e.imgSrc}.jpg`) != -1;
    });
    //create html
    let text1 = `<div class="container">      
                <section class="products-section">
                  <h3 style="font-size:40px" class="top-picked active">Korpa:</h3>
                <div class="row">`;
    let text2 = render(differentProductsDb);
    let text3 = `
              </div>
                </section>
                <div style="margin-bottom:20px;">
                  <button style="padding-bottom:50px; border-color: yellow; border-size: 5px; background-color:#ddd;color:#333; font-weight:bold;font-size:30px;" type="button"
                  class="btn btn-outline-danger btn-lg form-control"> Ukupna cena: <span class="fullPrice">1000</span> RSD</button>
                </div>
                </div>
              </main>
              `;
    let text = text1 + text2 + text3;
    localStorage.setItem("cartArr", JSON.stringify(cartArr));
    if (cartArr.length != 0) {
      $("main").html(text);
    } else {
      $("main").html(
        `<h4 style = "color:grey;text-align:center;line-height:600px;"> Niste izabrali nijedan proizvod. </h4>`
      );
    }

    getProductsQuantity();
    setQuantity();
    getProductPrice();

    $(".remove").on("click", removeProduct);
  }
});

//BOJANOV FRONT
$(".back-to-top").click(function () {
  $("html, body").animate({
      scrollTop: 0
    },
    1000
  );
});