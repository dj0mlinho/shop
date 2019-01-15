let template = $('[type="template"]').html();
let dataBase;


$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(function (res) {
  dataBase = res;
  //RENDER INDEX HTML
  render(dataBase, "#insertTemplate")


  //FILTER CATEGORIES
  $("a").on("click", selectCategory);


  function selectCategory() {
    event.preventDefault()
    let col = $(this).attr("data-col");
    let colection;
    if (col == "male" || col == "female") {
      colection = dataBase.filter(function (e) {
        return e.colection == col;
      });
      render(colection, "#insertTemplate")
    } else {
      colection = dataBase.filter(function (e) {
        return e[col];
      });
      $('a').removeClass("active");
      $(this).addClass("active");
      render(colection, "#insertTemplate")
    }
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