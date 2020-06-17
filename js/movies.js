const genreListDiv = document.getElementById('genreList');

//fetching data by each file, since many browsers don't support import/export
//The data are taken from this google sheet - https://docs.google.com/spreadsheets/d/1vnKwmmsSAnZKvp_B1aGO3OcEXAQ1NMiuLv3yn-m9qPg/edit#gid=0
//And the data are fetched using this link - https://spreadsheets.google.com/feeds/list/1vnKwmmsSAnZKvp_B1aGO3OcEXAQ1NMiuLv3yn-m9qPg/od6/public/values?alt=json

//data variables
var dataSheet;
var yearSortedData;
var genreList = [];

//function calls

//calling the main funtion
moviesPageMain();




//Now initializing the atributes using fetched data
async function moviesPageMain()
{

	//first I have to fetch the data
	await fetching();

	//gets the genre to be filterd
	getTarget();

	//since I only need the enties
	dataSheet = dataSheet.feed.entry;

	//sorting the data according to year
	yearSortedData =  sortData(dataSheet);

	//convert the coma separated genre values to an array
	dataSheet = convertGenre(dataSheet);

	//getting the set of unique genres from the data sheet
	genreList = createGenreList(dataSheet);
}

async function fetching () {
	//this function fetches the api from google sheet as json 

	const response = await fetch('https://spreadsheets.google.com/feeds/list/1vnKwmmsSAnZKvp_B1aGO3OcEXAQ1NMiuLv3yn-m9qPg/od6/public/values?alt=json');
	dataSheet = await response.json();
}

function getTarget() {
	
	genreSize = genreListDiv.children.length;

	for(var i=0;i<genreSize;i++)
	{
		genreListDiv.children[i].addEventListener('click',function(){
			var target = this.getAttribute('id');
			filterList(target);
		});
	} 
}

function filterList(target)
{
	const recomDiv = document.querySelector('#recomendList .movieList');//getting the div of recomened movies list
	const compDiv = document.querySelector('#completeList .movieList');//getting the div of complete movies list
	const listTitle = document.querySelector('#completeList .listTitle');//getting the title of complte movie list
	const bannerTitle = document.querySelector('#banner .title span');//getting the title of the banner
	const bannerImage = document.querySelector('#banner img');//getting the image of the banner
	
	listTitle.textContent=target;
	bannerTitle.textContent=target;

	hide(recomDiv);
	hide(compDiv);

	var recomShow = recomDiv.querySelectorAll('.'+target);
	var compShow = compDiv.querySelectorAll('.'+target);

	show(recomShow);
	show(compShow);

}

function hide(div) {
	var divSize = div.children.length;

	for(var i=0;i<divSize;i++)
	{
		div.children[i].style.opacity = '0';
		div.children[i].style.position = 'absolute';
		div.children[i].style.width = '0%';

	}
}

function show(div) {
	var divSize = div.length;

	for(var i=0;i<divSize;i++)
	{
		div[i].style.position = 'relative';
		div[i].style.width = '100%';
		div[i].style.opacity = '1';
	}
}

function sortData (data) {
	// this function sorts the fetched data using bubble sort 
	var temp;
	var size = data.length;
	var sortedData = data;
	for(var i=0;i<size-1;i++)
	{
		for(var j=i;j<size;j++)
		{
			// if the year of current index is smaller than the compared index -> swap them
			if(sortedData[i].gsx$year.$t<sortedData[j].gsx$year.$t)
			{
				temp = sortedData[i];
				sortedData[i] = sortedData[j];
				sortedData[j] = temp; 
			}
		}
	}
	return sortedData;
}

function convertGenre(data) {
	
	var len = data.length;
	for(var i=0;i<len;i++)
	{
		data[i].gsx$genre.$t = data[i].gsx$genre.$t.split(', ');
	}
	return data;
}

function createGenreList(data) {

	console.log(data);
	
	var dataSize = data.length;
	var list = [];

	for(var i=0;i<dataSize;i++)
	{
		var genreSize = data[i].gsx$genre.$t.length;
		for(var j=0;j<genreSize;j++)
		{
			if(notIncluded(data[i].gsx$genre.$t[j],list))
				list.push(data[i].gsx$genre.$t[j]);
		}
	}
	console.log(list);

}

function notIncluded(string, array) {
	
	var arraySize = array.length;

	for(var i=0;i<arraySize;i++)
	{
		if(array[i]==string)
			return 0;
	}

	return 1;
}

