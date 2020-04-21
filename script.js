var scrollTopBtn = document.getElementById("scrollBtn");
window.onscroll = function(){scrollToTop()};

offset = 100;
docHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.docElement.clientHeight, document.docElement.scrollHeight, docElement.offsetHeight);
if(docHeight!= 'undefined'){
	offset = docHeight/4;
}

// function scrollToTop(){
//     scrollPos = document.body.scrollTop || document.documentElement.scrollTop;
//     if(scrollPos > offset){
//         scrollTopBtn.className = 'visible';
//     }else{
//         scrollTopBtn.className = 
//     }
// }
// window.addEventListener("scroll", function(){
// 	scrollPos = body.scrollTop || docElement.scrollTop;
// 	btt.className = (scrollPos > offset)? 'visible' : '';
// });
// btt.addEventListener("click", function(){
// 	event.preventDefault();
// 	docElement.scrollTop = 0;
// 	body.scrollTop = 0;
// });	

//CHANGE TO A QUARTER OF THE PAGE INSTEAD OF 20PX
function scrollToTop(){
    if(document.body.scrollTop > 5 || document.documentElement.scrollTop > 5){
        scrollTopBtn.style.visibility = "visible";
    }else{
        scrollTopBtn.style.visibility = "hidden";
    }
}

function topFunction() {
    document.body.scrollTop = 0; 
    document.documentElement.scrollTop = 0; 
}

offset = 100,
body = document.body,
docElement = document.documentElement,
scrollPos, docHeight;




function showActiveTab(tab){
    var active = document.querySelector(tab);
    active.style.background = "rgba(150, 37, 80, 0.377)";
}