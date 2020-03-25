import React, {Component} from 'react';

import './throw-error.css';

export default class ThrowError extends Component {
    constructor() {
        super();
        this.state = {
            renderError: false
        }
    }
    render() {
        if(this.state.renderError){
            this.foo.bar = 0;
        }
        return(
            <button className="btn btn-danger my-3" onClick={() => this.setState({renderError: true})}>Throw Error</button>
        );
    };
};
