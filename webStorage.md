# 前端本地储存三种典型方式

- 打开浏览器调试工具的application，可以看到新世界
- cookie、localStorage、sessionStorage
- 本地储存存太多，会卡。

------------------

- 同源：同域名，同端口，同协议
- 同源的判别规则
  - 和**http://www.example.com/dir/page.html**对比

|对比url|结果|结果|
|:-|:-:|:-:|
|http://www.example.com/dir/page2.html|同源|相同协议、主机、端口|
|http://www.example.com/dir2/other.html|同源|相同协议、主机、端口|
|http://username:password@www.example.com/dir2/other.html|同源|相同协议、主机、端口|
|http://www.example.com:81/dir/other.html|不同源|相同协议、主机，不同端口|
|https://www.example.com/dir/other.html|不同源|不同协议|
|http://en.example.com/dir/other.html|不同源|不同主机|
|http://example.com/dir/other.html|不同源|不同主机(需要精确匹配)|
|http://v2.www.example.com/dir/other.html|不同源|不同主机(需要精确匹配)|

- 会话
  - 概念：会话是指一个终端用户与交互系统进行通讯的过程
  - 会话较多用于网络上，TCP的三次握手就创建了一个会话，TCP关闭连接就是关闭会话。

------------------

## 一、localStorage

- 特点：
  - 生命周期：永久，不删掉数据就一直存在。
  - 可存储大小，5M。
  - 不参与服务器通信
  - 在同源浏览器下，就能操作同一份localStorage数据
  - 数据格式：字符串

### 增删改查

```js
var obj = {
    name:"张国荣",
    status:"演员，歌手",
    works:"春夏秋冬"
};
/* 添加数据，需要命名一个键名，比如magic。用JSON方法把东西变成字符串 */
window.localStorage.setItem("magic",JSON.stringfy(obj));
/* 删除数据 */
window.localStorage.removeItem('magic');//利用键名，指定删除
window.localStorage.clear();//全清
/* 查找数据 */
var can = JSON.parse(window.localStorage.getItem('magic'));//利用键名来拿，是字符串。JSON转回来
window.localStorage.key(0);//0是localStorage里面第几个添加的。拿出来的是键名
```

- 至于**改**嘛，在外面改完，加回去就得了。

## 二、sessionStorage

- 特点：
  - 生命周期：
    - 有服务器的情况下，只要这个浏览器(chrome)没有关闭，即使刷新页面或进入同源另一页面，数据仍然存在。
    - 没服务器的情况，在本地，放在同个文件夹里就是同源。
  - 可存储大小，5M。
  - 不参与服务器通信
  - 在同源浏览器，会话没结束下，就能操作同一份localStorage数据。
  - 数据格式：字符串

### CDRU

- 和localStorage基本一样

```js
var arr = ['书里总爱写道喜出望外的傍晚，起的单车还有他和她的对谈'];
/* 添加数据，需要命名一个键名，比如magic。用JSON方法把东西变成字符串 */
window.sessionStorage.setItem('doit',JSON.stringfy(arr));
/* 删除数据 */
window.sessionStorage.remove('doit');//利用键名，指定删除
window.sessionStorage.clear();//全清
/* 查找数据 */
var can = JSON.parese(window.sessionStorage.getItem('doit'));//利用键名来拿，是字符串。JSON转回来
```

## 三、cookie

- cookie的概念：访问某些页面后(访问即请求)，服务器发回/回响(respond)客服端浏览器的一种文本数据(字符串)。
  - 产生：http协议无状态，即服务器无法识别用户身份。但是比如第二次登录账号时，服务器返回用户一些信息需要知道你是谁。
  - cookie就像去银行办的卡，是你再一次去银行取钱的身份象征，有了卡的账号的密码，你就可以在银行(服务器)存钱取钱、贷款啥的。
  - 这个卡(cookie),再去银行(服务器),就会被(服务器)带回去
- cookie的应用(以前)
  - 会话状态管理（如用户登录状态，购物车，游戏分数，或其他需要记录的信息）
  - 个性化设置(如用户自定义设置，主题等)
  - 浏览器跟踪行为(如跟踪分析用户行为等)
- 使用cookie存在问题：
  - 用户可以在浏览器禁用cookie，搞开发的哪知道用户的想法
  - 存在安全隐患，可能被利用进行xss(跨站脚本攻击)或CSRF(跨站请求伪造)
- 两种cookie
  - 会话cookie：关闭浏览器消失
  - 持久化cookie：浏览器保存到本地文件中，过了有效期后自动删除

### (一)cookie的相关操作

- 服务器端
  - 向浏览器端返回cookie，告诉浏览器保存/删除cookie
  - 读取浏览器请求携带的cookie
- 浏览器端
  - 接收cookie，保存或删除
  - 请求时自动携带相应的cookie
  - 删除已有的cookie

### (二)前端对cookie的增删改查

- 增:`document.cookie="key=value;domain="www.bilibili.com"";`
  - 键值对的形式赋值添加，key=value用`=`连接。
  - domain是该键值生效域。
  - expires是该键值过期时间。
  - path是该键值是在当前的哪个路径下生成的。
  - Secure如果设置了这个属性，那么只会在SSH连接时才会回传该 Cookie
  - 多个键值对，就这么一直写下去。
- 删除：过期时间设为过去。
- 改：直接用同个键名，即可覆盖。
- 查:用正值表达式搞个函数，自己查。

==下面是别人的代码。借来看看==

```js
//设置自定义过期时间cookie
function setCookie(name,value,time){
    var msec = getMsec(time); //获取毫秒
    var exp = new Date();
    exp.setTime(exp.getTime() + msec*1);
    document.cookie = name + "="+ escape (value) + ";expires=" + exp.toGMTString() + ";path=/";
}

//将字符串时间转换为毫秒,1秒=1000毫秒
function getMsec(str){
    var timeNum=str.substring(0,str.length-1)*1; //时间数量
    var timeStr=str.substring(str.length-1,str.length); //时间单位后缀，如h表示小时
    if (timeStr=="s"){ //20s表示20秒
        return timeNum*1000;}
    else if (timeStr=="h"){ //12h表示12小时
        return timeNum*60*60*1000;}
    else if (timeStr=="d"){
        return timeNum*24*60*60*1000;} //30d表示30天
}

//读取cookies
function getCookie(name){
    var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)"); //正则匹配
    if(arr=document.cookie.match(reg)){
        return unescape(arr[2]);
    }
    else{
        return null;
    }
}

//删除cookies
function delCookie(name){
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval=getCookie(name);
    if(cval!=null){
        document.cookie= name + "="+cval+";expires="+exp.toGMTString();
    }
}
```

来一条链接，需要就看看。
`<a href="https://www.cnblogs.com/qianduantuanzhang/p/8193892.html">`