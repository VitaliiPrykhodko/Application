const  books = [
	{
		id: "1",
		title: "Apple. Эволюция компьютера",
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
		title: "Как объяснить ребенку информатику",
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
		title: "Путь скрам-мастера. #ScrumMasterWay",
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
localStorage.setItem('books', JSON.stringify(books))
const onList = document.querySelector('#root');


const mainEl = document.createElement('main')
mainEl.classList.add('main')

const div1 = document.createElement('div')
div1.classList.add('cont1')

const div2 = document.createElement('div')
div2.classList.add('cont2')

const listEl = document.createElement('ul')
listEl.classList.add('list')

const btn = document.createElement('button')
btn.setAttribute('type', 'button')
btn.textContent = 'Add'

onList.append(mainEl);
mainEl.append(div1, div2);
div1.append(listEl, btn)

function renderPrev(event) {
  div2.innerHTML = ''
  const findBook = books.find((book) => book.title === event.target.textContent)

div2.insertAdjacentHTML("beforeend", renderMarkup(findBook))
}

function renderMarkup (book) {
  return `<div class="content">
<h1>${book.title}</h1>
<p>${book.author}</p>
<img src="${book.img}" alt="Image book" />
<p>${book.plot}</p>
</div>
`
}
function renderList() {

  const books = JSON.parse(localStorage.getItem('books'))

  const addTitleToList = books.map((book) => 
     `<li class="item" id=${book.id}><p class="title-name">${book.title}</p><button type="buttom" class="btn-edit">Edit</button><button  type="buttom" class="btn-remove">Remove</button>`
)
    .join('')
  
listEl.innerHTML = ""
  listEl.insertAdjacentHTML("beforeend", addTitleToList)

    const onTitle = listEl.querySelectorAll(".title-name")
  const remBtn = document.querySelectorAll('.btn-remove')
  const editBtn = document.querySelectorAll('.btn-edit')

  onTitle.forEach((elem) =>
  elem.addEventListener('click', renderPrev)
  );
  
  remBtn.forEach((elem) =>
    elem.addEventListener('click', remBook)
  );

editBtn.forEach((elem) =>
  elem.addEventListener('click', editList)
  );
 
}
renderList()

function remBook(event) {
  const findBook= JSON.parse(localStorage.getItem('books')).filter((book) => book.id !== event.target.parentNode.id)
  localStorage.setItem("books", JSON.stringify(findBook))
   
  renderList()
}

function editList (event) {
  const findBook = JSON.parse(localStorage.getItem('books')).find((book) => book.id === event.target.parentNode.id)
  
  renderForm(findBook)
}

// function renderForm() {
//   return 
  
//   `
// }