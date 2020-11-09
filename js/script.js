// SEARCH BOX SCRIPT
var boxSearch = document.querySelector('.search-box');
var btnSearch = document.querySelector('.btn-search');

btnSearch.addEventListener('click', showBoxSearch);

function showBoxSearch() {
    boxSearch.classList.toggle('active');
    btnSearch.classList.toggle('active');
    boxSearch.focus();
};

// SCRIPT TO CREATE A CAROUSEL
function slickCreator(element, leftArrow, rightArrow) {
    $(element).slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        dots: false,
        infinite: false,
        cssEase: 'linear',
        prevArrow: $(leftArrow),
        nextArrow: $(rightArrow),
        responsive: [
            {
                breakpoint: 555,
                settings: {
                    slidesToShow: 3
                }
            }
        ]
    });
}

slickCreator('.popular-slides', '#pLeft', '#pRight');
slickCreator('.trending-slides', '#tLeft', '#tRight');

// LOAD A JSON FILE WITH THE CONTENTS FOR THE CAROUSEL
const jsonUrl = "./data-configure.json";
var size;

$.getJSON(jsonUrl, function(json) {
    var videoList = { "popular": "","trending": "" };
    var viewport = window.matchMedia("(max-width: 977px)");

    function pageSize(page) {
        if(!viewport.matches) {
            return page = 1;
        } else {
            return page = "";
        }
    }

    // SCRIPT USED WHEN THE PAGE LOADS FOR THE FIRST TIME 
    function pageLoad(element, videoListObj, jsonObjFull, jsonObjMobile, viewport) {
        if (!viewport.matches) {
            $.each(jsonObjFull, function(){
                videoListObj += '<div class="slide"><img src="'+ this.src +'"></div>';
            });
            $(element).slick('slickAdd', videoListObj);
        } else if(viewport.matches) {
            $.each(jsonObjMobile, function(){
                videoListObj += '<div class="slide"><img src="'+ this.src +'"></div>';
            });
            $(element).slick('slickAdd', videoListObj);
        }
        return videoListObj
    };

    window.addEventListener('pageshow', function() {
        videoList.popular = pageLoad('.popular-slides', videoList.popular, json.categories.popular, json.categories.popularMobile, viewport);

        videoList.trending = pageLoad('.trending-slides', videoList.trending, json.categories.trending, json.categories.trendingMobile, viewport);
        size = pageSize();
    });

    // FUNCTION TO REMOVE AN EXISTING CAROUSEL 
    function removeSlide(element, videoListObj) {
        if(videoListObj != "") {
            $(element).find('.slide').remove('div');
        };
    };

    // SCRIPT TO CHANGE THE THUMBNAILS WHENEVER VIEWPORT RESIZES 
    function pageResize(element, videoListObj, jsonObjFull, jsonObjMobile, viewport) {
        if(!viewport.matches && size == "") {
            removeSlide(element, videoListObj);
            videoListObj = "";
            $.each(jsonObjFull, function() {
                videoListObj += '<div class="slide"><img src="'+ this.src +'"></div>';
            });
            $(element).slick('slickAdd', videoListObj);
        } else if(viewport.matches && size == 1) {
            removeSlide(element, videoListObj);
            videoListObj = "";
            $.each(jsonObjMobile, function() {
                videoListObj += '<div class="slide"><img src="'+ this.src +'"></div>';
            });
            $(element).slick('slickAdd', videoListObj);
        };
    };
    
    window.addEventListener('resize', function() {
        pageResize('.popular-slides', videoList.popular, json.categories.popular, json.categories.popularMobile, viewport);
        pageResize('.trending-slides', videoList.trending, json.categories.trending, json.categories.trendingMobile, viewport);
        size = pageSize(size);
    });
});
