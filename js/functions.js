function render(arr) {
  let text = "";
  //mora da se definiše template napolju i označi 
  for (let i = 0; i < arr.length; i++) {
    text += template
      .replace(/{{imgSrc}}/gi, arr[i].imgSrc)
      .replace(/{{productTitle}}/gi, arr[i].productTitle)
      .replace(/{{price}}/gi, arr[i].price)
      .replace(/{{model}}/gi, arr[i].model);
  }
  return text;
}

function showDetailedPage() {
  $(this).attr("href", "detailed.html");
  console.log(this);
  console.log($(this).attr('href'));
  let imgSrc = $(this).parents('.product-img-holder').children(0).attr('src');
  console.log(imgSrc);
  //save imgSrc in local storage
  localStorage.setItem('imgSrc', imgSrc);

}

function randomize(arr, num) {
  let arrCopy = [].concat(arr);
  let newArr = [];
  for (let index = 0; index < num; index++) {
    let rand = Math.floor(Math.random() * arrCopy.length);
    newArr.push(arrCopy[rand]);
    arrCopy.splice(rand, 1);
  }
  return newArr;
}