import React from 'react';
import { CircleMarker, Map, Marker, Popup, TileLayer } from 'react-leaflet';

var _ = require('lodash');

function getMarkers(data) {
    return _.map(data, (it, k) => {
        console.log(it.coordinates);
        var elPosition = JSON.parse(`[${it.coordinates}]`);
        return <CircleMarker center={elPosition} key={k}>
        <Popup>
            <span> {it.name}
            </span>
        </Popup>
        </CircleMarker>
    })
}


function getMap(state) {
    return <Map center={state.mapCenterPosition} zoom = {10}>
            <TileLayer url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
            {getMarkers(state.mapData)}
    </Map>;
}

module.exports = { getMap }
