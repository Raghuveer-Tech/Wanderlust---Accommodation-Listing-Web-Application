=// public/js/map.js

mapboxgl.accessToken = mapTOKEN;

// Ensure it handles 'listing' (singular as passed from your show controller) rather than 'listings'
const coordinates = listing.geometry?.coordinates;

if (!coordinates || !Array.isArray(coordinates) || coordinates.length !== 2) {
    console.warn("Invalid listing coordinates, map not rendered.");
} else {
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style: "mapbox://styles/mapbox/streets-v12",
        center: coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom optimized for detailed view
    });

    const marker = new mapboxgl.Marker({ color: "#fe424d" })
        .setLngLat(coordinates)
        .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
                `<h4>${listing.title}</h4><p>Exact Location provided after booking</p>`
            )
        )
        .addTo(map);
}