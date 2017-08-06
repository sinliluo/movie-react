/**
 * 路由配置
 */

import React from 'react';
import {Router,Route,IndexRoute,Redirect,browserHistory} from 'react-router';

import AppContainer from '../containers/AppContainer.js';
import HomeContainer from '../containers/HomeContainer.js';
import MovieContainer from '../containers/MovieContainer.js';
import MovieListContainer from '../containers/MovieListContainer.js';
import MovieDetailContainer from '../containers/MovieDetailContainer.js';
import MovieSearchContainer from '../containers/MovieSearchContainer.js';
import AboutContainer from '../containers/AboutContainer.js';

export default class Routers extends React.Component {
	constructor(props) {
		super(props)
		this.state = {

		}
	}

	render() {
		return (
			<Router history={browserHistory}>
				<Route path="/" component={AppContainer}>
					<IndexRoute component={HomeContainer} />
					<Route path="home" component={HomeContainer} />
					<Route path="movie" component={MovieContainer} >
						<IndexRoute component={MovieListContainer} />
						<Route path="movieList/:movieType" component={MovieListContainer} />
						<Route path="movieDetail/:id" component={MovieDetailContainer} />
						<Route path="movieSearch/:searchTxt" component={MovieSearchContainer} />
					</Route>
					<Route path="about" component={AboutContainer} />
				</Route>
			</Router>
		);
	}
}
