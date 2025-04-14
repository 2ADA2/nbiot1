import React, {Component} from 'react';
import {ErrorPage} from "./errorPage";

class ErrorBoundary extends Component {
    constructor() {
        super();
        this.state = {
            hasError: false,
            error:null,
            errorInfo:null,
        }
    }

    componentDidCatch(error, errorinfo) {
        this.setState({
            hasError: true,
            error, errorinfo,
        });
    }

    render() {
        if(this.state.hasError) {
            return <ErrorPage err={this.error} toBack={!!localStorage.getItem("token")}/>
        }
        return this.props.children
    }
}

export default ErrorBoundary;