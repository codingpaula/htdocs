window.onload = function () {
	var chart = new CanvasJS.Chart("chartContainer",
	{
		title:{
			text: "Eisenhower Matrix",
			fontSize: 20
		},
        animationEnabled: true,
		axisX: {
			title:"URGENCY",
			titleFontSize: 18					
		},
		axisY:{
			title: "IMPORTANCE",
			titleFontSize: 16				
		},
		legend: {
			verticalAlign: 'bottom',
			horizontalAlign: "center"
		},

		data: [
		{        
			type: "scatter",  
			markerType: "circle", 
          toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span><br/><strong> Load</strong> {x} <br/><strong> Response</strong></span> {y}sec",
          
			name: "first topic",
			showInLegend: true,  
			dataPoints: [
			
			{ x: 23, y: 1 },
			{ x: 28, y: 1 },
			{ x: 39, y: 4 },
			{ x: 34, y: 4 },
			{ x: 24, y: 1 },
			{ x: 29, y: 3 },
			{ x: 29, y: 2 },
			{ x: 23, y: 2 },
			{ x: 27, y: 3 },
			{ x: 34, y: 4 },
			{ x: 36, y: 4 },
			{ x: 33, y: 2 },
			{ x: 32, y: 3 },
			{ x: 21, y: 1 }
			
			]
		}	,
		{        
			type: "scatter",     
			name: "Second Topic",
			markerType: "circle",
			showInLegend: true, 
            toolTipContent: "<span style='\"'color: {color};'\"'><strong>{name}</strong></span><br/><strong> Load</strong> {x} <br/><strong> Response</strong></span> {y}sec",

			dataPoints: [
			
			{ x: 24, y: 1 },
			{ x: 27, y: 2 },
			{ x: 35, y: 4 },
			{ x: 32, y: 3 },
			{ x: 29, y: 2 },
			{ x: 23, y: 3 },
			{ x: 24, y: 2 },
			{ x: 26, y: 2 },
			{ x: 24, y: 3 },
			{ x: 33, y: 4 },
			{ x: 34, y: 4 },
			{ x: 30, y: 2 },
			{ x: 37, y: 4 },
			{ x: 24, y: 1 }
			
			]
		}
		],
      legend:{
        cursor:"pointer",
        itemclick : function(e) {
          if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
            e.dataSeries.visible = false;              
          }
          else {
            e.dataSeries.visible = true;              
          }
          chart.render();
        }
      }
	});

chart.render();
}