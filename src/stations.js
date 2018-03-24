import Papa from 'papaparse';

export const stations =() {
  $.get({url: './stops.csv'}).then((stops) => {
    Papa.parse(file, {
      dynamicTyping: true,
      complete: function(results) {
		console.log("Finished:", results.data);
	}
      }
    );
  });
}
