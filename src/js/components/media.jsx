import React from 'react';
var _ = require('lodash');

import { mediaLayoutCSS } from './stateDependentLayout'
import { mixin } from '../mixins';

import SelectedLocationStore from '../stores/SelectedLocationStore.js';
import SelectedLocationActions from '../actions/SelectedLocationActions.js';

import '../../css/custom.css'
import '../../css/skeleton/css/normalize.css';

import { MyTags } from './tags';
import { MediaCard } from './MediaCard.jsx'

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:components/media.jsx');



function renderState(state) {

    let renderObjects = (data) => {

        data = _.filter(data, (it) => {
            debug(_.intersection(it.tags, state.shownTags).length)
                return _.intersection(it.tags, state.shownTags).length !== 0;
        });

        return _.map(data, (it, k) => {
            var clickHandler = () => {SelectedLocationActions.updateMapCenterWithZoom(it.coordinates, 13)}
            return (
                <MediaCard key={k} onClick={clickHandler} data={it} />
            );
        });
    }

    var getStyle = (state) => {
        return mixin({
        }, mediaLayoutCSS(state));
    }

    return (
        <div styles={getStyle(state)}>
            <h5 className="center"> Computing Frontiers 2016 </h5>
            <h6 className="center gray-text"> Tourist information </h6>
            <MyTags> </MyTags>
            <div className="row">
                {renderObjects(state.mapData)}
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
