$(function() {
    $("main.ml-content").css("height", "100%");
    $("main.ml-content").addClass("show");
    /* $("main.ml-content").particleground({
        dotColor: "#D0D0D0",
        lineColor: "#D0D0D0",
        density: 15000,
        proximity: 100,
        parallax: false
    }); */
});

$(function() {
    $(".ml-away").click(function(e) {
        var evt = window.event || e;
        evt.preventDefault();
        $("main.ml-content").removeClass("show");
        setTimeout(function() {
            window.location.href = $(evt.target).attr("href");
        }, 500);
    });
});

$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) { // if back button
        $("main.ml-content").addClass("show");
    }
});