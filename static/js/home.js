var index = 0;
var texts = $(".scroll-text");
var inprogress = false;
texts.eq(index).show();

function updateIndex(delta) {
    index += (delta <= -120) ? 1 : (texts.length - 1); // delta is +120 when wheel is scrolled up, -120 when down
    index %= texts.length;
}

function displayWheel(e){
    if (!inprogress) {
        var evt = window.event || e; // equalize event object
        var delta = evt.detail ? evt.detail*(-120) : evt.wheelDelta; // check for detail first so Opera uses that instead of wheelDelta
        
        inprogress = true;
        texts.eq(index).fadeOut({duration: 250, queue: false});
        updateIndex(delta);
        texts.eq(index).fadeIn({duration: 500, queue: false});
        sleep(500).then(() => { inprogress = false; });

        if (evt.preventDefault) //disable default wheel action of scrolling page
            evt.preventDefault();
        else
            return false;
    }
}

var mousewheelevt = (/Firefox/i.test(navigator.userAgent)) ? "DOMMouseScroll" : "mousewheel"; // FF doesn't recognize mousewheel as of FF3.x

if (document.attachEvent) // if IE (and Opera depending on user setting)
    document.attachEvent("on" + mousewheelevt, displayWheel);
else if (document.addEventListener) // WC3 browsers
    document.addEventListener(mousewheelevt, displayWheel, false);

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

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