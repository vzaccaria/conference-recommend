import React from 'react';
import { CircleMarker, Map, Marker, Popup, TileLayer } from 'react-leaflet';
import SelectedLocationStore from '../stores/SelectedLocationStore.js';
import SelectedLocationActions from '../actions/SelectedLocationActions.js';
import { mapLayoutCSS } from './stateDependentLayout';


var _ = require('lodash');

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:components/map.jsx');

function getMarkers(data, state) {
    data = _.filter(data, (it) => {
        return _.intersection(it.tags, state.shownTags).length !== 0;
    });

    return _.map(data, (it, k) => {
        let nm = `marker-${k}`
        var v = (
            <CircleMarker className={nm} center={it.coordinates} key={k}>
                <Popup>
                    <span> {it.name} </span>
                </Popup>
            </CircleMarker>);
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
        SelectedLocationStore.listen(this.onSelectedLocationStoreChange);
        this.map = this.refs.theMap.leafletElement
        //this.map.on('locationfound', this.onLocationFound);
        //this.turnOnLocation()
    },

    componentWillUnmount: function() {
        SelectedLocationStore.unlisten(this.onSelectedLocationStoreChange);
    },

    turnOnLocation: function() {
        this.map.locate({watch: true, maxZoom:10})
    },

    turnOffLocation: function() {
        this.map.locate({setView: false, watch: false, zoom:10})
    },

    onLocationFound: function(e) {
        debug(`Location found ${JSON.stringify(e.latlng)}`)
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

    getStyle: function(state) {
        return mapLayoutCSS(state);
    },

    render: function() {
        return (
            <Map style={this.getStyle(this.state)} ref="theMap" center={this.state.mapCenterPosition} zoom={this.state.mapCenterZoom}>
                <TileLayer url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors' />
                {getMarkers(this.state.mapData, this.state)}
                {this.getCurrentLocationmarker()}
            </Map>
        );
    }
});

module.exports = { MyMap }
