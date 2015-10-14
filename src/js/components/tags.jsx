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
        <div className="col s6" onClick={handleClick}>
            <input type="checkbox" checked={checked} />
            <label>{t}</label>
        </div>
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

    clearAll: function() {
        _.map(this.state.allTags, (t) => {
            SelectedLocationActions.updateShownTags({type: "remove", tag: t})
        })
    },

    checkAll: function() {
        _.map(this.state.allTags, (t) => {
            SelectedLocationActions.updateShownTags({type: "add", tag: t})
        })

    },

    render: function() {
        return (
            <div className="container" style={{marginTop: '1rem !important'}}>
                <div className="row" style={{marginBottom: '1rem !important'}}>
                    <div className="col s6">
                        <a className="btn-flat" onClick={this.checkAll}>
                            <i className="material-icons">check_box</i>
                        </a>
                    </div>
                    <div className="col s6">
                        <a className="btn-flat" onClick={this.clearAll}>
                            <i className="material-icons">check_box_outline_blank</i>
                        </a>

                    </div>
                </div>
                <form className="row">

                    {_.map(this.state.allTags, showTag.bind(this))}
                </form>

            </div>
        );
    }
});


module.exports = { MyTags }
