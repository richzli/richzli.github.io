/*
var index = 0;
var texts = $(".scroll-text");
texts.eq(index).show();
*/
var inprogress = false;

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

/*
function updateIndex(delta) {
    delta *= -1;
    texts.eq(index).fadeOut({duration: 250, queue: false});
    index += texts.length + delta; // delta is +120 when wheel is scrolled up, -120 when down
    index %= texts.length;
    texts.eq(index).fadeIn({duration: 500, queue: false});
}
*/

// update link on scroll //

function displayWheel(e){
    if (!inprogress) {
        var evt = window.event || e; // equalize event object
        var delta = evt.detail ? evt.detail*(-120) : evt.wheelDelta; // check for detail first so Opera uses that instead of wheelDelta
        delta = Math.floor(delta/Math.abs(delta));
        
        /*
        inprogress = true;
        updateIndex(delta);
        sleep(500).then(() => { inprogress = false; });
        */

        if (evt.preventDefault) //disable default wheel action of scrolling page
            evt.preventDefault();
        
        if (delta < 0) {
            $("main.content").removeClass("show");
            setTimeout(function() {
                window.location.href = "/about";
            }, 200);
        }
    }
}

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; // FF doesn't recognize mousewheel as of FF3.x

if (document.attachEvent) { // if IE (and Opera depending on user setting)
    document.attachEvent("on" + mousewheelevt, displayWheel);
} else if (document.addEventListener) { // WC3 browsers
    document.addEventListener(mousewheelevt, displayWheel, false);
}

// update link on swipe //

var xi = null;
var yi = null;
var currswipe = false;

function handleTouchStart(evt) {
    evt.preventDefault();
    xi = evt.touches[0].clientX;
    yi = evt.touches[0].clientY;
}

function handleTouchMove(evt) {
    evt.preventDefault();
    if (!currswipe && !inprogress && xi && yi) {
        var dx = evt.touches[0].clientX - xi;
        var dy = evt.touches[0].clientY - yi;

        if (Math.abs(dy) > Math.abs(dx)) {
            if (dy > 150) {
                /*
                currswipe = true;
                inprogress = true;
                updateIndex(-1);
                sleep(500).then(() => { inprogress = false; });
                */
            } else if (dy < -150) {
                currswipe = true;
                $("main.content").removeClass("show");
                setTimeout(function() {
                    window.location.href = "/about";
                }, 200);
                /*
                inprogress = true;
                updateIndex(1);
                sleep(500).then(() => { inprogress = false; });
                */
            }
        }
    }
}

function handleTouchEnd(evt) {
    evt.preventDefault();
    xi = null;
    yi = null;
    currswipe = false;
}

document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);
document.addEventListener("touchend", handleTouchEnd, false);
document.addEventListener("touchcancel", handleTouchEnd, false);

// bouncing text //

/*
const dist = '5px';
async function bounceText() {
    texts.animate({marginTop: '-=' + dist}, {duration: 300})
        .animate({marginTop: '+=' + dist}, {duration: 300})
        .animate({marginTop: '-=' + dist}, {duration: 300})
        .animate({marginTop: '+=' + dist}, {duration: 300})
    sleep(5000).then(() => {
        bounceText();
    });
}

bounceText();
*/