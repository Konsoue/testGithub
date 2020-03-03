window.onload = function(){
var listView = document.getElementsByClassName('list')[0];
var ul = document.getElementsByClassName('toggle-list')[0];
var input = document.getElementsByTagName('input')[0];
var liAll,buttonAll;
var activeNum = document.getElementsByClassName('number')[0];//active的有几个，数个数
var activeLis = document.getElementsByClassName('active');
var completedLis = document.getElementsByClassName('completed');
var changeLis = [];
var door = document.getElementsByClassName('toggleAll')[0];//输入框左边的箭头
var name = "which selected";
var operateAll = document.getElementsByClassName('which');
var clearOperate = document.getElementsByClassName('clear')[0];
var footer = document.getElementsByClassName('footer')[0];
var dataIdNum = 1255000000;//li排序用的
/* all、active、completed选中函数 */
function operateSelect(e){
    var event = e || window.event;
    for(var i = 0;i < 3;i++)
    {
        operateAll[i].setAttribute('class','which');
    }
    event.target.setAttribute('class',name);

    var operateName = event.target.innerText;
    if(operateName == "Active")
    {   
       showLiAll();
       for(var i = 0,len=completedLis.length;i < len;i++){
            completedLis[i].style.display = "none";
       }
    }
    else if(operateName == "Completed")
    {
        showLiAll();
        for(var i = 0,len=activeLis.length;i < len;i++){
            activeLis[i].style.display = "none";
        }
    }
    else{
       showLiAll();
    }
}
function showLiAll(){
    for(var i = 0,len = liAll.length;i<len;i++){
        liAll[i].style.display = "block";
    }
}

/* 封装创建li的函数 */
function createLi(word){
    var li = document.createElement('li');
    li.setAttribute('class','active');
    li.setAttribute('data-id',dataIdNum);dataIdNum++;
    var label = document.createElement('label');
    label.setAttribute('class','circle');
    var input = document.createElement('input');
    input.setAttribute('class','toggle');
    input.setAttribute('type','checkbox');
    input.setAttribute('data-count','0');
    input.addEventListener('click',function(e){selectLi(e);},false);//绑定事件，选中时的样式呈现
    var a = document.createElement('a');
    label.appendChild(input);
    label.appendChild(a);
    var span = document.createElement('span');
    span.innerText = word;
    span.addEventListener('dblclick',function(e){reviseLi(e);},false);
    var button = document.createElement('button');
    button.setAttribute('class','destory');
    button.addEventListener('click',function(e){deleteLi(e);},false);//给x绑定事件，删除li
    li.appendChild(label);
    li.appendChild(span);
    li.appendChild(button);
    ul.appendChild(li);
    liAll = ul.children;//拿ul里面所有li
    buttonAll = document.getElementsByClassName('destory');
    activeshow();
    footShow();
    
}
/* 输入后回车，增添li */
input.onkeyup = function test(e){
    var event = e || window.event;
    if(event.keyCode == 13 && input.value.trim())
    {
        createLi(input.value);
        input.value = "";
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
        if(str == 'completed') count++;
    }
    if(count == liAll.length){
        door.style.color = "black";
    }
    else{
        door.style.color = "#e6e6e6";
    }
    /* clearOperate的显示 */
    if(count != 0){
        clearOperate.style.display = "block";
    }  
    else{
        clearOperate.style.display = "none";
    }
    activeshow();
}
/* 封装点击X删除li的函数 */
function deleteLi(e){
    var event = e || window.event;
    var selectbutton = event.target;
    var select = selectbutton.parentElement;
    select.remove();
    activeshow();
    footShow();
    
}
/* 修改li的内容 */
function reviseLi(e){
    var event = e || window.event;
    var span = event.target;
    var oldText = span.innerText;
    span.previousElementSibling.setAttribute('class','hidden');
    var input = document.createElement('input');
    input.setAttribute('class','edit');
    input.setAttribute('type','text');
    input.value = oldText;
    span.parentElement.appendChild(input);//加了就要删掉
    input.focus();//自动获焦
    input.onblur = function(){
        if(this.value) span.innerText = this.value == oldText ? oldText : this.value;
        input.remove();
        span.previousElementSibling.setAttribute('class','circle');
    };
    
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