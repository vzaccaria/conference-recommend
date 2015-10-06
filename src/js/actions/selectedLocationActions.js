var alt = require('../alt');

class SelectedLocationActions {
    updateMapCenter(selectedLocation) {
        this.dispatch(selectedLocation);
    }

    updateMapCenterWithZoom(selectedLocation, zoom) {
        this.dispatch([selectedLocation, zoom]);
    }

    updateCurrentLocation(currentLocation, currentLocationAccuracy) {
        this.dispatch({currentLocation, currentLocationAccuracy});
    }

    updateShownTags({type, tag}) {
        this.dispatch({type, tag});
    }
}

module.exports = window.$a = alt.createActions(SelectedLocationActions);
