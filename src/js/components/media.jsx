import React from 'react';
var _ = require('lodash');
var StyleSheet = require('react-style');

import { tagStyle, shadowHelper, mixin, smallCaps } from '../mixins';

import SelectedLocationStore from '../stores/SelectedLocationStore.js';
import SelectedLocationActions from '../actions/SelectedLocationActions.js';

import '../../css/custom.css'
import '../../css/skeleton/css/normalize.css';
import '../../css/skeleton/css/skeleton.css';

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:components/media.jsx');

function _v(x) {
    if(!_.isUndefined(x) && !(x === "")) {
        return x;
    } else {
        return "";
    }
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
                linkSection: {
                    paddingTop: '0.5rem'
                },
                title: {
                    marginTop: '0.5rem'
                },
                textAlign: 'center',
                paddingLeft: "1rem",
                flex: '1'
            }
        }
    }
});

var mediaObject = styles.root.media;

function getIcon(url, name) {
    var nn = `fa fa-stack-1x fa-inverse fa-${name}`
    return (
        <a href={url}>
            <span className="fa-stack fa-lg">
                <i className="fa fa-circle fa-stack-2x"/>
                <i className={nn}/>
            </span>
        </a>
    );
}

function gmapLocationURL(it) {
    return `https://www.google.com/maps?saddr=My+Location&daddr=${it.coordinates[0]},${it.coordinates[1]}`;

}

function getBody(it) {
    return (
        <div style={mediaObject.body}>
            <div style={mediaObject.body.title}> {it.name} </div>
            <div style={mediaObject.body.linkSection}>
                {getIcon(gmapLocationURL(it), "google")}
                {getIcon(it.url, "tripadvisor")}
                {getIcon(it.url, "laptop")}
            </div>
        </div>
    );
}

function getPicture(it) {
    if (it.picture !== "") {
        return <img style={mediaObject.image}  src={it.picture} alt={it.picture}/>
    }
}

function getObjects(data, state) {
    data = _.filter(data, (it) => {
        debug(_.intersection(it.tags, state.shownTags).length)
            return _.intersection(it.tags, state.shownTags).length !== 0;
    });
    return _.map(data, (it, k) => {
        var handleClick = function() {
            SelectedLocationActions.updateMapCenterWithZoom(it.coordinates, 13);
        }
        return <div key={k} className="one-half column clickable">
            <div style={mediaObject} onClick={handleClick}>
                {getPicture(it)}
                {getBody(it)}
            </div>
        </div>;
    })
}

var MyMedia = React.createClass({
    /* Bind the state of this component to the SelectedLocationStore's one */
    getInitialState() {
        return SelectedLocationStore.getState();
    },
    onSelectedLocationStoreChange(state) {
        this.setState(state)
    },
    componentDidMount: function() {
        SelectedLocationStore.listen(this.onSelectedLocationStoreChange);
    },

    componentWillUnmount: function() {
        SelectedLocationStore.unlisten(this.onSelectedLocationStoreChange);
    },

    render() {
        var chunked = _.chunk(this.state.mapData, 2);
        return <div> {_.map(chunked, (c) => {
                      return <div className="row">
                      {getObjects(c, this.state)}
                      </div>
                      })}
        </div>
    }
});


module.exports = { MyMedia }
