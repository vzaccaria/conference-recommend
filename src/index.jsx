import React from 'react';
var { MyMap } = require('./map.jsx');
var { getMedia } = require('./media.jsx');
var { getState } = require('./state.js')


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
