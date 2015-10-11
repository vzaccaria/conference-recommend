var _ = require('lodash')
var alt = require('../alt');
var SelectedLocationActions = require('../actions/SelectedLocationActions');
var mapDataMd = require('raw!../../../data/sightseeing.md');
import {
    getTables
}
from 'mdtable2json';

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:stores/selectedLocationStore.jsx');

function doMaybe(x, cb) {
    if(!_.isUndefined(x) && !_.isNull(x) && !(x === "")) {
        cb(x)
    }
}

class SelectedLocationStore {
    constructor() {
        this.mapData = getTables(mapDataMd)[0].json;

        this.mapData = _.map(this.mapData, (it) => {
            it.coordinates = JSON.parse(`[${it.coordinates}]`);
            doMaybe(it.url, () => {
               it.url = `https://${it.url}`;
            })
            doMaybe(it.tripadvisor, () => {
               it.tripadvisor = `https:\/\/${it.tripadvisor}`
            })
            it.gmap = `https://www.google.com/maps?saddr=My+Location&daddr=${it.coordinates[0]},${it.coordinates[1]}`
            doMaybe(it.picture, () => {
                it.picture = `https:\/\/${it.picture}`
            })
            it.tags = it.tags.split(",").map(_.trim);
            return it
        })
        this.mapCenterPosition = [45.859809, 9.077989];
        this.mapCenterZoom = 10;
        this.currentLocation = [];
        this.allTags = _.uniq(_.flatten(_.pluck(this.mapData, 'tags')));
        this.shownTags = _.uniq(_.flatten(_.pluck(this.mapData, 'tags'))) ;
        this.media = 'desktop';
        this.orientation = 'landscape';
        this.width = 0;
        this.height = 0;

        this.bindListeners({
            handleUpdateMapCenter: SelectedLocationActions.UPDATE_MAP_CENTER,
            handleUpdateMapCenterWithZoom: SelectedLocationActions.UPDATE_MAP_CENTER_WITH_ZOOM,
            handleUpdateCurrentLocation: SelectedLocationActions.UPDATE_CURRENT_LOCATION,
            handleUpdateShownTags: SelectedLocationActions.UPDATE_SHOWN_TAGS,
            handleUpdateScreenSize: SelectedLocationActions.UPDATE_SCREEN_SIZE,
            handleUpdateMedia: SelectedLocationActions.UPDATE_MEDIA
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
    handleUpdateCurrentLocation({
        currentLocation, currentLocationAccuracy
    }) {
        this.currentLocation = currentLocation;
        this.currentLocationAccuracy = currentLocationAccuracy;
    }

    handleUpdateMedia({media, orientation}) {
        debug({media, orientation})
        if(!_.isUndefined(media)) {
            this.media = media
        }
        if(!_.isUndefined(orientation)) {
            this.orientation = orientation
        }
    }

    handleUpdateScreenSize({width, height}) {
        this.width = width;
        this.height = height;
    }

    handleUpdateShownTags({type, tag}) {
        if(type === "add") {
            debug({type, tag})
            debug(this.shownTags)
            this.shownTags = _.uniq([ tag, ...this.shownTags ])
            debug(this.shownTags)
        } else {
            if(type == "remove") {
                this.shownTags = _.remove(this.shownTags, (it) => {
                    return it !== tag;
                })
                debug(this.shownTags)
            }
        }
    }
}

module.exports = alt.createStore(SelectedLocationStore, 'SelectedLocationStore');
