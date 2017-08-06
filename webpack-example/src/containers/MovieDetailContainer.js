/*
 * 根容器组件
 * */
import React from 'react';
import service from '../service/movieService.js';
import "../style/movieDetail.css";
export default class AppContainer extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
          isloading: true,
          movieDetail: {}
        }
    }
    // 虚拟DOM第一次渲染成实际DOM树
    componentDidMount() {
      // fetch请求数据
      this.fetch(this.props.params.id);
    }

    fetch = (id)=> {
      //https://api.douban.com/v2/movie/in_theaters
      
      // 拿到带数据的promise对象
      const promiseD = service.getMovieDetailData(id);

      // 处理数据
      promiseD.then((data)=>{

        this.setState({
          isloading: false,
          movieDetail: data
        });
        // console.log(data);
  
      },(err)=>{
        console.log(err);
      });
    }


    renderLoading = ()=> {
      return (
        <div>
          正在努力加载中
        </div>
      )
    }
    

    renderMovieDetail = ()=> {
      return(
        <div className="moviedetail-container">
          <div>
            <img src={this.state.movieDetail.images.large} alt="" />
          </div>
          <div>
            <h3>{this.state.movieDetail.title}</h3>
            <p>{this.state.movieDetail.summary}</p>
          </div>
        </div>
      )
    }

    render() {
      if(this.state.isloading) {
        return this.renderLoading();
      }
      return this.renderMovieDetail();
    }

}
