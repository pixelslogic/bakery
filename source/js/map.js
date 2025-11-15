import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const mapContainer = document.getElementById('map');

if (mapContainer) {

  mapboxgl.accessToken = 'pk.eyJ1IjoiYWxtM3R0ZSIsImEiOiJjbWUxb2Q4cTQwYzhtMmtzanJvdDJzYWliIn0.YTVzWvVFlpoa-OdQOw6YXQ';

  const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mapbox/streets-v12',
    center: [34.385, 61.775],
    zoom: 12
  });

  const cityMarkers = {
    'г.Петрозаводск': [
      [34.324301, 61.783969],
      [34.309297, 61.767991],
      [34.385142, 61.782031],
      [34.367178, 61.777586],
      [34.353816, 61.787238]
    ],
    'г.Олонец': [
      [32.976808, 60.980046]
    ],
    'г.Сортавала': [
      [30.699845, 61.709277],
      [30.674759, 61.699178]
    ],
    'г.Пудож': [
      [36.530817, 61.805640]
    ]
  };

  let currentMarkers = [];

  function clearMarkers() {
    currentMarkers.forEach(marker => marker.remove());
    currentMarkers = [];
  }

  function addMarkers(coordsArray) {
    coordsArray.forEach(coord => {
      const marker = new mapboxgl.Marker({ color: 'black' })
        .setLngLat(coord)
        .addTo(map);
      currentMarkers.push(marker);
    });
  }

  const buttons = document.querySelectorAll('.map__btn');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      buttons.forEach(btn => btn.classList.remove('map__btn--active'));
      button.classList.add('map__btn--active');

      const city = button.textContent.trim();
      const coords = cityMarkers[city];

      if (!coords) return;

      clearMarkers();
      addMarkers(coords);

      map.flyTo({
        center: [coords[0][0] + 0.01, coords[0][1] - 0.005],
        zoom: 12
      });
    });
  });

  addMarkers(cityMarkers['г.Петрозаводск']);
  map.setCenter([cityMarkers['г.Петрозаводск'][0][0] + 0.01, cityMarkers['г.Петрозаводск'][0][1] - 0.005]);
  map.setZoom(12);
};