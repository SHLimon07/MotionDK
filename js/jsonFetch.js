//The data are taken from this google sheet - https://docs.google.com/spreadsheets/d/1vnKwmmsSAnZKvp_B1aGO3OcEXAQ1NMiuLv3yn-m9qPg/edit#gid=0
//And the data are fetched using this link - https://spreadsheets.google.com/feeds/list/1vnKwmmsSAnZKvp_B1aGO3OcEXAQ1NMiuLv3yn-m9qPg/od6/public/values?alt=json

var dataSheet;
var yearWiseData;
main();






async function fetching () {
	//this function fetches the api from google sheet as json 

	const response = await fetch('https://spreadsheets.google.com/feeds/list/1vnKwmmsSAnZKvp_B1aGO3OcEXAQ1NMiuLv3yn-m9qPg/od6/public/values?alt=json');
	dataSheet = await response.json();
}


async function main()
{
	await fetching();

	//since I only need the enties
	dataSheet = dataSheet.feed.entry;

	sortData();

	console.log(yearWiseData);

}

function sortData () {
	// body... 
	var temp;
	var size = dataSheet.length;
	yearWiseData = dataSheet;
	for(var i=0;i<size-1;i++)
	{
		for(var j=i;j<size;j++)
		{
			if(yearWiseData[i].gsx$year.$t<yearWiseData[j].gsx$year.$t)
			{
				temp = yearWiseData[i].gsx$year.$t;
				yearWiseData[i].gsx$year.$t = yearWiseData[j].gsx$year.$t;
				yearWiseData[j].gsx$year.$t = temp; 
			}
		}
	}
}

