import config from "./config.js";
import listData from "./movieList.json";
import detailData from "./movieDetail.json";
import searchData from "./searchData.json";
export default {
	getMovieListData(message) {
		console.log(message);
		let url = `${config.protocol}${config.hostname}:${config.port}/getMovieListData?message=${message}`;
		// console.log(url);
		
		return new Promise((resolve,reject)=>{
			// console.log(config);
			// let url = "https://api.douban.com/v2/movie/in_theaters";
			
			setTimeout(function () {
				const data = listData;
				resolve(data);
			},3000);

			/*fetch(url)
				.then((response) =>{
					if(response.ok) {
						return response.json();
					} else {
						console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status);
					}
				})
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
				});*/
		});
	},
	getMovieDetailData(id) {
		let url = `${config.protocol}${config.hostname}:${config.port}/getMovieDetailData?id=${id}`;
		return new Promise((resolve,reject)=>{

			setTimeout(function () {
				const data = detailData;
				resolve(data);
			},3000);

			/*fetch(url)
				.then((response)=>{
					if(response.ok) {
						return response.json();
					} else {
						console.log('服务器繁忙，请稍后再试；\r\nCode:' + response.status);
					}
				})
				.then((data)=>{
					resolve(data);
				})
				.catch((err)=>{
					reject(err);
				});*/

		});
	},
	getSearchListData(message) {
		console.log(message);
		let url = `${config.protocol}${config.hostname}:${config.port}/getSearchListData?message=${message}`;
		// console.log(url);
		
		return new Promise((resolve,reject)=>{
			// console.log(config);
			// let url = "https://api.douban.com/v2/movie/in_theaters";
			
			setTimeout(function () {
				const data = searchData;
				resolve(data);
			},3000);

			/*fetch(url)
				.then((response) =>{
					if(response.ok) {
						return response.json();
					} else {
						console.error('服务器繁忙，请稍后再试；\r\nCode:' + response.status);
					}
				})
				.then((data) => {
					resolve(data);
				})
				.catch((err) => {
					reject(err);
				});*/
		});
	}
}