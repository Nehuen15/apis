function removeArticles() {
  var boton = document.querySelector(".button");
  var articles = document.querySelector(".articles");
  boton.addEventListener("click", (e) => {
    articles.innerHTML = "";
  });
}
function setHtml(articles) {
  var tem = document.querySelector(".template-resultado");
  var contenedorArticulos = document.querySelector(".articles");

  // Busquedas totales
  var totalResults = document.querySelector(".h2-resultado");
  totalResults.textContent = "Resultados " + articles.paging.total;

  //datos de los articulos
  for (const article of articles.results) {
    // imagen
    var img = tem.content.querySelector(".img-product");
    img.src = article.thumbnail;
    //nombre
    var nameProduct = tem.content.querySelector(".name-product");
    nameProduct.textContent = article.title;
    //condicion
    var condition = tem.content.querySelector(".condition");
    condition.textContent = article.condition;
    //ventas
    var solds = tem.content.querySelector(".sold");
    solds.textContent = article.sold_quantity;
    //precio
    var price = tem.content.querySelector(".price");
    price.textContent = "$" + article.price;
    //link
    var link = tem.content.querySelector(".link-ml");
    link.href = article.permalink;

    const clone = document.importNode(tem.content, true);
    contenedorArticulos.appendChild(clone);
  }
}

function main() {
  removeArticles();
  var formEl = document.querySelector(".header");
  formEl.addEventListener("submit", (e) => {
    e.preventDefault();
    var form = e.target;
    var params = form.search.value;
    var url = "https://api.mercadolibre.com/sites/MLA/search?q=" + params;
    fetch(url)
      .then((res) => res.json())
      .then((json) => setHtml(json));
  });
}

main();
