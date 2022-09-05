var mymap = L.map("worldmap",
{
  center: [48.866667, 2.333333],
  zoom: 4
}
);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '(c) <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(mymap);



var latLonName = document.getElementsByClassName("ville");

var customIcon = L.icon({
    iconUrl: "https://upload.wikimedia.org/wikipedia/en/c/c3/Jafar%28Disney%29Character.png",
    shadowUrl : "https://leafletjs.com/SlavaUkraini/examples/custom-icons/leaf-shadow.png",

    iconSize: [38,95],
    shadowSize: [50,64],

    iconAnchor: [22,94],
    shadowAnchor: [4,62],

    popupAnchor: [-3, -76]
});

// console.log(latLonName)
for(let i=0;i<latLonName.length;i++){
    var coord = [latLonName[i].dataset.lat, latLonName[i].dataset.lon]
    var nameTown = latLonName[i].dataset.name
    // console.log(coord)
    console.log(nameTown)
    // L.marker(coord).addTo(mymap).bindPopup(nameTown);
    L.marker(coord, {icon: customIcon}).addTo(mymap).bindPopup(nameTown);

}




