var alt = require('../alt');

class SelectedLocationActions {
    updateMapCenter(selectedLocation) {
        this.dispatch(selectedLocation);
    }
    updateCurrentLocation(currentLocation, currentLocationAccuracy) {
        this.dispatch({currentLocation, currentLocationAccuracy});
    }

}

module.exports = alt.createActions(SelectedLocationActions);
