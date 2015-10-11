let xWidth = 300

let mediaLayoutCSS = () => {
    return {
        width: xWidth,
        height: '100%'
    };
}

let mapLayoutCSS = ({width, height}) => {
    return {
        boxSizing: 'border-box',
        position: 'fixed',
        top: '0',
        left: xWidth,
        width: width - xWidth,
        height: height
    }
}

let mainLayoutCSS = () => {
    return {
        minHeight: "100%"
    }
}

module.exports = { mediaLayoutCSS, mapLayoutCSS, mainLayoutCSS }
