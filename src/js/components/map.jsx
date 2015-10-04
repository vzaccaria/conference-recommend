import React from 'react';
import { CircleMarker, Map, Marker, Popup, TileLayer } from 'react-leaflet';
import SelectedLocationStore from '../stores/SelectedLocationStore.js';
import SelectedLocationActions from '../actions/SelectedLocationActions.js';

var _ = require('lodash');

function getMarkers(data) {
    return _.map(data, (it, k) => {
        var v = <CircleMarker center={it.coordinates} key={k}>
        <Popup>
            <span> {it.name} </span>
        </Popup>
        </CircleMarker>;
        return v;
    })
}

var MyMap = React.createClass({

    /* Bind the state of this component to the SelectedLocationStore's one */
    getInitialState() {
        return SelectedLocationStore.getState();
    },
    onSelectedLocationStoreChange(state) {
        this.setState(state)
    },

    componentDidMount: function() {
        this.map = this.refs.theMap.leafletElement
        this.turnOnLocation();
        this.map.on('locationfound', this.onLocationFound);
        SelectedLocationStore.listen(this.onSelectedLocationStoreChange);
    },

    componentWillUnmount: function() {
        SelectedLocationStore.unlisten(this.onSelectedLocationStoreChange);
    },

    turnOnLocation: function() {
        this.map.locate({setView: true, maxZoom:10})
    },

    turnOffLocation: function() {
        this.map.locate({setView: false, zoom:10})
    },

    onLocationFound: function(e) {
        const loc = [ e.latlng.lat, e.latlng.lng ];
        const acc = e.accuracy/2;
        SelectedLocationActions.updateCurrentLocation(loc, acc);
    },
    getCurrentLocationmarker: function() {
        const cl = this.state.currentLocation

        if(_.isArray(cl) && cl.length === 2) {
            return <CircleMarker
                       color="green" center={this.state.currentLocation}
                       radius={this.state.currentLocationAccuracy}>
            </CircleMarker>
        } else {
            return <div></div>
        }
    },
    render: function() {
        return <Map ref="theMap" center={this.state.mapCenterPosition} zoom = {10}>
                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
                           attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                />
                {getMarkers(this.state.mapData)}
                {this.getCurrentLocationmarker()}
        </Map>;
    }
});

module.exports = { MyMap }
