import React, { Component } from 'react';
import './App.css';
import TheMap from './Map';
import _ from 'underscore';

class App extends Component {

  constructor(props){
    super(props);

    this.state = {
      allMarkers: [],
      markers: [],
      currentYear: 1880
    }
  }

  componentWillMount(){

    this.interval = setInterval( () => {
      if(this.state.currentYear > 2017){
        clearInterval(this.interval)
      } else {
        const newYear = this.state.currentYear+1;
        this.setState({
          currentYear: newYear,
          markers: this.state.allMarkers.filter((m) => m.yearInt === newYear )
        })
      }
    }, 500)

    fetch("/meteorites.json")
      .then( (r) => r.json() )
      .then( (r) => r.filter( (f) => parseInt(f.reclat.length, 10) > 0))
      .then( (meteorites) => {
        return meteorites.map( (r) => {
          const fullDate = new Date(r.year)
          r.yearInt= fullDate.getFullYear();
          r.position = {
            lat: parseInt(r.reclat, 10),
            lng: parseInt(r.reclong, 10)
          }
          return r
        })
      })
      .then( (meteorites) => {
        this.setState({
          allMarkers: meteorites
        })
      })
  }
  render() {


    return (
      <div className="">

          <header style={{ height: `10vh`, display: 'flex' }}>
            <h1>When Meteorites ATTACK!</h1>
            <div>Year: {this.state.currentYear} <small>Count: {this.state.markers.length}</small></div>
            <div>
              What is this?<br/>
              NASA data of meteorites by year and location.
            </div>
          </header>

          <TheMap
            containerElement={
              <div style={{ height: `90vh`, width: `100%` }} />
            }
            mapElement={
              <div style={{ height: `90vh`, width: `100%` }} />
            }
            onMapLoad={_.noop}
            onMapClick={_.noop}
            markers={this.state.markers}
            onMarkerRightClick={_.noop}
          />
      </div>
    );
  }
}

export default App;
