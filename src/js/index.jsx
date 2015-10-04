import React from 'react';
var { MyMap }    = require('./components/map.jsx');
var { MyMedia } = require('./components/media.jsx');

function main() {
    React.render(<MyMap />, document.getElementById('content'));
    React.render(<MyMedia />, document.getElementById('media'));
}

main()
