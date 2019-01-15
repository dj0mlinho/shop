function render(arr, target) {
  let text = "";
  //mora da se definiše template napolju i označi 
  for (let i = 0; i < arr.length; i++) {
    text += template
      .replace(/{{imgSrc}}/gi, arr[i].imgSrc)
      .replace(/{{productTitle}}/gi, arr[i].productTitle)
      .replace(/{{price}}/gi, arr[i].price)
      .replace(/{{model}}/gi, arr[i].model);
  }
  $(target).html(text);
  //show detailed.html
  $('[alt="View icon"]').on('click', showDetailedPage)

}

function showDetailedPage() {
  let imgSrc = $(this).parents('.product-img-holder').children(0).attr('src');
  //save imgSrc in local storage
  localStorage.setItem('imgSrc', imgSrc);
  $(this).parent().attr('href', 'detailed.html')
}