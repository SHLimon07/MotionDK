
// Getting the elements from HTML
const carousel = document.getElementById('carousel');
var carouselCounter = 1;
const carouselItems = Array.from(carousel.children);
const size = carouselItems.length;
gotoFirst();

setInterval(autoPlay, 2500);

function autoPlay()
{
	gotoNext();
}

function gotoFirst()
{
	carousel.classList.add('noTransition');
	carousel.style.transform = 'translateX(-100vw)';
}

function gotoLast()
{
	carousel.classList.add('noTransition');
	carousel.style.transform += 'translateX(-' + (size-2)*100 + 'vw)';
}


function gotoNext() {
	// body...
	carousel.classList.remove('noTransition');
	carouselCounter++;
	carousel.style.transform = 'translateX(-' + carouselCounter*100 + 'vw)';
	if(carouselCounter==size-1)checkIf();
}

function gotoPrev() {
	// body...
	if(carouselCounter<0)
		return;
	console.log(carouselCounter);
	carousel.classList.remove('noTransition');
	carouselCounter--;
	carousel.style.transform = 'translateX(-' + carouselCounter*100 + 'vw)';
	if(carouselCounter==0)checkIf();
}

function checkIf()
{
	carousel.addEventListener('transitionend',function()
	{
		if(carouselItems[carouselCounter].id=="firstClone")
		{
			carouselCounter=1;
			gotoFirst();
		}
		else if(carouselItems[carouselCounter].id=="lastClone")
		{
			carouselCounter=size-2;
			gotoLast();
		}
	});
}