$(function() {
    $(".padding-header").css("height", $("header").height());
    $("main.content").addClass("show");
});

$(function() {
    $("a.internal-link").click(function(e) {
        var evt = window.evt || e;
        var target = $(this).attr("href");
        evt.preventDefault();
        $(".nav-curr").animate({bottom: "-=0.2rem"}, {duration: 200, queue: false});
        if ($(evt.target).parent().is($(".nav-item"))) {
            $(evt.target).parent().addClass("hovered");
        }
        $("main.content").removeClass("show");
        setTimeout(function() {
            window.location.href = target;
        }, 200);
    })
});

$(window).bind("pageshow", function(event) {
    if (event.originalEvent.persisted) { // if back button
        $(".nav-curr").animate({bottom: "+=0.2rem"}, {duration: 200, queue: false});
        $("main.content").addClass("show");
        $(".nav-item:not(.nav-curr)").removeClass("hovered");
    }
});