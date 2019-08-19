var Sys = {};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] :
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] :
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] :
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] :
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

Sys.isAndroid = false;
Sys.isIOS = false;

if(ua.match(/android/)) {
    Sys.mobileSafari = true;
    Sys.isAndroid = true;
}

if(ua.match(/iphone/)||ua.match(/ipad/)) {
    Sys.mobileSafari = true;
    Sys.isIOS = true;
}

var IS_IE      = false;
var IE_VERSION = "?";

if( Sys.ie) {
    IS_IE = true;
    IE_VERSION = Sys.ie;
    document.execCommand("BackgroundImageCache",false,true);
}

Array.prototype.remove = function(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply( this, rest);
};

function math_instance() {
    this.random = Random;
    function Random( min, max) {
        return Math.round(Math.random()*(max-min)+min);
    }
}
var math = new math_instance();

/** begin cocos2dx adapter **/
function cclog(str) {
    if ( !IS_IE ) {
        console.log(str);
    }
}

function assert( condition, str) {
    if( !condition ) {
        cclog(str);
        alert("ASSERT FAILED: " + str);
    }
}

function ccc3( r, g, b) {
    var obj = {};
    obj.r = r;
    obj.g = g;
    obj.b = b;
    function ToString() {
        var tr = Math.floor(obj.r), tg=Math.floor(obj.g), tb=Math.floor(obj.b);
        var sr = obj.r>15 ? tr.toString(16) : "0"+tr.toString(16);
        var sg = obj.g>15 ? tg.toString(16) : "0"+tg.toString(16);
        var sb = obj.b>15 ? tb.toString(16) : "0"+tb.toString(16);
        return "#"+sr+sg+sb;
    }
    obj.toString = ToString;
    return obj;
}

function ccp( x, y) {
    var obj = {}
    obj.x = x;
    obj.y = y;
    return obj;
}

function CCSizeMake( width, height){
    var obj = {};
    obj.width  = width;
    obj.height = height;
    return obj;
}

function CCRectIntersectRect( rect1, rect2 ) {    
    if( Math.max( rect1.x, rect1.x+rect1.width) >= Math.min( rect2.x, rect2.x+rect2.width) )
        if( Math.min( rect1.x, rect1.x+rect1.width) <= Math.max( rect2.x, rect2.x+rect2.width) ) 
            if( Math.max( rect1.y, rect1.y+rect1.height) >= Math.min( rect2.y, rect2.y+rect2.height) )
                if( Math.min( rect1.y, rect1.y+rect1.height) <= Math.max( rect2.y, rect2.y+rect2.height) )
                    return true;
    return false;
}

function CCRectMake( x,y,w,h) {
    var obj = {};
    obj.x = x;
    obj.y = y;
    obj.width  = w;
    obj.height = h;
    return obj;
}

function TriangleContainsPoint( v1, v2, v3, x, y)
{ 
    var a = x - v1[0]; var b = y - v1[1]; 
    if( (b*(v2[0] - v1[0]) - a*(v2[1] - v1[1]))*(b*(v3[0] - v1[0]) - a*(v3[1] - v1[1])) > 0) 
        return false; 
    
    a = x - v2[0]; b = y - v2[1]; 
    if( (b*(v1[0] - v2[0]) - a*(v1[1] - v2[1]))*(b*(v3[0] - v2[0]) - a*(v3[1] - v2[1])) > 0)
        return false; 
    
    a = x - v3[0]; b = y - v3[1]; 
    if( (b*(v1[0] - v3[0]) - a*(v1[1] - v3[1]))*(b*(v2[0] - v3[0]) - a*(v2[1] - v3[1])) > 0)
        return false;
        
    return true; 
}

function ConvexPolyonContainsPoint( ployVerts, point) {
    
    if(ployVerts.length<3)
        return false;
    
    var v1 = [];
    v1[0] = ployVerts[0].x;
    v1[1] = ployVerts[0].y;
    
    for(var i=1;i<ployVerts.length-1;++i){
        
        var v2 = [];
        v2[0] = ployVerts[i].x;
        v2[1] = ployVerts[i].y;
        
        var v3 = [];
        v3[0] = ployVerts[i+1].x;
        v3[1] = ployVerts[i+1].y;
        
        if(TriangleContainsPoint( v1, v2, v3, point.x, point.y))
            return true;
    }
    
    return false;
}
    
function RemoveFromParent( node ) {
    
    if( typeof(node.element.parentNode) !== 'undefined' && node.element.parentNode !== null )
        node.element.parentNode.removeChild(node.element);
        
    if( node.parent ) {
        for(var i=node.parent.childs.length-1; i>=0; --i) {
            if( node.parent.childs[i]=== node ) {
                node.parent.childs.remove(i);
            }
        }
    }
    node.parent = null;
}

function RemoveChild ( node, child ) {
    assert( child.parent === node, "remove child removing not it's child");
    for( var i=node.childs.length-1; i>=0; --i) {
        if( node.childs[i] === child ) {
            node.childs.remove(i);
            if( typeof(child.element.parentNode) !== 'undefined' && child.element.parentNode !== null )
                child.element.parentNode.removeChild(child.element);
            return;
        }
    }
    assert( true, "remove child removing not it's child");
}

function RemoveAllChildsAndCleanUp( node, clean) {
    for( var i=node.childs.length-1; i>=0; --i) {
        if( typeof(node.childs[i].element.parentNode) !== 'undefined' && node.childs[i].element.parentNode !== null )
                node.childs[i].element.parentNode.removeChild(node.childs[i].element);
        node.childs[i].parent = null;
        if ( clean ) {
            StopAllActions(node);
        }
        RemoveAllChildsAndCleanUp( node.childs[i], clean);
        node.childs.remove(i);
    }
}

function AddChild( node, child ) {

    if( typeof(child.element.parentNode) !== 'undefined' && child.element.parentNode !== null )
        child.element.parentNode.removeChild(child.element);

    if( child.parent !== null ) {
        RemoveChild( child.parent, child);
    }

    if( node._isGLNode ) {
        
        child._isGLNode = true;
        child._GL = node._GL;
        
        if( !child._texture ) {
            child._texture = child._GL.createTexture();
        }
        
        if(child._image) {
            GenTexture(child);
        }
    }
    else {
        node.element.appendChild(child.element);
    }

    node.childs.push(child);

    child.parent = node;
    
    //update transform
    SetPosition( child, child.x, child.y);
}

function SetVisible( node, visible) {
    node.visible = visible;
    node.element.style.display= visible ? "block" : "none";
    if( node.parent ) {
        if( !node.visible ) {
            if( typeof(node.element.parentNode) !== 'undefined' && node.element.parentNode !== null ) {
                node.element.parentNode.removeChild(node.element);
                node._needAdd = true;
                //cclog("node:["+node.id+"] removed from parent for it's not visible!");
            }
        } else if( typeof(node._needAdd) !== 'undefined' && node._needAdd ) {
            node.parent.element.appendChild(node.element);
            node._needAdd = false;
            //cclog("node:["+node.id+"] add to parent for it's now visible!");
        }
    }
}

function IsVisible(node) {
    return node.visible;
}

function SetAnchorpoint( node, iax, iay ) {
    node.ax = iax;
    node.ay = iay;
    UpdateNodeScale(node);
}

function SetPosition( node, x, y) {
    node.x=x;
    node.y=y;
    var element = node.element;
    if( typeof(node.width) !== 'undefined' ) {
        if( node.parent !== null ) {
            element.style.left =   node.x*node.parent.transform.scalex - node.width*node.ax;
            element.style.top  =   node.y*node.parent.transform.scaley - node.height*node.ay;
        } else {
            element.style.left =   node.x - node.width*node.ax;
            element.style.top  =   node.y - node.height*node.ay;
        }
    } else {
        element.style.left = node.x;
        element.style.top  = node.y;  
    }
}

function SetColor( node, color ) {
    //assert( typeof(color.r)!='undefined' && typeof(color.g)!='undefined' && typeof(color.b)!='undefined', "invalid color. use ccc3 to create color!");
    node.color = color;
    node.element.style.backgroundColor = color.toString();
    node.element.style.borderColor = "#000000";
}

function __SetContentSize( node, size) {
    node.element.style.width  = size.width ;  //-node.element.style.borderWidth;
    node.element.style.height = size.height ; //-node.element.style.borderWidth;
    if( IS_IE && size.height < 26 ){
        node.element.style.fontSize = size.height+"px";
    }
    if( typeof(node.ieChildNode) != 'undefined' ) {
        node.ieChildNode.style.width  = size.width;
        node.ieChildNode.style.height = size.height; 
    }
    node.width  = size.width;
    node.height = size.height;
    node.element.style.left = node.x - node.width*node.ax;
    node.element.style.top  = node.y - node.height*node.ay;
}

function SetContentSize( node, size) {
    
    if(  typeof(node.originalWidth) !== "undefined" ) {
        assert( typeof(node.originalHeight) !== "undefined", "has originalWidth but no originalHeight");
        node.scalex = size.width/node.originalWidth;
        node.scaley = size.height/node.originalHeight;
        UpdateNodeScale( node );
    } else {
        __SetContentSize( node, size);
    }
    
    for (var i = 0; i < node.childs.length; i++) {
        if( node.childs[i].layout ) {
            node.childs[i].layout( node.width, node.height);
        }
    }
}

function UpdateNodeScale( node ) {
    if(  typeof(node.originalWidth) !== "undefined" ) {
        assert( typeof(node.originalHeight) !== "undefined", "has originalWidth but no originalHeight");
        if( typeof(node.transform.scalex) !== "undefined" ) {
            assert( typeof(node.transform.scaley) !== "undefined", "has scalex but no scaley");
            __SetContentSize( node, CCSizeMake( node.originalWidth*node.transform.scalex, node.originalHeight*node.transform.scaley));
        } else {
            if( typeof(node.width) !== 'undefined' ) {
                assert(typeof(node.height) !== 'undefined',"has width but no height");
                __SetContentSize( node, CCSizeMake( node.width, node.height));
            } else {
                __SetContentSize( node, CCSizeMake( node.originalWidth, node.originalHeight) );
            }
        }
    }
}

function SetScaleX( node, scalex ) {
    
    node.scalex = node.transform.scalex = scalex;

    if ( typeof(node.scaley) === "undefined" ) {
        node.scaley = 1;
    }

    if ( node.parent !== null ) {
        node.transform.scalex = scalex*node.parent.transform.scalex;
        node.transform.scaley = node.scaley*node.parent.transform.scaley;
    }
    UpdateNodeScale( node );
    for (var i = node.childs.length - 1; i >= 0; i--) {
        SetScaleX( node.childs[i], node.childs[i].scalex);
        SetPosition( node.childs[i], node.childs[i].x, node.childs[i].y);
    }
    SetPosition( node, node.x, node.y);
}

function SetScaleY( node, scaley ) {
    
    node.scaley = node.transform.scaley = scaley;

    if( typeof(node.scalex) === "undefined" ) {
        node.scalex = 1;
    }

    if ( node.parent !== null ) {
        node.transform.scalex = node.scalex*node.parent.transform.scalex;
        node.transform.scaley = scaley*node.parent.transform.scaley;
    }

    UpdateNodeScale( node );

    for (var i = node.childs.length - 1; i >= 0; i--) {
        SetScaleY( node.childs[i], node.childs[i].scaley);
        SetPosition( node.childs[i], node.childs[i].x, node.childs[i].y);
    }
    
    SetPosition( node, node.x, node.y);
}

function SetScale( node, scale ) {
    SetScaleX( node, scale);
    SetScaleY( node, scale);
}

function SetRotation( node, rotation) {
    node.rotation = node.transform.rotation = rotation;
    node.rotation_rad = -node.rotation*Math.PI/360;
    var r = "rotate("+rotation+"deg)";
    node.element.style['transform'] = r;
    node.element.style['-o-transform'] = r;
    node.element.style['-webkit-transform'] = r;
    node.element.style['-moz-transform'] = r;
}

function GetRotation( node ) {
    return node.rotation;
}

function SetOpacity( node, opacity) {
    node.opacity = opacity;
    node.element.style.opacity=opacity;
    if( IS_IE ) {
        // set opacity on IE broser
        opacity = Math.round(opacity*100);
        if(opacity>100) {
            opacity = 100;
        }
        node.element.style.filter ="alpha(opacity="+opacity+")";
    }
}

function GetOpacity( node) {
    return node.opacity;
}

var LAST_USER_ACTION_TIME = new Date;

function GetIdleTime() {
    return ((new Date).getTime() - LAST_USER_ACTION_TIME.getTime())/1000.0;
}

var ANY_TOUCH_LISTENERS = [];

function AddAnyTouchListener( anyTouchListener ) {
    ANY_TOUCH_LISTENERS.push(anyTouchListener);
}

function RemoveAnyTouchListener(anyTouchListener) {
    var index = ANY_TOUCH_LISTENERS.indexOf(anyTouchListener);
    if( index >= 0 ) {
        ANY_TOUCH_LISTENERS.remove(index);
    }
}

function SetTouchEnabled( node, bEnabled) {

    var inCycle = false;
    var x = 0;
    var y = 0;
    
    function getXYFromEvent(e) {

        if( e && typeof(e.touches) !== 'undefined' ) {
            if(e.touches.length>0) {
                e = e.touches[0];
            } else {
                return;
            }
        }

        var rect = node.element.getBoundingClientRect();

        e = e ? e : window.event;

        x = e.x - rect.left;
        y = e.y - rect.top;
        
        if( typeof(e.clientX) !== 'undefined' ) {
            x = e.clientX - rect.left;
            y = e.clientY - rect.top;
        }
    }
    
    node.skipAnyTouchListener = false;

    function down(e) {
        
        LAST_USER_ACTION_TIME = new Date;

        if( ANY_TOUCH_LISTENERS.length > 0 && !node.skipAnyTouchListener ) {
            for (var i = ANY_TOUCH_LISTENERS.length - 1; i >= 0; i--) {
                ANY_TOUCH_LISTENERS[i]();
            }
        }

        if(  e && typeof(e.preventDefault) !== 'undefined' )
            e.preventDefault();

        getXYFromEvent(e);

        if( node.touchBegin != null ) {
            node.touchBegin( x, y);
        }
        
        inCycle = true;
        if( Sys.mobileSafari ) 
        {
            node.element.addEventListener( "touchmove",   move, false);
            node.element.addEventListener( "touchend",    stop, false);
            node.element.addEventListener( "touchcancel", touchcancel, false);
        } else if(IS_IE) {
            node.element.onmousemove = move;
            node.element.onmouseup   = stop;
            node.element.attachEvent('onmouseleave', cancel);
        } 
        else{
            node.element.onmousemove = move;
            node.element.onmouseup   = stop;
            node.element.onmouseout  = cancel;
        }
    }
    
    function move(e) {
        
        //LAST_USER_ACTION_TIME = new Date;

        if(  e && typeof(e.preventDefault) !== 'undefined' )
            e.preventDefault();

        getXYFromEvent(e);

        if( node.touchMoved != null ) {
            node.touchMoved( x, y);
        }
    }

    function stop(e) {
        
        LAST_USER_ACTION_TIME = new Date;

        if(  e && typeof(e.preventDefault) !== 'undefined' )
            e.preventDefault();
        
        getXYFromEvent(e);
        
        if( node.touchEnded != null ) {
            node.touchEnded( x, y);
        }

        if( Sys.mobileSafari ) 
        {
            node.element.removeEventListener( "touchmove",   move, false);
            node.element.removeEventListener( "touchend",    stop, false);
            node.element.removeEventListener( "touchcancel", touchcancel, false);
        }
        else{
            node.element.onmousemove = null;
            node.element.onmouseup   = null;
            node.element.onmouseout  = null;
        }
        
        inCycle = false;
    }
    
    function cancel(e) {

        if( e && typeof(e.preventDefault) !== 'undefined' )
            e.preventDefault();
        
        var contains = function(wrap, child) {
            if (IS_IE) return wrap.contains(child);
            while (child && typeof (child.parentNode) != "undefind") {
                if (wrap == child) return true;
                child = child.parentNode;
            }
            return false;
        };

        if( e && e.relatedTarget ) {
            target = e.relatedTarget;
            if ( !contains( node.element, target) ) {
                if(inCycle) {
                    inCycle = false;
                    node.element.onmousemove = null;
                    node.element.onmouseup   = null;
                    node.element.onmouseout  = null;
                    if( node.touchCanceled ) {
                        node.touchCanceled( x, y);
                    }
                }
            }
        }
        else if( IS_IE ) 
        {
            if(inCycle) {
                inCycle = false;
                node.element.onmousemove = null;
                node.element.onmouseup   = null;
                node.element.detachEvent('onmouseleave', cancel);
                if( node.touchCanceled ) {
                    node.touchCanceled( x, y);
                }
            }
        }
    }
        
    if( bEnabled ) {
        
        if( Sys.mobileSafari )  {
            node.element.addEventListener("touchstart", down, false);
        } else {
            node.element.onmousedown = down;
        }
        node.touchEnabled = true;

    } else {
        
        node.element.onmousedown = null;
        node.element.onmousemove = null;
        node.element.onmouseup   = null;
        node.element.onmouseout  = null;
        node.touchEnabled = false;
        cancel(null);
    }
}

function SetDepth( node, depth ) {
    node.element.style.zIndex = ""+depth;
    node.depth = depth;
}

function SetTexture( node, texture ) {
    var frame = getSpriteFrameInfo(texture);
    if( typeof(frame) !== 'undefined' && frame!=null ) {
        node.originalWidth  = frame.width;
        node.originalHeight = frame.height;
        if( !IS_IE ) {
            node.element.style.width = frame.width  + "px";
            node.element.style.height = frame.height + "px";
            node.element.style.background = "url("+frame.textureFileName+") no-repeat " + (-frame.x) + "px " + (-frame.y)+"px";
        } else {
            alert("set texture rect still haven't support ie!");
        }
        UpdateNodeScale( node );
    } else {
        if( !IS_IE ) {
            //node.element.style.backgroundImage  = "url("+texture+")"; // not ie
            node.element.style.background = "url("+texture+") no-repeat ";
        } else {
           // node.ieChildNode.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src=\""+texture+"\")";
        }
    }
}

function CCNode_instance() {
    
    this.x=0;
    this.y=0;
        
    this.visible=true;
    
    this.ax = 0.5;
    this.ay = 0.5;
    this.opacity = 1;
    this.depth = 0;
    
    //this.color = ccc3( 0, 0, 0);
    this.refcount=1;

    this.id = math.random( 0, 1200000000);

    this.touchBegin = null;
    this.touchMoved = null;
    this.touchEnded = null;
    this.touchCanceld = null;
    this.touchEnabled = false;
    
    this.runningAction = null;

    this.childs = new Array();
    this.parent = null;
    this.transform = new Object();
    this.layout = null;

    this.scalex = this.scaley = this.transform.scalex = this.transform.scaley = 1;
    this.rotation = this.transform.rotation = 0;
    this.rotation_rad = this.rotation*Math.PI/360;
        
    var div = document.createElement("DIV");
    div.name = this.id;
    
    div.style.position = "absolute";
    div.style.mozUserSelect = "none";
    
    document.body.appendChild(div);
    this.element = div;
    
    SetAnchorpoint( this, 0.5, 0.5);
}

CCNode_instance.prototype = {
    addChild :function(node){ 
       return AddChild( this, node);
    },
    setVisible:function(visible) {
       return SetVisible( this, visible);
    },
    setPosition : function( x, y){ 
        return SetPosition( this, x, y);
    },
    isVisible : function() {
        return IsVisible(this);
    },
    setColor: function(color){
        return SetColor( this, color);
    },
    getColor : function(){
        return this.color;
    },
    setContentSize : function( size) {
        return SetContentSize( this, size);
    },
    setScale : function(scale) {
        SetScale(this,scale);
    },
    setScaleX : function(scalex) {
        SetScaleX(this,scalex);
    },
    setScaleY : function(scaley) {
        SetScaleY(this,scaley);
    },
    setRotation : function(rotation) {
        SetRotation(this,rotation);
    },
    getRotation: function() {
        return GetRotation(this);
    },
    setOpacity : function(opacity) {
        SetOpacity( this, opacity);
    },
    getOpacity : function(){
        return GetOpacity(this);
    },
    setTouchEnabled : function(bEnabled) {
        SetTouchEnabled(this, bEnabled);
    },
    isTouchEnabled : function(){
        return this.touchEnabled;
    },
    retain : function(){
        this.refcount+=1;
    },
    removeFromParent: function(){
        RemoveFromParent(this);
    },
    removeChild: function(child) {
        RemoveChild( this, child);
    },
    removeAllChildsAndCleanUp:function( clean ) {
        RemoveAllChildsAndCleanUp(this, clean);
    },
    setAnchorpoint: function(iax, iay) {
        SetAnchorpoint(this, iax, iay);
    },
    runAction: function( action ) {
        RunAction( this, action);
    },
    setDepth: function( depth) {
        SetDepth( this, depth);
    },
    getDepth: function(){
        return this.depth;
    },
    setTexture: function( texture ) {
        SetTexture( this, texture);
    },
    stopAllActions: function() {
        StopAction(this);
    },
    stopAction: function(action) {
        StopAction( this, action);
    }
}

function CCLayer_index() {
    this.create = function() {
        return new CCNode_instance();
    }
}
var CCLayer = new CCLayer_index();

function CCScene_instance(parent_instance) 
{    
    parent_instance._setContentSize = parent_instance.setContentSize;

    function SetSize(size) 
    {
        SetContentSize( parent_instance, size);
        
        parent_instance.element.style.overflow   = "hidden";
        parent_instance.element.style.marginLeft = "-"+(size.width/2)+"px";
        parent_instance.element.style.marginTop  = "-"+(size.height/2)+"px";
        parent_instance.element.style.left       = "50%";
        parent_instance.element.style.top        = "50%";
    }

    parent_instance.setContentSize = SetSize;
    parent_instance.setContentSize( CCSizeMake( 480, 320) );

    return parent_instance;
}

function CCScene_index() {
    this.create = function() {
        return CCScene_instance(new CCNode_instance());
    }
}
var CCScene = new CCScene_index();

var loadingReource = new Array();
var loadingReourceCount=0;
var readyCount=0;

function onRequestResource( type, resource_name ) {
    if( typeof(loadingReource[resource_name])==='undefined' ) {
        loadingReource[resource_name]=1;
    }else{
        loadingReource[resource_name]++;
    }
    loadingReourceCount++;
    //alert("Request "+resource_name);
}

function onResourceReady( type, resource_name) {
    if( typeof(loadingReource[resource_name])==='undefined' || loadingReource[resource_name]==0 ) {
        alert("resouce not managed by resource manager!");
    }
    loadingReource[resource_name]--;
    readyCount++;
    cclog( "loading %" + getLoadingPercentage() );
    //alert("Ready "+resource_name);
}

function getLoadingPercentage() {
    if( loadingReourceCount==0 ) 
        return 1;
    else
        return (readyCount/loadingReourceCount)*100;
}

function isAllResourceReady() {
    return loadingReourceCount==readyCount;
}

function CCSprite_instance( parent_instance, str) {
    if( str != "" ) {
        var img = new Image();
        onRequestResource( "image", str);
        img.onload = function() {
            
            onResourceReady( "image", str);
            
            parent_instance._image = img;
            if( parent_instance._isGLNode ) {
                GenTexture(parent_instance);
            }

            if( !IS_IE ) {
                parent_instance.element.style.backgroundImage  = "url("+str+")"; // not ie
            } else {
                var div = document.createElement("DIV");
                div.style.position = "absolute";
                div.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=scale, src=\""+str+"\")";
                div.style.width = this.width+"px";
                div.style.height = this.height+"px";
                if( parent_instance.opacity<1 ) {
                    parent_instance.element.style.filter = "alpha(opacity="+(parent_instance.opacity*100)+");";
                }
                parent_instance.element.appendChild(div);
                parent_instance.ieChildNode = div;
            }
            
            parent_instance.element.style.backgroundRepeat = "no-repeat";
            parent_instance.element.style.backgroundSize   = "100% 100%";
            parent_instance.originalWidth=this.width;
            parent_instance.originalHeight=this.height;

            UpdateNodeScale( parent_instance );
            
            if( ( typeof(parent_instance.onload) != 'undefined' )
               && ( parent_instance.onload != null ) ) {
                parent_instance.onload();
            }
        }
        img.src = str;
    }
    return parent_instance;
}
//CCSprite_instance.prototype = new CCNode_instance();

function CCSpriteFromFrame_instance( parent_instance, texture, frame) {
    function load() {
        parent_instance.originalWidth=frame.width;
        parent_instance.originalHeight=frame.height;
        if( !IS_IE ) {
            parent_instance.element.style.width                 = frame.width  + "px";
            parent_instance.element.style.height                = frame.height + "px";
            parent_instance.element.style.background = "url("+texture+") no-repeat " + (-frame.x) + "px " + (-frame.y)+"px";
        } else {
            
                //parent_instance.element.style.overflow = "hidden"
                var div = document.createElement("DIV");
                div.style.position = "absolute";
                div.style.width = 880+"px";
                div.style.height = 512+"px";
                //div.style.left = "-230px";
                //div.style.top  = "-230px";
                div.style.filter="progid:DXImageTransform.Microsoft.AlphaImageLoader(enabled=true, sizingMethod=image, src=\""+texture+"\")";
                
                var div2 = document.createElement("DIV");
                
                div2.style.position = "absolute";

                div2.style.width  = 880  + "px";
                div2.style.height = 512  + "px"
                div2.style.left   = -230 + "px";
                div2.style.top    = -230 + "px";

                div2.appendChild(div);
                
                //if( parent_instance.opacity<1 ) {
                    parent_instance.element.style.filter = "alpha(opacity="+(parent_instance.opacity*50)+");";
                //}
                
                parent_instance.element.appendChild(div2);
        }
        UpdateNodeScale( parent_instance );
    }
    load();
    return parent_instance;
}
//CCSpriteFromFrame_instance.prototype = new CCNode_instance();


var spriteFrameCatche = new Array();

function parseRect( rectDef, obj ) {
    var frameDef = rectDef.replace( /[{|}]/g, "");
    var frameVars = frameDef.split(",");
    assert( frameVars.length==4, "rect definition string not valid!");
    var x = Number(frameVars[0]);
    var y = Number(frameVars[1]);
    var width = Number(frameVars[2]);
    var height = Number(frameVars[3]);
    assert( !isNaN(x) && !isNaN(y) && !isNaN(width) && !isNaN(height), "rect definition string not valid!");
    obj.x = x;
    obj.y = y;
    obj.width = width;
    obj.height = height;
}

function loadSpriteFrame( spriteFrameName ) {
    
    if ( IS_IE ) {
        return;
    }
    
    var xmldoc = loadXMLDoc( spriteFrameName );
    if ( xmldoc == null ) {
        throw "Failed to load file " + spriteFrameName;
    }
    
    var dict = new Array();
    parsePlist( xmldoc, dict);
    var textureFileName = dict["metadata"]["realTextureFileName"];
    textureFileName = spriteFrameName.replace( /[^\/]*$/, textureFileName);
    
    var texturesize = dict["metadata"]["size"];
    for( var key in dict["frames"] ) {
        if( key != "remove" ) {
            var frameInfo = new Object();
            var frameDef = dict["frames"][key]["frame"];
            parseRect( frameDef, frameInfo);
            frameInfo.textureFileName = textureFileName;
            frameInfo.texturesize     = texturesize;
            spriteFrameCatche[key] = frameInfo;
        }
    }
    
    var tex = new Image();
    onRequestResource( "image", textureFileName);
    tex.onload = function() {
        onResourceReady( "image", textureFileName);
    }
    tex.src = textureFileName;
}

function getSpriteFrameInfo( spriteFrameName ) {
    if( typeof(spriteFrameCatche[spriteFrameName]) != 'undefined' ) {
        return spriteFrameCatche[spriteFrameName];
    }
    return null;
}

var __shouldCatchImage = false;

function catcheNextImage() {
    __shouldCatchImage = true;
}

function shouldCatchImage() {
    if(__shouldCatchImage) {
        __shouldCatchImage = false;
        return true;
    }
    return false;
}

var spriteCatche = new Array();

function dequeue_object_from_catche( catche_key ) {
    if( typeof( spriteCatche[catche_key] ) === 'undefined' ) {
        return null;
    } else if( spriteCatche[catche_key].length > 0 ) {
        //cclog( "reused " + catche_key );
        return spriteCatche[catche_key].shift();
    }
    return null;
}

function catche_object_with_key( catche_key, obj ) {
    if( typeof( spriteCatche[catche_key] ) === 'undefined' ) {
        spriteCatche[catche_key] = new Array();
    }
    spriteCatche[catche_key].push(obj);
    //cclog( "cached " + catche_key );
}

function CCSprite_index() {
    
    this.createWithSpriteFrame = function ( texture, frame ) {
        var sprite = null;
        if( shouldCatchImage() ) {
            var catche_key = texture + "_" + frame.x + "_"  + frame.y + "_" + frame.width + "_" + frame.height;
            sprite = dequeue_object_from_catche(catche_key);
            if(sprite) {
                return sprite;
            } else {
                //cclog("catche missed!");
                sprite = CCSpriteFromFrame_instance( new CCNode_instance(), texture, frame);
                sprite.__catche_key = catche_key;
                function _catche_sprite() {
                    catche_object_with_key( catche_key, sprite);
                }
                sprite.free = _catche_sprite;
            }
        } else {
            sprite = CCSpriteFromFrame_instance( new CCNode_instance(), texture, frame);
        }
        return sprite;
    }
    
    this.createWithSpriteFrameName = function ( spriteFrameName ) {
        var frameInfo = getSpriteFrameInfo(spriteFrameName);
        if( frameInfo == null ) {
            cclog("WARNING: sprite frame [" + spriteFrameName + "] not found! check if name is correct or the loadSpriteFrame is correctlly called to fill the catche!");
            return null;
        }
        var sprite = this.createWithSpriteFrame( frameInfo.textureFileName, frameInfo);
        assert( sprite!=null, "Name failed!");
        return sprite;
    }
    
    this.create = function( str) {
        if( getSpriteFrameInfo(str)==null ) {
            return CCSprite_instance( new CCNode_instance(), str);
        } else {
            var sprite = this.createWithSpriteFrameName( str);
            return sprite;
        }
    }
}
var CCSprite = new CCSprite_index();
    
function getWinSize() {
    var obj = new Object();
    obj.width=960;
    obj.height=640;
    return obj;
}

var ruler_instance = null;

function ruler(instance) {
    
    if( ruler_instance === null ) {
                    
        ruler_instance = document.createElement("span");
        
        document.body.appendChild(ruler_instance);
        
        ruler_instance.style["visibility"]  = "hidden";
        ruler_instance.style["white-space"] = "nowrap";
    }

    ruler_instance.innerHTML            = instance.getString();
    ruler_instance.style["font-size"]   = instance.getFontSize() + "px";
    ruler_instance.style['font-family'] = instance.element.style['font-family'];
    ruler_instance.style.fontWeight     = instance.element.style.fontWeight;

    return ruler_instance;
}

function CCLabel_instance( parent_instance, str) {
    
    parent_instance.setString = function( str) {
        parent_instance.element.innerHTML = str;
        parent_instance.element.style['font-family'] = "Familiar";
        parent_instance.setVisible(true);
    };

    parent_instance.getString = function() {
        return parent_instance.element.innerHTML;
    };

    parent_instance.setBgColor = parent_instance.setColor;
    
    parent_instance.setColor = function(color) {
        parent_instance.element.style.color = color.toString();
    };
    
    parent_instance.setTextAlign = function(align) {
        parent_instance.element.style['text-align'] = align;
    };
    
    parent_instance.setFontSize = function(size) {
        parent_instance.element.style['font-size'] = size+"px";
        parent_instance.__textSize = size;
    }
    
    parent_instance.getFontSize = function() {
        if( typeof(parent_instance.__textSize) !== "undefined" ) {
            return parent_instance.__textSize;
        }
        return parseInt(parent_instance.style.fontSize);
    }
    
    parent_instance.element.style.width = "auto";
    parent_instance.element.style['text-align'] = "left";
    parent_instance.setString(str);
    
    parent_instance.__setContentSize = parent_instance.setContentSize;

    parent_instance.setContentSize = function(size) {
        parent_instance.__setContentSize(size);
        parent_instance.element.style.lineHeight = size.height+"px";
    }

    parent_instance.setFontWeight = function(weight) {
        parent_instance.element.style.fontWeight = weight;
    }

    parent_instance.getTextLength = function() {
        return ruler(parent_instance).offsetWidth;
    }

    parent_instance.adjustTextLength = function(length) {

        var fontSize = parent_instance.getFontSize();
        var textLength = parent_instance.getTextLength();

        if( textLength > length ) {
            do {
                if(fontSize--<=0) 
                    break;
                parent_instance.setFontSize(fontSize);
            } while( parent_instance.getTextLength() > length );  
        }
    }

    return parent_instance;
}

function createLabelDefaultStyle( str, x, y) {
    var obj = CCLabel_instance( new CCNode_instance(), str);
    obj.str=str;
    obj.x=x;
    obj.y=y;
    obj.setPosition( x, y);
    return obj;
}

function CCLabel_index() {
    this.create = function(str) {
        return new CCLabel_instance( new CCNode_instance(), str);
    }
}

var CCLabel = new CCLabel_index();

function string_index(){
    this.byte = Byte;
    function Byte( str, index) {
        return str[index];
    }
}
var string = new string_index();

function CCSimpleAutionEngine_instance() {
    
    var PRELOAD_COUNT = 15;
    var soundcatche = new Array();

    var audioEnabled = false;
    var usingWebAudioAPI = false;
    var webAudioBuffers  = new Array();
    var webAudionSources = new Array();
    
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    
    var context = null;
    
    if ( typeof(window.AudioContext) != 'undefined' ) {
        context = new AudioContext();
        usingWebAudioAPI = true;
        //alert("web audio");
    }else if( typeof(soundManager)!=='undefined' ) {
        audioEnabled = true;
        alert("soundmanager audio");
    }
    
    function CreateAudio(path) {

        // onRequestResource( "audio", path);
        
        // var audio = soundManager.createSound({
        //     url: path,
        //     autoLoad: true,
        //     onload: function() {
        //       onResourceReady( "audio", path);
        //     }
        // });
        
        return audio;
    }
    
    function loadAudio( i, str, effectQueue) {
        var audio = CreateAudio(str);
        effectQueue[i] = audio;
    }
    
    this.preloadEffect = PreloadEffect;
    
    function PreloadEffect( str ) {
        
        // if( Sys.mobileSafari ) {
        //     return;
        // }
        
        if( usingWebAudioAPI ) {
            onRequestResource( "audio", str);
            var request = new XMLHttpRequest();
            request.open('GET', str, true);
            request.responseType = 'arraybuffer';
            function onError(){
                alert("web audio failed to load sound!");
                onResourceReady( "audio", str);
            }
            request.onload = function() {
                context.decodeAudioData(
                    request.response, 
                    function(buffer) {
                        
                        webAudioBuffers[str] = buffer;
                        onResourceReady( "audio", str);
                        
                        //prepare source 
                        var source = context.createBufferSource(); // creates a sound source
                        source.buffer = webAudioBuffers[str];      // tell the source which sound to play
                        source.connect(context.destination);       // connect the source to the context's destination (the speakers)
                        webAudionSources[str]=source;
                    },
                    onError
                );
            }
            request.send();
            return;
        }
        
        if(audioEnabled) {
            var effectQueue = new Array();
            effectQueue.index=0;            
            var i=0;
            for(i=0;i<PRELOAD_COUNT;++i)
                loadAudio( i, str, effectQueue);
            soundcatche[str] = effectQueue;
        }
    }
    
    this.playEffect = PlayEffect;
    function PlayEffect( str) {
        if( !_isEffectOn ) {
            return;
        }
        // if( Sys.mobileSafari ) {
        //     return;
        // }
        if( usingWebAudioAPI ) {
            if( typeof(webAudioBuffers[str])==='undefined' ) {
                PreloadEffect( str );
            }
            if( typeof(webAudioBuffers[str])==='undefined' ) {
                return;
            }
            var source = context.createBufferSource(); // creates a sound source
            source.buffer = webAudioBuffers[str];      // tell the source which sound to play
            source.connect(context.destination);       // connect the source to the context's destination (the speakers)
            if(typeof(source.start)!=='undefined')
                source.start(0);                           // play the source now
            else
                source.noteOn(0);
            
            //alert("playEffect"+ str);
            
            return;
        }
        if(audioEnabled ) {
            if ( typeof(soundcatche[str]) === 'undefined' ) {
                PreloadEffect(str);
            }
            var effectQueue = soundcatche[str];
            do {
                var a = effectQueue[effectQueue.index];
                if( typeof(a) !=='undefined' ) {
                    a.play();
                }
                //effectQueue[effectQueue.index] = CreateAudio(path);
                effectQueue.index++;
                effectQueue.index = effectQueue.index%PRELOAD_COUNT;
            } while( typeof(a) === 'undefined' );
        }
    }

    this.playBackgroundMusic = PlayBackgroundMusic;
    function PlayBackgroundMusic( str) {
    }
    
    this.stopBackgroundMusic = StopBackgroundMusic;
    function StopBackgroundMusic(){
    }
    
    var _isMusicOn = true;
    this.isMusicPlaying = function(){
        return _isMusicOn;
    };
    this.setMusicOn = function( onOff) {
        _isMusicOn = onOff;
    };
    var _isEffectOn = true;
    this.isEffectOn = function() {
        return _isEffectOn;
    };
    this.setEffectOn = function( onOff) {
        _isEffectOn = onOff;
    };
    
}

function CCSimpleAudioEngine_index() {
    this.sharedEngine = SharedEngine;
    this._instance =  new CCSimpleAutionEngine_instance();
    function SharedEngine(){
        return this._instance;
    }
}        
var SimpleAudioEngine = new CCSimpleAudioEngine_index();

function CCScheduler_instance(){
    this.scheduleScriptFunc = ScheduleScriptFunc;
    function ScheduleScriptFunc( func, interval, once) {
        function OnTimeOut() {
            func();
            setTimeout( OnTimeOut, interval*1000);
        }
        if(once){
            setTimeout( func, interval);
        } else {
            setTimeout( OnTimeOut, interval*1000);
        }
    }
}

function CCDirector_instance(){
    this.getScheduler = GetScheduler;
    function GetScheduler(){
        return new CCScheduler_instance();
    }
}
function CCDirector_index(){
    this.sharedDirector = SharedDirector;
    function SharedDirector(){
        return new CCDirector_instance();
    }
}
var CCDirector = new CCDirector_index;

function createButton(callback, imagename) {
    
    if (typeof (imagename) === 'undefined') {
        imagename = "";
    }
    
    var btn = CCSprite.create(imagename);
    btn.setTouchEnabled(true);
    btn._originalScale = btn.scale;
    
    function up() {
        btn.setScaleX( btn._originalScaleX );
        btn.setScaleY( btn._originalScaleY );
    }
    
    function onUp() {
        up();
        callback();
    }
    btn.touchEnded = onUp;
    
    function onPushDown() {
        btn._originalScaleX = btn.scalex;
        btn._originalScaleY = btn.scaley;
        btn.setScaleX( btn._originalScaleX*1.2 );
        btn.setScaleY( btn._originalScaleY*1.2 );
    }
    btn.touchBegin = onPushDown;
    btn.touchCanceled = up;
    
    return btn;
}

function DisableRightMenu(){
    if (window.Event)
        document.captureEvents(Event.MOUSEUP);
    function nocontextmenu(event){
        event.cancelBubble = true
        event.returnValue = false;
        return false;
    }
    function norightclick(e){
        if (window.Event){
            if (e.which == 2 || e.which == 3)
                return false;
        } else {
            if (event.button == 2 || event.button == 3){
                event.cancelBubble = true
                event.returnValue = false;
                return false;
            }
        }
    }
    function noselect() {
        return false;
    }
    document.oncontextmenu = nocontextmenu; // for IE5+
    document.onmousedown = norightclick; // for all other brosers
    document.onselectstart= noselect;
}

function createXMLHttpRequest() {
    var ajax = false;
    if(window.XMLHttpRequest) {
        ajax = new XMLHttpRequest();
        if (ajax.overrideMimeType) {
            ajax.overrideMimeType("text/xml");
        }
    }
    else if (window.ActiveXObject) {
        try{
            ajax = new ActiveXObject("Msxml2.XMLHTTP");
        } 
        catch (e) {
            try {
                ajax = new ActiveXObject("Microsoft.XMLHTTP");
            } 
            catch (e) {}
        }
    }
    return ajax;
}

function ajaxPost( url, content, callback) {
    var ajax = createXMLHttpRequest();
    if (!ajax) {
        window.alert("can't create XMLHttpRequest");
        callback(false,"");
        return;
    }
    ajax.open("POST", url, true);
    ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    
    try{
        ajax.send(content);
    }catch(e){
        callback( false, "");
    }
    
    ajax.onreadystatechange = function() {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var response = ajax.response;
            if( typeof(response) == 'undefined' ) {
                response = ajax.responseText;
            }
            callback( true, response);
            return;
        }
    }
}

function ajaxGetBin(file, callback) {
    var xmlhttp = createXMLHttpRequest();
    if (!xmlhttp) {
        window.alert("can't create XMLHttpRequest");
        callback(false);
        return;
    }
    xmlhttp.onreadystatechange = function (url) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.response;
            if (typeof (response) == 'undefined') {
                if (typeof (xmlhttp.responseBody)) {
                    callback(xmlhttp.responseBody);
                }
                return;
            }
            callback(response);
        }
    }
    xmlhttp.open("GET", file, true);
    xmlhttp.send();
}

function ajaxGet(file, callback) {
    var xmlhttp = createXMLHttpRequest();
    if (!xmlhttp) {
        window.alert("can't create XMLHttpRequest");
        callback(false);
        return;
    }
    xmlhttp.onreadystatechange = function (url) {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var response = xmlhttp.response;
            if (typeof (response) == 'undefined') {
                if (typeof (xmlhttp.responseText)) {
                    callback(xmlhttp.responseText);
                }
                return;
            }
            callback(response);
        }
    }
    xmlhttp.open( "GET", file, true);
    xmlhttp.send();
}

String.prototype.hasSuffix = function(suffix) {
    return this.indexOf(suffix, this.length - suffix.length) !== -1;
};

String.prototype.hasPrefix = function(prefix) {
    var compare = this.substring( 0, prefix.length);
    return compare === prefix;
};

function isLocalExcution() {
    return window.location.href.toString().hasPrefix("file:///");
}

function getFileContents(file) {

    if( isLocalExcution() ) {
        return "map.setsize( 9, 5); map.judge=\"i==1&&j==1||i==9&&j==1||i==1&&j==9||i==9&&j==9\";";
    }

    var xmlhttp;
    if (window.XMLHttpRequest) {
      xmlhttp=new XMLHttpRequest();
    }
    else {
      xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.open("GET", file, false);
    xmlhttp.send();
    if(xmlhttp.readyState==4 && xmlhttp.status==200){
        return xmlhttp.responseText;
    } else {
        return null;
    }
}

function loadXmlFromString( text ) {
    var xmlDoc = null;
    try //Internet Explorer
    {
        xmlDoc=new ActiveXObject("Microsoft.XMLDOM");
        xmlDoc.async="false";
        xmlDoc.loadXML(text);
    }
    catch(e) {
        try {
            parser=new DOMParser();
            xmlDoc=parser.parseFromString(text,"text/xml");
        }
        catch(e) {alert(e.message);}
    }
    return xmlDoc;
}

function loadXMLDoc(xml) {
    var contents = getFileContents(xml);
    if( contents != null ){
        return loadXmlFromString(contents);
    }
    return null;
};

function parsePlist( node, dict ) {
    
    assert( typeof(node) !== 'undefined' && node != null, "node is null or undefined!");
    
    var key = null;
    
    for(var i=0;i<node.childNodes.length;++i ) {
        var curNode = node.childNodes[i];
        var nodeName =  curNode.localName;
        if( typeof(nodeName)=='undefined' ) {
            nodeName=curNode.nodeName;
        }
        if( nodeName=="key" ) {
            key = curNode.textContent;
            if( typeof(key)=='undefined' ) {
                key=curNode.text;
            }
        } else if( nodeName=="string" || nodeName=="integer" ) {
            if( key != null ) {
                dict[key] = curNode.textContent;
                if( typeof(curNode.textContent)=='undefined' ) {
                    dict[key]=curNode.text;
                }
                key = null;
            }
        }  else if( nodeName=="false" ) {
            if( key != null ) {
                dict[key] = false;
                key = null;
            }
        } else if( nodeName=="true" ){
            if( key != null ) {
                dict[key] = true;
                key = null;
            }
        }else if( nodeName=="dict" || nodeName=="plist" ) {
            if(key!=null){
                var childDict = dict[key] = new Array();
                parsePlist( curNode, childDict);
            } else {
                parsePlist( curNode, dict);
            }
        }
    }
}

function getQueryStrings() { 
  var assoc  = {};
  var decode = function (s) { return decodeURIComponent(s.replace(/\+/g, " ")); };
  var queryString = location.search.substring(1); 
  var keyValues = queryString.split('&'); 
  for(var i in keyValues) { 
    if(i!="remove"){
        var key = keyValues[i].split('=');
        if (key.length > 1) {
          assoc[decode(key[0])] = decode(key[1]);
        }
    }
  }
  return assoc;
}

var _GET = getQueryStrings();

function attachLink( node, link)
{
    var a = document.createElement("a");
    a.href = link;
    node.parent.element.appendChild(a);
    a.appendChild(node.element);
}

// actions
function sinBounce(b) {
    var asin = Math.asin(b);
    var s = -Math.PI/2+asin;
    var d = 1.5*Math.PI-2*asin;
    var w = Math.sin(s+d)+1;
    function bounce( pos ) {
        var v = (Math.sin(s+d*pos)+1)/w;
        if(v>1){
            v = (v-1)*0.5+1;
        }
        return v;
    }
    return bounce;
}

var ease = {
    
    easeInQuad: function(pos){
        return Math.pow(pos, 2);
    },
        
    easeOutQuad: function(pos){
        return -(Math.pow((pos-1), 2) -1);
    },
        
    easeInOutQuad: function(pos){
        if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,2);
        return -0.5 * ((pos-=2)*pos - 2);
    },
        
    easeInCubic: function(pos){
        return Math.pow(pos, 3);
    },
        
    easeOutCubic: function(pos){
        return (Math.pow((pos-1), 3) +1);
    },
        
    easeInOutCubic: function(pos){
        if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,3);
        return 0.5 * (Math.pow((pos-2),3) + 2);
    },
        
    easeInQuart: function(pos){
        return Math.pow(pos, 4);
    },
        
    easeOutQuart: function(pos){
        return -(Math.pow((pos-1), 4) -1)
    },
        
    easeInOutQuart: function(pos) {
        if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
        return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
    },
        
    easeInQuint: function(pos){
        return Math.pow(pos, 5);
    },
        
    easeOutQuint: function(pos){
        return (Math.pow((pos-1), 5) +1);
    },
        
    easeInOutQuint: function(pos){
        if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,5);
        return 0.5 * (Math.pow((pos-2),5) + 2);
    },
        
    easeInSine: function(pos){
        return -Math.cos(pos * (Math.PI/2)) + 1;
    },
        
    easeOutSine: function(pos){
        return Math.sin(pos * (Math.PI/2));
    },
        
    easeInOutSine: function(pos){
        return (-.5 * (Math.cos(Math.PI*pos) -1));
    },
        
    easeInExpo: function(pos){
        return (pos==0) ? 0 : Math.pow(2, 10 * (pos - 1));
    },
        
    easeOutExpo: function(pos){
        return (pos==1) ? 1 : -Math.pow(2, -10 * pos) + 1;
    },
        
    easeInOutExpo: function(pos){
        if(pos==0) return 0;
        if(pos==1) return 1;
        if((pos/=0.5) < 1) return 0.5 * Math.pow(2,10 * (pos-1));
        return 0.5 * (-Math.pow(2, -10 * --pos) + 2);
    },
        
    easeInCirc: function(pos){
        return -(Math.sqrt(1 - (pos*pos)) - 1);
    },
        
    easeOutCirc: function(pos){
        return Math.sqrt(1 - Math.pow((pos-1), 2))
    },
        
    easeInOutCirc: function(pos){
        if((pos/=0.5) < 1) return -0.5 * (Math.sqrt(1 - pos*pos) - 1);
        return 0.5 * (Math.sqrt(1 - (pos-=2)*pos) + 1);
    },
        
    easeOutBounce: function(pos){
        if ((pos) < (1/2.75)) {
            return (7.5625*pos*pos);
        } else if (pos < (2/2.75)) {
            return (7.5625*(pos-=(1.5/2.75))*pos + .75);
        } else if (pos < (2.5/2.75)) {
            return (7.5625*(pos-=(2.25/2.75))*pos + .9375);
        } else {
            return (7.5625*(pos-=(2.625/2.75))*pos + .984375);
        }
    },
        
    easeInBack: function(pos){
        var s = 1.70158;
        return (pos)*pos*((s+1)*pos - s);
    },
        
    easeOutBack: function(pos){
        var s = 1.70158;
        return (pos=pos-1)*pos*((s+1)*pos + s) + 1;
    },
        
    easeInOutBack: function(pos){
        var s = 1.70158;
        if((pos/=0.5) < 1) return 0.5*(pos*pos*(((s*=(1.525))+1)*pos -s));
        return 0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos +s) +2);
    },
        
    elastic: function(pos) {
        return -1 * Math.pow(4,-8*pos) * Math.sin((pos*6-1)*(2*Math.PI)/2) + 1;
    },
        
    swingFromTo: function(pos) {
        var s = 1.70158;
        return ((pos/=0.5) < 1) ? 0.5*(pos*pos*(((s*=(1.525))+1)*pos - s)) :
        0.5*((pos-=2)*pos*(((s*=(1.525))+1)*pos + s) + 2);
    },
        
    swingFrom: function(pos) {
        var s = 1.70158;
        return pos*pos*((s+1)*pos - s);
    },
        
    swingTo: function(pos) {
        var s = 1.70158;
        return (pos-=1)*pos*((s+1)*pos + s) + 1;
    },
        
    bounce: function(pos) {
        if (pos < (1/2.75)) {
            return (7.5625*pos*pos);
        } else if (pos < (2/2.75)) {
            return (7.5625*(pos-=(1.5/2.75))*pos + .75);
        } else if (pos < (2.5/2.75)) {
            return (7.5625*(pos-=(2.25/2.75))*pos + .9375);
        } else {
            return (7.5625*(pos-=(2.625/2.75))*pos + .984375);
        }
    },
        
    bouncePast: function(pos) {
        if (pos < (1/2.75)) {
            return (7.5625*pos*pos);
        } else if (pos < (2/2.75)) {
            return 2 - (7.5625*(pos-=(1.5/2.75))*pos + .75);
        } else if (pos < (2.5/2.75)) {
            return 2 - (7.5625*(pos-=(2.25/2.75))*pos + .9375);
        } else {
            return 2 - (7.5625*(pos-=(2.625/2.75))*pos + .984375);
        }
    },
        
    easeFromTo: function(pos) {
        if ((pos/=0.5) < 1) return 0.5*Math.pow(pos,4);
        return -0.5 * ((pos-=2)*Math.pow(pos,3) - 2);
    },
        
    easeFrom: function(pos) {
        return Math.pow(pos,4);
    },
        
    easeTo: function(pos) {
        return Math.pow(pos,0.25);
    },
        
    linear:  function(pos) {
        return pos
    },
        
    sinusoidal: function(pos) {
        return (-Math.cos(pos*Math.PI)/2) + 0.5;
    },
        
    reverse: function(pos) {
        return 1 - pos;
    },
        
    mirror: function(pos, transition) {
        transition = transition || ease.sinusoidal;
        if(pos<0.5)
            return transition(pos*2);
        else
            return transition(1-(pos-0.5)*2);
    },
        
    flicker: function(pos) {
        var pos = pos + (Math.random()-0.5)/5;
        return ease.sinusoidal(pos < 0 ? 0 : pos > 1 ? 1 : pos);
    },
        
    wobble: function(pos) {
        return (-Math.cos(pos*Math.PI*(9*pos))/2) + 0.5;
    },
        
    pulse: function(pos, pulses) {
        return (-Math.cos((pos*((pulses||5)-.5)*2)*Math.PI)/2) + .5;
    },
        
    blink: function(pos, blinks) {
        return Math.round(pos*(blinks||5)) % 2;
    },
        
    spring: function(pos) {
        return 1 - (Math.cos(pos * 4.5 * Math.PI) * Math.exp(-pos * 6));
    },
        
    none: function(pos){
        return 0
    },
        
    full: function(pos){
        return 1
    }
}

function TimeAction(time) 
{    
    var obj = new Object();
    obj.finished = false;
    obj.running = false;
    obj.totalTime = time;
    obj.time = 0;
    obj.__cancel = false;

    function start(target) {
        obj.target = target;
        obj.finished = false;
        obj.running  = true;
        obj.time = 0;
    }

    function step( p ) {
    }

    function end() {
        obj.finished = true;
        obj.running  = false;
        obj.target = null;
    }

    function cancel() {
        obj.__cancel = true;
    }

    obj._start = start;
    obj.start  = start;
    
    obj._step = step;
    obj.step = step;
    
    obj._end = end;
    obj.end = end;
    
    obj.cancel  = cancel;
    
    return obj;
}

function DelayTime(time) {
    return TimeAction(time);
}

function FadeTo( time, opacity) {
    var obj = TimeAction(time);
    function start( target ) {
        obj._start( target);
        obj.sOpacity = target.getOpacity();
        obj.dOpacity = opacity - obj.sOpacity;
    }
    function step( p ) {
        obj.target.setOpacity( obj.sOpacity + obj.dOpacity * p);
    }
    function end(){
        obj._end();
    }
    obj.start  = start;
    obj.step = step;
    obj.end = end;
    return obj;
}

function BezierCurve( time, p1, p2) {
    var obj = TimeAction(time);
    function start( target ) {
        obj._start( target);
        obj.sx = target.x;
        obj.sy = target.y;
    }
    function step( p ) {
        var x1 = Math.pow((1-p),2);
        var x2 = 2*p*(1-p);
        var x3 = Math.pow( p, 2);
        obj.target.setPosition( x1*obj.sx + x2*p1.x + x3*p2.x, x1*obj.sy + x2*p1.y + x3*p2.y);
    }
    function end(){
        obj._end();
    }
    obj.start  = start;
    obj.step = step;
    obj.end = end;
    return obj;
}

/*
function TintToWithOpacity( time, c, o) {
    var obj = TimeAction(time);
    function start( target ) {
        obj._start( target);
        if ( typeof(target.color) !== 'undefined') {
            obj.sc = target.color;
            obj.dc = ccc3( c.r-obj.sc.r, c.g-obj.sc.g, c.b-obj.sc.b);
            obj.sOpacity = target.getOpacity();
            obj.dOpacity = o - target.getOpacity();
            obj.step = function(p) {
                target.setColor(ccc3( obj.sc.r+obj.dc.r*p, obj.sc.g+obj.dc.g*p, obj.sc.b+obj.dc.b*p));
                target.setOpacity(obj.sOpacity+ obj.dOpacity*p);
            }
        } else {
            target.setColor(c);
            target.setOpacity(0);
            obj.step = function(p) {
                target.setOpacity( p*o );
            }
        }
    }
    function step( p ) {
        obj.step(p);
    }
    function end(){
        obj._end();
    }
    obj.start  = start;
    obj.step = step;
    obj.end = end;
    return obj;
}*/

function ccc3FromString(strColor) {
    var r = strColor.substring(1,3);
    var g = strColor.substring(3,5);
    var b = strColor.substring(5,7);
    return ccc3( parseInt(r,16), parseInt( g, 16), parseInt( b, 16));
}

function formatColor(color) {
    if( typeof(color.indexOf) !== "undefined" ) {
        return ccc3FromString(color);
    }
    return color;
}

function TintTo( time, c, isBgColor) {
    
    var obj = TimeAction(time);

    function start( target ) {
        
        obj._start( target);
        c = formatColor(c);

        if ( typeof(target.color) !== 'undefined') {
            
            obj.sc = formatColor(target.color);
            obj.dc = ccc3( c.r-obj.sc.r, c.g-obj.sc.g, c.b-obj.sc.b);
            
            obj.step = function(p) {
                if(typeof(isBgColor) !== "undefined" && isBgColor == true)
                    target.setBgColor(ccc3( obj.sc.r+obj.dc.r*p, obj.sc.g+obj.dc.g*p, obj.sc.b+obj.dc.b*p));
                else
                    target.setColor(ccc3( obj.sc.r+obj.dc.r*p, obj.sc.g+obj.dc.g*p, obj.sc.b+obj.dc.b*p));
            }

        } else {
            target.setColor(c);
            target.setOpacity(0);
            obj.step = function(p) {
                setOpacity(p);
            }
        }
    }

    function step( p ) {
        obj.step(p);
    }

    function end(){
        obj._end();
    }

    obj.start  = start;
    obj.step = step;
    obj.end = end;
    return obj;
}

function ScaleTo( time, scale) {
    var obj = TimeAction(time);
    function start( target ) {
        obj._start( target);
        if(typeof(target.scalex)==='undefined') {
            target.setScale(1);
        }
        obj.sScale = target.scalex;
        obj.dScale = scale - obj.sScale;
    }
    function step( p ) {
        obj.target.setScale( obj.sScale + obj.dScale*p );
    }
    function end(){
        obj._end();
    }
    obj.start  = start;
    obj.step = step;
    obj.end = end;
    return obj;
}

function ScaleToXY( time, scaleX, scaleY) {
    var obj = TimeAction(time);
    function start( target ) {
        obj._start( target);
        if(typeof(target.scalex)==='undefined') {
            target.setScale(1);
        }
        obj.sScaleX = target.scalex;
        obj.sScaleY = target.scaley;
        obj.dScaleX = scaleX - obj.sScaleX;
        obj.dScaleY = scaleY - obj.sScaleY;
    }
    function step( p ) {
        obj.target.setScaleX( obj.sScaleX + obj.dScaleX*p );
        obj.target.setScaleY( obj.sScaleY + obj.dScaleY*p );
    }
    function end() {
        obj._end();
    }
    obj.start  = start;
    obj.step = step;
    obj.end = end;
    return obj;
}

function FadeOut(time) {
    return FadeTo( time, 0);
}

function FadeIn(time){
    return FadeTo( time, 1);
}

function MoveBy( time, dx, dy ) {
    
    if ( typeof(dy) === 'undefined' ) 
        dy = 0;
    
    var obj = TimeAction(time);
    function start( target ) {
        obj._start( target);
        obj.sx = target.x;
        obj.sy = target.y;
    }
    function step( p ) {
        obj.target.setPosition( obj.sx+p*dx, obj.sy+p*dy);
    }
    function end(){
        obj._end();
    }
    obj.start  = start;
    obj.step = step;
    obj.end = end;
    return obj;
}

function MoveTo( time, x, y) {
    var obj = TimeAction(time);
    function start( target ) {
        obj._start( target);
        obj.sx = target.x;
        obj.sy = target.y;
        obj.dx = x - obj.sx;
        obj.dy = y - obj.sy;
    }
    function step( p ) {
        obj.target.setPosition( obj.sx+p*obj.dx, obj.sy+p*obj.dy);
    }
    function end(){
        obj._end();
    }
    obj.start  = start;
    obj.step = step;
    obj.end = end;
    return obj;
}

function Ease( easeFunc, action ) {
    var obj = TimeAction(action.totalTime);
    function start( target ) {
        obj._start( target );
        action.start(target);
    }
    function step( p ) {
        if(action.step!=null) 
            action.step(easeFunc(p));
    }
    function end(){
        if(action.end!=null) {
            action.end();
        }
        obj._end();
    }
    obj.start  = start;
    obj.step = step;
    obj.end = end;
    return obj;
}

function Spawn( actions ) {

    var maxTotalTime = 0;
    
    for (var i = actions.length - 1; i >= 0; i--) {
       if( actions[i].totalTime>maxTotalTime ) {
            maxTotalTime = actions[i].totalTime;
       }
    }

    var obj = TimeAction(maxTotalTime);

    function start( target) {
        obj._start(target);
        for ( var i = actions.length - 1; i >= 0; i-- ) {
            actions[i].start(target);
        }
    }

    function step( p) {
        for ( var i = actions.length - 1; i >= 0; i-- ) {
            if(actions[i].step!=null) {
                var rp = maxTotalTime * p / actions[i].totalTime;
                actions[i].step(rp);
            }
        }
    }

    function end()
    {    
        for ( var i = actions.length - 1; i >= 0; i-- ) {
            if( actions[i].finished == false ) {
                if(actions[i].end!=null) {
                    actions[i].end();
                }
            }
        }
        obj._end();
    }

    obj.start  = start;
    obj.step = step;
    obj.end = end;
    return obj;
}

function Hide() {
    var obj = TimeAction(0);
    function step(p) {
        obj.target.setVisible(false);
    }
    obj.step  = step;
    return obj;
}

function Show() {
    var obj = TimeAction(0);
    function step(p) {
        obj.target.setVisible(true);
    }
    obj.step  = step;
    return obj;
}

function Remove() {
    var obj = TimeAction(0);
    function step(p) {
        obj.target.removeFromParent();
    }
    obj.step  = step;
    return obj;
}

function CallFunc( func , context) {
    var obj = TimeAction(0);
    function step(p) {
        if( func != null && typeof(func) !== 'undefined' )
            func( obj.target, context);
    }
    obj.step  = step;
    return obj;
}

function Repeat( action, times) {
    
    assert( typeof(action)!='undefined' && action != null, "Repeat::invalid action to Repeat!");
    
    var obj = TimeAction(action.totalTime*times);
    obj.timesLeft = 0;
    obj.timesIndex = 0;

    function start( target ) {
        obj._start(target);
        if(obj.timesLeft<=0 ) {
            obj.timesLeft = times;
        }
        action.start(target);
    }

    function step(p) {
        
        var px = obj.totalTime * p / action.totalTime;
        var timesIndex = parseInt(px);

        while( timesIndex > obj.timesIndex ) {
            obj.timesIndex += 1;
            action.step(1);
            action.end();
            action.start();
        }

        px = px - timesIndex;
        action.step(px);

    }

    function end() {
        action.end();
        if( !obj.__cancel ) {
            obj._end();
        }
    }

    obj.start = start;
    obj.step  = step;
    obj.end   = end;
    return obj;
}

function RepeatForever( action ) {
    
    assert( typeof(action)!='undefined' && action != null, "RepeatForever::invalid action to Repeat!");
    
    var obj = TimeAction(action.totalTime);
    
    function start( target ) {
        obj._start(target);
        action.start(target);
    }
    
    function step(p) {
        action.step(p);
    }
    
    function end() {
        if( !obj.__cancel ) {
            obj.target.runAction(obj);
        }
        obj._end();
        action.end();
    }

    obj.start  = start;
    obj.step   = step;
    obj.end    = end;
     
    return obj;
}

function Sequence( seq ) {
    
    assert( seq.length>0, "empty sequence!");

    var totalTime = 0;
    for (var i = seq.length - 1; i >= 0; i--) {
        totalTime += seq[i].totalTime;
    }

    var obj = TimeAction(totalTime);
    obj.currentIndex = -1;
    function start( target ) {
        obj._start(target);
        obj.currentIndex = -1;
        obj.lastIndex    = -1;
    }

    function step( p ) {

        var time = obj.totalTime*p;
        var t = 0;
        
        var aimIndex = 0;
        
        for (var i = 0; i < seq.length; ++i) {
            t += seq[i].totalTime;
            if( time >= t ) {
                aimIndex = i + 1;
            } else {
                break;
            }
        }
        
        if( aimIndex >= seq.length ) {
            aimIndex = seq.length - 1;
        }
        
        while( aimIndex > obj.currentIndex ) {
            
            obj.currentIndex += 1;
            
            var curAction = seq[obj.currentIndex];
            if( obj.currentIndex != obj.lastIndex ) {
                seq[obj.currentIndex].start(obj.target);
                obj.lastIndex = obj.currentIndex;
            }
            
            if( obj.currentIndex>-1 && obj.currentIndex<seq.length && curAction.step != null ) {
                if( curAction.totalTime == 0 ) {
                    curAction.step(0);
                }
            }
            
        }
        
        if( aimIndex == obj.currentIndex )
        {
            var curAction = seq[obj.currentIndex];
            if( obj.currentIndex>-1 && obj.currentIndex<seq.length && curAction.step!=null ) {
                if(curAction.totalTime>0) {
                    curAction.step(1-(t-time)/curAction.totalTime);
                }
            }
        }
    }

    function end()
    {
        for (var i = seq.length - 1; i >= 0; i--) {
            if(seq[i].end!=null) 
                seq[i].end();
        }

        obj._end();
    }

    obj.start  = start;
    obj.step   = step;
    obj.end    = end;
    
    return obj;
}

var actionManager = new Array();
var actionsBegin  = new Array();
var actionsEnded  = new Array();

function __RunAction( node, action) {
    var obj    = new Object();
    obj.__node   = node;
    obj.__action = action;
    action.start(node);
    actionManager.push(obj);
}

function RunAction( node, action) {
    var obj    = new Object();
    obj.__node   = node;
    obj.__action = action;
    actionsBegin.push(obj);
}

function StopAllActions( node ) {
    
    // TODO:: remove this action
    
    StopAction(node);
    
    // for (var i = actionManager.length - 1; i >= 0; i--) {
    //     var obj = actionManager[i];
    //     if( obj.__node === node )
    //     {
    //         if(obj.__action.cancel) {
    //             obj.__action.cancel();
    //         }
    //         actionsEnded.push(obj);
    //     }
    // }

    // for (var i = actionsBegin.length - 1; i >= 0; i--) {
    //     var obj = actionsBegin[i];
    //     if( obj.__node === node )
    //     {
    //         if(obj.__action.cancel) {
    //             obj.__action.cancel();
    //         }
    //         actionsEnded.push(obj);
    //     }
    // }
}

function StopAction( node, action ) {

    for (var i = actionManager.length - 1; i >= 0; i--) {
        
        var obj = actionManager[i];
        
        if( obj.__node === node )
        {
            if( typeof(action) !== 'undefined' && obj.__action !== action) {
                continue;
            }

            if(obj.__action.cancel) {
                obj.__action.cancel();
            }
            actionsEnded.push(obj); 
        }
    }

    for (var i = actionsBegin.length - 1; i >= 0; i--) {

        var obj = actionsBegin[i];
        
        if( obj.__node === node )
        {
            
            if( typeof(action) !== 'undefined' && obj.__action !== action) {
                continue;
            }

            if(obj.__action.cancel) {
                obj.__action.cancel();
            }
            actionsEnded.push(obj);
        }
    }
}

function RemoveEndedActions() {
    
    for (var index = actionsEnded.length - 1; index >= 0; index--) {
        
        for (var i = actionManager.length - 1; i >= 0; i--) {
            if( actionManager[i]  === actionsEnded[index] ) {
                actionManager.remove(i);
            }
        }
        
        for (var i = actionsBegin.length - 1; i >= 0; i--) {
            if( actionsBegin[i] === actionsEnded[index] ) {
                actionsBegin.remove(i);
            }
        }
    }
    
    actionsEnded.length = 0;
}

var timeScale = 1.0;

function SetTimeScale(s) {
    timeScale = s;
}

function ProcessAction( dt ) {
    
    for( var beginAction=actionsBegin.shift(); beginAction!=null; beginAction=actionsBegin.shift() ) {
        __RunAction( beginAction.__node, beginAction.__action );
        beginAction = null;
    }
    
    for (var i = actionManager.length - 1; i >= 0; i--) {
        
        var obj = actionManager[i];
        var action = obj.__action;
        
        action.time += (dt * timeScale);
        
        var p = action.totalTime == 0 ? 1 : action.time/action.totalTime;
        if(p>=1) p = 1;
        
        action.step(p);

        if( p>=1 ) {
            action.end();
            actionManager.remove(i);
        }
    }
    
    if( actionsEnded.length > 0 ) {
        RemoveEndedActions();
    }
    
    //cclog( "Runing Actions Count:" + actionManager.length );
}

function StartAnimation(dt)
{
    var timeFunc = null; 
    
    function defaultTimeFunc() {
        return (new Date).getTime();
    }

    function performanceNow() {
        return window.performance.now();
    }

    if( typeof(window.performance) !== "undefined" ) {
        timeFunc = performanceNow;
    } else {
        timeFunc = defaultTimeFunc;
    }

    var lastUpdateTime = timeFunc();

    function update()
    {
        var time = timeFunc();

        var deltaTime = (time - lastUpdateTime) / 1000.0;
        
        lastUpdateTime = time;
        
        ProcessAction(deltaTime);
    }

    setInterval( update, dt*1000);
}

function create_table_view( size, cellHeight, gap, dataSourceOrNumRows, cellForRowFunc, cellSelectFunc) {
    
    var tableView = CCLayer.create();
    tableView.setContentSize(size);
    tableView.visibleCells = new Array();
    tableView.cellsWaitingReuse = new Array();
    tableView.element.style.overflow = "hidden";
    
    var numRows = 0;

    tableView.setNumRows =  function(_numRows) 
    {
        numRows = _numRows;

        tableView.y_offset = 0;   
        
        var low_boundary = size.height - _numRows * ( cellHeight + gap );
        tableView.y_offset_range_low_boundary = low_boundary > 0 ? 0 : low_boundary;
        tableView.y_offset_range_high_boundary = 0;
    }
    
    tableView.getNumRows = function() {
        return numRows;
    }

    if( typeof(dataSourceOrNumRows) === "number" ) {
        tableView.setNumRows(dataSourceOrNumRows);
    } else {
        tableView.dataSource = dataSourceOrNumRows;
        tableView.setNumRows(dataSourceOrNumRows.length);
    }

    tableView.getCell = function( reuseKey ) {
        if( tableView.cellsWaitingReuse.length > 0 ) {
            var reuseCell = tableView.cellsWaitingReuse.shift();
            return reuseCell;
        } else {
            var cell = CCLayer.create();
            cell.setContentSize(CCSizeMake( size.width, cellHeight));
            cell.setAnchorpoint( 0, 0);
            cell.setTouchEnabled(true);
            cell.focuse  = null;
            cell.unfocus = null;
            return cell;
        }
    }

    function cellY(i) {
        var y = (cellHeight+gap)*i + tableView.y_offset;
        return y;
    }

    function isVisibleCell(i) {

        var y = cellY(i);

        if( y > size.height || (y + cellHeight + gap) < 0 ) {
            return false;
        }

        return true;
    }

    function updateVisibleCells() {

        var contains = new Array(numRows);
        
        for (var i = numRows - 1; i >= 0; i--) {
            contains[i] = false;
        }

        for ( var i = 0; i < tableView.visibleCells.length; i++ ) {
            var thecell = tableView.visibleCells[i];
            thecell.setPosition( 0, cellY(thecell.__index) );
            contains[thecell.__index] = true;
        }
        
        for (var i = 0; i < numRows; i++)
        {
            if( isVisibleCell(i) && (!contains[i]) )
            {
                var cell = cellForRowFunc( tableView, i);
                tableView.addChild(cell);

                cell.setVisible(true);
                cell.setPosition( 0, cellY(i) );
                cell.__index = i;
                
                tableView.visibleCells.push(cell);
            }
        }
    }

    updateVisibleCells();

    function SetOffset(offset) {

        tableView.y_offset = offset;

        // hide invisible cells
        for (var i = tableView.visibleCells.length - 1; i >= 0; i--) {
           var thecell = tableView.visibleCells[i];
            if( !isVisibleCell(thecell.__index) ) {
                thecell.setVisible(false);
                tableView.cellsWaitingReuse.push(thecell);
                tableView.visibleCells.remove(i);
            }
        }
        
        updateVisibleCells();
    }

    tableView.setOffset = SetOffset;

    tableView.reload = function() {

        // hide all visible cells
        for (var i = tableView.visibleCells.length - 1; i >= 0; i--) 
        {
            var thecell = tableView.visibleCells[i];
            thecell.setVisible(false);
            tableView.cellsWaitingReuse.push(thecell);
            tableView.visibleCells.remove(i);
        }

        // load visible cells again
        updateVisibleCells();
    }

    tableView.setDataSource = function(dataSource) {
        tableView.dataSource = dataSource;
        tableView.setNumRows(dataSource.length);
        tableView.reload();
    }

    function focusCell(index) {
        if(index<0) return;
        for ( var i = 0; i < tableView.visibleCells.length; i++ ) {
            var thecell = tableView.visibleCells[i];
            if(thecell.__index==index) {
                if(thecell.focuse) thecell.focuse();
            }
        }
    }

    function unfocusCell(index) {
        if(index<0) return;
        for ( var i = 0; i < tableView.visibleCells.length; i++ ) {
            var thecell = tableView.visibleCells[i];
            if(thecell.__index==index) {
                if(thecell.unfocuse) thecell.unfocuse();
            }
        }
    }

    tableView.setTouchEnabled(true);
    
    var v = 0;
    var last_y = 0;
    var focusedIndex = -1;

    tableView.touchBegin = function( x, y ) {
        
        tableView.stopAllActions();

        last_y = y;

        var cellIndex = Math.floor( ( y - tableView.y_offset ) / ( cellHeight + gap ) );

        if( cellIndex >= numRows ) {
            cellIndex = -1;
        }
        else
        {
            cellSelectFunc( cellIndex, "begin");
            focusedIndex = cellIndex;
            focusCell(focusedIndex);
        }
    }
    
    tableView.touchMoved = function( x, y ) {
        
        var dy = y - last_y;

        v = dy;

        var bounce = 0;

        if( tableView.y_offset < tableView.y_offset_range_low_boundary ) {
            bounce = tableView.y_offset_range_low_boundary  - tableView.y_offset;
        }
        else if( tableView.y_offset > tableView.y_offset_range_high_boundary ) {
            bounce = tableView.y_offset_range_high_boundary - tableView.y_offset;
        }

        tableView.setOffset( tableView.y_offset + ( bounce==0 ? dy : dy*0.5 ) );

        last_y = y;

        unfocusCell(focusedIndex);
        focusedIndex = -1;
    }

    function ChangeValue( time, beginValue, dValue, valueFunc ) {
        var obj = TimeAction(time);
        function start( target ) {
            obj._start( target);
            obj._beginValue = beginValue;
        }
        function step( p ) {
            valueFunc( obj._beginValue + dValue * p );
        }
        function end() {
            obj._end();
        }
        obj.start  = start;
        obj.step = step;
        obj.end = end;
        return obj;
    }
    
    function BounceBack() {
        
        tableView.stopAllActions();

        var bounce = 0;

        if( tableView.y_offset < tableView.y_offset_range_low_boundary ) {
            bounce = tableView.y_offset_range_low_boundary  - tableView.y_offset;
        }
        else if( tableView.y_offset > tableView.y_offset_range_high_boundary ) {
            bounce = tableView.y_offset_range_high_boundary - tableView.y_offset;
        }

        if( Math.abs(bounce)>0.5 ) {
            tableView.runAction(Ease( ease.bounce, ChangeValue( 0.5, tableView.y_offset, bounce, function(v) {
                tableView.setOffset(v);
            })));
            return true;
        }

        return false;
    }

    tableView.touchEnded = function( x, y ) {

         if( !BounceBack() )
         {
            tableView.stopAllActions();

            var lastValue = tableView.y_offset;
            var dy = 0;

            // 惯性运动
            tableView.runAction(Ease( ease.easeOutQuad, ChangeValue( Math.abs(v)/10, tableView.y_offset, v*100, function(v) {
                
                dy = v - lastValue;
                tableView.setOffset(v);
                
                if(    tableView.y_offset < tableView.y_offset_range_low_boundary
                    || tableView.y_offset > tableView.y_offset_range_high_boundary ) {

                    tableView.stopAllActions();

                    // 阻尼运动
                    // var stop = Ease( ease.easeOutQuad, ChangeValue( Math.abs(dy)/300, tableView.y_offset, dy*2, function(v) {
                    //     tableView.setOffset(v);
                    // }));
                    // tableView.runAction(Sequence([stop, CallFunc( function(){
                        BounceBack();
                    //}, null)]));
                }

             })));

        }

        var cellIndex = Math.floor( ( y - tableView.y_offset ) / ( cellHeight + gap ) );
        if( cellIndex == focusedIndex && (cellIndex>=0) ) 
            cellSelectFunc( cellIndex, "end");

        unfocusCell(focusedIndex);
        focusedIndex = -1;
        v = 0;
    }

    tableView.touchCanceled = function( x, y ) {
        
        tableView.stopAllActions();
        
        var bounce = 0;
        
        if( tableView.y_offset < tableView.y_offset_range_low_boundary ) {
            bounce = tableView.y_offset_range_low_boundary  - tableView.y_offset;
        }
        else if( tableView.y_offset > tableView.y_offset_range_high_boundary ) {
            bounce = tableView.y_offset_range_high_boundary - tableView.y_offset;
        }

        if( Math.abs(bounce)>0.5 ) {
            tableView.runAction(Ease( ease.bounce, ChangeValue( 0.5, tableView.y_offset, bounce, function(v) {
                tableView.setOffset(v);
            })));
        }

        unfocusCell(focusedIndex);
        focusedIndex = -1;
    }

    return tableView;
}

document.body.onselectstart = document.body.ondrag = function() {
    return false;
}

function setFullScreen(node) {
    node.element.style.width  = "100%";
    node.element.style.height = "100%";
}

function setCenterOfScreen(node) {
    node.element.style.marginLeft = "50%";
    node.element.style.marginTop = "50%";
}

/**
*   orintation
*/
var cur_orientation = "portrait";
var orintation_callback = null;

function SetOrintationLisener( orintation_callback_func ) {
    orintation_callback = orintation_callback_func
}

 (function() {

    var supportOrientation=(typeof window.orientation == "number" && typeof window.onorientationchange == "object"); //判断浏览器是否支持orientation
    
    var updateOrientation=function() {
        if(supportOrientation){
            updateOrientation=function(){
                var orientation=window.orientation;
                switch(orientation) {
                    case 90:
                    case -90:
                        orientation="landscape";   //横屏
                        SetTimeScale(0);
                        break;
                    default:
                        orientation="portrait";    //竖屏
                        SetTimeScale(1);
                }
                
                cur_orientation = orientation;
                if( orintation_callback ) {
                    orintation_callback(cur_orientation);
                }
            };
        }else{
            updateOrientation=function(){
                var orientation=(window.innerWidth > window.innerHeight) ? "landscape":"portrait";
                if( cur_orientation !== orientation && (orintation_callback != null) ) {
                    cur_orientation = orientation;
                    orintation_callback(cur_orientation);
                }
            };
        }
        updateOrientation();
    };

    var init=function(){
        updateOrientation();
        if(supportOrientation){
            window.addEventListener("orientationchange",updateOrientation,false);
        }else{
            window.setInterval(updateOrientation,500);
        }
    };
    if(!IS_IE) {
        window.addEventListener("DOMContentLoaded",init,false);
    }
})();

function cilpboard()
{
    var obj = {};

    function select(element) {
        var selectedText;

        if (element.nodeName === 'SELECT') {
            element.focus();

            selectedText = element.value;
        }
        else if (element.nodeName === 'INPUT' || element.nodeName === 'TEXTAREA') {
            var isReadOnly = element.hasAttribute('readonly');

            if (!isReadOnly) {
                element.setAttribute('readonly', '');
            }

            element.select();
            element.setSelectionRange(0, element.value.length);

            if (!isReadOnly) {
                element.removeAttribute('readonly');
            }

            selectedText = element.value;
        }
        else {
            if (element.hasAttribute('contenteditable')) {
                element.focus();
            }

            var selection = window.getSelection();
            var range = document.createRange();

            range.selectNodeContents(element);
            selection.removeAllRanges();
            selection.addRange(range);

            selectedText = selection.toString();
        }

        return selectedText;
    }

    /**
     * Creates a fake textarea element, sets its value from `text` property,
     * and makes a selection on it.
     */
    obj.selectFake = function () {

        const isRTL = document.documentElement.getAttribute('dir') == 'rtl';

        obj.removeFake();
        
        obj.fakeElem = document.createElement('textarea');
        // Prevent zooming on iOS
        obj.fakeElem.style.fontSize = '12pt';
        // Reset box model
        obj.fakeElem.style.border = '0';
        obj.fakeElem.style.padding = '0';
        obj.fakeElem.style.margin = '0';
        // Move element out of screen horizontally
        obj.fakeElem.style.position = 'absolute';
        obj.fakeElem.style[ isRTL ? 'right' : 'left' ] = '-9999px';
        // Move element to the same position vertically
        let yPosition = window.pageYOffset || document.documentElement.scrollTop;
        obj.fakeElem.style.top = yPosition + 'px';

        obj.fakeElem.setAttribute('readonly', '');
        obj.fakeElem.value = obj.text;

        document.body.appendChild(obj.fakeElem);
        obj.fakeElem.focus();
        obj.selectedText = select(obj.fakeElem);
    }

    /**
     * Only removes the fake element after another click event, that way
     * a user can hit `Ctrl+C` to copy because selection still exists.
     */
    obj.removeFake = function() {
        if (obj.fakeElem) {
            document.body.removeChild(obj.fakeElem);
            obj.fakeElem = null;
        }
    }

    /**
     * Executes the copy operation based on the current selection.
     */
    obj.copyText = function( text, callback) {
        
        obj.text = text;

        obj.selectFake();
        
        let succeeded;

        try {
            succeeded = document.execCommand("copy", false, null);
        }
        catch (err) {
           succeeded = false;
        }
        
        obj.removeFake();

        callback(succeeded);
    }
    return obj;
}




/**************************** Web GL support **********************************/

function BeginRender(scene) {

    var gl = scene._GL;
    
    gl.pixelStorei( gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, true);
    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
    gl.enable(gl.BLEND); 
    gl.disable(gl.DEPTH_TEST);
    
    gl.ProjectionMatrix = makeOrtho( 0, gl.drawingBufferWidth, gl.drawingBufferHeight, 0, -1.0, 1.0);
    initShaders(gl);
    
    function WebGLSceneRender() {
        
        gl.clear( gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT );
        
        for(x in scene.childs) {
            if(scene.childs[x]._gl_render) 
                scene.childs[x]._gl_render();
        }
    }
    
    scene.runAction(RepeatForever(CallFunc(WebGLSceneRender)));
}


function EnableOpenGL(scene) {
    
    var _GL = null;
    scene._canvas = null;
    
    function AttachCanvas(scene) {
        var canvas = document.createElement('canvas');
        if(canvas) {
            canvas.width  = scene.width;
            canvas.height = scene.height;
            scene.element.appendChild(canvas);
            scene._canvas = canvas;
            return canvas;
        }
        return null;
    }
    
    function InitWebGL(scene) {
        _GL = null;
        try {
            _GL = scene._canvas.getContext("experimental-webgl");
        }
        catch(e) {
            return false;
        }
        return true;
    }

    var cavas = null;
    if( !scene._canvas ) {
        AttachCanvas(scene);
    }
    if( scene._canvas) {
        var supportWebGL = InitWebGL(scene);
        if( supportWebGL ) {
            scene._isGLNode = true;
            scene._GL = _GL;
            BeginRender(scene);
            return true;
        }
    }
    return false;
}

function GenTexture(node) {
    
    assert( node._image, "Error: trying generate texture without image.");
    assert( node._GL, "Error: trying generate texture without GL context.");
    assert( node._texture, "Error: no texture.");
    
    function isPOT( w, h) {
        while( (w/=2) > 1 );
        while( (h/=2) > 1 );
        return (w==1)&&(h==1);
    }
    
    function createPOTTexture(image) {
        
        var width  = 1;
        var height = 1;
        
        while(width<image.width) width*=2;
        while(height<image.height) height*=2;
        
        // create a hidden canvas to draw the texture 
        var canvas = document.createElement('canvas');
        canvas.id     = "hiddenCanvas";
        canvas.width  = width;
        canvas.height = height;
        canvas.style.backgroundColor   = "#000000";
        canvas.style.display = "none";
        var body = document.getElementsByTagName("body")[0];
        body.appendChild(canvas);        
    
        // draw texture
        var cubeImage = document.getElementById('hiddenCanvas');
        var ctx = cubeImage.getContext('2d');
        ctx.drawImage( image, 0, 0);
        
        return canvas;
    }
    
    var potTexture = null;
    
    if( !isPOT( node._image.width, node._image.height) ) {
        potTexture = createPOTTexture(node._image);
        node._textureWidth = potTexture.width;
        node._textureHeight = potTexture.height;
    } else {
        node._textureWidth = node._image.width;
        node._textureHeight = node._image.height;
    }
    
    var gl = node._GL;
    gl.bindTexture( gl.TEXTURE_2D, node._texture);
    gl.texImage2D( gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, potTexture !== null ? potTexture : node._image);
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri( gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.bindTexture( gl.TEXTURE_2D, null);
    
    node._texture_ready = true;
    
    if(potTexture) 
        potTexture.parentNode.removeChild(potTexture);
        
    InitNodeRender(node);
}

//
// initShaders
//
// Initialize the shaders, so WebGL knows how to light our scene.
//
function initShaders(gl) {
    
    var fragmentShader = getShader(gl, "shader-fs");
    var vertexShader = getShader(gl, "shader-vs");
    
    // Create the shader program
    shaderProgram = gl.createProgram();
    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);
    
    // If creating the shader program failed, alert
    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        alert("Unable to initialize the shader program: " + gl.getProgramInfoLog(shader));
    }
    
    gl.useProgram(shaderProgram);
    
    vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
    gl.enableVertexAttribArray(vertexPositionAttribute);
    
    vertexTextureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
    gl.enableVertexAttribArray(vertexTextureCoordAttribute);
}

//
// getShader
//
// Loads a shader program by scouring the current document,
// looking for a script with the specified ID.
//
function getShader(gl, id) {
  var shaderScript = document.getElementById(id);

  // Didn't find an element with the specified ID; abort.

  if (!shaderScript) {
    return null;
  }

  // Walk through the source element's children, building the
  // shader source string.

  var theSource = "";
  var currentChild = shaderScript.firstChild;

  while(currentChild) {
    if (currentChild.nodeType == 3) {
      theSource += currentChild.textContent;
    }

    currentChild = currentChild.nextSibling;
  }

  // Now figure out what type of shader script we have,
  // based on its MIME type.

  var shader;

  if (shaderScript.type == "x-shader/x-fragment") {
    shader = gl.createShader(gl.FRAGMENT_SHADER);
  } else if (shaderScript.type == "x-shader/x-vertex") {
    shader = gl.createShader(gl.VERTEX_SHADER);
  } else {
    return null;  // Unknown shader type
  }

  // Send the source to the shader object
  gl.shaderSource(shader, theSource);

  // Compile the shader program
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert("An error occurred compiling the shaders: " + gl.getShaderInfoLog(shader));
    return null;
  }

  return shader;
}

function makeOrtho(
    left, right,
    bottom, top,
    znear, zfar
) {
    var tx = -(right+left)/(right-left);
    var ty = -(top+bottom)/(top-bottom);
    var tz = -(zfar+znear)/(zfar-znear);

    return [2/(right-left), 0, 0,  tx,
            0, 2/(top-bottom), 0,  ty,
            0, 0, -2/(zfar-znear), tz,
            0, 0, 0, 1];
}

function UpdateWebGLAnchorpoint(node) {
    
    var gl = node._GL;
    
    var vertices = [  -node._image.width*node.ax,                   node._image.height-node._image.height*node.ay,  0.0, 
                      node._image.width-node._image.width*node.ax,  node._image.height-node._image.height*node.ay,  0.0,
                      -node._image.width*node.ax,                   -node._image.height*node.ay,                    0.0, 
                      node._image.width-node._image.width*node.ax,  -node._image.height*node.ay,                    0.0];
                       
                       
     if(node._vertexBuffer) {
         gl.deleteBuffer(node._vertexBuffer);
         node._vertexBuffer = null;
     }
     
     node._vertexBuffer = gl.createBuffer();
     gl.bindBuffer(gl.ARRAY_BUFFER, node._vertexBuffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
}

function InitNodeRender(node) {
     
     var gl = node._GL;
     
     UpdateWebGLAnchorpoint(node);
     
     var h = node._image.height/node._textureHeight;
     var w = node._image.width/node._textureWidth;
     
     var textureCoordBuffer = [ 0.0, h, 
                                w,   h,
                                0.0, 0.0,
                                w,   0.0];
                                
     node._vertexTextureCoordBuffer = gl.createBuffer();
     gl.bindBuffer( gl.ARRAY_BUFFER, node._vertexTextureCoordBuffer);
     gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordBuffer), gl.STATIC_DRAW);
     
     node._gl_render = function() {
        
        if( !node._texture_ready || !node.visible) return;
         
        gl.bindBuffer(gl.ARRAY_BUFFER, node._vertexBuffer);
        gl.vertexAttribPointer(vertexPositionAttribute, 3, gl.FLOAT, false, 0, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, node._vertexTextureCoordBuffer);
        gl.vertexAttribPointer(vertexTextureCoordAttribute, 2, gl.FLOAT, false, 0, 0);
        
        gl.activeTexture( gl.TEXTURE0);
        gl.bindTexture( gl.TEXTURE_2D, node._texture);
        gl.uniform1i( gl.getUniformLocation(shaderProgram, "uSampler"), 0);
        gl.uniform1f( gl.getUniformLocation(shaderProgram, "uAlpha"), node.opacity);
        
        var pUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        gl.uniformMatrix4fv(pUniform, false, new Float32Array(gl.ProjectionMatrix));
        
        var mvUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        gl.uniformMatrix4fv(mvUniform, false, new Float32Array([ Math.cos(node.rotation_rad)*node.scalex, Math.sin(node.rotation_rad), 0, node.x,
                                                                -Math.sin(node.rotation_rad), Math.cos(node.rotation_rad)*node.scaley, 0, node.y,
                                                                0,0,1,0,
                                                                0,0,0,1]));
        
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 4);
     }
};

/**************************** End GL support **********************************/