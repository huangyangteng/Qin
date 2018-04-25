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
})()