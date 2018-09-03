import {
	baseUrl
} from './env'

export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	// url = baseUrl + url;
  var dataStr =''; //数据拼接字符串
	if (type == 'GET' || type == 'POST') {
		// let dataStr = ''; //数据拼接字符串
		Object.keys(data).forEach(key => {
			dataStr += key + '=' + data[key] + '&';
		})


    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      if (type == 'GET') {
      url = url + '?' + dataStr;
      }
    }

		console.log('url = ' + url);
	}

	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			// mode: "cors",
			// cache: "force-cache"
		}

		// if (type == 'POST') {
    // 	Object.defineProperty(requestConfig, 'body', {
    // 		value: JSON.stringify(data)
    // 	})
    // }
    if (type == 'POST') { // fetch模拟表单形式提交
      requestConfig = {...requestConfig, headers: {'Content-Type': 'application/x-www-form-urlencoded'}};
      requestConfig.body = dataStr;
    }

		try {
			const response = await fetch(url, requestConfig);
			// const response = await fetch(url);
			const responseJson = await response.json();
			return responseJson
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}
