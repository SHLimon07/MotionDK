
// This part is for responsive navBar

var collapseState = 1;

function toogleCollapse () {
	
	var navId = document.getElementById("navigation");

	navId.style.zIndex = '-1';

	if(collapseState==1)
	{
		collapseState = 0;

		//waiting for the nav to come down
		setTimeout(function front(){

			//then bring it to the front to make it funtional
			//otherwise the links cannot be clicked

			navId.style.zIndex = '1';

		},500);		//200+300<-froms css transition
	}
	else
	{

		navId.style.zIndex = '-1';
		collapseState = 1;
	}

	//waits for the zindex to work properly
	setTimeout(function toogle()
		{
			navId.classList.toggle("navToogle");
		}, 200);

	//if the nav is collapsed
	
}