/*require('../style/app.css');


var greeter = require('./greeter.js');

document.getElementById('root').appendChild(greeter());*/
import React,{Component} from 'react';
import ReactDOM from 'react-dom';

import Routers from './routers.js';

/*import Greet from './greeter.js';
import '../style/app.css';

ReactDOM.render(<Greet/>,
    document.getElementById('root')
)*/

ReactDOM.render(
	<div>
		<Routers/>
	</div>,
	document.getElementById('app')
);