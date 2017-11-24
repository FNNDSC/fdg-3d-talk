const Graph = ForceGraph3D()
	(document.getElementById("3d-graph"));

let curDataSetIdx;
const dataSets = getGraphDataSets();

let toggleData;
(toggleData = function() {
	curDataSetIdx = curDataSetIdx === undefined ? 0 : (curDataSetIdx+1)%dataSets.length;
	const dataSet = dataSets[curDataSetIdx];

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

