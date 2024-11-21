
document.addEventListener('DOMContentLoaded', function () {
    let cities = [
        { 
            name: "Benbrook, TX",
            latitude: 32.6732,
            longitude: -97.4606 
        },
        { 
            name: "Lawrencville, GA",
            latitude: 33.9514,
            longitude: -83.9992 
        },
        { 
            name: "Atlanta, GA",
            latitude: 33.9308,
            longitude: -84.0636 
        },
        { 
            name: "Addis Ababa, Ethiopia",
            latitude: 9.0273,
            longitude: 38.7369 
        },
        { 
            name: "London, England",
            latitude: 51.5072,
            longitude: -0.1272 
        },
        
        
    ];
      // cities.forEach(c => citySelect.appendChild(new Option(c.name, `${c.latitude},${c.longitude}`)));
      cities.forEach(c => citySelect.appendChild(new Option(c.name, encodeURIComponent(JSON.stringify(c))))); //convert js obj to a string of text

      citySelect.addEventListener("change", async e => {
            //resultsOutput.innerText = citySelect.value;
            const c = JSON.parse(decodeURIComponent(citySelect.value));
            const latLng = `${c.latitude},${c.longitude}`;
            const urlEndpointResource = "https://api.weather.gov/points/" + latLng;
            const resp = await fetch(urlEndpointResource);
            const data = await resp.json();

            const secondaryURL = data.properties.forecast;
            const resp2 = await fetch(secondaryURL);
            const data2 = await resp2.json();
            resultsOutput.innerHTML = data2.properties.periods.map(p => `
            <hr>
            <h2>${p.name}:</h2>
            <p>${p.detailedForecast}</p>
            <img src="${p.icon}">
            `).join(' ');
        });
});