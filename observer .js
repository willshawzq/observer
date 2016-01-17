class Observer {
  constructor() {
    //订阅者列表
    this.clientList = {};
  }
  listen( key, fn ) {
    //如果事件当前无订阅者，便创建回调函数队列
    if(!this.clientList[ key ]) {
      this.clientList[ key ] = [];
    }
    //将订阅方法加入回调函数队列
    this.clientList[ key ].push( fn );
  }
  trigger() {
    let
        //获取第一个参数
        key = Array.prototype.shift.call( arguments ),
        //获取回应事件的订阅消息的回调函数队列
        fns = this.clientList[ key ];

    if( !fns || fns.length === 0 ) return false;

    //遍历队列，并执行对应的方法
    for (let fn of fns) {
      fn.apply( this, arguments );
    }
  }
  remove( key, fn ) {
    let fns = this.clientList[ key ];

    //如果对应的消息无人订阅，则直接返回
    if( !fns ) {
      return ;
    }
    //如果没有指定取消订阅的消息，则取消说有的订阅
    if( !fn ) {
      fns.length = 0;
    }
    //遍历缓存队列，删除指定的订阅者的回调函数
    for (let i = fns.length - 1; i >= 0; i--) {
      if(fn == fns[i]) {
        fns.splice(i, 1);
        break;
      }
    }

  }
}
