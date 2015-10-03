import React from 'react';
var _ = require('lodash');
var StyleSheet = require('react-style');

import { setCurrentPositionFromString } from './state.js'

import './custom.css'
import './skeleton/css/normalize.css';
import './skeleton/css/skeleton.css';

function shadowHelper(level) {
    var r = ""
    switch(level) {
        case 1: r = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'; break;
        case 2: r = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'; break;
        case 3: r = '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'; break;
        case 4: r = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'; break;
        case 5: r = '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'; break;
        default:r = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'; break;
    }
    return r;
}

var styles = StyleSheet.create({
    root: {
        media: {
            display: 'flex',
            alignItems: 'flex-start',
            boxShadow: shadowHelper(1),
            marginBottom: '2rem',
            image: {
                maxHeight: '10rem',
                maxWidth: '50%'
            },
            body: {
                flex: '1'
            }
        }
    }
});

function getBody(it) {
    var url =  `https:\/\/${it.url}`;
    return <p style={styles.root.media.body}> <a href={url}>
        {it.name} </a>
    </p>
}

function getPicture(it) {
    var pict = `https:\/\/${it.picture}`;

    if (it.picture !== "") {
        return <img style={styles.root.media.image}  src={pict} alt={pict}/>
    }
}

function getObjects(data) {
    return _.map(data, (it, k) => {
        var handleClick = function() {
            console.log('the click was pressed!!')
            setCurrentPositionFromString(it.coordinates)
        }
        return <div key={k} className="one-half column">
        <div style={styles.root.media} onClick={handleClick}>
            {getPicture(it)}
            {getBody(it)}
            </div>
        </div>;
    })
}


function getMedia(state) {
    var chunked = _.chunk(state.mapData, 2);
    return <div> {_.map(chunked, (c) => {
        return <div className="row">
            {getObjects(c)}
        </div>
    })} </div>
}

module.exports = { getMedia }
