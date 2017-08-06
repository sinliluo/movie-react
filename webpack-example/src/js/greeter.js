/*const config = require('../config.json');
module.exports = function () {
	var greet = document.createElement('div');
	greet.innerHTML = config.greet;
	return greet;
}*/

import React, {Component} from 'react';
import Config from '../config.json';
import Styles from '../style/greeter.css';

export default class Greet extends Component {
	constructor(props) { // 没有自定义函数时不能省略
		super(props)
		this.state = {

		}
	}
	render() {
		return (
			<div className={Styles.root}> 
				{Config.greet}
			</div>
		)
	}
}