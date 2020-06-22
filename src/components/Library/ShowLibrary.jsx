import React, { Component } from 'react';

class ShowLibrary extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data,
            songId: '',
            currentPlaylists: [],
            show: false
        };

        this.getCurrentPlaylist = this.getCurrentPlaylist.bind(this);
    }

    getCurrentPlaylist() {
        fetch('http://localhost:5000/playlist')
            .then(res => res.json())
            .then(data => {
                this.setState({
                    currentPlaylists: data
                })
            })
            .catch(error => console.log(error));
    }

    componentDidMount() {
        this.getCurrentPlaylist();
    }

    showModal = (event, rowId) => {
        this.setState({ show: true, songId: rowId });
    };

    hideModal = () => {
        this.setState({ show: false });
    };


    getKeys = function () {
        return Object.keys(this.props.data[0]);
    }

    getHeader = function () {
        var keys = this.getKeys();
        return keys.map((key, index) => {
            return <th key={key}>{key.toUpperCase()}</th>
        })
    }

    savePlaylist = (songId, playlistId = -1) => {
        if (playlistId >= 0) {
            var values = { name: 'tom', songs: [...this.state.currentPlaylists[playlistId].songs, songId] };
            console.log(values, 'values');

        }
        else {
            var values = { name: 'tom', songs: [songId] };
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        };
        if (playlistId >= 0) {
            fetch(`http://localhost:5000/playlist/${playlistId}`, requestOptions)
                .then(response => response.json())
                .then(data => { this.getCurrentPlaylist() });
        }
        else {
            fetch('http://localhost:5000/playlist', requestOptions)
                .then(response => response.json())
                .then(data => {
                    values["id"] = data.id;
                    this.setState(prevState => ({
                        currentPlaylists: [...prevState.currentPlaylists, values]
                    }))
                });
        }
    }

    getRowsData = function (newdata) {
        var items = newdata;
        var keys = this.getKeys();
        return items.map((row, index) => {
            return <tr key={index}><RenderRow key={index} data={row} keys={keys} />
                <button onClick={e => this.showModal(e, row.id)}>Add to Playlist</button>
            </tr>
        })
    }

    addInPlaylist = (event, objId) => {
        this.savePlaylist(this.state.songId, objId);
    };

    render() {
        var library_data = this.state.data;
        var items = this.state.currentPlaylists;
        var song = this.state.songId;

        return (
            <div>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                    <ul>
                        <li onClick={e => this.addInPlaylist(e, -1)}>Add New Plalist</li>
                        {
                            this.state.currentPlaylists.map((obj) => {
                                return (
                                    <li onClick={e => this.addInPlaylist(e, obj.id)} value={obj.id}>{obj.name}</li>
                                )
                            })
                        }
                    </ul>
                </Modal>
                <table>
                    <thead>
                        <tr>{this.getHeader()}</tr>
                    </thead>
                    <tbody>
                        {this.getRowsData(library_data)}
                    </tbody>
                </table>
            </div >

        );
    }
}

const Modal = ({ handleClose, show, children }) => {
    return (
        <div className={show ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">
                {children}
                <button onClick={handleClose}>close</button>
            </section>
        </div>
    );
};

const RenderRow = (props) => {
    return props.keys.map((key, index) => {
        return <td id={index} key={props.data[key]}>{props.data[key]}</td>
    })
}

export default ShowLibrary;