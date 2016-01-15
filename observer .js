class Observer {
  constructor() {
    this.clientList = {};
  }
  listen( key, fn ) {
    if(!this.clientList[ key ]) {
      this.clientList[ key ] = [];
    }
    this.clientList[ key ].push( fn );
  }
  trigger() {
    let key = Array.prototype.shift.call( arguments ),
        fns = this.clientList[ key ];

    if( !fns || fns.length === 0 ) return false;

    for (let fn of fns) {
      fn.apply( this, arguments );
    }
  }
  remove( key, fn ) {
    let fns = this.clientList[ key ];

    if( !fns ) {
      return ;
    }

    if( !fn ) {
      fns.length = 0;
    }

    for (let i = fns.length - 1; i >= 0; i--) {
      if(fn == fns[i]) {
        fns.splice(i, 1);
        break;
      }
    }

  }
}
