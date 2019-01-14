$.ajax({
  url: "https://raw.githubusercontent.com/Danilovesovic/shop/master/shop.json",
  dataType: "json"
}).done(function(res) {
  let dataBase = res;
  //CREATE HTML
  let text = "";
  let template = $('[type="template"]').html();
  for (let i = 0; i < dataBase.length; i++) {
    text += template
      .replace(/{{imgSrc}}/gi, dataBase[i].imgSrc)
      .replace(/{{productTitle}}/gi, dataBase[i].productTitle)
      .replace(/{{price}}/gi, dataBase[i].price)
      .replace(/{{model}}/gi, dataBase[i].model);
  }
  $("#insertTemplate").html(text);
});

//BOJANOV FRONT
$(".back-to-top").click(function() {
  $("html, body").animate(
    {
      scrollTop: 0
    },
    1000
  );
});
