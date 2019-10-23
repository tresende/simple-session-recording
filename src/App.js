import React, { Component } from 'react'
import { record } from 'rrweb';
import bg from './assets/bg.png';

import './styles.css';
import Heatmap from './components/Heatmap';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.simpleHeatRef = React.createRef();
    this.data = []
    this.state = {
      data: [],
      refresh: new Date()
    }
  }

  componentDidMount() {

    record({
      emit: (event) => {
        console.log(event)
        if (event.data.positions) {
          let ocurreces = 0;
          let x = event.data.positions[0].x;
          let y = event.data.positions[0].y;

          if (x % 2 == 1)
            x--;

          if (y % 2 == 1)
            x--;

          this.data.forEach(item => {
            if (item[0] === x && item[1] === y) {
              ocurreces++;
            }
          })
          this.data.push([x, y, ocurreces]);
        }
      },
    });

    setInterval(() => {
      this.setState({ refresh: new Date() });
    }, 250);
  }

  // refresh = () => {
  //   this.setState({ refresh: new Date() });
  // }

  render() {
    return (
      <div>
        <img src={bg} />
        {/* <span>{this.state.refresh.toLocaleTimeString()}</span> */}
        {/* <button onClick={() => {
          this.refresh()
        }}>Refresh</button> */}
        <Heatmap
          id={this.data.length}
          ref={this.simpleHeatRef}
          width={window.screen.width}
          height={window.screen.height}
          data={this.data.concat([])}
          maxOccurances={20}
          blur={100}
          radius={120} />

      </div>
    )
  }
}