import React, { useEffect, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '../styles/Map.css';
import SidebarComponent from './SidebarComponent';

const lineStyles = {
    'Transmission Lines Capacity < 132 kV': { color: 'yellow', weight: 2 },
    'Transmission Lines Capacity 132-220 kV': { color: 'orange', weight: 3 },
    'Transmission Lines Capacity 220-500 kV': { color: 'red', weight: 4 },
    'Transmission Lines Capacity >= 500 kV': { color: 'purple', weight: 5 },
    'Gas Pipelines Gas Pipeline': { color: 'grey', weight: 3 },
    'Gas Pipelines Proposed Gas Pipeline': { color: 'grey', dashArray: '5, 5', weight: 3 },
    'Oil Pipelines Oil pipeline': { color: 'black', weight: 3 },
    'Oil Pipelines Proposed Oil pipeline': { color: 'black', dashArray: '5, 5', weight: 3 },
    'Railway Lines Operational': { color: 'blue', weight: 2 },
    'Railway Lines Abandoned': { color: 'blue', dashArray: '3, 3', weight: 1 },
    'Railway Lines Dismantled': { color: 'blue', dashArray: '1, 5', weight: 1 }
};

const icons = {
    'Airports Small Airport': '/InfraMap/assets/images/airport1.png',
    'Airports Medium Airport': '/InfraMap/assets/images/airport2.png',
    'Airports Large Airport': '/InfraMap/assets/images/airport3.png',
    'Airports Heliport': '/InfraMap/assets/images/heliport.png',
    'Intermodal Terminals Operational': '/InfraMap/assets/images/intermodal_terminal3.png',
    'Intermodal Terminals Proposed': '/InfraMap/assets/images/intermodal_terminal2.png',
    'Intermodal Terminals Closed': '/InfraMap/assets/images/intermodal_terminal1.png',
    'Liquid Fuel Terminals Operational': '/InfraMap/assets/images/fuel_terminal1.png',
    'Liquid Fuel Terminals Decommissioned': '/InfraMap/assets/images/fuel_terminal2.png',
    'Railway Stations Operational': '/InfraMap/assets/images/railway_station1.png',
    'Railway Stations Abandoned': '/InfraMap/assets/images/railway_station2.png',
    'Railway Stations Disused': '/InfraMap/assets/images/railway_station3.png',
    'Major Power Stations Water': '/InfraMap/assets/images/power_station_blue.png',
    'Major Power Stations Wind': '/InfraMap/assets/images/power_station_aqua.png',
    'Major Power Stations Natural Gas': '/InfraMap/assets/images/power_station_lgrey.png',
    'Major Power Stations Coal': '/InfraMap/assets/images/power_station_black.png',
    'Major Power Stations Solar': '/InfraMap/assets/images/power_station_yellow.png',
    'Major Power Stations Biogas': '/InfraMap/assets/images/power_station_green.png',
    'Major Power Stations Distillate': '/InfraMap/assets/images/power_station_purple.png',
    'Major Power Stations Biomass': '/InfraMap/assets/images/power_station_brown.png',
    'Major Power Stations Coal Seam Methane': '/InfraMap/assets/images/power_station_dgrey.png',
    'Major Power Stations Other': '/InfraMap/assets/images/power_station_pink.png',
    'Transmission Substation Substations': '/InfraMap/assets/images/substation1.png',
    'Transmission Substation Zone': '/InfraMap/assets/images/substation2.png',
    'Transmission Substation Terminal': '/InfraMap/assets/images/substation3.png',
    'Transmission Substation Switchyard': '/InfraMap/assets/images/substation4.png',
    'Transmission Substation Transmission': '/InfraMap/assets/images/substation5.png',
    'Waste Management C&D Waste Recycling Facility': '/InfraMap/assets/images/waste_management1.png',
    'Waste Management Putrescible Landfill': '/InfraMap/assets/images/waste_management2.png',
    'Waste Management Transfer Station': '/InfraMap/assets/images/waste_management3.png',
    'Waste Management Reuse Shop': '/InfraMap/assets/images/waste_management4.png',
    'Waste Management Organics Recycling Facility': '/InfraMap/assets/images/waste_management5.png',
    'Waste Management E-Waste Drop-Off Facility': '/InfraMap/assets/images/waste_management6.png',
    'Waste Management Materials Recovery Facility': '/InfraMap/assets/images/waste_management7.png',
    'Waste Management Other Waste Facility': '/InfraMap/assets/images/waste_management8.png',
    'Waste Management Soft Plastics Drop-Off Facility': '/InfraMap/assets/images/waste_management9.png',
    'Waste Management Other Recycling Facility': '/InfraMap/assets/images/waste_management10.png',
    'Waste Management Unclassified Landfill': '/InfraMap/assets/images/waste_management11.png',
    'Waste Management Metals Recovery Facility': '/InfraMap/assets/images/waste_management12.png',
    'Waste Management Plastics Recovery Facility': '/InfraMap/assets/images/waste_management13.png',
    'Waste Management Plastics Processing Facility': '/InfraMap/assets/images/waste_management14.png',
    'Waste Management Paper Recycling Facility': '/InfraMap/assets/images/waste_management15.png',
    'Waste Management Rubber Recycling Facility': '/InfraMap/assets/images/waste_management16.png',
    'Waste Management Inert Landfill': '/InfraMap/assets/images/waste_management17.png',
    'Waste Management CDS Drop-Off Facility': '/InfraMap/assets/images/waste_management18.png',
    'Waste Management Other': '/InfraMap/assets/images/waste_management19.png',
    'Maritime Ports Commodity': '/InfraMap/assets/images/port1.png',
    'Maritime Ports Commodity & Military': '/InfraMap/assets/images/port2.png',
    'Mineral Deposits Mineral Deposit': '/InfraMap/assets/images/mineral_deposits1.png',
    'Mineral Deposits Historic Mine': '/InfraMap/assets/images/mineral_deposits2.png',
    'Mineral Deposits Mine Under Development': '/InfraMap/assets/images/mineral_deposits3.png',
    'Mineral Deposits Operating Mine': '/InfraMap/assets/images/mineral_deposits4.png',
    'Mineral Deposits Care and Maintenance': '/InfraMap/assets/images/mineral_deposits5.png',
    // Add more icons as needed
};

const addGeoJSONLayer = (data, type, subType, property, value, searchText, map) => {
    const onEachFeature = (feature, layer) => {
        if (feature.properties) {
            let popupContent = '<ul>';
            for (const prop in feature.properties) {
                popupContent += `<li><strong>${prop}</strong>: ${feature.properties[prop]}</li>`;
            }
            popupContent += '</ul>';
            layer.bindPopup(popupContent);
        }
    };

    const filterFeature = (feature, file) => {
        let matchesProperty = false;

        // Check if the sub-type has a specific comparison requirement (e.g., range or numeric value)
        if (file.comparison === 'range') {
            const { minValue, maxValue } = file;
            matchesProperty = feature.properties[file.property] >= minValue && feature.properties[file.property] < maxValue;
        } else if (file.comparison === 'lt') {
            matchesProperty = feature.properties[file.property] < file.value;
        } else if (file.comparison === 'gte') {
            matchesProperty = feature.properties[file.property] >= file.value;
        } else if (file.value === 'Other') {
            // Handle 'Other' logic as you already have
            const specifiedValues = file.subTypes
                .filter(sub => sub.value !== 'Other')
                .map(sub => sub.value);

            matchesProperty = !specifiedValues.includes(feature.properties[file.property]);
        } else {
            // Default exact match for non-'Other' sub-types
            matchesProperty = feature.properties[file.property] === file.value;
        }

        // Adjust searchText to handle multiple terms
        const searchTerms = Array.isArray(searchText)
            ? searchText
            : searchText.split(',').map(term => term.trim().toLowerCase());

        const matchesSearchText = searchTerms.some(term =>
            Object.values(feature.properties).some(propValue =>
                String(propValue).toLowerCase().includes(term)
            )
        );

        return matchesProperty && matchesSearchText;
    };




    const layer = L.geoJSON(data, {
        filter: (feature) => filterFeature(feature, { subTypes: [/* Provide necessary subTypes here */] }),
        style: (feature) => {
            const key = `${type} ${subType}`;
            return lineStyles[key] || {};
        },
        pointToLayer: (feature, latlng) => {
            const key = `${type} ${subType}`;
            const icon = icons[key];
            console.log(`Using icon for key: ${key}`, icon); // Ensure correct icon is being used

            if (!icon) {
                console.error(`Icon not found for key: ${key}`);
                return L.marker(latlng);
            }

            // Ensure L.icon is creating the icon instance correctly
            const customIcon = L.icon({ iconUrl: icon, iconSize: [15, 15] });
            console.log('Custom icon created:', customIcon); // Log the custom icon instance

            return L.marker(latlng, { icon: customIcon });


        },
        onEachFeature: onEachFeature
    });

    layer.addTo(map);
    return layer;
};



const MapComponent = ({ geoJsonFiles }) => {
    const [map, setMap] = useState(null);
    const [layers, setLayers] = useState({});
    const [activeLayers, setActiveLayers] = useState([]);
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        if (map) return;

        const mapElement = document.getElementById('map');
        const mapInstance = L.map(mapElement).setView([-25.2744, 133.7751], 5);
        setMap(mapInstance);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(mapInstance);
    }, []);

    const addLegendToMap = (map, activeLayers) => {
        if (map.legend) {
            map.removeControl(map.legend);
        }

        const legend = L.control({ position: 'bottomright' });

        legend.onAdd = function () {
            const div = L.DomUtil.create('div', 'info legend');
            div.innerHTML = '<h4>Legend</h4>';

            const knownTypes = [
                "Waste Management",
                "Major Power Stations",
                "Transmission Lines",
                "Railway Stations",
                "Airports",
                "Intermodal Terminals",
                "Maritime Ports",
                "Railway Lines",
                "Transmission Substation",
                "Liquid Fuel Terminals",
                "Oil Pipelines",
                "Gas Pipelines",
                "Mineral Deposits"
                /* Add other types as needed */];

            activeLayers.forEach(layer => {
                // Find the type from the known types list that matches the beginning of `layer`
                const type = knownTypes.find(t => layer.startsWith(t));
                const subType = layer.slice(type.length + 1); // Extract everything after the type and the following space
                const layerName = `${type} - ${subType}`;

                if (icons[layer]) {
                    div.innerHTML += `<i style="background-image: url(${icons[layer]}); width: 20px; height: 20px; display: inline-block;"></i> ${layerName}<br>`;
                } else if (lineStyles[layer]) {
                    const style = lineStyles[layer];
                    const dashArray = style.dashArray ? `stroke-dasharray: ${style.dashArray};` : '';
                    div.innerHTML += `<svg width="20" height="10" style="display: inline-block;"><line x1="0" y1="5" x2="20" y2="5" style="stroke:${style.color}; stroke-width:2; ${dashArray}"></line></svg> ${layerName}<br>`;
                }
            });




            return div;
        };

        legend.addTo(map);
        map.legend = legend;
    };

    useEffect(() => {
        if (!map) return;
        addLegendToMap(map, activeLayers);

        return () => {
            if (map.legend) {
                map.removeControl(map.legend);
            }
        };
    }, [map, activeLayers, searchText]);

    const applySearchFilter = () => {
        console.log('applySearchFilter called with searchText:', searchText);

        // Split search text by commas and trim whitespace to create an array of search terms
        const searchTerms = searchText.split(',').map(term => term.trim().toLowerCase());

        activeLayers.forEach(layerName => {
            if (layers[layerName]) {
                map.removeLayer(layers[layerName]);
                console.log(`Removed layer: ${layerName}`);
            }
        });

        setActiveLayers([]);

        geoJsonFiles.forEach(file => {
            file.subTypes.forEach(subTypeObj => {
                const layerName = `${file.name} ${subTypeObj.name}`;

                if (activeLayers.includes(layerName)) {
                    fetchAndToggleLayer(file.name, subTypeObj.name, subTypeObj.property, subTypeObj.value, subTypeObj.url, searchTerms, true);
                }
            });
        });
    };

    const fetchAndToggleLayer = async (type, subType, property, value, url, searchTerms, isSearchUpdate = false) => {
        const uniqueId = subType ? `${type} ${subType}` : type;

        if (!Array.isArray(searchTerms)) {
            searchTerms = [searchTerms]; // Convert to array if it's not already
        }

        if (!isSearchUpdate && activeLayers.includes(uniqueId)) {
            if (layers[uniqueId]) {
                map.removeLayer(layers[uniqueId]);
                console.log(`Removed layer: ${uniqueId}`);
            }
            setActiveLayers(prev => prev.filter(layer => layer !== uniqueId));
            return;
        }

        try {
            if (!url) throw new Error('URL is null or undefined');
            const timestamp = new Date().getTime();
            const cacheBypassUrl = `${url}?t=${timestamp}`;

            const response = await fetch(cacheBypassUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const data = await response.json();
            console.log(`Adding layer with search terms: ${searchTerms}`);

            // Filter features to match any of the search terms
            const filteredData = {
                ...data,
                features: data.features.filter(feature =>
                    searchTerms.some(term =>
                        Object.values(feature.properties).some(prop => {
                            const propString = String(prop).toLowerCase();
                            const termMatch = propString.includes(term);

                            return termMatch;
                        })
                    )
                )
            };

            // Add filtered data to map
            const newLayer = addGeoJSONLayer(filteredData, type, subType, property, value, searchTerms.join(', '), map);
            console.log(`Layer added to map with ${filteredData.features.length} features`);

            // Update layers and activeLayers state
            setLayers(prev => ({ ...prev, [uniqueId]: newLayer }));
            setActiveLayers(prev => [...prev, uniqueId]);
        } catch (error) {
            console.error(`Error fetching GeoJSON: ${error}`);
        }
    };

    const clearAllFilters = () => {
        console.log('Clearing all filters');

        // Remove all layers from the map
        activeLayers.forEach(layerName => {
            if (layers[layerName]) {
                map.removeLayer(layers[layerName]);
                console.log(`Removed layer: ${layerName}`);
            }
        });

        // Reset states
        setActiveLayers([]);
        setSearchText('');
    };

    const toggleLayer = (type, subType, property, value, url) => {
        fetchAndToggleLayer(type, subType, property, value, url, searchText);
    };

    return (
        <div className="map-container">
            <SidebarComponent
                toggleLayer={toggleLayer}
                updateSearchText={setSearchText}
                geoJsonFiles={geoJsonFiles}
                applySearchFilter={applySearchFilter}
                clearAllFilters={clearAllFilters} // Pass clearAllFilters as prop
            />
            <div id="map" className="map"></div>
        </div>
    );
};

export default MapComponent;