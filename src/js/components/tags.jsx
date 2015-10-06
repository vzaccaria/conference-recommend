import React from 'react';
var _ = require('lodash');
var StyleSheet = require('react-style');

import SelectedLocationStore from '../stores/SelectedLocationStore.js';
import SelectedLocationActions from '../actions/SelectedLocationActions.js';

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:components/tags.jsx');


var tagsStyle = StyleSheet.create({
    textAlign: 'center'
});

function showTag(t) {
    var color = 'black';
    var s = {
        width: '8rem',
        color: 'white',
        backgroundColor: color,
        borderRadius: '3rem',
        padding: '1rem',
        textAlign: 'center',
        marginRight: '1rem',
        cursor: 'pointer'
    }

    if(!_.contains(this.state.shownTags, t)) {
        s.color = color,
        s.backgroundColor = 'white'
    }

    var tagStyle = StyleSheet.create(s);

    var handleClick = () => {
        debug('clicked')
        if(!_.contains(this.state.shownTags, t)) {
            SelectedLocationActions.updateShownTags({type: "add", tag: t})
        } else {
            SelectedLocationActions.updateShownTags({type: "remove", tag: t})
        }
    }

    return (<span onClick={handleClick} style={tagStyle}>{t}</span>);
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
