

function post(URL, param, callback) {
    //1.判断,声明对象  判断是window或者是IE:原因创建XMLHttpRequest对象的方法不同.
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = ActiveXObject("Microsoft.XHTMLHTTP")
    }
    //2.监听request对象的请求状态,并且获取数据
    //在请求数据的时候,对象有一个readyState(状态变化),返回是一个状态值  
    //值是1:已经连接成功,但是数据还没有发送(注意:状态值是num类型)
    //值是2:请求已经发送,但是还在处理当中
    //值是3:请求正在处理中,已经处理了一部分数据
    //值是4:请求数据完毕(调用接口完毕)
    
    //status:返回的http状态码
    //1xx:接收信息,请求处理中;
    //2xx:常见是200,处理成功;
    //3xx:重定向,也就是说请求地址发生变化时候,返回该状态码(一般是缓存的时候会触发,304:缓存)
    //4xx:客户端错误(404:没有找到要请求的资源)
    //5xx:服务器端错误,服务器执行出错,或者不能识别请求内容(503,504请求方式出错)
    //检测readyState值,如果值为4,就说明数据请求完毕,然后在判断请求的状态码,如果状态码是200或者304,则说明该请求真的成功了,通常使用 onreadystatechange方法检测readyState,也就是说如果readyState改变一次则onreadystatechange执行一次
    xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
            if (this.status == 200 || this.status == 304) {
                callback(this.responseText)
            } else {
                console.log('error');
            }
        }
    }
    //post和get 有些许不同,需要设置请求头
    xhr.open('POST', URL, true);
    //设置请求头
    //设置数据格式为application/x-www-form-urlencoded,他是键值对的格式,例如:name=curry&age=30&job=ball
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');

    // 处理param参数
    var StrParam = '';
    for (var i in param) {
        StrParam += '&' + i + '=' + param[i];
    }

    xhr.send(StrParam.substring(1));
}

function get(URL, callback) {
    if (window.XMLHttpRequest) {
        var xhr = new XMLHttpRequest();
    } else {
        var xhr = ActiveXObject("Microsoft.XHTMLHTTP")
    }
    xhr.onreadystatechange = function () {
        //console.log(this.readyState);
        //console.log(this);
        //这里的this是xmlhttprequest对象
        if (this.readyState == 4) {
            //说明请求结束了,然后检测状态码
            if (this.status == 200 || this.status == 304) {
                //此刻请求数据成功
                //this.responseText返回的文本
                callback(this.responseText)
            } else {
                console.log('error');
            }
        }
    }
    //3.设置请求地址和请求方法
    xhr.open('GET', URL, true); //open()方式设置请求方式,如果是get请求可以在url上添加请求数据,open的第一个参数为请求方式,第二个参数为请求的url(接口);
    //发送请求
    xhr.send();
}