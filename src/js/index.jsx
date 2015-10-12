import React from 'react';
import SelectedLocationActions from './actions/SelectedLocationActions.js';
import { upperCase } from './mixins';
import { setupMediaQueries, setupSizeQueries } from './actions/mediaQueryActionGenerators'
import 'materialize-css/bin/materialize.css'
import { mainLayoutCSS } from './components/stateDependentLayout'

var { MyMap }   = require('./components/map.jsx');
var { MyMedia } = require('./components/media.jsx');
var { MyTags }  = require('./components/tags.jsx');



var MyApp= React.createClass({

    render() {
        return (
            <div style={mainLayoutCSS()}>
                <MyMedia />
                <MyMap   />
            </div>
        );
    }
});

function main() {
    setupMediaQueries();
    setupSizeQueries();
    React.render(<MyApp/>, document.getElementById('react-root'));
}

main()
