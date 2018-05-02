(function () {
    // 创建命名空间
    if(!window.Q){
        window['Q']={};
    }
    // 检查是否兼容
    function isCompatible(other) {
        if(other===false 
            || !Array.prototype.push
            || !Object.hasOwnProperty
            || !document.createElement
            ||!document.getElementsByTagName
        ){
            return false;
        }
        return true;
    }
    window['Q']['isCompatible'] = isCompatible;
    // 添加$方法  相当于document.getElementById()
    function $() {
        var elements=new Array();
        // 查找作为参数提供的所有元素
        for (var i = 0, l = arguments.length; i < l; i++) {
            var element=arguments[i];
            if(typeof element==='string'){
                element=document.getElementById(element);
            }
            // 如果只提供了一个参数，返回它
            if(arguments.length===1){
                return element;
            }
            // 否则，添加到数组中
            elements.push(element);
            
        }
        // 返回多个被请求元素的数组
        return elements;

    }
    window['Q']['$']=$;

    // addEvent()和removeEvent()方法
    function addEvent(node,type,listener) {
        // 
        if(!isCompatible){return false}
        if(!(node=$(node))){return false}
        if(node.addEventListener){
            // w3c
            node.addEventListener(type,listener,false);
            return true;
        }else if(node.attachEvent){
            node['e'+type+listener]=listener;
            node[type+listener]=function () {
                node['e'+type+listener](window.event);
            };
            node.attachEvent('on'+type,node[type+listener]);
            return true;
        }else{
            return false;
        }
    }
    window['Q']['addEvent']=addEvent;
    // removeEvent

    function removeEvent(node,type,listener) {
        if(!(node=$(node))){return false}
        if(node.removeEventListener){
            node.removeEventListener(type,listener,false);
            return true;
        }else if(node.detachEvent){
            // ie
            node.detachEvent('on'+type,node[type+listener]);
            node[type+listener]=null;
            return true;
        }else{
            return false;
        }

    }
    window['Q']['removeEvent']=removeEvent;

    // getElementsByClassName
    function getElementsByClassName(className,tag,parent) {
        parent=parent||document;
        if(!(parent=$(parent))){
            return false;
        }
        // 查找所有匹配的元素
        var allTags=(tag == '*' && parent.all)?parent.all:parent.getElementsByTagName(tag);
        var matchingElements=new Array();
        // 创建一个正则，用来判断class是否正确
        className=className.replace(/\-/,'\\-');
        var regex=new RegExp('(^|\\s)'+className+'($|\\s)')
        // 检查每个元素
        var element;
        for (var i = 0, l = allTags.length; i < l; i++) {
            element=allTags[i];
            if(regex.test(element.className)){
                matchingElements.push(element);
            }
            
        }
        return matchingElements;
    }
    window['Q']['getElementsByClassName']=getElementsByClassName;

    // toggleDisplay方法
    function toggleDisplay(node,value) {
        if(!(node=$(node))){return false;}
        if(node.style.display!='none'){
            node.style.display='none';
        }else{
            node.style.display=value||'';
        }
        return true;
    }
    window['Q']['toggleDisplay']=toggleDisplay;

})()