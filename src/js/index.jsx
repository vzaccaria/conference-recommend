import React from 'react';
var { MyMap }   = require('./components/map.jsx');
var { MyMedia } = require('./components/media.jsx');
var { MyTags }  = require('./components/tags.jsx');

function main() {
    React.render(<MyMap />, document.getElementById('content'));
    React.render(<MyTags />, document.getElementById('tags'));
    React.render(<MyMedia />, document.getElementById('media'));
}

main()
