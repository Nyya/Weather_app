// 获取所有城市
let citys,weatherobj;

$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType: 'jsonp',
	success:function(obj) {
		citys = obj.data;
		// console.log(obj.data);
		for (let i in citys) {
			// console.log(i);
			let section = document.createElement('section');

			let citys_title1 = document.createElement('h1');
			citys_title1.className = "citys_title1";

			citys_title1.innerHTML = i;

			section.appendChild(citys_title1);

			for(let j in citys[i]){
				let citys_list = document.createElement('ul');
				citys_list.className = "citys_list";

				let li = document.createElement('li');
				li.innerHTML = j;

				citys_list.appendChild(li);
				section.appendChild(citys_list);
			}
			$(".citys_box").append(section);
		}
	}
})

// 获取当前城市
$.getScript("http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js",
	function(){
	getFullWeather(remote_ip_info.city);
	// getFullWeather("太原");
})

// 获取当前城市所有的信息
function getFullWeather(nowcity){
	$(".now_city").html(nowcity);

	// 获取当前城市的天气信息
	$.ajax({
	url: "https://www.toutiao.com/stream/widget/local_weather/data/?city="+nowcity,
	dataType: 'jsonp',
	success:function(obj) {
		weatherobj = obj.data;
		// console.log(weatherobj);
		// 当前的空气质量
		$(".now_air_quality").html(weatherobj.weather.quality_level);
		// 当前的气温
		$(".now_temp_temp").html(weatherobj.weather.current_temperature);
		// 当前的天气
		$(".now_weather").html(weatherobj.weather.current_condition);
		// 当前的风向
		$(".now_wind").html(weatherobj.weather.wind_direction);
		// 当前的风力
		$(".now_wind_level").html(weatherobj.weather.wind_level+"级");

		// 获取近两天的天气信息
		// 今天的天气
		$(".today_temp_max").html(weatherobj.weather.dat_high_temperature);
		$(".today_temp_min").html(weatherobj.weather.dat_low_temperature);
		$(".today_weather").html(weatherobj.weather.dat_condition);
		$(".today_img").attr('src',"img/"+weatherobj.weather.dat_weather_icon_id+".png");

		// 明天的天气
		$(".tomorrow_temp_max").html(weatherobj.weather.tomorrow_high_temperature);
		$(".tomorrow_temp_min").html(weatherobj.weather.tomorrow_low_temperature);
		$(".tomorrow_weather").html(weatherobj.weather.tomorrow_condition);
		$(".tomorrow_img").attr('src',"img/"+weatherobj.weather.tomorrow_weather_icon_id+".png");

		// 未来24小时的天气信息
		// 获取天气信息数组
		let hours_array = weatherobj.weather.hourly_forecast;
		// 创建元素并添加到页面中
		for (let i = 0; i < hours_array.length; i++) {
			// 创建li标签
			let hours_list = document.createElement('li')
			// 创建span标签
			let hours_time = document.createElement('span');
			// 引用标签
			hours_time.className = 'hours_time';
	
			let hours_img = document.createElement('img');
			hours_img.className = 'hours_img';

			let hours_temp = document.createElement('span');
			hours_temp.className = 'hours_temp';
			// 将标签添加到li中
			hours_list.appendChild(hours_time);
			hours_list.appendChild(hours_img);
			hours_list.appendChild(hours_temp);
			// 将li添加到ul中
			$('.hours_content').append(hours_list);
			// console.log(hours_array);
			// 当下时间
			hours_time.innerHTML = hours_array[i].hour+":00";
			hours_img.setAttribute('src',"img/"+hours_array[i].weather_icon_id+".png");
			hours_temp.innerHTML = hours_array[i].temperature+"°";
		}

		// 获取未来一周的天气情况
		// 获取天气信息数组
		let resent_array = weatherobj.weather.forecast_list;
		// 创建元素并添加到页面中
		for (let i = 0; i < resent_array.length; i++) {
			// 创建li标签
			let weeks_list = document.createElement('li')
			// 创建span标签
			let weeks_time = document.createElement('span');
			// 引用标签
			weeks_time.className = 'weeks_time';

			let weeks_weather = document.createElement('h1');
			weeks_weather.className = 'weeks_weather';
	
			let weeks_img = document.createElement('img');
			weeks_img.className = 'weeks_img';

			let weeks_temp_max = document.createElement('span');
			weeks_temp_max.className = 'weeks_temp_max';

			let weeks_temp_min = document.createElement('span');
			weeks_temp_min.className = 'weeks_temp_min';

			let weeks_wind = document.createElement('h2');
			weeks_wind.className = 'weeks_wind';

			let weeks_wind_level = document.createElement('h3');
			weeks_wind_level.className = 'weeks_wind_level';
			// 将标签添加到li中
			weeks_list.appendChild(weeks_time);
			weeks_list.appendChild(weeks_weather);
			weeks_list.appendChild(weeks_img);
			weeks_list.appendChild(weeks_temp_max);
			weeks_list.appendChild(weeks_temp_min);
			weeks_list.appendChild(weeks_wind);
			weeks_list.appendChild(weeks_wind_level);
			// 将li添加到ul中
			$('.weeks_content').append(weeks_list);
			// console.log(resent_array);
			// 当天天气
			weeks_time.innerHTML = resent_array[i].date.substring(5,7)+"/"+resent_array[i].date.substring(8);
			weeks_weather.innerHTML = resent_array[i].condition;
			weeks_img.setAttribute('src',"img/"+resent_array[i].weather_icon_id+".png");
			weeks_temp_max.innerHTML = resent_array[i].high_temperature+"°";
			weeks_temp_min.innerHTML = resent_array[i].low_temperature+"°";
			weeks_wind.innerHTML = resent_array[i].wind_direction;
			weeks_wind_level.innerHTML = resent_array[i].wind_level+"级";
		}
	}
})

// window.onload = function(){}
$(function(){
	// 点击城市选择城市
	$(".now_city").on("click",function(){
		$(".search").val("");
		$(".confirm").html("取消");
		// dispaly:元素垂直排列，设span的宽高，与display：none一起使显示隐藏
		$(".citys").css("display","block");
	})
	// 后代选择
	// $(".citys_list li").on("click",function(){
	// 	let son = this.innerHTML;
	// 	getFullWeather(son);
	// 	$(".citys").css("display","none");
	// })
	// 动态创建的事件获取不到数据用事件委派来获取数据
	$("body").delegate(".citys_list li","click",function(){
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})

	$("body").delegate(".citys_title1","click",function(){
		let son = this.innerHTML;
		getFullWeather(son);
		$(".citys").css("display","none");
	})

	// if($(".confirm").html() == "取消"){
	// 	$(".confirm").on("click",function(){
	// 	// =赋值 == true === false
	// 	$(".citys").css("display","none");
	// 	})
	// }
	// 获取光标
	// $(".search").on("focus",function(){
	// 	$(".confirm").html("确认");
	// 	if($(".confirm").html() == "确认"){
	// 		$(".confirm").on("click",function(){
	// 			// input获取数据时val
	// 			let text = $(".search").val();
	// 			// console.log(text);
	// 			for(let i in citys){
	// 				if(text == i){
	// 					getFullWeather(text);
	// 					$(".citys").css("display","none");
	// 					return;
	// 				}else{
	// 					for(let j in citys[i]){
	// 						if(text == j){
	// 							getFullWeather(text);
	// 							$(".citys").css("display","none");
	// 							return;
	// 						}else{
	// 							alert("输入城市有误");
	// 							return;
	// 						}
	// 					}
	// 				}
	// 			}
	// 		})
	// 	}
	// })
	// 失去光标
	// $(".search").on("blur",function(){
	// 	$(".confirm").html("取消");
	// })
	
	$(".search").on("focus",function(){
		$(".confirm").html("确认");
	})

	$(".confirm").on("click",function(){
		if(this.innerText == "取消"){
			$(".citys").css("display","none");
			// console.log(this.innerText);
		}else if(this.innerText == "确认"){
			// console.log(this.innerText);
			let text = $(".search").val();
			// console.log(text);
			for(let i in citys){
				if(text == i){
					getFullWeather(text);
					$(".citys").css("display","none");
					return;
				}else{
					for(let j in citys[i]){
						if(text == j){
							getFullWeather(text);
							$(".citys").css("display","none");
							return;
						}
					}
				}
			}
			alert("输入地区有误");
			$(".search").val("");
			$(".confirm").html("取消");
		}
	})

})

}