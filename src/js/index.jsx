import React from 'react';
var { MyMap }    = require('./components/map.jsx');
var { getMedia } = require('./components/media.jsx');
var { getState } = require('./stores/state.js')


function projectState(state) {
    React.render(<MyMap data={state} />, document.getElementById('content'));
    React.render(getMedia(state), document.getElementById('media'));
}

function main() {
    var state = getState();
    projectState(state);
    setInterval(() => projectState(state), 1000)
}

main()
