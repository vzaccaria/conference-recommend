import React from 'react';
var _ = require('lodash');
var StyleSheet = require('react-style');

import { tagStyle, shadowHelper, mixin, smallCaps } from '../mixins';

import SelectedLocationStore from '../stores/SelectedLocationStore.js';
import SelectedLocationActions from '../actions/SelectedLocationActions.js';

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:components/tags.jsx');


var tagsStyle = StyleSheet.create({
    textAlign: 'center'
});

function showTag(t) {
    var color = 'btn light-blue darken-1'

    if(!_.contains(this.state.shownTags, t)) {
        color = `${color} disabled`
    }

    let customization = {
        marginRight: '1rem'
        }


    var handleClick = () => {
        debug('clicked')
            if(!_.contains(this.state.shownTags, t)) {
                SelectedLocationActions.updateShownTags({type: "add", tag: t})
            } else {
                SelectedLocationActions.updateShownTags({type: "remove", tag: t})
            }
    }

    return (<span onClick={handleClick} className={color} styles={customization} >{t}</span>);
    //return (<span onClick={handleClick} >{t}</span>);
}




var MyTags = React.createClass({
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

    render: function() {
        return (
            <div style={tagsStyle} > {_.map(this.state.allTags, showTag.bind(this))}
            </div>
        );
    }
});


module.exports = { MyTags }
