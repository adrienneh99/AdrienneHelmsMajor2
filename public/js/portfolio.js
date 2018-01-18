
// Function to display anchors correctly
$(function () {
    if (window.location.href.indexOf('#') != -1) {
        window.scrollBy(0, -100);
    }
});

// FlexSlider for Fitness Zone & Pingora Intranet
$(function () {
    $('#fitnessZoneSlider').flexslider({
        //Default settings
        animation: "slide",
        animationLoop: true,
        smoothHeight: true,
        startAt: 0,
        slideshow: true,
        slideshowSpeed: 3000,
        animationSpeed: 1000,
        initDelay: 0,
        //Usability features
        useCSS: true,
        //Primary controls
        controlNav: false,
        directionNav: false,
        //Special properties
        controlsContainer: '.flex-control-nav-container',
        //Carousel options
        itemWidth: 250
    });
    $('#pingoraIntranetSlider').flexslider({
        //Default settings
        animation: "slide",
        animationLoop: true,
        smoothHeight: true,
        startAt: 0,
        slideshow: true,
        slideshowSpeed: 3000,
        animationSpeed: 1000,
        initDelay: 0,
        //Usability features
        useCSS: true,
        //Primary controls
        controlNav: false,
        directionNav: false,
        //Special properties
        controlsContainer: '.flex-control-nav-container',
        //Carousel options
        itemWidth: 350
    });
});