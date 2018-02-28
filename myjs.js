// Set up for the scatter plott

var scatterData = bnbJson.map(function (room){return [room.reviews, room.price]});
var scatterX = [], scatterY = [];
for (let i = 0; i < scatterData.length; i++){
  scatterY.push(scatterData[i][0]);
  scatterX.push(scatterData[i][1]);
}

var Scatter = document.getElementById("Scatter");
var trace1 = {
  x: scatterX,
  y: scatterY,
  mode: 'markers',
  type: 'scatter'
};

var data = [trace1];

Plotly.newPlot(Scatter, data);

// Setup for the histogram
// todo
var Histo = document.getElementById("Histogram");
var HistoX = [], pajLopp = [];
for (var i = 0; i < bnbJson.length ; i ++) {
  HistoX[i]   = bnbJson[i].price;
  pajLopp[i]  = bnbJson[i].room_type; 
}

var Histotrace = {
    x: HistoX,
    type: 'histogram',
  };
var histodata = [Histotrace];

Plotly.newPlot(Histo, histodata);

// Setup for the Boxplot
// todo


var Box = document.getElementById("Boxplot");
var y0=[],y1=[];
for (var i = 0; i < 50; i ++) {
	y0[i] = Math.random();
	y1[i] = Math.random() + 1;
}

var Boxtrace1 = {
  y: y0,
  type: 'box'
};

var Boxtrace2 = {
  y: y1,
  type: 'box'
};

var Boxdata = [Boxtrace1, Boxtrace2];

Plotly.newPlot(Box, Boxdata);

// Setup for the piechart
var Paj = document.getElementById("piechart");


var boxSet = bnbJson.map(function (room){return [room.minstay, room.price]});

function keys(data){
  var grouped = [];
  console.log("Started");
  for (let i = 0;i < data.length; i++){
    if(!grouped.includes(data[i][0])){
      grouped.push(data[i][0]);
    console.log("inloop");
    }
  }
  return grouped;
}

var boxKey = keys(boxSet);

var groupBy = function(xs, key) {
  return xs.reduce(function(rv, x) {
    (rv[x[key]] = rv[x[key]] || []).push(x);
    return rv;
  }, {});
};
var dump = groupBy(boxSet,'0');

/* for(let i = 0; i < Object.keys(dump).length;i++){
  console.log("inside");
  for (let j = 0; j < dump[i].length){
    console.log(dump[i][j]);
  }
} */


console.log("start");

function boxData(dump){
  var output= []
  Object.keys(dump).forEach(function(element) {
    var dumpArray = [];
    for (let i = 0; i < dump[element].length; i++){
      console.log(dump[element][i][1]);
      dumpArray.push(dump[element][i][1]);
    }
    output.push(dumpArray);
  })
  return output;
}

console.log("done");
var dumpArray = boxData(dump);

//reducers
function getRooms(test){
  return test.room_type;
}
var rooms = bnbJson.map(getRooms);
var countedRooms = rooms.reduce(function (allRooms, room){
  if(room in allRooms){
    allRooms[room]++;
  }
  else {
    allRooms[room] = 1;
  }
  return allRooms;
}, {});



var Pajdata = [{
  values: Object.values(countedRooms),
  labels: Object.getOwnPropertyNames(countedRooms),
  type: 'pie'
}];

var Pajlayout = {
  height: 400,
  width: 500
};

Plotly.newPlot(Paj, Pajdata, Pajlayout);
