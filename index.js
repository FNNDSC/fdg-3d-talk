const Graph = ForceGraph3D()
	(document.getElementById("3d-graph"));

let curDataSetIdx = null;
const dataSets = getGraphDataSets();

function getUrlParams(search) {
    let hashes = search.slice(search.indexOf('?') + 1).split('&')
    let params = {}
    hashes.map(hash => {
        let [key, val] = hash.split('=')
        params[key] = decodeURIComponent(val)
    })

    return params
}

function reloadPage(uid) {
	// trigger a page reload with new url
	const baseUrl = window.location.href.split("?uid=")[0];
	window.location = `${baseUrl}/?uid=${uid}`;
}

let toggleData;
(toggleData = function() {
	const uid = getUrlParams(window.location.search).uid;

	// try to find uid in list of datasets
	let currentIndex = null;
	let dataSet = null;
	for (let i=0; i<dataSets.length; i++) {
      if (dataSets[i].uid === uid) {
		currentIndex = i;
	  }
	}

	if (currentIndex === null) {
		// uid not found, load first dataset
	    dataSet = dataSets[0];
	    reloadPage(dataSet.uid);
	} else if (curDataSetIdx === null) {
		// uid found
		// and nothing previously cached (first load)
		curDataSetIdx = currentIndex;
		dataSet = dataSets[curDataSetIdx];
	 } else if (curDataSetIdx === currentIndex) {
		// uid found
		// and something previously cached (user hits next)
		curDataSetIdx = (curDataSetIdx+1)%dataSets.length;
		dataSet = dataSets[curDataSetIdx];
		reloadPage(dataSet.uid);
	 }
	
	Graph.resetProps(); // Wipe current state
	dataSet(Graph); // Load data set

	document.getElementById('graph-data-description').innerHTML = dataSet.description ? `Viewing ${dataSet.description}` : '';


	var addEvent = document.addEventListener ? function(target,type,action){
		if(target){
			target.addEventListener(type,action,false);
		}
	} : function(target,type,action){
		if(target){
			target.attachEvent('on' + type,action,false);
		}
	}

	addEvent(document,'keydown',function(e){
		e = e || window.event;
		var key = e.which || e.keyCode;
		if(key===87){
			scaleFactorUp();
		}
		if(key===83){
			scaleFactorDown();
		}

	});

})(); // IIFE init

