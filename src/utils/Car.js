// function Car() {
//   this.uniqueId = null;
//   this.name = null;
//   this.description = null;
//   this.carComponents = [];
// }

// Car.prototype = {
//   setUniqueId: function (uniqueId) {
//     this.uniqueId = uniqueId;
//   },
//   getUniqueId: function () {
//     return this.uniqueId;
//   },
// };

export default class Car {
  constructor(name, color) {
    this.name = name;
    this.color = color;
  }
  getDetails() {
    return `Car name is ${this.name}, and the color is ${this.color}`;
  }
  getLocation() {
    // const myLatlng = { lat: -25.363, lng: 131.044 };
    // const map = new google.maps.Map(document.getElementById("map"), {
    //   zoom: 4,
    //   center: myLatlng,
    // });
    // // Create the initial InfoWindow.
    // let infoWindow = new google.maps.InfoWindow({
    //   content: "Click the map to get Lat/Lng!",
    //   position: myLatlng,
    // });
    // infoWindow.open(map);
    // // Configure the click listener.
    // map.addListener("click", (mapsMouseEvent) => {
    //   // Close the current InfoWindow.
    //   infoWindow.close();
    //   // Create a new InfoWindow.
    //   infoWindow = new google.maps.InfoWindow({
    //     position: mapsMouseEvent.latLng,
    //   });
    //   infoWindow.setContent(
    //     JSON.stringify(mapsMouseEvent.latLng.toJSON(), null, 2)
    //   );
    //   infoWindow.open(map);
    // });
  }
}
