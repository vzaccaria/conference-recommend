import React from 'react';
var _ = require('lodash');

var StyleSheet = require('react-style');

var styles = StyleSheet.create({
    root: {
        media: {
            display: 'flex',
            alignItems: 'flex-start',
            width: '400px',
            margin: '1rem',
            boxShadow: '0 2px 5px 0 rgba(0, 0, 0, 0.16), 0 2px 10px 0 rgba(0, 0, 0, 0.12)',
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
        return <div style={styles.root.media}>
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
