import React, { useState } from 'react';
import '../styles/Sidebar.css';

const SidebarComponent = ({ toggleLayer, updateSearchText, geoJsonFiles, applySearchFilter, clearAllFilters }) => {
    const [activeLayers, setActiveLayers] = useState({});
    const [expandedTypes, setExpandedTypes] = useState({});
    const [searchText, setSearchText] = useState('');

    const handleToggle = (type, subType, property, value, url) => {
        const uniqueId = subType ? `${type}-${subType}` : type;
        toggleLayer(type, subType, property, value, url, searchText);
        setActiveLayers(prevState => ({
            ...prevState,
            [uniqueId]: !prevState[uniqueId]
        }));
    };

    const toggleExpand = (type) => {
        setExpandedTypes(prevState => ({
            ...prevState,
            [type]: !prevState[type]
        }));
    };

    const handleSearchChange = (e) => {
        const text = e.target.value;
        setSearchText(text);
        updateSearchText(text);
    };

    const handleClearAll = () => {
        setSearchText('');
        setActiveLayers({});
        updateSearchText(''); // Clear search term in parent component
        clearAllFilters();    // Reset all layers and filters
    };

    return (
        <div className="sidebar">
            <h3>InfraMap</h3>
            <div className="searchbar">
                <div className="search-input">
                    <input
                        type="text"
                        placeholder="Search..."
                        value={searchText}
                        onChange={handleSearchChange}
                    />
                    <button onClick={applySearchFilter}>Submit</button>
                </div>
            </div>
            {geoJsonFiles.map(file => (
                <div key={file.name}>
                    {file.subTypes ? (
                        <>
                            <button onClick={() => toggleExpand(file.name)}>
                                {file.name}
                            </button>
                            {expandedTypes[file.name] && (
                                <div className="sub-types">
                                    {file.subTypes.map(sub => (
                                        <div key={sub.name}>
                                            <input
                                                type="checkbox"
                                                checked={!!activeLayers[`${file.name}-${sub.name}`]}
                                                onChange={() => handleToggle(file.name, sub.name, sub.property, sub.value, sub.url)}
                                            />
                                            <label>{sub.name}</label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    ) : (
                        <button
                            key={file.name}
                            onClick={() => handleToggle(file.name, null, null, null, file.url)}
                            className={activeLayers[file.name] ? 'active' : ''}
                        >
                            {file.name}
                        </button>
                    )}
                </div>
            ))}
            {/* Move the Clear All button to the bottom */}
            <button className="clear-button" onClick={handleClearAll}>Clear All</button>
        </div>
    );
};

export default SidebarComponent;
