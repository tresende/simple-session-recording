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
  }


  render() {
    return (
      <div>
        <img src={bg} alt="bg" />
      </div>
    )
  }
}