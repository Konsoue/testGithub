window.onload = function(){
var listView = document.getElementsByClassName('list')[0];
var ul = document.getElementsByClassName('toggle-list')[0];
var input = document.getElementsByTagName('input')[0];
var liAll;
var activeNum = document.getElementsByClassName('number')[0];//active的有几个，数个数
var activeLis = document.getElementsByClassName('active');
var completedLis = document.getElementsByClassName('completed');
var door = document.getElementsByClassName('toggleAll')[0];//输入框左边的箭头
door.addEventListener('click',function(){selectAllLi();},false);
var name = "which selected";
var operateAll = document.getElementsByClassName('which');
var clearOperate = document.getElementsByClassName('clear')[0];
var footer = document.getElementsByClassName('footer')[0];
var dataIdNum = 1255000000;//li排序用的
var soueLS;
if(window.localStorage.getItem('arr')){
    soueLS = JSON.parse(window.localStorage.getItem('arr'));
    showSoueLs();
}else{
    soueLS = [];
}
/* 存在local Storage的数据每次打开页面，拿出来显示 */
function showSoueLs(){
    if(soueLS){
        var count = 0;
        for(var i = 0,len = soueLS.length;i < len;i++){
            if(soueLS[i].completed == 'completed'){count++;}
            createLi(soueLS[i].title,soueLS[i].completed,soueLS[i].id);
        }
        if(count == soueLS.length){
            door.count = 1;
            door.style.color = "black"; 
        }else{
            door.count = 0;
            door.style.color = "#e6e6e6";
        }
        if(count == 0){
            clearOperate.style.display = "none";
        }else{
            clearOperate.style.display = "block";
        }
        
    }
}
/* this.localStorage.clear(); */
/* 按toggleAll的全选 */
function selectAllLi(){
    var inputAll = document.getElementsByClassName('toggle');
    /* 退选 */
    if(door.count != 0){
        for(var i = 0,len = liAll.length;i<len;i++){
            liAll[i].setAttribute('class','active');
            inputAll[i].setAttribute('data-count','0');
            inputAll[i].checked = false;
            soueLS[i].completed = "active";
        }
        door.style.color = "#e6e6e6";
        clearOperate.style.display = "none";
        door.count = 0;
    }
    /* 选中 */
    else{
        for(var i = 0,len = liAll.length;i<len;i++){
            liAll[i].setAttribute('class','completed');
            inputAll[i].setAttribute('data-count','1');
            inputAll[i].checked = true;
            soueLS[i].completed = "completed";
        }
        door.style.color = "black";
        clearOperate.style.display = "block";
        door.count = 1;
    }
    window.localStorage.setItem('arr',JSON.stringify(soueLS));
    activeshow();
    sortLis();
}
/* 添加li后，取消全选 */
function quitSelectAll(){
    door.style.color = "#e6e6e6";
    door.count = 0;
    activeshow();
    sortLis();
}
/* all、active、completed选中函数 */
function operateSelect(e){
    var event = e || window.event;
    for(var i = 0;i < 3;i++)
    {
        operateAll[i].setAttribute('class','which');
    }
    event.target.setAttribute('class',name);
    sortLis();
}
function showLiAll(){
    for(var i = 0,len = liAll.length;i<len;i++){
        liAll[i].style.display = "block";
    }
}
/* all、active、completed里面li的分类 */
function sortLis(){
    /* 在active和completed里面选中li的重分类 */
    var whichPage = document.getElementsByClassName('selected')[0].innerText;
    if(whichPage == "Active"){
        showLiAll();
        for(var i = 0,len=completedLis.length;i < len;i++){
             completedLis[i].style.display = "none";
        }
    }else if(whichPage == "Completed"){
        showLiAll();
        for(var i = 0,len=activeLis.length;i < len;i++){
            activeLis[i].style.display = "none";
        }
    }else{
        showLiAll();
    }
}
/* 把值存在本地仓库的函数 */
function createLSValue(connect,status,idNum){
    var obj = {
        title:connect,
        completed:status,
        id:idNum
    };
    soueLS.push(obj);
    window.localStorage.setItem('arr',JSON.stringify(soueLS));
    createLi(obj.title,obj.completed,obj.id);
}
/* 封装创建li的函数 */
function createLi(word,status,idNum){
    var li = document.createElement('li');
    li.setAttribute('class',status);
    li.setAttribute('data-id',idNum);dataIdNum++;
    var label = document.createElement('label');
    label.setAttribute('class','circle');
    var input = document.createElement('input');
    input.setAttribute('class','toggle');
    input.setAttribute('type','checkbox');
    if(status == "active"){
        input.setAttribute('data-count','0');
        input.checked = false;
    }else{
        input.setAttribute('data-count','1');
        input.checked = true;
    }
    input.addEventListener('click',function(e){selectLi(e);},false);//绑定事件，选中时的样式呈现
    var a = document.createElement('a');
    a.setAttribute('class','mya');
    label.appendChild(input);
    label.appendChild(a);
    var div = document.createElement('div');
    div.innerText = word;
    div.addEventListener('dblclick',function(e){reviseLi(e);},false);
    var button = document.createElement('button');
    button.setAttribute('class','destory');
    button.addEventListener('click',function(e){deleteLi(e);},false);//给x绑定事件，删除li
    li.appendChild(label);
    li.appendChild(div);
    li.appendChild(button);
    ul.appendChild(li);
    liAll = ul.children;//拿ul里面所有li
    activeshow();
    footShow();
    sortLis();
}
/* 输入后回车，增添li */
input.onkeyup = function test(e){
    var event = e || window.event;
    if(event.keyCode == 13 && input.value.trim())
    {
        createLSValue(input.value,'active',dataIdNum);
        input.value = "";
        door.count = 1;
        quitSelectAll();
    }
}
/* todo代办事件,input失焦后 */
input.onblur = function(){
    if(input.value.trim()){
        createLSValue(input.value,'active',dataIdNum);
        input.value = "";
        door.count = 1;
        quitSelectAll();
    }
}
/* 选中li变为completed绑定时的函数 */
function selectLi(e){
    var event = e || window.event;
    var selectinput = event.target;
    var select = selectinput.parentElement.parentElement;
    if(selectinput.getAttribute('data-count') != 1){
        select.setAttribute('class','completed');
        selectinput.setAttribute('data-count','1');
    }
    else{
        select.setAttribute('class','active');
        selectinput.setAttribute('data-count','0');
    }
    /* door的颜色 */
    var count =  0;
    for(var i = 0,len = liAll.length;i < len;i++){
        var str = liAll[i].getAttribute('class');
        if(str == 'completed'){
            count++;
            soueLS[i].completed = "completed";
        }else{
            soueLS[i].completed = "active";
        }
    }
    window.localStorage.setItem('arr',JSON.stringify(soueLS));
    if(count == liAll.length){
        door.style.color = "black";
        door.count = 1;
    }
    else{
        door.style.color = "#e6e6e6";
        door.count = 0;
    }
    /* clearOperate的显示 */
    if(count != 0){
        clearOperate.style.display = "block";
    }  
    else{
        clearOperate.style.display = "none";
    }
    activeshow();
    sortLis();
}
/* 删除本地仓库指定的值的函数 */
function deleteLSValue(idNum){ 
    for(var i = 0;i<soueLS.length;i++){
        if(soueLS[i].id == idNum){
            soueLS.splice(i,1);
            i--;
        }
    } 
    window.localStorage.setItem('arr',JSON.stringify(soueLS));
}
/* 封装点击X删除li的函数 */
function deleteLi(e){
    var event = e || window.event;
    var selectbutton = event.target;
    var select = selectbutton.parentElement;
    var idNum = select.getAttribute('data-id');
    deleteLSValue(idNum);
    select.remove();
    activeshow();
    footShow();
}
/* 修改soueLSValue的内容 */
function reviseSoueLS(word,idNum){
    for(var i = 0,len = soueLS.length;i < len;i++){
        if(soueLS[i].id == idNum){
            soueLS[i].title = word;
            break;
        }
    }
    window.localStorage.setItem('arr',JSON.stringify(soueLS));
}
/* 修改li的内容 */
function reviseLi(e){
    var event = e || window.event;
    var div = event.target;
    var idNum = div.parentElement.getAttribute('data-id');
    var oldText = div.innerText;
    div.innerText = "";
    div.nextElementSibling.style.display = "none";
    div.previousElementSibling.setAttribute('class','hidden');
    var input = document.createElement('input');
    input.setAttribute('class','edit');
    input.setAttribute('type','text');
    input.value = oldText;
    div.parentElement.appendChild(input);//加了记得删掉
    input.focus();//自动获焦
    input.onblur = function(){
        if(this.value){
            div.innerText = this.value == oldText ? oldText : this.value;
            reviseSoueLS(this.value,idNum);
            input.remove();
            div.previousElementSibling.setAttribute('class','circle');
            div.nextElementSibling.style.display = "";
        }else{
            deleteLSValue(idNum);
            div.parentElement.remove();
            var count = 0;
            for(var i = 0,len=liAll.length;i<len;i++){
                if(liAll[i].getAttribute('class')=="completed"){
                    count++;
                }
            }
            if(count==liAll.length){
                door.style.color = "black";
                door.count = 1;
            }else if(count == 0){
                clearOperate.style.display = "none";
            }
            activeshow();
            footShow();
        }
    };
}
/* 封装删除本地仓库的内容的函数 */
function clearSoueLs(){
    for(var i = 0;i < soueLS.length;i++){
        if(soueLS[i].completed == "completed"){
            soueLS.splice(i,1);
            i--;
        }
    }
    window.localStorage.setItem('arr',JSON.stringify(soueLS));
}
/* 封装clearOperate删li的函数 */
function clearLis(){
  var lis = document.getElementsByClassName('completed');
  var len = lis.length;
  for(var i = 0;i < len;i++)
  {
      lis[0].remove();
  }
  clearOperate.style.display = "none";
  activeshow();
  footShow();
  clearSoueLs();
}
/* active剩余数量显示 */
function activeshow(){
var aNum = activeLis.length;
activeNum.innerText = aNum;
}
/* footer的显示 */
function footShow(){
    if(liAll && liAll.length != 0)
    {
        footer.style.display = "block";
        door.style.display = "block";
    }else{
        footer.style.display = "none";
        door.style.display = "none";
        door.style.color = "#e6e6e6";
    }
}
for(var i = 0;i < 3;i++){
    operateAll[i].addEventListener('click',function(e){operateSelect(e);},false);
}
/* clearOperate点击事件绑定 */
clearOperate.addEventListener('click',function(){clearLis();},false);
footShow();



}