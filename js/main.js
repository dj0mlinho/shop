let db;
let template = $('[type="template"]').html();
let aCart = document.querySelector('.cart');
setQuantity()


$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(function (res) {
  db = res;
  //RENDER INDEX HTML
  let text = render(db)
  $("#insertTemplate").html(text);

  $('.view').on('click', showDetailedPage)
  $('.shop').on('click', addToCartInstant)
  //FILTER CATEGORIES

  $('[data-col]').on("click", selectCategory);


  function selectCategory(e) {

    event.preventDefault()
    let col = $(this).attr("data-col");
    let colection;
    if (col == "male" || col == "female") {
      colection = db.filter(function (e) {
        return e.colection == col;
      });
      let text = render(colection)
      $("#insertTemplate").html(text);
      $('.view').on('click', showDetailedPage)
      $('.shop').on('click', addToCartInstant)

    } else {
      colection = db.filter(function (e) {
        return e[col];
      });
      $('a').removeClass("active");
      $(this).addClass("active");
      render(colection, "#insertTemplate")
      let text = render(colection)
      $("#insertTemplate").html(text);
      $('.view').on('click', showDetailedPage)
      $('.shop').on('click', addToCartInstant)
    }
  }
  //open detailed page

});

//BOJANOV FRONT
$(".back-to-top").click(function () {
  $("html, body").animate({
      scrollTop: 0
    },
    1000
  );
});