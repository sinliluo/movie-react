/*
 * 根容器组件
 * */
import React from 'react';
import {Link} from 'react-router';
import service from '../service/movieService.js';
import "../style/movieList.css";


export default class AppContainer extends React.Component {
    
    constructor(props) {
      super(props)
      this.state = {
        isloading: true,
        isButtom: false,
        total: 0,
        movieListData: [],
        // 把需要传递给后台的数据放在message中
        message: {
          movieType: 'in_theaters',
          pageindex: 1,
          start: 0,
          count: 10
        }
      }
    }

    // 获得父组件的router,后面用router实现页面跳转
    static contextTypes = {
      // 属性校验后才能够使用
      router: React.PropTypes.object
    }

    // 虚拟DOM第一次渲染成实际DOM树
    componentDidMount() {
      // fetch请求数据  
      this.fetch(this.state.message.movieType);
    }


    componentWillReceiveProps(nextProps){
      if(this.state.message.movieType == nextProps.params.movieType) {
        return;
      }
      // 先将容器的scrollTop 调为0, 更新数据后触发lazyloading
      if(this.refs.scrollContainer) {
        this.refs.scrollContainer.scrollTop = 0;
      }
      // 更新state,进入先进行render()然后进入componentDidUpdate();
      if (this._reactInternalInstance) {
          this.setState({
            isloading: true,
            isButtom: false,
            total: 0,
            movieListData: [],
            message: {
              movieType: nextProps.params.movieType || 'in_theaters',
              // movieType: 2222,
              pageindex: 1,
              start: 0,
              count: 10
            }
          });
        }

    }


    componentDidUpdate() {

      if(this.state.isloading) { 
        // 如果是更新了movieType进入compoDidUpdate()进入这里  
        this.fetch(this.state.message.movieType);
      } else {
        // 如果是更新了下拉更新数据进入这里
        this.lazyLoading();
      }

      // this.lazyLoading();
    }

    lazyLoading = ()=> {
      let scrollBox = this.refs.scrollContainer;
      if(scrollBox) {
        scrollBox.onscroll = (e)=>{
          let target = e.target;
          if(target.scrollHeight == target.offsetHeight + target.scrollTop && !this.state.isButtom && this.state.total > this.state.movieListData.length) {
            console.log("到底了");
            this.setState({
              isButtom: true
            });
            this.fetch(this.state.message.movieType);
          }
        }
      }
    } 

    // 获取数据
    fetch = (movieType)=> {
      //https://api.douban.com/v2/movie/in_theaters
      //深拷贝数组
      let movieListData = [].concat(this.state.movieListData);
      // 深拷贝对象
      let message = Object.assign({},this.state.message);
      message.movieType = movieType;
      message.start = (message.pageindex - 1) * message.count;
      // 拿到带数据的promise对象
      const promiseD = service.getMovieListData(JSON.stringify(message));
      message.pageindex++;
      // 处理数据
      promiseD.then((data)=>{
        movieListData = movieListData.concat(data.subjects);
        // 判断组件是否被卸载
        if (this._reactInternalInstance) {
          this.setState({
            isloading: false,
            isButtom: false,
            total: data.total,
            movieListData: movieListData,
            message: message
          });
        }

        
        // console.log(data);
        // console.log(this.state.total);
        // console.log(movieListData.length);
      },(err)=>{
        console.log(err);
      });
    }

    // 点击跳转至详情页面的回调函数  
    goDetail = (id)=> {
      this.context.router.push("/movie/movieDetail/"+id);
    }

    // 设置数据加载出来前的遮罩
    renderLoading = ()=> {
      return (
        <div>正在努力加载中.....</div>
      )
    }

    // 渲染数据函数
    renderMovieList = ()=> {
      return (
        <div ref="scrollContainer" className="movielist-container">
          {/*jsx可以直接把数组的每一项解析出来,这里的数组用map映射到html标签里*/}
          {this.state.movieListData.map(this.renderMovieItem)}
          <div className={this.state.isButtom ? "show-load" : "hide-load"}><span>正在加载,请稍等</span></div>
        </div>
      )
    }
    

    renderMovieItem = (item)=> {
        return (
          <div className="movie-item" key={item.id+Math.random()} onClick = {()=>{this.goDetail(item.id)}}>
            <div>
              <img src={item.images.small} alt="" />
            </div>
            <div>
              <h3>{item.title}</h3>
              <p>{item.year}</p>
            </div>
          </div>
        );
    }


    // 渲染
    render() {
      if(this.state.isloading) {
        return this.renderLoading();
      }
      return this.renderMovieList();
    }
}
