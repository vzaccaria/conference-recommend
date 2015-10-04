var mapDataMd = require('raw!../../../data/sightseeing.md');
import { getTables } from 'mdtable2json';

var mapData = getTables(mapDataMd)[0].json;
var mapCenterPosition = [45.859809, 9.077989];

var state = {mapData, mapCenterPosition}

function getState() {
    return state
}

function setCurrentPositionFromString(pos) {
    pos = JSON.parse(`[${pos}]`);
    state.mapCenterPosition = pos
}

module.exports = { getState, setCurrentPositionFromString }
