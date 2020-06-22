import React, { Component } from 'react';
import './App.css';
import Library from './components/Library/Library';
import Sidebar from './components/Sidebar/Sidebar';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarItems: [
        { name: 'Albums', label: 'Albums' },
        { name: 'Songs', label: 'Songs' },
        { name: 'Artists', label: 'Artists' },
      ],
      isLoaded: false,
    };
  }

  render() {
    const sidebarItems = this.state.sidebarItems;
    return (
      <div className="App">
        <Sidebar items={sidebarItems} />
        <Library />
      </div>
    )
  }
}

export default App;
