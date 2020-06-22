import React, { Component } from 'react';
import ShowLibrary from './ShowLibrary';

class Library extends Component {

    constructor(props) {
        super(props);
        this.state = {
            items: [],
            isLoaded: false,
        };
    }

    componentDidMount() {
        fetch('http://localhost:5000/library')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    isLoaded: true,
                    items: data,
                })
            });
    }

    render() {
        var isLoaded = this.state.isLoaded;
        var items = this.state.items;
        if (!isLoaded) {
            return <div>Loading...</div>;
        }
        else {
            return (
                <div className="dashboard">
                    <ShowLibrary data={items} />
                </div>
            )
        }
    }
}

export default Library;