var _ = require('lodash')
var alt = require('../alt');
var SelectedLocationActions = require('../actions/SelectedLocationActions');
var mapDataMd = require('raw!../../../data/sightseeing.md');
import { getTables } from 'mdtable2json';

class SelectedLocationStore {
    constructor() {
        this.mapData         = getTables(mapDataMd)[0].json;
        this.mapData = _.map(this.mapData, (it) => {
            it.coordinates = JSON.parse(`[${it.coordinates}]`)
            return it
        })
        this.mapCenter       = [45.859809, 9.077989];
        this.currentLocation = [ ];

        this.bindListeners({
            handleUpdateMapCenter: SelectedLocationActions.UPDATE_MAP_CENTER,
            handleUpdateCurrentLocation: SelectedLocationActions.UPDATE_CURRENT_LOCATION
            handleUpdateMapCenterWithZoom: SelectedLocationActions.UPDATE_MAP_CENTER_WITH_ZOOM,
            handleUpdateCurrentLocation: SelectedLocationActions.UPDATE_CURRENT_LOCATION,
        });
    }

    /* Location is an array of two floats */
    handleUpdateMapCenter(location) {
        this.mapCenterPosition = location;
    }

    handleUpdateMapCenterWithZoom(data) {
        this.mapCenterPosition = data[0];
        this.mapCenterZoom = data[1];
    }

    /* Location is an array of two floats */
    handleUpdateCurrentLocation({currentLocation, currentLocationAccuracy}) {
        this.currentLocation = currentLocation;
        this.currentLocationAccuracy = currentLocationAccuracy;
    }
}

module.exports = alt.createStore(SelectedLocationStore, 'SelectedLocationStore');
