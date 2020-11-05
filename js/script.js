var boxSearch = document.querySelector('.search-box');
var btnSearch = document.querySelector('.btn-search');

btnSearch.addEventListener('click', showBoxSearch);

function showBoxSearch() {
    boxSearch.classList.toggle('active');
    btnSearch.classList.toggle('active');
    boxSearch.focus();
};
