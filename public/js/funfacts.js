// FlexSlider
$(function () {
    $('#funFactsSlider').flexslider({
        //Default settings
        animation: "slide",
        animationLoop: true,
        smoothHeight: true,
        startAt: 0,
        slideshow: true,
        slideshowSpeed: 3000,
        animationSpeed: 1000,
        initDelay: 0,
        randomize: true,
        //Usability features
        useCSS: true,
        //Primary controls
        controlNav: false,
        directionNav: false,
        //Special properties
        controlsContainer: '.flex-control-nav-container',
        //Carousel options
        itemWidth: 200
    });
});