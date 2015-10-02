import React from 'react';
var _ = require('lodash');

var StyleSheet = require('react-style');

var shadowDepth = '1px';

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
            width: '400px',
            margin: '1rem',
            boxShadow: shadowHelper(1),
            image: {
                maxWidth: '33%'
            },
            body: {
                flex: '1'
            }
        }
    }
});

function getPicture(it) {
    var url =  `https:\/\/${it.url}`;
    var pict = `https:\/\/${it.picture}`;

    if (it.picture !== "") {
        return <img style={styles.root.media.image}  src={pict} alt={pict}/>
    }
}

function getObjects(data) {
    return _.map(data, (it, k) => {
        return <div style={styles.root.media} key={k}>
        {getPicture(it)}
        <p styles={styles.root.media.body} >
            {it.name}
        </p>
        </div >
    })
}


function getMedia(state) {
    return <div>
            {getObjects(state.mapData)}
    </div>
}

module.exports = { getMedia }
