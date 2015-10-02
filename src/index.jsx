import React from 'react';
import { getTables } from 'mdtable2json';
var { getMap } = require('./map.jsx');
var { getMedia } = require('./media.jsx');

var mapDataMd = require('raw!../data/sightseeing.md');

function getInitialState() {
    var mapData = getTables(mapDataMd)[0].json;
    var mapCenterPosition = [45.859809, 9.077989];
    return { mapData, mapCenterPosition }
}

function projectState(state) {
    React.render(getMap(state), document.getElementById('content'));
    React.render(getMedia(state), document.getElementById('media'));
}

function main() {
    var state = getInitialState();
    projectState(state);
}

main();
