import L from 'leaflet';

// Define icons for each type
const icons = {
    'Fuel Terminal': L.icon({
        iconUrl: process.env.PUBLIC_URL + '/assets/images/fuel_terminal.png',
        iconSize: [30, 30], // size of the icon
        iconAnchor: [15, 30], // point of the icon which will correspond to marker's location
        popupAnchor: [0, -30] // point from which the popup should open relative to the iconAnchor
    }),
    'Railway Station': L.icon({
        iconUrl: process.env.PUBLIC_URL + '/assets/images/railway_station.png',
        iconSize: [26, 26],
        iconAnchor: [13, 26],
        popupAnchor: [0, -26]
    }),
    'Waste Management': L.icon({
        iconUrl: process.env.PUBLIC_URL + '/assets/images/waste_management.png',
        iconSize: [10, 10],
        iconAnchor: [5, 10],
        popupAnchor: [0, -10]
    }),
    'Maritime Ports': L.icon({
        iconUrl: process.env.PUBLIC_URL + '/assets/images/port.png',
        iconSize: [20, 20],
        iconAnchor: [10, 20],
        popupAnchor: [0, -20]
    }),
    'Power Stations': L.icon({
        iconUrl: process.env.PUBLIC_URL + '/assets/images/power_plant.png',
        iconSize: [20, 20],
        iconAnchor: [10, 20],
        popupAnchor: [0, -20]
    }),
    'Substations': L.icon({
        iconUrl: process.env.PUBLIC_URL + '/assets/images/icon6.png',
        iconSize: [10, 10],
        iconAnchor: [5, 10],
        popupAnchor: [0, -10]
    }),
    'Intermodal Terminals': L.icon({
        iconUrl: process.env.PUBLIC_URL + '/assets/images/intermodal_terminal1.png',
        iconSize: [10, 10],
        iconAnchor: [5, 10],
        popupAnchor: [0, -10]
    }),
    'Airports': L.icon({
        iconUrl: process.env.PUBLIC_URL + '/assets/images/icon7.png',
        iconSize: [10, 10],
        iconAnchor: [5, 10],
        popupAnchor: [0, -10]
    })
};

// Function to get the appropriate icon based on the type
export const getIconByType = (type) => {
    return icons[type] || L.icon({
        iconUrl: process.env.PUBLIC_URL + '/assets/images/icon5.png', // default icon
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32]
    });
};
