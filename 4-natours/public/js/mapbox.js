/* eslint-disable */
//console.log('hello from the client-side 😀');

export const displayMap = locations => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiYW51c2htYXJrIiwiYSI6ImNranNnbjhrdTd5OGoyc2xnMm1jOHltZm8ifQ.uShbrbaiJqCjBAHn_xTCqw';

  var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/anushmark/ckjsofvvi5jzz19qg94vxaknd',
    scrollZoom: false,
    // center: [-121.908898,37.314025 ],
    // zoom: 4,
    //interactive: false,
  });

  //how to automatically figure out the position of the map based on our tour location points.
  const bounds = new mapboxgl.LngLatBounds();
  //loop through all our locations
  locations.forEach(loc => {
    //create marker
    const el = document.createElement('div');
    el.className = 'marker';

    //add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);

    //add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  //fit bounds
  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      right: 100,
      left: 100,
    },
  });
};
