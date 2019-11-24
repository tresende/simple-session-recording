import React, { Component } from 'react'
import bg from './assets/bg.png';
import SRH from './srh'

import './styles.css';

export default class Main extends Component {

  constructor(props) {
    super(props);
    this.srh = new SRH({ interval: 2000 });
  }

  componentDidMount() {
    console.log(this.srh.start());

    setInterval(async () => {
      const data = await this.srh.getHeatMap();
      console.log(data);
    }, 5000);
  }

  renderBlocks() {
    let blocks = [];
    for (let index = 0; index < 500; index++) {
      blocks.push(<div key={index} className="block" />);
    }
    return blocks;
  }

  render() {
    return (
      <div>
        <div className="block-container">
          {this.renderBlocks()}
        </div>
        <img src={bg} alt="bg" />
      </div>
    )
  }
}