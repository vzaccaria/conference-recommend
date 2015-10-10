import React from 'react';
var _ = require('lodash');
var StyleSheet = require('react-style');

import { hideOnMobile, tagStyle, shadowHelper, mixin, smallCaps } from '../mixins';

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

function mediaObjectStyle(state) {

    let style = {
        display: 'flex',
        alignItems: 'flex-start',
        picture: {
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
    if(state.media !== 'mobile') {
        style = mixin(style, {
            boxShadow: shadowHelper(1),
            marginBottom: '2rem'
        })
    } else {
        style = mixin(style, {
            borderBottom: '1px solid rgba(0,0,0,0.1)',
        })
    }
    return style;
}

function getIconHTML(color, name) {
    const nn = `fa fa-stack-1x fa-inverse fa-${name}`
    return (
        <span style={{color: color}} className="fa-stack fa-lg">
            <i className="fa fa-circle fa-stack-2x"/>
            <i className={nn}/>
        </span>);
}

function getIcon(url, name) {
    if(_.isFunction(url)) {
        return (<span styles={{cursor: 'pointer'}} onClick={url}>{getIconHTML('#00B2DD', name)}</span>)
    } else {
        if(url !== "") {
            return (<a href={url}>{getIconHTML('#00B2DD', name)}</a>);}
        else {
            return (<span>{getIconHTML('gray', name)}</span>)
        }
    }
}


function renderState(state) {

    let renderTags = (it) => {
        var ts = tagStyle("#00B2DD");
        return _.map(it.tags, (t) => {
            return (
                <div styles={ts}>
                    {t}
                </div>
            );
        })}


    let renderLinks = (it) => {
        var clickHandler = () => {SelectedLocationActions.updateMapCenterWithZoom(it.coordinates, 13)}
        var links = [
            getIcon(it.gmap, "google"),
            getIcon(it.tripadvisor, "tripadvisor"),
            getIcon(it.url, "laptop")
        ]
        if(state.media !== 'mobile') {
            links = [ getIcon(clickHandler, "map-marker"), ...links ]
        }
        return links;
    }

    let renderBody = (it) => {
        return (
            <div style={mixin(mediaObjectStyle(state).body, smallCaps(500))}>
                <div style={mediaObjectStyle(state).body.title}> {it.name} </div>
                <div style={mediaObjectStyle(state).body.linkSection}>
                    {renderLinks(it)}
                </div>
                <div styles={hideOnMobile(state)}>
                    {renderTags(it)}
                </div>
            </div>
        );
    }


    let renderPicture = (it) => {
        if (it.picture !== "") {
            return <img style={mediaObjectStyle(state).picture} src={it.picture} alt={it.picture}/>
        }
    }

    let renderObjects = (data) => {
        data = _.filter(data, (it) => {
            debug(_.intersection(it.tags, state.shownTags).length)
                return _.intersection(it.tags, state.shownTags).length !== 0;
        });
        return _.map(data, (it, k) => {
            return (
                <div key={k} className="one-half column">
                    <div style={mediaObjectStyle(state)}>
                        {renderPicture(it)}
                        {renderBody(it)}
                    </div>
                </div>
            );
        });
    }

    let renderChunk = (chunk) => {
        return <div className="row">
                    {renderObjects(chunk)}
        </div>
    }

    var chunked = _.chunk(state.mapData, 2);
    return (
        <div className="container" >
            {_.map(chunked, renderChunk)}
        </div>
    );
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
        return renderState(this.state)
    }
});


module.exports = { MyMedia }
