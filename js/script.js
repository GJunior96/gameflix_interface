var boxSearch = document.querySelector('.search-box');
var btnSearch = document.querySelector('.btn-search');

btnSearch.addEventListener('click', showBoxSearch);

function showBoxSearch() {
    // boxSearch.style.setProperty('display', 'inline-block');
    // boxSearch.style.setProperty('width', '120px');
    // boxSearch.style.setProperty('position', 'absolute');
    // boxSearch.style.setProperty('top', '19px');
    // boxSearch.style.setProperty('right', '150px');
    boxSearch.classList.toggle('active');
    btnSearch.classList.toggle('active');
    boxSearch.focus();
};
