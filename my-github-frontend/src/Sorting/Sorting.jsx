import React, {Component} from "react";

import './Sorting.css';

export default class Sorting extends Component {
    constructor(props) {
        super(props)
        this.state = {};
    }

    render () {
        return React.createElement("h1", null, "Sorting", this.props.name)
    }
}