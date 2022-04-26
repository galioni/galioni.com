let tflAppKey = 'app_key=f1b823ea068e46f8b61130ec27780b3e';

let url = 'https://api.tfl.gov.uk/';

fillSelectLines();

function fillSelectLines() {
	fetch(url + 'Line/Mode/dlr,overground,tflrail,tram,tube/Route?' + tflAppKey)
	.then(
		function(response) {
			if (response.status !== 200) {
				console.log('Looks like there was a problem. Status Code: ' +
					response.status);
				return;
			}

			response.json().then(function(lines) { 
				
				lines.forEach(station => {
					var option = document.createElement("option");
					option.text = station.name;
					option.value = station.id;

					var select = document.getElementById("selLines");
					select.appendChild(option);
				});

			});
		}
	)
	.catch(function(err) {
		console.log('Fetch Error :-S', err);
	});
}
  
async function getStationsAsync() {
	var line = document.getElementById("selLines").value;

	if(line == '') {
		document.getElementById('selStationStatuses').innerHTML = '';
		document.getElementById('selStations').innerHTML = '';
		return;
	}
	
	let [lineStatus, stations] = await Promise.all([getLineStatus(line), getStations(line)]);
}

function getLineStatus(line) {
	let dateStart = new Date().toISOString().split('.')[0]+"Z" ;
	let dateEnd = new Date().addHours(1).toISOString().split('.')[0]+"Z";

	return new Promise(resolve => {
		fetch(url + 'Line/' + line + '/Status/' + dateStart + '/to/' + dateEnd + '?detail=true&' + tflAppKey)
		.then(
			function(response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' +
						response.status);
					return;
				}
	
				response.json().then(function(statuses) { 
					let data = '';
					statuses.forEach(status => {
						status.lineStatuses.forEach(lineStatus => {
							data += '<li>' + lineStatus.statusSeverityDescription

							if(lineStatus.statusSeverity != 10) { //Good Service
								data += "<br /> Reason: " + lineStatus.reason;
							}
							 
							 data += '</li>';
						});
					});

					document.getElementById('selStationStatuses').innerHTML = data;
				});
			}
		)
		.catch(function(err) {
			console.log('Fetch Error :-S', err);
		});
	});
}

function getStations(line) {
	return new Promise(resolve => {
		fetch(url + 'Line/' + line + '/StopPoints?tflOperatedNationalRailStationsOnly=false&'+ tflAppKey)
		.then(
			function(response) {
				if (response.status !== 200) {
					console.log('Looks like there was a problem. Status Code: ' +
						response.status);
					return;
				}
	
				response.json().then(function(stations) { 
					let data = '';
					stations.forEach(station => {
						data += '<li>' + station.commonName + '</li>';
					});

					document.getElementById('selStations').innerHTML = data;
				});
			}
		)
		.catch(function(err) {
			console.log('Fetch Error :-S', err);
		});
	});
}

function ISODateString(d) {
	function pad(n){return n<10 ? '0'+n : n}
	return d.getUTCFullYear()+'-'
		+ pad(d.getUTCMonth()+1)+'-'
		+ pad(d.getUTCDate())+'T'
		+ pad(d.getUTCHours())+':'
		+ pad(d.getUTCMinutes())
}

Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}