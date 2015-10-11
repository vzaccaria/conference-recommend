import React from 'react';
var _ = require('lodash');
var StyleSheet = require('react-style');

import { mediaLayoutCSS } from '../sizes'
import { hideOnMobile, tagStyle, shadowHelper, mixin, smallCaps } from '../mixins';

import SelectedLocationStore from '../stores/SelectedLocationStore.js';
import SelectedLocationActions from '../actions/SelectedLocationActions.js';

import '../../css/custom.css'
import '../../css/skeleton/css/normalize.css';

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

function renderIconHTML(color, name) {
    const nn = `fa fa-stack-1x fa-inverse fa-${name}`
    return (
        <span style={{color: color}} className="fa-stack fa-lg">
            <i className="fa fa-circle fa-stack-2x"/>
            <i className={nn}/>
        </span>);
}

function renderIcon(url, name, description) {
    if(_.isFunction(url)) {
        return (<span styles={{cursor: 'pointer'}} onClick={url}>{renderIconHTML('#00B2DD', name)}</span>)
    } else {
        if(url !== "") {
            return (<a href={url}>{renderIconHTML('#00B2DD', name)}</a>);}
        else {
            return (<span>{renderIconHTML('gray', name)}</span>)
        }
    }
}

function renderIconMaterial(url, name, description) {
    if(_.isFunction(url)) {
        return (<span styles={{cursor: 'pointer'}} onClick={url}>{description}</span>)
    } else {
        if(url !== "") {
            return (<a href={url}>{description}</a>);}
        else {
            return (null)
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
        var links = [
            renderIconMaterial(it.gmap, "google", "directions"),
            renderIconMaterial(it.tripadvisor, "tripadvisor", "trip advisor"),
            renderIconMaterial(it.url, "laptop", "website")
        ]
        return links;
    }

//    <div styles={hideOnMobile(state)}>
//    {renderTags(it)}
//    </div>

    let renderBody = (it) => {
        return (
                <div className="card-action" >
                    {renderLinks(it)}
                </div>
        );
    }

    // return <img style={mediaObjectStyle(state).picture} src={it.picture} alt={it.picture}/>

    let renderPicture = (it) => {
        if (it.picture !== "") {
            return (<div className="card-image">
                <img src={it.picture} alt={it.picture}/>
                </div>);
        }
    }

    //<div className="card" style={mediaObjectStyle(state)}>

    let renderObjects = (data) => {
        data = _.filter(data, (it) => {
            debug(_.intersection(it.tags, state.shownTags).length)
                return _.intersection(it.tags, state.shownTags).length !== 0;
        });
        return _.map(data, (it, k) => {
            var clickHandler = () => {SelectedLocationActions.updateMapCenterWithZoom(it.coordinates, 13)}

            return (
                <div key={k} className="col s12" onClick={clickHandler}>
                    <div className="card small hoverable">
                        {renderPicture(it)}
                        <div className="card-content">
                            <h6>{it.name}</h6>
                        </div>
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

    var getStyle = (state) => {
        return mixin({
            }, mediaLayoutCSS(state));
        }

    return (
        <div styles={getStyle(state)}>
        <div >
            {_.map(chunked, renderChunk)}
        </div>
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
