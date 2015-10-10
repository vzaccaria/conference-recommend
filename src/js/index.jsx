import React from 'react';
import SelectedLocationActions from './actions/SelectedLocationActions.js';
import { upperCase } from './mixins';
import { setupMediaQueries } from './media'

var { MyMap }   = require('./components/map.jsx');
var { MyMedia } = require('./components/media.jsx');
var { MyTags }  = require('./components/tags.jsx');



var MyApp= React.createClass({
    render() {
        return (
            <div>
                <h4 styles={[upperCase(), {textAlign: 'center'}]}>
                    Computing frontiers 2016 - Como
                </h4>
                <MyTags  />
                <MyMap   />
                <MyMedia />
            </div>
        );
    }
});

function main() {
    setupMediaQueries()
    React.render(<MyApp/>, document.getElementById('react-root'));
}

main()
