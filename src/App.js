import React from 'react';
import './styles/App.css';
import MapComponent from './components/MapComponent';

const geoJsonFiles = [
    {
        name: 'Airports',
        subTypes: [
            { name: 'Small Airport', property: 'type', value: 'small_airport', url: process.env.PUBLIC_URL + '/data/Airports.geojson' },
            { name: 'Medium Airport', property: 'type', value: 'medium_airport', url: process.env.PUBLIC_URL + '/data/Airports.geojson' },
            { name: 'Large Airport', property: 'type', value: 'large_airport', url: process.env.PUBLIC_URL + '/data/Airports.geojson' },
            { name: 'Heliport', property: 'type', value: 'heliport', url: process.env.PUBLIC_URL + '/data/Airports.geojson' }
        ]
    },
    {
        name: 'Maritime Ports',
        subTypes: [
            { name: 'Commodity', property: 'application', value: 'Commodity', url: process.env.PUBLIC_URL + '/data/Major_Maritime_Ports.geojson' },
            { name: 'Commodity & Military', property: 'application', value: 'Commodity, Military', url: process.env.PUBLIC_URL + '/data/Major_Maritime_Ports.geojson' }
        ]
    },
    {
        name: 'Railway Stations',
        subTypes: [
            { name: 'Operational', property: 'operationalstatus', value: 'Operational', url: process.env.PUBLIC_URL + '/data/Railway_Stations.geojson' },
            { name: 'Abandoned', property: 'operationalstatus', value: 'Abandoned', url: process.env.PUBLIC_URL + '/data/Railway_Stations.geojson' },
            { name: 'Disused', property: 'operationalstatus', value: 'Disused', url: process.env.PUBLIC_URL + '/data/Railway_Stations.geojson' }
        ]
    },
    {
        name: 'Railway Lines',
        subTypes: [
            { name: 'Operational', property: 'operational_status', value: 'Operational', url: process.env.PUBLIC_URL + '/data/Railway_Lines.geojson' },
            { name: 'Abandoned', property: 'operational_status', value: 'Abandoned', url: process.env.PUBLIC_URL + '/data/Railway_Lines.geojson' },
            { name: 'Dismantled', property: 'operational_status', value: 'Dismantled', url: process.env.PUBLIC_URL + '/data/Railway_Lines.geojson' }
        ]
    },
    {
        name: 'Intermodal Terminals',
        subTypes: [
            { name: 'Operational', property: 'operational_status', value: 'Operational', url: process.env.PUBLIC_URL + '/data/Intermodal_Terminals.geojson' },
            { name: 'Proposed', property: 'operational_status', value: 'Proposed', url: process.env.PUBLIC_URL + '/data/Intermodal_Terminals.geojson' },
            { name: 'Closed', property: 'operational_status', value: 'Closed', url: process.env.PUBLIC_URL + '/data/Intermodal_Terminals.geojson' }
        ]
    },
    {
        name: 'Major Power Stations',
        subTypes: [
            { name: 'Water', property: 'primaryfueltype', value: 'Water', url: process.env.PUBLIC_URL + '/data/Major_Power_Stations.geojson' },
            { name: 'Wind', property: 'primaryfueltype', value: 'Wind', url: process.env.PUBLIC_URL + '/data/Major_Power_Stations.geojson' },
            { name: 'Natural Gas', property: 'primaryfueltype', value: 'Natural Gas', url: process.env.PUBLIC_URL + '/data/Major_Power_Stations.geojson' },
            { name: 'Coal', property: 'primaryfueltype', value: 'Coal', url: process.env.PUBLIC_URL + '/data/Major_Power_Stations.geojson' },
            { name: 'Solar', property: 'primaryfueltype', value: 'Solar', url: process.env.PUBLIC_URL + '/data/Major_Power_Stations.geojson' },
            { name: 'Biogas', property: 'primaryfueltype', value: 'Biogas', url: process.env.PUBLIC_URL + '/data/Major_Power_Stations.geojson' },
            { name: 'Distillate', property: 'primaryfueltype', value: 'Distillate', url: process.env.PUBLIC_URL + '/data/Major_Power_Stations.geojson' },
            { name: 'Biomass', property: 'primaryfueltype', value: 'Biomass', url: process.env.PUBLIC_URL + '/data/Major_Power_Stations.geojson' },
            { name: 'Coal Seam Methane', property: 'primaryfueltype', value: 'Coal Seam Methane', url: process.env.PUBLIC_URL + '/data/Major_Power_Stations.geojson' },
            { name: 'Other', property: 'primaryfueltype', value: 'Other', url: process.env.PUBLIC_URL + '/data/Major_Power_Stations.geojson' }
        ]
    },
    {
        name: 'Transmission Substation',
        subTypes: [
            { name: 'Substations', property: 'classification', value: 'Substations', url: process.env.PUBLIC_URL + '/data/Transmission_Substations.geojson' },
            { name: 'Zone', property: 'classification', value: 'Zone', url: process.env.PUBLIC_URL + '/data/Transmission_Substations.geojson' },
            { name: 'Terminal', property: 'classification', value: 'Terminal', url: process.env.PUBLIC_URL + '/data/Transmission_Substations.geojson' },
            { name: 'Switchyard', property: 'classification', value: 'Switchyard', url: process.env.PUBLIC_URL + '/data/Transmission_Substations.geojson' },
            { name: 'Transmission', property: 'classification', value: 'Transmission', url: process.env.PUBLIC_URL + '/data/Transmission_Substations.geojson' }
        ]
    },
    {
        name: 'Transmission Lines',
        subTypes: [
            { name: 'Capacity < 132 kV', property: 'capacity_kv', value: '<132', url: process.env.PUBLIC_URL + '/data/Electricity_Transmission_Lines.geojson' },
            { name: 'Capacity 132-220 kV', property: 'capacity_kv', value: '>=132<220', url: process.env.PUBLIC_URL + '/data/Electricity_Transmission_Lines.geojson' },
            { name: 'Capacity 220-500 kV', property: 'capacity_kv', value: '>=220<500', url: process.env.PUBLIC_URL + '/data/Electricity_Transmission_Lines.geojson' },
            { name: 'Capacity >= 500 kV', property: 'capacity_kv', value: '>=500', url: process.env.PUBLIC_URL + '/data/Electricity_Transmission_Lines.geojson' }
        ]
    },
    {
        name: 'Liquid Fuel Terminals',
        subTypes: [
            { name: 'Operational', property: 'operationalstatus', value: 'Operational', url: process.env.PUBLIC_URL + '/data/Liquid_Fuel_Terminals.geojson' },
            { name: 'Decommissioned', property: 'operationalstatus', value: 'Decommissioned', url: process.env.PUBLIC_URL + '/data/Liquid_Fuel_Terminals.geojson' }
        ]
    },
    {
        name: 'Oil Pipelines',
        subTypes: [
            { name: 'Oil pipeline', property: 'feature_type', value: 'Oil pipeline', url: process.env.PUBLIC_URL + '/data/Oil_Pipelines.geojson' },
            { name: 'Proposed Oil pipeline', property: 'feature_type', value: 'Proposed Oil pipeline', url: process.env.PUBLIC_URL + '/data/Oil_Pipelines.geojson' }
        ]
    },
    {
        name: 'Gas Pipelines',
        subTypes: [
            { name: 'Gas Pipeline', property: 'operational_status', value: 'Fully capable of operation.', url: process.env.PUBLIC_URL + '/data/Gas_Pipelines.geojson' },
            { name: 'Proposed Gas Pipeline', property: 'operational_status', value: 'Proposed infrastructure.', url: process.env.PUBLIC_URL + '/data/Gas_Pipelines.geojson' }
        ]
    },
    {
        name: 'Waste Management',
        subTypes: [
            { name: 'C&D Waste Recycling Facility', property: 'facility_infrastructure_type', value: 'C&D WASTE RECYCLING FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Putrescible Landfill', property: 'facility_infrastructure_type', value: 'PUTRESCIBLE LANDFILL', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Transfer Station', property: 'facility_infrastructure_type', value: 'TRANSFER STATION', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Reuse Shop', property: 'facility_infrastructure_type', value: 'REUSE SHOP', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Organics Recycling Facility', property: 'facility_infrastructure_type', value: 'ORGANICS RECYCLING FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'E-Waste Drop-Off Facility', property: 'facility_infrastructure_type', value: 'E-WASTE DROP-OFF FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Materials Recovery Facility', property: 'facility_infrastructure_type', value: 'MATERIALS RECOVERY FACILITY (MRF)', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Other Waste Facility', property: 'facility_infrastructure_type', value: 'OTHER WASTE FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Soft Plastics Drop-Off Facility', property: 'facility_infrastructure_type', value: 'SOFT PLASTICS DROP-OFF FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Other Recycling Facility', property: 'facility_infrastructure_type', value: 'OTHER RECYCLING FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Unclassified Landfill', property: 'facility_infrastructure_type', value: 'UNCLASSIFIED LANDFILL', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Metals Recovery Facility', property: 'facility_infrastructure_type', value: 'METALS RECOVERY FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Plastics Recovery Facility', property: 'facility_infrastructure_type', value: 'PLASTICS RECOVERY FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Plastics Processing Facility', property: 'facility_infrastructure_type', value: 'PLASTICS PROCESSING FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Paper Recycling Facility', property: 'facility_infrastructure_type', value: 'PAPER RECYCLING FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Rubber Recycling Facility', property: 'facility_infrastructure_type', value: 'RUBBER RECYCLING FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Inert Landfill', property: 'facility_infrastructure_type', value: 'INERT LANDFILL', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'CDS Drop-Off Facility', property: 'facility_infrastructure_type', value: 'CDS DROP-OFF FACILITY', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' },
            { name: 'Other', property: 'facility_infrastructure_type', value: 'OTHER', url: process.env.PUBLIC_URL + '/data/Waste_Management_Facilities.geojson' }
        ]
    },
    {
        name: 'Mineral Deposits',
        subTypes: [
            { name: 'Mineral Deposit', property: 'OPERATING_STATUS', value: 'mineral deposit', url: process.env.PUBLIC_URL + '/data/Mineral_Deposits.geojson' },
            { name: 'Historic Mine', property: 'OPERATING_STATUS', value: 'historic mine', url: process.env.PUBLIC_URL + '/data/Mineral_Deposits.geojson' },
            { name: 'Mine Under Development', property: 'OPERATING_STATUS', value: 'under development', url: process.env.PUBLIC_URL + '/data/Mineral_Deposits.geojson' },
            { name: 'Operating Mine', property: 'OPERATING_STATUS', value: 'operating mine', url: process.env.PUBLIC_URL + '/data/Mineral_Deposits.geojson' },
            { name: 'Care and Maintenance', property: 'OPERATING_STATUS', value: 'care and maintenance', url: process.env.PUBLIC_URL + '/data/Mineral_Deposits.geojson' }
        ]
    },
    // Add other types without sub-properties as needed
];

const App = () => {
    return (
        <div className="App">
            <MapComponent geoJsonFiles={geoJsonFiles} />
        </div>
    );
};

export default App;
