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

var ScatterLayout = {
  title: 'Spridningen av hyrespriserna',
  xaxis: {
    title: 'Pris'
  },
  yaxis: {
    title: 'Antal recensioner'
  }
};

Plotly.newPlot(Scatter, data, ScatterLayout);

// Setup for the Histogram

var Histo = document.getElementById("Histogram");
var Histo1 = [],Histo2 = [];
for (var i = 0; i < bnbJson.length ; i ++) {
  Histo1[i]   = bnbJson[i].price;
  Histo2[i] = bnbJson[i].accommodates;
}

var Histotrace1 = {
    x: Histo1,
    type: 'histogram',
  };
  var Histotrace2 = {
    x: Histo2,
    type: 'histogram',
  };

var HistoLayout1 = {
  title: 'Spridningen av hyrespriserna',
  xaxis: {
    title: 'Pris'
  },
  yaxis: {
    title: 'Antal'
  }
};

var HistoLayout2 = {
  title: 'Spridningen av antal gäster',
  xaxis: {
    title: 'ackommoderade'
  },
  yaxis: {
    title: 'Antal'
  }
};

Plotly.newPlot(Histo, [Histotrace1],HistoLayout1);
Plotly.newPlot(document.getElementById("Histogram2"), [Histotrace2],HistoLayout2);


// Box n whiskers plot
var boxSet = bnbJson.map(function (room){return [room.minstay, room.price]});

// Legend function används ej.
function keys(data){
  var grouped = [];
  for (let i = 0;i < data.length; i++){
    if(!grouped.includes(data[i][0])){
      grouped.push(data[i][0]);
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
var boxGrouped = groupBy(boxSet,'0');

function boxData(dump){
  var output= []
  Object.keys(dump).forEach(function(element) {
    var dumpArray = [];
    for (let i = 0; i < dump[element].length; i++){
     
      dumpArray.push(dump[element][i][1]);

    }
    output.push({
        y:dumpArray,
        type:'box',
        name:'MS: '+ element});
  })
  return output;
}

var BoxTrace = boxData(boxGrouped);

var Box = document.getElementById("Boxplot");

var BoxLayout = {
  title: 'Pris grupperad på min stay.',
  showlegend: false,
  yaxis: {
    title: 'Pris'
  }
};

Plotly.newPlot(Box, BoxTrace, BoxLayout);


// Create pie chart.
var Paj = document.getElementById("piechart");

var rooms = bnbJson.map(function (room){return room.room_type});
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
  width: 500,
  title: 'Room types'
};

Plotly.newPlot(Paj, Pajdata, Pajlayout);


// test inbyggda group by function
var scatterData = bnbJson.map(function (room){return [room.reviews, room.price]});
var testBoxMS = [], testBoxPrice = [];
for (let i = 0; i < bnbJson.length; i++){
  testBoxMS.push(bnbJson[i].minstay);
  testBoxPrice.push(bnbJson[i].price);
}

var data = [{
  type: 'box',
  x: testBoxMS,
  y: testBoxPrice,
  transforms: [{
    type: 'groupby',
    groups: testBoxMS,
  }]
}]

var testLayout = {
  title: 'Pris grupperad på min stay.',
  showlegend: false
}

Plotly.plot(document.getElementById("test"), data,testLayout);