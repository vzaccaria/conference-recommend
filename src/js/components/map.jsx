import React from 'react';
import { CircleMarker, Map, Marker, Popup, TileLayer } from 'react-leaflet';

var _ = require('lodash');

function getMarkers(data) {
    return _.map(data, (it, k) => {
        var elPosition = JSON.parse(`[${it.coordinates}]`);
        var v = <CircleMarker center={elPosition} key={k}>
        <Popup>
            <span> {it.name} </span>
        </Popup>
        </CircleMarker>;
        return v;
    })
}

var MyMap = React.createClass({
    componentDidMount: function() {
        this.map = this.refs.theMap.leafletElement
        this.turnOnLocation();
        this.map.on('locationfound', this.onLocationFound);
    },
    turnOnLocation: function() {
        this.map.locate({setView: true, maxZoom:10})
    },
    turnOffLocation: function() {
        this.map.locate({setView: false, zoom:10})
    },
    onLocationFound: function(e) {
        this.state = {}
        this.state.currentLocation = [ e.latlng.lat, e.latlng.lng ];
        this.state.currentLocationAccuracy = e.accuracy/2;
    },
    getCurrentLocationmarker: function() {
        if(!_.isNull(this.state) && !_.isUndefined(this.state.currentLocation)) {
            return <CircleMarker color="green" center={this.state.currentLocation} radius={this.state.currentLocationAccuracy}>
            </CircleMarker>
        } else {
            return <div></div>
        }
    },
    render: function() {
        return <Map ref="theMap" center={this.props.data.mapCenterPosition} zoom = {10}>
                <TileLayer url = 'http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution = '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
                {getMarkers(this.props.data.mapData)}
                {this.getCurrentLocationmarker()}
        </Map>;
    }
});

module.exports = { MyMap }
