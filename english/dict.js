var SUBSCRIBE_LINK = "http://mp.weixin.qq.com/s?__biz=MjM5ODA0ODY3Mg==&mid=204001971&idx=1&sn=c5e1b097f756e030ffbf8e602a7ccf1a#rd";

var forceVoiceTranslateUIEnabled = false;
var dictionary = null;
var lastQuery = "";

function jsonp(url) {
    
    var json_script_id = "jsonp_script_id";
    var old_jsonp_script_element = document.getElementById(json_script_id);
    
    if(old_jsonp_script_element) {
        if(old_jsonp_script_element.parentNode){
            old_jsonp_script_element.parentNode.removeChild(old_jsonp_script_element);
        }
    }
    
    const script = document.createElement('script');
    script.id = json_script_id;
    script.src = url;
    script.type = 'text/javascript';
    document.body.appendChild(script);
}

function show(result) {
    
    var text = "";

    if( typeof(result.basic) !=="undefined" && typeof(result.basic.phonetic) !== "undefined" ) {
        text += "发音:<br/>|" + result.basic.phonetic + "|<br/><br/>";
    }

    text += "翻译:<br/>"+result.translation;

    if( typeof(result.basic) !=="undefined" && typeof(result.basic.explains) !== "undefined" ) {
        text += "<br/><br/>解释:<br/>" + result.basic.explains;
    }

    dictionary.setText( text );
}

function Query(value) {
    dictionary.beginQuery();
    jsonp("https://fanyi.youdao.com/openapi.do?keyfrom=englishlearning&key=519282062&type=data&doctype=jsonp&callback=show&version=1.1&q="+value);
}

function OnQuery() {
    var textBox = document.getElementById("text");
    if( textBox.value != "" && textBox.value != lastQuery ) {
        Query(textBox.value);
        lastQuery = textBox.value;
    }
}

function Dictionary()
{
    var scene   = null;

    var bgLayer = null;
    var tipLayer = null;
    var recordingLayer = null;

    var tipTextLabel = null;
    var loadingLabel = null;
    var resultLabel  = null;
    
    var queryCounter = 0;
    var voiceId = null;
    
    function createTipArrow()
    {
        tipLayer = CCLayer.create();
        tipLayer.setContentSize(CCSizeMake(30, 30));
        
        tipLayer.element.style.position = "fixed";
        tipLayer.element.style.left = "100%";
        tipLayer.element.style.top = "0%";
        tipLayer.element.style.marginLeft = "-35";
        tipLayer.element.style.marginTop = "0";
        
        tipLabel = createLabelDefaultStyle( "^", 5, 5);
        tipLayer.addChild(tipLabel);
        
        function resetPos(o){
            o.setPosition( 5, 5);
        }
        var anim = RepeatForever(Sequence([MoveBy(0.6,0,10),
                                           MoveBy(0.6,0,-10),
                                           CallFunc(resetPos,tipLabel)]));
        tipLabel.runAction(anim);
        
        tipLayer.setVisible(false);
    }
    
    function showShareTip()
    {
        tipLayer.stopAllActions();
        tipLayer.setOpacity(0);
        tipLayer.setVisible(true);
        
        tipLayer.runAction(Sequence([FadeIn(0.6),
                                     DelayTime(6),
                                     FadeOut(0.6),
                                     Hide()]));
        
        tipTextLabel.stopAllActions();
        tipTextLabel.setOpacity(0);
        tipTextLabel.setVisible(true);
        
        tipTextLabel.runAction(Sequence([FadeIn(0.6),
                                         DelayTime(6),
                                         FadeOut(0.6),
                                         Hide()]));
    }
    
    function translate() {
        if( typeof(wx) != 'undefined' )
            wx.translateVoice({
                                  localId: voiceId,
                                  isShowProgressTips: 1,
                                  success: function (res) {
                                      if( typeof(res.translateResult) != 'unfefined' ) {
                                          var textBox = document.getElementById("text");
                                          textBox.value = res.translateResult;
                                          OnQuery();
                                      } else{
                                          var textBox = document.getElementById("text");
                                          textBox.value = "[说话时间太短!]";
                                      }
                                  }
                              });
    }
    
    function startRecord(){
        if( typeof(wx) != 'undefined' )
            wx.startRecord();
    }
    
    function stopRecord(){
        if( typeof(wx) != 'undefined' )
            wx.stopRecord({
                              success: function (res) {
                                  voiceId = res.localId;
                                  translate();
                              }
                          });
    }
    
    function init()
    {        
        var w = window.innerWidth;
        var h = window.innerHeight;

        scene = CCScene.create();
        scene.setContentSize(CCSizeMake(w, h));
        scene.setPosition(w/2,h/2);
        scene.setTouchEnabled(true); // disable screen bounce effect
        //scene.setColor("#aa0000");

        bgLayer = CCLayer.create();
        bgLayer.setContentSize(CCSizeMake(320, 480));
        bgLayer.setAnchorpoint( 0, 0);
        bgLayer.setPosition( 0, 0);
        //bgLayer.setColor("#00aa00");
        //scene.addChild(bgLayer);
        
        bgLayerBg = CCLayer.create();
        bgLayerBg.setContentSize(CCSizeMake(320, 480));
        bgLayerBg.setAnchorpoint( 0, 0);
        bgLayerBg.setPosition( 0, 0);
        bgLayerBg.setColor("#00aa00");
        bgLayer.addChild(bgLayerBg);
        bgLayerBg.setTouchEnabled(true);
        bgLayerBg.setColor(ccc3(46,138,189));

        bgLayerBg.touchBegin = function(x,y)
        {
            var r = math.random(0,255);
            var g = math.random(0,255);
            var b = math.random(0,255);
            
            var color = ccc3(r,g,b);
            bgLayerBg.setColor(color);
            tipTextLabel.setString( r + "," + g + "," + b + " " + color.toString() );
            tipTextLabel.setVisible(true);
        };
        
        bgLayer.element.style.left = "50%";
        bgLayer.element.style.top = "50%";
        bgLayer.element.style.marginLeft = "-160";
        bgLayer.element.style.marginTop = "-240";

        var title = "英汉互译-学英语";
        titleLabel = createLabelDefaultStyle( title, 95, 60);
        bgLayer.addChild(titleLabel);
        attachLink( titleLabel, SUBSCRIBE_LINK);

        function setString( o, str){
            o.setString(str);
        }
        titleLabel.runAction(RepeatForever(Sequence([DelayTime(6),
                                                     FadeOut(1),
                                                     CallFunc( setString, "［点击这里关注］"),
                                                     FadeIn(1),
                                                     DelayTime(2),
                                                     FadeOut(1),
                                                     CallFunc( setString, title),
                                                     FadeIn(1)])));
        
        createTipArrow();
        
        /*query layer*/
        queryLayer = CCLayer.create();
        queryLayer.setContentSize(CCSizeMake(220, 25));
        queryLayer.setAnchorpoint( 0, 0);
        queryLayer.setPosition(50, 95);
        bgLayer.addChild(queryLayer);
        
        queryLayerBg = CCLayer.create();
        queryLayerBg.setContentSize(CCSizeMake(220, 25));
        queryLayerBg.setAnchorpoint( 0, 0);
        queryLayer.addChild(queryLayerBg);
        queryLayerBg.setColor(ccc3(255,255,255));
        queryLayerBg.setOpacity(0.1);
        
        queryLayerFg = CCLayer.create();
        queryLayerFg.setContentSize(CCSizeMake(220, 25));
        queryLayerFg.setAnchorpoint( 0, 0);
        queryLayer.addChild(queryLayerFg);
        
        queryLayerFg.element.innerHTML = "<input id='text' placeholder='' style='width:160px;height:25px;border:0;background:none transparent scroll repeat 0% 0%;color:#ffffff' onkeypress='if(event.keyCode==13) OnQuery();'></input><input style='width:60px;height:25px;font-size:14px;color:#ffffff;margin-top:-1px\9;padding:0;background-color:#5ac;border:0;' type='button' onclick='OnQuery()' value='翻译'></input>";
        queryLayerFg.element.style.overflow="hidden";
        
        /*result layer*/
        resultLayer = CCLayer.create();
        resultLayer.setContentSize(CCSizeMake(220, 300));
        resultLayer.setAnchorpoint( 0, 0);
        resultLayer.setPosition(50, 135);
        
        resultBgLayer = CCLayer.create();
        resultBgLayer.setContentSize(CCSizeMake(220, 300));
        resultBgLayer.setAnchorpoint( 0, 0);
        resultBgLayer.setPosition(resultLayer.x, resultLayer.y);
        resultBgLayer.setColor(ccc3( 255, 255, 255));
        resultBgLayer.setOpacity(0.1);
        
        bgLayer.addChild(resultBgLayer);
        bgLayer.addChild(resultLayer);

        resultLabel = createLabelDefaultStyle( "", 0, 0);
        resultLayer.addChild(resultLabel);
        resultLabel.setVisible(true);

        resultLayer.element.setAttribute('class','scrollable-content');

        loadingLabel = createLabelDefaultStyle( "查询中...", 0, 0);
        resultLayer.addChild(loadingLabel);
        loadingLabel.setVisible(false);
        
        tipTextLabel = createLabelDefaultStyle( "如果喜欢可以分享到朋友圈", 0, bgLayer.height);
        bgLayer.addChild(tipTextLabel);
        tipTextLabel.setContentSize(CCSizeMake(bgLayer.width, bgLayer.height - (resultLayer.height+resultLayer.y)));
        tipTextLabel.setAnchorpoint( 0, 1);
        tipTextLabel.setPosition(0, bgLayer.height);
        tipTextLabel.setTextAlign("center");
        tipTextLabel.setVisible(false);

        /* recording */
        if( ( typeof(wx) != 'undefined' ) || forceVoiceTranslateUIEnabled ) {
            
            recordingLayerBg = CCLayer.create();
            recordingLayerBg.setContentSize(CCSizeMake(scene.width, scene.height));
            recordingLayerBg.setAnchorpoint( 0, 0);
            recordingLayerBg.setPosition(0, 0);
            recordingLayerBg.setColor(ccc3( 0, 0, 0));
            recordingLayerBg.setOpacity(0.66);
            setFullScreen(recordingLayerBg);
            recordingLayerBg.setVisible(false);
            
            recordingLayer = CCLayer.create();
            recordingLayer.setContentSize(CCSizeMake(scene.width, scene.height));
            recordingLayer.setAnchorpoint( 0, 0);
            recordingLayer.setPosition(0, 0);
            setFullScreen(recordingLayer);
            recordingLayer.setVisible(false);
            
            var stopRecButton = createButton(function(){
                                             stopRecord();
                                             recordingLayerBg.setVisible(false);
                                             recordingLayer.setVisible(false);
                                         }, "stop.png");
            recordingLayer.addChild(stopRecButton);
            setCenterOfScreen(stopRecButton);
            
            stopRecButton.runAction(RepeatForever(Sequence([FadeTo( 0.6, 0.6), FadeTo( 0.6, 1)])));
            
            var recButton = createButton(function(){
                                            startRecord();
                                            recordingLayerBg.setVisible(true);
                                            recordingLayer.setVisible(true);
                                         }, "rec.png");
            queryLayerFg.addChild(recButton);
            recButton.setPosition( queryLayerFg.width-72.5, 12.5);
            recButton.setVisible(false);
            
            if( typeof(wx) != 'undefined' )
                wx.ready(function () {
                        recButton.setVisible(true);
                     });
            
            if( forceVoiceTranslateUIEnabled )    {
                recButton.setVisible(true);
            }
        }
        
    }
    
    function BeginQuery()
    {
        loadingLabel.setVisible(true);
        resultLabel.setVisible(false);
    }
    
    function SetText(text)
    {
        loadingLabel.setVisible(false);
        resultLabel.setVisible(true);
        
        if(resultLabel!=null)
            resultLabel.setString("<pre>"+text+"</pre>");
        
        ++queryCounter;
        
        if(queryCounter%3==0)
            showShareTip();
    }
    
    init();
    
    var obj = new Object();
    obj.setText = SetText;
    obj.beginQuery = BeginQuery;
    
    return obj;
}

function StartGame() {
    dictionary = Dictionary();
    StartAnimation();
}

StartGame();
