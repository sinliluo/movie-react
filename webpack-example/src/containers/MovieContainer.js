/*
 * 电影容器组件
 * */
import React from 'react';
import {Link} from 'react-router';
import "../style/movie.css";

export default class AppContainer extends React.Component {
  constructor(props) {
      super(props)
      this.state = {
        movieType: "in_theaters",
        searchTxt: ""
      }
      // this.getChild
  }

  static contextTypes = {
    router: React.PropTypes.object
  }


  changeMovieType = (movieType)=> {
    this.setState({
      movieType: movieType
    });
  }

  searchChange = (e)=> {
    this.setState({
      searchTxt: e.target.value
    });
  }

  searchMovie = ()=> {
    if(this.state.searchTxt) {
      this.context.router.push(`/movie/movieSearch/${this.state.searchTxt}`);
      this.setState({
        searchTxt: "",
        movieType: ""
      });
    }
  }

  render() {
      return (
         <div className="movie-container">
             <div className="movie-menu">
                <Link className={this.state.movieType == "in_theaters" ? 'current' : "" } to="/movie/movieList/in_theaters" onClick={()=>{this.changeMovieType("in_theaters")}} >正在热映</Link>
                <Link className={this.state.movieType == "coming_soon" ? 'current' : "" } to="/movie/movieList/coming_soon" onClick={()=>{this.changeMovieType("coming_soon")}} >即将上映</Link>
                <Link className={this.state.movieType == "top250" ? 'current' : "" } to="/movie/movieList/top250" onClick={()=>{this.changeMovieType("top250")}} >Top250</Link>
             </div>
             <div className="movie-right">
                <div className="movie-search">
                  <input type="text" value={this.state.searchTxt} onChange={this.searchChange} />
                  <input type="button" value="搜索" onClick={()=>{this.searchMovie()}} />
                </div>
                <div className='movie-content'>
                  {this.props.children}
                </div>
             </div>  
         </div>
      );
  }
}
