import SelectedLocationActions from './actions/SelectedLocationActions.js';
import _debug from 'debug';
_debug.enable('app:*');
const debug = _debug('app:media.js');


function setupMediaQueries() {
    var mqlPortrait = window.matchMedia("(orientation: portrait)");


    function pListener(it) {
        debug(it.matches)
        if (it.matches) {
            SelectedLocationActions.updateMedia({
                orientation: 'portrait'
            })
        } else {
            SelectedLocationActions.updateMedia({
                orientation: 'landscape'
            })
        }
    }
    mqlPortrait.addListener(pListener)
    pListener(mqlPortrait)

    var mqlMobile = window.matchMedia("(max-width: 767px)");

    function wListener(it) {
        debug(it.matches)
        if (it.matches) {
            SelectedLocationActions.updateMedia({
                media: 'mobile'
            })
        } else {
            SelectedLocationActions.updateMedia({
                media: 'desktop'
            })
        }
    }

    mqlMobile.addListener(wListener)
    wListener(mqlMobile)
}

module.exports = {
    setupMediaQueries
}
