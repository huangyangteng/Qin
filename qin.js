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
})()