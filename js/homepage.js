//images/Movies/BannerImage/theabsentone.jpg
// Getting the elements from HTML
const carousel = document.getElementById('carousel');
var carouselCounter = 1;
const carouselItems = Array.from(carousel.children);
const size = carouselItems.length;
console.log(carouselItems);

//since initialy the slider is on the postion of the last clone
gotoFirst();

setInterval(autoPlay, 2500);


async function carouselInit() {
	// Initializes the carousel using the spreadsheet data

}

function autoPlay()
{
	//continiously move to the next slide
	gotoNext();
}

function gotoFirst()
{
	//takes the slider straight to the first image, without any sliding effect to create the loop
	carousel.classList.add('noTransition');
	carousel.style.transform = 'translateX(-100vw)';
}

function gotoLast()
{
	//takes the slider straight to the last image, without any sliding effect to create the loop
	carousel.classList.add('noTransition');
	carousel.style.transform += 'translateX(-' + (size-2)*100 + 'vw)';
}


function gotoNext() {
	// Does the transition to the next slide
	if(carouselCounter>=size-1)//this condition is for handing errors of counter
		return;

	//the class that was added by gotofirst()/gotolast()
	carousel.classList.remove('noTransition');
	carouselCounter++;
	carousel.style.transform = 'translateX(-' + carouselCounter*100 + 'vw)';
	if(carouselCounter==size-1)checkIf();//checking if the current slide is a clone one
}

function gotoPrev() {
	// Does the transition to the next slide

	if(carouselCounter<=0)//this condition is for handing errors of counter
		return;

	//the class that was added by gotofirst()/gotolast()
	carousel.classList.remove('noTransition');
	carouselCounter--;
	carousel.style.transform = 'translateX(-' + carouselCounter*100 + 'vw)';
	if(carouselCounter==0)checkIf();//checking if the current slide is a clone one
}

function checkIf()
{
	carousel.addEventListener('transitionend',function()
	{
		if(carouselItems[carouselCounter].id=="firstClone")
		{
			carouselCounter=1;
			gotoFirst();//to create the loop effect
		}
		else if(carouselItems[carouselCounter].id=="lastClone")
		{
			carouselCounter=size-2;
			gotoLast();//to create the loop effect
		}
	});
}