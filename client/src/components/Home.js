import React, { Component } from 'react'
import Carousel from './home_components/carousel'
import Part1 from './part1';
import axios from 'axios';

export default class Home extends Component {
    
    render() {
        return (
            <div>
            <Carousel/>
            <Part1 />
            </div>
        )
    }
}
