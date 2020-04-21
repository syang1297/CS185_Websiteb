window.onscroll = function(){scrollToTop()};

function scrollToTop(){
    var scrollTopBtn = document.getElementById("#scrollBtn");
    console.log(scrollTopBtn);
    var scrollPos = document.body.scrollTop || document.documentElement.scrollTop;
    if(scrollPos > .25){
        scrollTopBtn.className = 'visible';
    }else{
        scrollTopBtn.className = '';
    }
}

function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}

function activeTab(tab){
    var active = document.querySelector(tab);
    console.log(tab);
    active.style.background = "rgba(150, 37, 80, 0.377)";
}
