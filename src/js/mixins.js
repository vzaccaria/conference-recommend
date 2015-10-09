var _ = require('lodash')
var StyleSheet = require('react-style');

let mixin = _.merge

function smallCaps(color = 'black', weight = 500) {
    return {
        fontVariant: "small-caps",
        fontWeight: weight,
        textTransform: 'lowercase',
        color: color
    }
}

function tagStyle(color = 'black') {
    return mixin({
        display: 'inline-block',
        marginLeft: '.3rem',
        backgroundColor: color,
        fontSize: '.9em',
        padding: '.0em .4em .25em .4em',
        borderRadius: '4px',
        lineHeight: '1.1em'
    }, smallCaps('white', 500))
}

let _brk_mobile = "800px"

function hideOnMobile(media, orientation) {
    if(media === 'mobile') {
        return { display: 'none' }
    } else {
        return { }
    }
}

function shadowHelper(level) {
    var r = ""
    switch(level) {
        case 1: r = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'; break;
        case 2: r = '0 3px 6px rgba(0,0,0,0.16), 0 3px 6px rgba(0,0,0,0.23)'; break;
        case 3: r = '0 10px 20px rgba(0,0,0,0.19), 0 6px 6px rgba(0,0,0,0.23)'; break;
        case 4: r = '0 14px 28px rgba(0,0,0,0.25), 0 10px 10px rgba(0,0,0,0.22)'; break;
        case 5: r = '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22)'; break;
        default:r = '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)'; break;
    }
    return r;
}




module.exports = {
    smallCaps, mixin, tagStyle, shadowHelper, hideOnMobile
}
