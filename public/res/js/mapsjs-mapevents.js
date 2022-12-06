
/**
 * The code below uses open source software. Please visit the URL below for an overview of the licenses:
 * http://js.api.here.com/v3/3.1.36.0/HERE_NOTICE
 */

H.util.eval("function uo(a){var b=a.ownerDocument;b=b.documentElement||b.body.parentNode||b.body;try{var c=a.getBoundingClientRect()}catch(d){c={top:0,right:0,bottom:0,left:0,height:0,width:0}}return{x:c.left+(\"number\"===typeof window.pageXOffset?window.pageXOffset:b.scrollLeft),y:c.top+(\"number\"===typeof window.pageYOffset?window.pageYOffset:b.scrollTop)}}var vo=function(){return this}.apply(null);function wo(a,b,c,d,e,f){if(isNaN(a))throw Error(\"x needs to be a number\");if(isNaN(b))throw Error(\"y needs to be a number\");if(isNaN(c))throw Error(\"pointer must have an id\");this.viewportX=a;this.viewportY=b;this.target=null;this.id=c;this.type=d;this.dragTarget=null;this.button=vc(e)?e:-1;this.buttons=vc(f)?f:0;this.a=this.button}t(\"H.mapevents.Pointer\",wo);\nfunction xo(a,b,c){if(isNaN(b))throw Error(\"x needs to be a number\");if(isNaN(c))throw Error(\"y needs to be a number\");a.viewportX=b;a.viewportY=c}wo.prototype.nm=function(){return this.a};wo.prototype.getLastChangedButton=wo.prototype.nm;function yo(a,b){a.a=b;a.buttons|=zo[+b]||0}function Ao(a,b){a.a=b;a.buttons&=~(zo[+b]||0)}var zo=[1,4,2],Bo={NONE:-1,LEFT:0,MIDDLE:1,RIGHT:2};wo.Button=Bo;function Co(a,b,c,d,e,f,g){Co.l.constructor.call(this,a);this.pointers=b;this.changedPointers=c;this.targetPointers=d;this.currentPointer=e;this.originalEvent=g;this.target=f}u(Co,td);t(\"H.mapevents.Event\",Co);function Do(a){this.a=a instanceof Array?a.slice(0):[]}p=Do.prototype;p.clear=function(){this.a.splice(0,this.a.length)};p.length=function(){return this.a.length};p.indexOf=function(a){for(var b=this.a.length;b--;)if(this.a[b].id===a)return b;return-1};function Eo(a,b){b=a.indexOf(b);return-1!==b?a.a[b]:null}p.remove=function(a){a=this.indexOf(a);return-1!==a?this.a.splice(a,1)[0]:null};function Fo(a,b){for(var c=a.a.length,d=[];c--;)a.a[c].type!==b&&d.push(a.a[c]);a.a=d}\nfunction Go(a,b){for(var c=a.a.length;c--;)if(a.a[c].dragTarget===b)return!0;return!1}p.push=function(a){if(a instanceof wo)return this.a.push(a);throw Error(\"list needs a pointer\");};p.Ha=function(){return this.a};p.clone=function(){return new Do(this.a)};function Ho(a,b,c){c=c||{};if(!(a instanceof U))throw Error(\"events: map instance required\");if(!(b instanceof Array))throw Error(\"events: map array required\");od.call(this);this.Lg=c.Lg||300;this.Xi=c.Xi||50;this.Zk=c.Zk||50;this.$k=c.$k||500;this.sh=c.sh||900;this.rh=c.rh||8;this.map=a;this.s=this.map.b;this.f=this.s.element;this.B=b;this.a=new Do;this.b=new Do;this.j={};this.c=null;this.u=!0;this.R={};this.g={};this.m=null;this.pe=z(this.pe,this);this.S={pointerdown:this.Al,pointermove:this.Bl,\npointerup:this.Cl,pointercancel:this.zl};Io(this)}u(Ho,od);function Io(a,b){var c,d=a.B.length;for(c=0;c<d;c++){var e=a.B[c];var f=e.listener;\"function\"===typeof f&&(b?(e.target||a.f).removeEventListener(e.Na,f):(e.target||a.f).addEventListener(e.Na,f))}}function Jo(a,b,c){var d;if(\"function\"===typeof a.S[b]){\"pointermove\"!==b&&(a.u=!0);var e=0;for(d=a.b.length();e<d;e++){var f=a.b.a[e]||null;a.f.contains(c.composedPath()[0])?Ko(a,f,a.dj.bind(a,c,b,f)):a.dj(c,b,f,null)}}a.b.clear()}p=Ho.prototype;\np.dj=function(a,b,c,d){Lo(c.id,this.R);this.S[b].call(this,c,d,a)};function Ko(a,b,c){if(a.c===b)c(b.target);else{var d=a.s;var e=b.viewportX;b=b.viewportY;if(0>e||0>b||e>=d.width||b>=d.height)c(y);else{var f=a.map;f.Md(e,b,function(g){c(g||f)})}}}\np.Cl=function(a,b,c){var d=a.id;a.target=b;Mo(this,a,c);No(this,b,\"pointerup\",c,a);\"mouse\"!==a.type&&No(this,b,\"pointerleave\",c,a);b=this.j[a.id];var e={x:a.viewportX,y:a.viewportY},f=c.timeStamp,g=a.target,h=this.m;b&&b.target===g&&b.Ne.Ta(e)<this.Zk&&f-b.xi<this.$k?(No(this,g,\"tap\",c,a),h&&h.target===g&&f-h.xi<this.Lg?h.Ne.Ta({x:a.viewportX,y:a.viewportY})<this.Xi&&(No(this,g,\"dbltap\",c,a),this.m=null):this.m={target:g,Ne:new G(a.viewportX,a.viewportY),xi:c.timeStamp}):this.m=null;this.j={};Lo(d,\nthis.g)};function Mo(a,b,c){b===a.c&&(No(a,b.dragTarget,\"dragend\",c,b),a.c=null,Lo(b.id,a.R));b.dragTarget=null}p.pe=function(a,b){var c=this;No(this,a.dragTarget,\"drag\",b,a);Lo(a.id,this.R);this.R[a.id]=setTimeout(function(){c.pe(a,b)},150)};function Lo(a,b){b[a]&&(b[a].timeout?clearTimeout(b[a].timeout):clearTimeout(b[a]),delete b[a])}\nfunction Oo(a,b,c){var d=b.target,e=new G(b.viewportX,b.viewportY),f=b.id;Lo(f,a.g);var g=setTimeout(function(){d&&d===b.target&&e.Ta({x:b.viewportX,y:b.viewportY})<a.rh&&(No(a,d,\"longpress\",c,b),delete a.j[b.id])},a.sh);a.g[f]={timeout:g,Ne:e}}\np.Bl=function(a,b,c){var d=a.dragTarget,e=a.id;var f=a.target;a.target=b;f!==b&&(No(this,f,\"pointerleave\",c,a),No(this,b,\"pointerenter\",c,a));d?this.c?(this.pe(a,c),this.g[e]&&this.g[e].Ne.Ta({x:a.viewportX,y:a.viewportY})>this.rh&&Lo(e,this.g)):this.u?this.u=!1:(this.c=a,No(this,d,\"dragstart\",c,a),this.pe(a,c),delete this.j[e],this.u=!0):(!this.c||this.c&&this.c.dragTarget!==b&&this.c.dragTarget!==this.map)&&No(this,b,\"pointermove\",c,a)};\np.Al=function(a,b,c){var d=!(/^(?:mouse|pen)$/.test(a.type)&&0!==c.button);if(b){a.target=b;this.j[a.id]={Ne:new G(a.viewportX,a.viewportY),target:a.target,xi:c.timeStamp};\"mouse\"!==a.type&&No(this,b,\"pointerenter\",c,a);var e=No(this,b,\"pointerdown\",c,a);!this.c&&d&&(b.draggable&&!Go(this.a,b)?a.dragTarget=b:!this.map.draggable||e.defaultPrevented||Go(this.a,this.map)||(a.dragTarget=this.map));Oo(this,a,c)}};\np.zl=function(a,b,c){var d=a.id;a.target=null;b?(No(this,b,\"pointerleave\",c,a),No(this,b,\"pointercancel\",c,a)):No(this,this.map,\"pointercancel\",c,a);Mo(this,a,c);this.j={};Lo(d,this.g)};function No(a,b,c,d,e){if(b&&\"function\"===typeof b.dispatchEvent){var f=Co;var g=a.a.Ha(),h=a.b.Ha();a=a.a;var k,l=a.a.length,m=[];for(k=0;k<l;k++)a.a[k].target===b&&m.push(a.a[k]);f=new f(c,g,h,m,e,b,d);e.button=/^(?:longpress|(?:dbl)?tap|pointer(?:down|up))$/.test(c)?e.a:Bo.NONE;b.dispatchEvent(f)}return f}\np.o=function(){Io(this,!0);this.a.clear();this.b.clear();var a=this.R,b;for(b in a)Lo(b,a);a=this.g;for(var c in a)Lo(c,a);delete this.f;delete this.B;delete this.a;delete this.b;delete this.map;this.m=null;delete this.j;this.c=null;od.prototype.o.call(this)};function Po(a){this.i=z(this.i,this);Ho.call(this,a,[{Na:\"touchstart\",listener:this.i},{Na:\"touchmove\",listener:this.i},{Na:\"touchend\",listener:this.i},{Na:\"touchcancel\",listener:this.i}]);this.K={touchstart:\"pointerdown\",touchmove:\"pointermove\",touchend:\"pointerup\",touchcancel:\"pointercancel\"};this.v=(a=(a=a.m)?a.L():null)?Array.prototype.slice.call(a.querySelectorAll(\"a\"),0):[]}u(Po,Ho);\nPo.prototype.i=function(a){var b=a.touches,c=this.a.length(),d;if(\"touchstart\"===a.type&&c>=b.length){c=this.a.clone();for(d=b.length;d--;)c.remove(b[d].identifier);for(d=c.length();d--;)this.a.remove((c.a[d]||null).id);this.b=c;Jo(this,\"pointercancel\",a);this.b.clear()}if(this.K[a.type]){b=uo(this.s.element);c=a.type;d=a.changedTouches;var e=d.length,f;this.b.clear();for(f=0;f<e;f++){var g=d[f];var h=Eo(this.a,g.identifier);var k=g.pageX-b.x;var l=g.pageY-b.y;if(h)if(\"touchmove\"===c){g=Math.abs(h.viewportX-\nk);var m=Math.abs(h.viewportY-l);if(1<g||1<m||1===g&&1===m)xo(h,k,l),this.b.push(h)}else\"touchend\"===c&&(this.a.remove(h.id),this.b.push(h),Ao(h,Bo.LEFT));else h=new wo(k,l,g.identifier,\"touch\",Bo.LEFT,1),this.a.push(h),this.b.push(h)}Jo(this,this.K[a.type],a);-1===this.v.indexOf(a.target)&&a.preventDefault()}};Po.prototype.o=function(){this.v=null;Ho.prototype.o.call(this)};function Qo(a){var b=Ro(this);(window.PointerEvent||window.MSPointerEvent)&&b.push({Na:\"MSHoldVisual\",listener:\"prevent\"});Ho.call(this,a,b)}u(Qo,Ho);function Ro(a){var b=!!window.PointerEvent,c,d,e=[];a.i=z(a.i,a);\"MSPointerDown MSPointerMove MSPointerUp MSPointerCancel MSPointerOut MSPointerOver\".split(\" \").forEach(function(f){c=f.toLowerCase().replace(/ms/g,\"\");d=b?c:f;e.push({Na:d,listener:a.i,target:/^pointer(up|move)$/.test(c)?window:null})});return e}var So={2:\"touch\",3:\"pen\",4:\"mouse\"};\nQo.prototype.i=function(a){var b=window.PointerEvent?a.type:a.type.toLowerCase().replace(/ms/g,\"\"),c=uo(this.f),d=Eo(this.a,a.pointerId),e=a.pageX-c.x;c=a.pageY-c.y;var f=So[a.pointerType]||a.pointerType;ad&&\"rtl\"===x.getComputedStyle(this.s.element).direction&&(e-=(x.devicePixelRatio-1)*this.s.width);if(!(d||/^pointer(up|out|cancel)$/.test(b)||\"touch\"===f&&\"pointerdown\"!==b)){d={x:e,y:c};var g=a.pointerType;\"number\"===typeof g&&(g=So[g]);d=new wo(d.x,d.y,a.pointerId,g,a.button,a.buttons);this.a.push(d)}if(d)if(/^pointer(up|cancel)$/.test(b)?\n(\"touch\"===f&&this.a.remove(d.id),Ao(d,a.button)):\"pointerdown\"===b&&(\"touch\"===a.pointerType&&(Fo(this.a,\"mouse\"),Fo(this.a,\"pen\")),yo(d,a.button)),this.b.push(d),\"pointermove\"!==b)xo(d,e,c),Jo(this,/^pointer(over|out)$/.test(b)?\"pointermove\":b,a);else if(d.viewportX!==e||d.viewportY!==c)xo(d,e,c),Jo(this,b,a);this.b.clear()};function To(a,b,c,d){To.l.constructor.call(this,\"contextmenu\");this.items=[];this.viewportX=a;this.viewportY=b;this.target=c;this.originalEvent=d}u(To,td);t(\"H.mapevents.ContextMenuEvent\",To);function Uo(a){this.fh=z(this.fh,this);this.hh=z(this.hh,this);this.gh=z(this.gh,this);this.v=!1;this.i=-1;this.K=0;Uo.l.constructor.call(this,a,[{Na:\"contextmenu\",listener:this.fh},{target:a,Na:\"longpress\",listener:this.hh},{target:a,Na:\"dbltap\",listener:this.gh}])}u(Uo,Ho);p=Uo.prototype;p.hh=function(a){var b=a.currentPointer;\"touch\"===b.type&&1===a.pointers.length&&Vo(this,b.viewportX,b.viewportY,a.originalEvent,a.target)};p.gh=function(a){\"touch\"===a.currentPointer.type&&(this.K=Date.now())};\np.fh=function(a){var b=this;-1===this.i?this.i=setTimeout(function(){var c=uo(b.f),d=a.pageX-c.x;c=a.pageY-c.y;b.i=-1;Vo(b,d,c,a)},this.Lg):(clearInterval(this.i),this.i=-1);a.preventDefault()};function Vo(a,b,c,d,e){var f=a.map,g=Date.now()-a.K;e?!a.v&&g>a.sh&&(a.v=!0,e.dispatchEvent(new To(b,c,e,d)),Fe(f.L(),Wo,a.cj,!1,a)):f.Md(b,c,a.yn.bind(a,b,c,d))}p.yn=function(a,b,c,d){d=d&&Da(d.dispatchEvent)?d:this.map;Vo(this,a,b,c,d)};\np.cj=function(){this.v&&(this.v=!1,this.map.dispatchEvent(new td(\"contextmenuclose\",this.map)))};p.o=function(){var a=this.map.L();clearInterval(this.i);a&&Me(a,Wo,this.cj,!1,this);Ho.prototype.o.call(this)};var Wo=[\"mousedown\",\"touchstart\",\"pointerdown\",\"wheel\"];function Xo(a,b,c,d,e){Xo.l.constructor.call(this,\"wheel\");this.delta=a;this.viewportX=b;this.viewportY=c;this.target=d;this.originalEvent=e}u(Xo,td);t(\"H.mapevents.WheelEvent\",Xo);function Yo(a){var b=\"onwheel\"in document;this.da=b;this.K=(b?\"d\":\"wheelD\")+\"elta\";this.i=z(this.i,this);Yo.l.constructor.call(this,a,[{Na:(b?\"\":\"mouse\")+\"wheel\",listener:this.i}]);this.v=this.map.b}u(Yo,Ho);\nYo.prototype.i=function(a){if(!a.jl){var b=uo(this.f);var c=a.pageX-b.x;b=a.pageY-b.y;var d=this.K,e=a[d+(d+\"Y\"in a?\"Y\":\"\")],f;ad&&\"rtl\"===x.getComputedStyle(this.v.element).direction&&(c-=(x.devicePixelRatio-1)*this.v.width);if(e){var g=Math.abs;var h=g(e);e=(!(f=a[d+\"X\"])||3<=h/g(f))&&(!(f=a[d+\"Z\"])||3<=h/g(f))?(+(0<e)-+(0>e))*(this.da?1:-1):0}c=new Xo(e,c,b,null,a);c.delta&&(a.stopImmediatePropagation(),a.preventDefault(),this.map.Md(c.viewportX,c.viewportY,this.N.bind(this,c)))}};\nYo.prototype.N=function(a,b){var c=a.target=b||this.map,d,e;setTimeout(function(){c.dispatchEvent(a);a.c||(d=a.originalEvent,e=new x.WheelEvent(\"wheel\",d),e.jl=!0,d.target.dispatchEvent(e))},0)};function Zo(a){this.i=z(this.i,this);Ho.call(this,a,[{Na:\"mousedown\",listener:this.i},{Na:\"mousemove\",listener:this.i,target:window},{Na:\"mouseup\",listener:this.i,target:window},{Na:\"mouseover\",listener:this.i},{Na:\"mouseout\",listener:this.i},{Na:\"dragstart\",listener:this.v}])}u(Zo,Ho);\nZo.prototype.i=function(a){var b=a.type,c=uo(this.f);c={x:a.pageX-c.x,y:a.pageY-c.y};var d;(d=this.a.a[0]||null)||(d=new wo(c.x,c.y,1,\"mouse\"),this.a.push(d));this.b.push(d);xo(d,c.x,c.y);/^mouse(?:move|over|out)$/.test(b)?Jo(this,\"pointermove\",a):(/^mouse(down|up)$/.test(b)&&(c=a.which-1,\"up\"===vo.RegExp.$1?Ao(d,c):yo(d,c)),Jo(this,b.replace(\"mouse\",\"pointer\"),a));this.b.clear()};Zo.prototype.v=function(a){a.preventDefault()};function $o(a){var b=a.b.element.style;if(-1!==ap.indexOf(a))throw Error(\"InvalidArgument: map is already in use\");this.a=a;ap.push(a);b.msTouchAction=b.touchAction=\"none\";bd||!window.PointerEvent&&!window.MSPointerEvent?(this.c=new Po(this.a),this.b=new Zo(this.a)):this.c=new Qo(this.a);this.g=new Yo(this.a);this.f=new Uo(this.a);this.a.nb(this.D,this);od.call(this)}u($o,od);t(\"H.mapevents.MapEvents\",$o);var ap=[];Hc(ap);\n$o.prototype.D=function(){delete this.a;this.c.D();this.g.D();this.f.D();this.b&&this.b.D();ap.splice(ap.indexOf(this.a),1);od.prototype.D.call(this)};$o.prototype.dispose=$o.prototype.D;$o.prototype.Ml=function(){return this.a};$o.prototype.getAttachedMap=$o.prototype.Ml;function bp(a,b){b=void 0===b?{}:b;var c;bp.l.constructor.call(this);if(-1!==cp.indexOf(a))throw new D(bp,0,\"events are already used\");this.b=c=a.a;this.j=a;cp.push(a);c.draggable=!0;this.i=b.kinetics||{duration:600,ease:Zl};this.m=b.modifierKey||\"Alt\";this.enable(b.enabled);this.c=c.b;this.f=this.c.element;this.g=0;c.addEventListener(\"dragstart\",this.Ch,!1,this);c.addEventListener(\"drag\",this.bk,!1,this);c.addEventListener(\"dragend\",this.Bh,!0,this);c.addEventListener(\"wheel\",this.rk,!1,this);c.addEventListener(\"dbltap\",\nthis.lk,!1,this);c.addEventListener(\"pointermove\",this.ck,!1,this);Ee(this.f,\"contextmenu\",this.ak,!1,this);a.nb(this.D,this)}u(bp,od);t(\"H.mapevents.Behavior\",bp);var cp=[];Hc(cp);bp.prototype.a=0;var dp={PANNING:1,PINCH_ZOOM:2,WHEEL_ZOOM:4,DBL_TAP_ZOOM:8,FRACTIONAL_ZOOM:16,TILT:32,HEADING:64};bp.Feature=dp;var ep=dp.PANNING,fp=dp.PINCH_ZOOM,gp=dp.WHEEL_ZOOM,hp=dp.DBL_TAP_ZOOM,ip=dp.FRACTIONAL_ZOOM,jp=dp.TILT,kp=dp.HEADING,lp=ep|fp|gp|hp|ip|jp|kp;bp.DRAGGING=ep;bp.WHEELZOOM=gp;\nbp.DBLTAPZOOM=hp;bp.FRACTIONALZOOM=ip;function mp(a,b){if(a!==+a||a%1||0>a||2147483647<a)throw new D(b,0,\"integer in range [0...0x7FFFFFFF] required\");}bp.prototype.disable=function(a){var b=this.a;a!==B?(mp(a,this.disable),b^=b&a):b=0;this.c.endInteraction(!0);this.a=b;this.b.draggable=0<(b&(ep|jp|kp|fp))};bp.prototype.disable=bp.prototype.disable;bp.prototype.enable=function(a){var b=this.a;a!==B?(mp(a,this.enable),b|=a&lp):b=lp;this.a=b;this.b.draggable=0<(b&(ep|jp|kp|fp))};\nbp.prototype.enable=bp.prototype.enable;bp.prototype.isEnabled=function(a){mp(a,this.isEnabled);return a===(this.a&a)};bp.prototype.isEnabled=bp.prototype.isEnabled;\nfunction np(a,b,c){var d=\"touch\"===b.currentPointer.type,e=0,f;if(f=!d){f=a.m;var g,h=b.originalEvent;h.getModifierState?g=h.getModifierState(f):g=!!h[f.replace(/^Control$/,\"ctrl\").toLowerCase()+\"Key\"];f=g}f?e|=jp|kp:(e|=ep,d&&(b=b.pointers,2===b.length&&(e|=fp|kp,c?55>Cd(b[0].viewportY-b[1].viewportY)&&(e|=jp):a.kh&Hl.TILT&&(e|=jp))));e&=a.a;return(e&jp?Hl.TILT:0)|(e&kp?Hl.HEADING:0)|(e&fp?Hl.ZOOM:0)|(e&ep?Hl.COORD:0)}\nfunction op(a){var b=a.pointers;a=b[0];b=b[1];a=[a.viewportX,a.viewportY];b&&a.push(b.viewportX,b.viewportY);return a}p=bp.prototype;p.kh=0;p.Ch=function(a){var b=np(this,a,!0);if(this.kh=b){var c=this.c;a=op(a);c.startInteraction(b,this.i);c.interaction.apply(c,a);if(this.a&gp&&!(this.a&ip)&&(b=a[0],c=a[1],this.g)){a=this.b.jb();var d=(0>this.g?Bd:Ad)(a);a!==d&&(this.g=0,pp(this,a,d,b,c))}}};\np.bk=function(a){var b=np(this,a,!1);if(b!==this.kh)\"pointerout\"!==a.originalEvent.type&&\"pointerover\"!==a.originalEvent.type&&(this.Bh(a),this.Ch(a));else if(b){b=this.c;var c=op(a);b.interaction.apply(b,c);a.originalEvent.preventDefault()}};p.Bh=function(a){np(this,a,!1)&&this.c.endInteraction(!this.i)};\nfunction pp(a,b,c,d,e){var f=+c-+b;a=a.b.c;if(isNaN(+b))throw Error(\"start zoom needs to be a number\");if(isNaN(+c))throw Error(\"to zoom needs to be a number\");0!==f&&(a.startControl(null,d,e),a.control(0,0,6,0,0,0),a.endControl(!0,function(g){g.zoom=c}))}p.rk=function(a){if(!a.defaultPrevented&&this.a&gp){var b=a.delta;var c=this.b.jb();var d=this.b;var e=d.f.type;d=this.a&ip?c-b:(0>-b?Bd:Ad)(c)-b;if(e===ik.P2D||e===ik.WEBGL||e===ik.HARP)pp(this,c,d,a.viewportX,a.viewportY),this.g=b;a.preventDefault()}};\np.ck=function(){};p.lk=function(a){var b=a.currentPointer,c=this.b.jb(),d=a.currentPointer.type,e=this.b.f.type;(e===ik.P2D||e===ik.WEBGL||e===ik.HARP)&&this.a&hp&&(a=\"mouse\"===d?0===a.originalEvent.button?-1:1:0<a.pointers.length?1:-1,a=this.a&ip?c-a:(0>-a?Bd:Ad)(c)-a,pp(this,c,a,b.viewportX,b.viewportY))};p.ak=function(a){return this.a&hp?(a.preventDefault(),!1):!0};\np.D=function(){var a=this.b;a&&(a.draggable=!1,a.removeEventListener(\"dragstart\",this.Ch,!1,this),a.removeEventListener(\"drag\",this.bk,!1,this),a.removeEventListener(\"dragend\",this.Bh,!0,this),a.removeEventListener(\"wheel\",this.rk,!1,this),a.removeEventListener(\"dbltap\",this.lk,!1,this),a.removeEventListener(\"pointermove\",this.ck,!1,this),delete this.b);this.f&&(this.f.style.msTouchAction=\"\",Me(this.f,\"contextmenu\",this.ak,!1,this),delete this.f);delete this.c;delete this.i;cp.splice(cp.indexOf(this.j),\n1);delete this.j;od.prototype.D.call(this)};bp.prototype.dispose=bp.prototype.D;t(\"H.mapevents.buildInfo\",function(){return If(\"H-mapevents\",\"1.36.0\",\"29236d0\",{region:\"row\"})});\n");