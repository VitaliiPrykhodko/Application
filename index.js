const books = [
  {
    id: "1",
    title: `Apple. Эволюция компьютера`,
    author: `Владимир Невзоров`,
    img: `https://bukva.ua/img/products/449/449532_200.jpg`,
    plot: `Богато иллюстрированный хронологический справочник по истории компьютеров, в котором увлекательно 
    и в структурированном виде изложена информация о создании и развитии техники Apple на фоне истории 
    персональных компьютеров в целом.
    В книге даны описания десятков наиболее значимых моделей устройств как Apple, так и других производителей, 
    сопровождающиеся большим количеством оригинальных студийных фотографий.
    Книга предназначена для широкого круга читателей, интересующихся историей электроники. 
    Она также может послужить источником вдохновения для дизайнеров, маркетологов и предпринимателей.`,
  },
  {
    id: "2",
    title: `Как объяснить ребенку информатику`,
    author: `Кэрол Вордерман`,
    img: `https://bukva.ua/img/products/480/480030_200.jpg`,
    plot: `Иллюстрированная энциклопедия в формате инфографики о технических, социальных и культурных аспектах 
    в информатике. Пошагово объясняет, как детям максимально эффективно использовать компьютеры и интернет-сервисы, 
    оставаясь в безопасности. 
    Книга рассказывает обо всем: от хранения данных до жизни в интернет-пространстве, 
    от программирования до компьютерных атак. О том, как компьютеры функционируют, о современном программном 
    обеспечении, устройстве Интернета и цифровом этикете. Все концепты - от хакера до биткоина - 
    объясняются наглядно с помощью иллюстраций и схем.`,
  },
  {
    id: "3",
    title: `Путь скрам-мастера. #ScrumMasterWay`,
    author: `Зузана Шохова`,
    img: `https://bukva.ua/img/products/480/480090_200.jpg`,
    plot: `Эта книга поможет вам стать выдающимся скрам-мастером и добиться отличных результатов с вашей командой. 
    Она иллюстрированная и легкая для восприятия - вы сможете прочитать ее за выходные, а пользоваться полученными 
    знаниями будете в течение всей карьеры.
    Основываясь на 15-летнем опыте, Зузана Шохова рассказывает, какие роли и обязанности есть у скрам-мастера, 
    как ему решать повседневные задачи, какие компетенции нужны, чтобы стать выдающимся скрам-мастером, 
    какими инструментами ему нужно пользоваться.`,
  },
];
localStorage.setItem("books", JSON.stringify(books));
const booksRoot = document.querySelector("#root");
const mainEl = document.createElement("main");
mainEl.classList.add("main");
const sectionEl1 = document.createElement("div");
sectionEl1.classList.add("section1");
const sectionEl2 = document.createElement("div");
sectionEl2.classList.add("section2");
const listEl = document.createElement("ul");
listEl.classList.add("list");
const buttonEl = document.createElement("button");
buttonEl.setAttribute("type", "button");
buttonEl.classList.add("button_add");
buttonEl.textContent = "Add";
booksRoot.append(mainEl);
mainEl.append(sectionEl1, sectionEl2);
sectionEl1.append(listEl, buttonEl);
const addButton = document.querySelector(".button_add");
function previewMarkup(book) {
  return `<div class='preview'>
  <h1>${book.title}</h1>
  <p>${book.author}</p>
  <div class='book_section'>
  <img src="${book.img}" alt="" />
  <p class='book_description'>${book.plot}</p>
</div>
</div>`;
}
function renderList() {
  const localBooks = JSON.parse(localStorage.getItem("books"));
  const bookMarkup = localBooks
    .map((book) => {
      return `<li class='item'><p class='title'>${book.title}</p><div class='book_buttons' id=${book.id}><button class='button_edit' type ='button'>Edit</button><button class='button_remove' type ='button'>Remove</button></div></li>`;
    })
    .join("");
  listEl.innerHTML = "";
  listEl.insertAdjacentHTML("beforeend", bookMarkup);
  const titleEl = listEl.querySelectorAll(".title");
  titleEl.forEach((titEl) => titEl.addEventListener("click", renderPreview));
  const buttonsRemoveEl = listEl.querySelectorAll(".button_remove");
  buttonsRemoveEl.forEach((btnEl) =>
    btnEl.addEventListener("click", removeBook)
  );
  const buttonsEditEl = listEl.querySelectorAll(".button_edit");
  buttonsEditEl.forEach((btnEl) => btnEl.addEventListener("click", editBook));
}
renderList();
function renderPreview(event) {
  sectionEl2.innerHTML = "";
  const data = JSON.parse(localStorage.getItem("books"));
  const findBook = data.find((book) => book.title === event.target.textContent);
  sectionEl2.insertAdjacentHTML("beforeend", previewMarkup(findBook));
}
function removeBook(event) {
  const findBook = JSON.parse(localStorage.getItem("books")).filter(
    (book) => book.id !== event.target.parentNode.id
  );
  localStorage.setItem("books", JSON.stringify(findBook));
  renderList();
  console.log(findBook);
}
function editBook(event) {
  const findBook = JSON.parse(localStorage.getItem("books")).find(
    (book) => book.id === event.target.parentNode.id
  );
  bookFormMarkup(findBook);
  sectionEl2.innerHTML = "";
  sectionEl2.insertAdjacentHTML("beforeend", bookFormMarkup(findBook));
  formFunctionality(findBook);
  const saveButton = document.querySelector(".input_button");
  saveButton.addEventListener("click", saveValue);
  function saveValue() {
    sectionEl2.innerHTML = "";
    sectionEl2.insertAdjacentHTML("beforeend", previewMarkup(findBook));
    console.log(findBook);
  }
  console.log(findBook);
}
addButton.addEventListener("click", renderAddPage);
function bookFormMarkup(book) {
  return `<div class="opacity pop-up">
        <form name="form" id="form_message">
            <h2>Форма обратной связи.</h2>
            <p>
            <label class="titles">Название книги</label> <input value = '${book.title}' data-input='title' class="input" name="title" type="text" />
            </p>
            <p>
            <label class="titles">Автор</label> <input value = '${book.author}' data-input='author' class="input" name="author" type="text" /> </p>
            <p>
            <label class="titles">титульное фото (ссылка)</label> <input value = '${book.img}' data-input='img' class="input" name="img"
                type="url" />
            </p>
            <p>
            <div class="titles">Краткое содержание:</div><input value = '${book.plot}' data-input='plot' name="plot"/></p>
            <button type="button" class="input_button">Save</button>
        </form>
    </div>
`;
}
function renderAddPage() {
  const newBook = {
    id: `${Date.now()}`,
    title: "",
    author: "",
    img: "",
    plot: "",
  };
  bookFormMarkup(newBook);
  sectionEl2.insertAdjacentHTML("beforeend", bookFormMarkup(newBook));
  formFunctionality(newBook);
  const saveButton = document.querySelector(".input_button");
  saveButton.addEventListener("click", saveValue);
  function saveValue() {
    if (newBook.title && newBook.author && newBook.img && newBook.plot) {
      const localBook = JSON.parse(localStorage.getItem("books"));
      localStorage.setItem("books", JSON.stringify([...localBook, newBook]));
      console.log(JSON.parse(localStorage.getItem("books")));
      renderList();
      sectionEl2.innerHTML = "";
      sectionEl2.insertAdjacentHTML("beforeend", previewMarkup(newBook));
      setTimeout(() => {
        alert("мы добавили книгу, ура!");
      }, 300);
    }
  }
}
function formFunctionality(book) {
  const inputArr = document.querySelectorAll("input");
  inputArr.forEach((inputEl) =>
    inputEl.addEventListener("change", updateValue)
  );
  function updateValue(e) {
    book[e.target.name] = e.target.value;
  }
}