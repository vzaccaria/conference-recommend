import React from 'react';
import _ from 'lodash';
import { mixin } from '../mixins'

function renderIconMaterial(url, name, description) {
    var fontStyle = {
          fontSize: '.8rem !important'
    };

    if(_.isFunction(url)) {
        return (<span styles={mixin({cursor: 'pointer'}, fontStyle)} onClick={url}>{description}</span>)
    } else {
        if(url !== "") {
            return (<a styles={fontStyle} href={url}>{description}</a>);}
        else {
            return (null)
        }
    }
}

let renderLinks = (it) => {
    var links = [
        renderIconMaterial(it.gmap, "google", "directions"),
        renderIconMaterial(it.tripadvisor, "tripadvisor", "trip advisor"),
        renderIconMaterial(it.url, "laptop", "website")
    ]
    return links;
}


let renderPicture = (it) => {
    if (it.picture !== "") {
        return (
            <div className="card-image">
                <img src={it.picture} alt={it.picture} onClick={it.onClick}/>
                <span style={{background: 'rgba(0,0,0,0.1)'}} className="card-title">{it.name}</span>
            </div>);
    }
}

let renderBody = (it) => {
    return (
        <div className="card-action" >
            {renderLinks(it)}
        </div>
    );
}



var MediaCard = React.createClass({
    /* Bind the state of this component to the SelectedLocationStore's one */

    render() {
        return (
            <div className="col s12" >
                <div style={{height: "210px"}} className="card small hoverable">
                    {renderPicture(mixin(this.props.data, { onClick: this.props.onClick }))}
                    {renderBody(this.props.data)}
                </div>
            </div>
        );
    }
});


module.exports = { MediaCard }