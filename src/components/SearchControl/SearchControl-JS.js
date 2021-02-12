import './search-control.css'

class SearchControlJS {

  constructor() {
    this.isInputActive = false;
    this.onLoad();
    this.clickHandle();
  }


  clickHandle() {

    //bechavior for input block
    const InputBlock = document.querySelectorAll('input[inputBlock]');

    InputBlock[0].addEventListener('keydown', function (event) {
      
      const buttonClose = document.querySelectorAll('a[closeButton]');
      buttonClose[0].classList.add('search-control-close-button-active');

      //add keys from input
      //console.log(event.key)

      const existsUl = document.getElementsByClassName('search-control-info-list');
      const sectionList = document.getElementsByClassName('search-control-info');

      var li = document.createElement('li');
      li.className = 'search-control-info-list-item'
      li.innerText = 'search-control\'s test'

      if (existsUl[0]) {
        existsUl[0].appendChild(li);

      } else {

        var ul = document.createElement('ul');
        ul.className = 'search-control-info-list';
        ul.appendChild(li)

        sectionList[0].appendChild(ul);
      }

    });

    //bechavior for search button
    const searchButton = document.querySelectorAll('a[searchButton]');

    searchButton[0].addEventListener('click', function (e) {
      const buttonSearch = document.querySelectorAll('section[searchInput]');
      const searchedList = document.querySelectorAll('section[list]');
      if (!this.isInputActive) {
        buttonSearch[0].classList.add('search-control-active');
        this.isInputActive = true;
      } else {
        buttonSearch[0].classList.remove('search-control-active');

        const inputControl = document.querySelectorAll('input[inputBlock]');
        inputControl[0].value = '';


        while (searchedList[0].firstChild) {
          searchedList[0].removeChild(searchedList[0].firstChild);
        }

        this.isInputActive = false;
      }
    });

    //bechavior for close button
    const closeButton = document.querySelectorAll('a[closeButton]');
    closeButton[0].addEventListener('click', function (e) {

      const buttonSearch = document.querySelectorAll('section[searchInput]');
      buttonSearch[0].classList.remove('search-control-active');

      const inputControl = document.querySelectorAll('input[inputBlock]');
      inputControl[0].value = '';

      const buttonClose = document.querySelectorAll('a[closeButton]');
      buttonClose[0].classList.remove('search-control-close-button-active');

      const searchedList = document.querySelectorAll('section[list]');
      while (searchedList[0].firstChild) {
        searchedList[0].removeChild(searchedList[0].firstChild);
      }
    });


  }

  onLoad() {
    var html = `
    <article class="search-control-wrap">
      <section searchInput class="search-control">
        <a role="button" href="#" searchButton class="search-control-icon-button">
          <svg viewBox="0 0 50 50"><line x1="35" y1="35" x2="46" y2="46">
            </line><circle cx="23" cy="23" r="16" fill="none">
            </circle>Sorry, your browser does not support inline SVG.
          </svg>
        </a>
        <input type="text" inputBlock class="search-input search-control-input" placeholder="Custom placeholder" value="" style="outline: none;"></input>
        <a closeButton role="button" class="search-control-close-button">
          <svg viewBox="0 0 50 50">
            <path d="M5 5 L45 45 M45 5 L5 45"></path>
              Sorry, your browser does not support inline SVG.
          </svg>
        </a>
      </section>
      <section list class="search-control-info">
      </section>
    </article>`



    var classNode = document.getElementById('root')
    var el = document.createElement('div');
    el.className = 'search-box'
    el.innerHTML = html
    classNode.insertBefore(el, classNode.firstChild);
  }

}

export default SearchControlJS;