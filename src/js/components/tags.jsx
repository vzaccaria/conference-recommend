import React from 'react';
var _ = require('lodash');

import SelectedLocationStore from '../stores/SelectedLocationStore.js';
import SelectedLocationActions from '../actions/SelectedLocationActions.js';

import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:components/tags.jsx');


function showTag(t) {
    var checked = true

    //var color = 'btn light-blue darken-1'

    if(!_.contains(this.state.shownTags, t)) {
        checked = false
    }

    var handleClick = () => {
        debug('clicked')
            if(!_.contains(this.state.shownTags, t)) {
                SelectedLocationActions.updateShownTags({type: "add", tag: t})
            } else {
                SelectedLocationActions.updateShownTags({type: "remove", tag: t})
            }
    }

    return (
        <li style={{height: '3rem'}} className="collection-item">
            <div className="col s9"> {t} </div>
            <div className="col s3 switch">
                <label>
                    <input type="checkbox" checked={checked} onClick={handleClick}/>
                    <span className="lever"></span>
                </label>
            </div>
        </li>
    );
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
            <div className="row">
                <ul className="collection">
                    {_.map(this.state.allTags, showTag.bind(this))}
                </ul>
            </div>
        );
    }
});


module.exports = { MyTags }
