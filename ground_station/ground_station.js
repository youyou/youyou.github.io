var DEVICE_IP = "192.168.4.1";

if( typeof(_GET["handle"]) !== 'undefined' ) {
    DEVICE_IP = "192.168.6.1";
}

var profiles = 
        [
            {   
                "DEVICE_NAME" : "默认设备",

                "DEVICE_IP" : "192.168.4.1",

                "FILTERS_ENABLED" : false,
                
                "FILTERS" : {
                },
                
                "DICT_ENABLED" : false,

                "DICT" : {
                }
            },
            {   
                "DEVICE_NAME" : "平衡车",
                
                "DEVICE_IP" : "BalanceCar_C3FDFF.local",

                "FILTERS_ENABLED" : false,
                
                "FILTERS" : {
                },
                
                "DICT_ENABLED" : false,

                "DICT" : {
                }
            },
            {
                "DEVICE_NAME" : "电动牙刷",

                "DEVICE_IP" : "192.168.6.1",

                "FILTERS_ENABLED" : false,
                
                "FILTERS" : {
                    "ALARM_ON" : true,
                    "开关" : true,
                    "重启" : true,
                    "MORNING_ALARM" : true,
                    "NIGHT_ALARM" : true,
                    "TIME" : true
                },
                
                "DICT_ENABLED" : false,
                
                "DICT" : {
                    "ALARM_ON" : "闹钟开关",
                    "MORNING_ALARM" : "早晨提醒时间",
                    "NIGHT_ALARM" : "晚上提醒时间"
                }
            }
        ];

DICT = {};
DICT_ENABLED = true;

FILTERS = {};
FILTERS_ENABLED = false;

var profileIndex = 0;

function config_device() 
{
    var index = 0;
    if( index ) {
        profileIndex = index;
    }
    
    DEVICE_IP = profiles[profileIndex].DEVICE_IP;

    FILTERS_ENABLED = profiles[profileIndex].FILTERS_ENABLED;
    FILTERS = profiles[profileIndex].FILTERS;
    
    DICT_ENABLED = profiles[profileIndex].DICT_ENABLED;
    DICT = profiles[profileIndex].DICT;
}

if( typeof(config_device) !== 'undefined' ) {
    config_device();
}

// function ChangeValue( time, beginValue, dValue, valueFunc ) {
//     var obj = TimeAction(time);
//     function start( target ) {
//         obj._start( target);
//         obj._beginValue = beginValue;
//     }
//     function step( p ) {
//         valueFunc( obj._beginValue + dValue * p );
//     }
//     function end() {
//         step( 1 );
//         obj._end();
//     }
//     obj.start  = start;
//     obj.step = step;
//     obj.end = end;
//     return obj;
// }

function getIPs(callback){
    var ip_dups = {};
    
    //compatibility for firefox and chrome
    var RTCPeerConnection = window.RTCPeerConnection
    || window.mozRTCPeerConnection
    || window.webkitRTCPeerConnection;
    var useWebKit = !!window.webkitRTCPeerConnection;
    
    //bypass naive webrtc blocking using an iframe
    if(!RTCPeerConnection){
        var win = iframe.contentWindow;
        RTCPeerConnection = win.RTCPeerConnection
        || win.mozRTCPeerConnection
        || win.webkitRTCPeerConnection;
        useWebKit = !!win.webkitRTCPeerConnection;
    }
    
    //minimal requirements for data connection
    var mediaConstraints = {
    optional: [{RtpDataChannels: true}]
    };
    
    var servers = {iceServers: [{urls: "stun:stun.services.mozilla.com"}]};
    
    //construct a new RTCPeerConnection
    var pc = new RTCPeerConnection(servers, mediaConstraints);
    
    function handleCandidate(candidate){
        //match just the IP address
        var ip_regex = /([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})/
        var ip_addr = ip_regex.exec(candidate)[1];
        
        //remove duplicates
        if(ip_dups[ip_addr] === undefined)
            callback(ip_addr);
        
        ip_dups[ip_addr] = true;
    }
    
    //listen for candidate events
    pc.onicecandidate = function(ice){
        
        //skip non-candidate events
        if(ice.candidate)
            handleCandidate(ice.candidate.candidate);
    };
    
    //create a bogus data channel
    pc.createDataChannel("");
    
    //create an offer sdp
    pc.createOffer(function(result) {

                       //trigger the stun server request
                       pc.setLocalDescription(result, function(){}, function(){});
                   
                   }, function(){});
    
    //wait for a while to let everything done
    setTimeout(function(){
               //read candidate info from local description
               var lines = pc.localDescription.sdp.split('\n');
               
               lines.forEach(function(line){
                             if(line.indexOf('a=candidate:') === 0)
                             handleCandidate(line);
                             });
               }, 1000);
}

function CreateSTLViewerLayer( mesh ) {
    
    var layer = CCLayer.create();
    layer._setContentSize = layer.setContentSize;
    layer.setContentSize = function(size) {
        layer._setContentSize(size);
        layer.element.setAttribute('width',layer.width);
        layer.element.setAttribute('height',layer.height);
    }

    layer.setContentSize(CCSizeMake( 320, 200));
    layer.setAnchorpoint(0,0);
    layer.setPosition(0,30);

    var div = layer.element;

    if (!Detector.webgl) Detector.addGetWebGLMessage();
    var container, stats;
    var camera, cameraTarget, scene, renderer;
    //var stlViewer = {};
    layer.running = true;
    
    function init() {
        
        camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 1, 15);
        camera.position.set(3, 0.15, 3);
        cameraTarget = new THREE.Vector3(0, -0.25, 0);
        scene = new THREE.Scene();
        scene.fog = new THREE.Fog(0x55bbff, 2, 15);
        
        // Ground
        var plane = new THREE.Mesh(
            new THREE.PlaneBufferGeometry(40, 40),
            new THREE.MeshPhongMaterial({
                color: 0x021E78,
                specular: 0x101010
            })
        );
        plane.rotation.x = -Math.PI / 2;
        plane.position.y = -0.5;
        scene.add(plane);
        plane.receiveShadow = true;
        
        // ASCII file
        var loader = new THREE.STLLoader();
        loader.load( mesh, function(geometry) {
            
            var loadingDom = document.getElementById('loadingText');
            try {
                loadingDom.parentNode.removeChild(loadingDom);
                loadingDom = document.getElementById('loadingText');
                loadingDom.parentNode.removeChild(loadingDom);
            }catch(e){
            }
            
            var material = new THREE.MeshPhongMaterial({
                color: 0xcccccc,
                specular: 0x111111,
                shininess: 200
            });
            
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, 0, 0); //-1.5
            
            mesh.rotation.set(-Math.PI/2, 0, Math.PI/4);

            // // mesh.rotateZ(5);
            // mesh.rotateX(-0.2);
            // mesh.rotateY(0.2);
            // mesh.rotation.set(-Math.PI/2, 0, 0);
            // mesh.rotateZ(5);
            // mesh.rotateX(0.2);
            // mesh.rotateY(0);
            
            layer.setMeshRotation = function(yaw, pitch, roll) {
                
                yaw   = yaw*Math.PI/180;
                pitch = pitch*Math.PI/180;
                roll  = roll*Math.PI/180;

                mesh.rotation.set(-Math.PI/2, 0, Math.PI/4);
                mesh.rotateZ(-yaw);
                mesh.rotateX(-pitch);
                mesh.rotateY(-roll);
            }

            mesh.scale.set(0.02, 0.02, 0.02);
            mesh.castShadow = true;
            mesh.receiveShadow = true;
            scene.add(mesh);
            
        });
        
        // Lights
        scene.add(new THREE.HemisphereLight(0xaaaaaa, 0x111122));
        addShadowedLight(1, 1, 1, 0xaaaaaa, 1.35);
        //addShadowedLight(0.5, 1, -1, 0xffffff, 1);
        
        // renderer
        renderer = new THREE.WebGLRenderer({
            antialias: true
        });
        renderer.setClearColor(scene.fog.color);
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.gammaInput = true;
        renderer.gammaOutput = true;
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.renderReverseSided = false;
        div.appendChild(renderer.domElement);
        
        camera.aspect = div.getAttribute("width") / div.getAttribute("height");
        camera.updateProjectionMatrix();
        renderer.setSize( div.getAttribute("width"), div.getAttribute("height"));
    }
    
    function addShadowedLight(x, y, z, color, intensity) {
        var directionalLight = new THREE.DirectionalLight(color, intensity);
        directionalLight.position.set(x, y, z);
        scene.add(directionalLight);
        directionalLight.castShadow = true;
        var d = 1;
        directionalLight.shadow.camera.left = -d;
        directionalLight.shadow.camera.right = d;
        directionalLight.shadow.camera.top = d;
        directionalLight.shadow.camera.bottom = -d;
        directionalLight.shadow.camera.near = 1;
        directionalLight.shadow.camera.far = 4;
        directionalLight.shadow.mapSize.width = 1024;
        directionalLight.shadow.mapSize.height = 1024;
        directionalLight.shadow.bias = -0.005;
    }
    
    function animate() {
        if( layer.running 
        && div.parentNode ) {
            requestAnimationFrame(animate);
        } else {
            cclog("render stoped!");
        }
        render();
    }

    function render() {
        var timer = Date.now() * 0.0005;
        timer = 10;
        camera.position.x = Math.cos(timer) * 3;
        camera.position.z = Math.sin(timer) * 3;
        camera.lookAt(cameraTarget);
        renderer.render(scene, camera);
    }
    
    layer.stopAnimation = function() {
        this.running = false;
    };
    
    layer.startAnimation = function () {
        this.running = true;
        requestAnimationFrame(animate);
    };

    init();
    
    layer.startAnimation();

    return layer;
}

var log_received_message = false;

function MainScene() {
    
    var scene = null;

    function CreateScene() 
    {    
        var scene = CCScene.create();
        scene.setTouchEnabled(true);
        scene.setVisible(false);
        scene.element.setAttribute('class','scene');
        scene.element.style.overflow = "hidden";
        
        scene.layout = function ( w, h)
        {
            scene.setContentSize(CCSizeMake(w, h));
            scene.setPosition(w/2,h/2);
        }
        scene.layout( window.innerWidth, window.innerHeight);
        
        return scene;
    }

    function AddRainbow(scene) {
        rainbow = CCSprite.create( "rainbow.png");
        scene.addChild(rainbow);

        rainbow.onload = function() {
            rainbow.setPosition( scene.width+30, rainbow.height/6);
        }

        rainbow.setOpacity(0);

        rainbow.layout = function(w,h) {
            rainbow.setPosition( scene.width+30, rainbow.height/6);
        }
    }

    function CreateWebSocket() {
        
        if( typeof(websocket) !== 'undefined' && websocket !== null ) {
            websocket.close();
        }
        
        var wsurl = "ws://" + DEVICE_IP + ":80";

        websocket = new WebSocket(wsurl);
        websocket.ready = false;
        console.log("connecting "+wsurl);

        websocket.onopen = function(evt) {
            
            console.log("CONNECTED");
            
            websocket.ready = true;
            
            rainbow.runAction(FadeIn(1));
            
            if( typeof(batteryLayer) !== 'undefined' ) 
                batteryLayer.runAction(FadeIn(1));
            
            websocket.send("刷新数据");
        };

        websocket.onclose = function(evt) {

            console.log("DISCONNECTED CODE:" + evt.code);
            
            websocket.ready = false;
            rainbow.runAction(FadeOut(1));

            if( typeof(batteryLayer) !== 'undefined' )  {
                batteryLayer.runAction(Sequence([FadeOut(1),CallFunc(function() {
                    if( typeof(batteryLayer) !== 'undefined' )
                        batteryLayer.destory();
                })]) );
            }
            
        };

        websocket.onmessage = function(evt) {
            var message = evt.data;
            onReceiveMessage(message);
        };

        websocket.onerror = function(evt) {
            rainbow.runAction(FadeOut(1));
            websocket.ready = false;
            if( typeof(batteryLayer) !== 'undefined' )  {
                batteryLayer.runAction(Sequence([FadeOut(1),CallFunc(function() {
                    if( typeof(batteryLayer) !== 'undefined' )
                        batteryLayer.destory();
                })]) );
            }
        };
    }

    function ADCToVotage(value) 
    {
        var vadc = ( value/1024.0 ) - 0.01;
        var v    = vadc*(680.0+51.0)/51.0;
        // cclog( "vadc:" + vadc + " v:" + v);
        return v;
    }

    function onReceiveBatteryVotage(message)
    {
        cclog(message);

        var adcValue = parseInt(message);
        
        var v = ADCToVotage(adcValue);

        // enable battery display when plane sends battery data
        if( typeof(batteryLayer) == 'undefined' ) {
            
            var s = 1;

            if( v > 5 ) {
                s = 2;
            }

            if( v > 9) {
                s = 3;
            }

            AddBattery(scene);
            batteryLayer.runAction(FadeIn(1));
            batteryLayer._s = s;
        }

        if( typeof(batteryLayer) !== 'undefined' )
            batteryLayer.setBatteryPower(v);

    }

    function onReceiveMessage(message) {
        
        if(log_received_message)
            console.log(message);
        
        var infoArray = message.split('|');
        
        if( infoArray[0] == "VAR" ) {
            dataManager.onDataMessage(infoArray);
            return;
        }
        else if( infoArray[0] == "DATA" ) {
            
            // here means the is oscilloscope message for oscilloscope message will has the infoArray.length equal to 1
            dataViewer.onDataMessage(infoArray[1]);
            return;
            
        }
        else if( infoArray[0] == "DATA_MARK" ) {
        
            dataViewer.onDataMarkMessage(infoArray[1]);
            return;
            
        }
        else if( infoArray[0] == "DATA_NAME" ) {
            
            dataViewer.onDataInfoMessage(infoArray);
            return;
            
        }
        else if( infoArray[0] == "LOG" ) {
            
            if( infoArray[1]=="I" ) {
                console.log("%c"+infoArray[2], "color:#66aa66");
            }
            else if( infoArray[1]=="E" ) {
                console.log("%c"+infoArray[2], "color:#aa6666");
            }
            else if(infoArray[1]=="ALERT") {
                QALayer.showDialog( infoArray[2], 3);
            }
            else if(infoArray[1]=="EVENT") {
                if( infoArray[2]== "FAILED_GYRO_STABLE" ) {
                    QALayer.showDialog( "请校准陀螺仪", 3);
                    sensorsLayer.onclose();
                }
            }

            return;
        }
        
        // no matched data header means the data is heartbeat message
        if( message != 'h' ) {
            onReceiveBatteryVotage(message);
        }
        
    }
    
    function CreateSenderQueue(scene) {

        // this queue is used to ignore too frequent messages
        senderQueue = {}

        senderQueue.senderStack = [];
        
        senderQueue.send = function(data) {
            senderQueue.senderStack.push(data);
        }

        senderQueue.heartBeatCounter = 0;

        var sendInterval = 0.05;
        var heartBeatTime = 3; 
        var maxHeartBeatCounterValue = heartBeatTime/sendInterval;

        function SendData()
        {
        	var data = senderQueue.senderStack.pop();
            if(data) {
                if(websocket.ready) {
                    websocket.send(data);
                }
                senderQueue.senderStack = [];
            } else if( senderQueue.heartBeatCounter++ > maxHeartBeatCounterValue) {
                senderQueue.heartBeatCounter = 0;
                if(websocket.ready) {
                    websocket.send('h');
                    console.log('send heart beat packet!');
                }
                else {
                    CreateWebSocket();
                } 
            }
        }

        scene.runAction(RepeatForever(Sequence([DelayTime(sendInterval), CallFunc(SendData)])));

        return senderQueue;
    }
    
    function CreateFilter( rate ) {
        
        var filter = {};
        filter._weightNew = rate;
        filter._weightOld = (1-rate);
        filter._last    = null;
        
        filter._initedgetoutput = function(newValue) {
           if(isNaN(newValue)) return this._last;
           this._last = newValue*this._weightNew + this._last*this._weightOld;
           return this._last;
        }
        
        filter.getoutput = function(newValue) {
            this.getoutput = this._initedgetoutput;
            this._last = newValue;
            return newValue;
        }
        
        return filter;
    }

    function AddIpConfigure(scene) {

        var label = createLabelDefaultStyle( DEVICE_IP, scene.width/2, 18);
        scene.addChild(label);
        label.setColor(ccc3( 108, 170, 255));
        label.setContentSize( CCSizeMake(scene.width, 32));
        label.setTextAlign("center");

        var inputLayer = CCLayer.create();
        inputLayer.setContentSize(CCSizeMake( scene.width, 32));
        inputLayer.setAnchorpoint( 0, 0);
        inputLayer.setPosition( 0, 0);
        inputLayer.setColor(ccc3(111,222,111));
        inputLayer.setVisible(false);

        label.setTouchEnabled(true);
        label.touchEnded = function( x, y)
        {
            label.setVisible(false);
            inputLayer.setVisible(true);
            scene.addChild(inputLayer);

            inputLayer.element.innerHTML = "<input id='name_input' placeholder='' style='text-align:center;width:100%;height:32px;background:Transparent;color:#ffffff;font-size:16;border:none;'></input>";

            function quit()
            {
                if(inputLayer.isVisible())
                {
                    label.setString(e.value);
                    label.setVisible(true);
                    
                    DEVICE_IP = e.value;
                    
                    CreateWebSocket();

                    inputLayer.setVisible(false);
                    inputLayer.removeFromParent();
                }
            }

            var e = document.getElementById('name_input');
            e.value =  label.getString();
            e.focus();
            
            e.onblur = function() {
                quit();
            };

            e.onkeypress =function() { 
                if( event.keyCode == 13 ) {
                    quit();
                }
            }

        }

    }
    
    function AddStartUpTip(scene) {
        
        var tipLabel = createLabelDefaultStyle( "请关闭自动锁屏并将设备锁定为竖屏", scene.width/2, scene.height/2);
        scene.addChild(tipLabel);
        tipLabel.setContentSize(CCSizeMake(scene.width,20));
        tipLabel.setColor("#ffffff");
        tipLabel.setTextAlign("center");
        tipLabel.setOpacity(0.0);
        
        tipLabel.runAction(Sequence([FadeTo(0.5,0.6),DelayTime(3),FadeOut(0.5),CallFunc(function(){
            tipLabel.removeFromParent();
        })]));
    }

    function VotageToPercent(votage) {
        
        var votages = [4.22, 4.15, 4.14, 4.12, 4.10, 4.08, 4.05, 4.03, 3.97, 3.93, 3.90, 3.87, 3.84, 3.81, 3.79, 3.77, 3.76, 3.76, 3.74, 3.73, 3.72, 3.71, 3.69, 3.66, 3.65, 3.64, 3.63, 3.61, 3.59, 3.58];
        var energyLeft = [100, 99, 97, 95, 92, 90, 87, 85, 80, 75, 70, 65, 60, 55, 50, 45, 42, 40, 35, 30, 25, 20, 15, 12, 10, 8, 5, 3, 1, 0];
        
        var index = votages.length - 1;
        for ( ; index >= 0; index--) {
            if( votages[index] > votage) break;
        };
        
        if( index >= (votages.length-1) ) {
            return 0;
        }
        
        if( index < 0 ) {
            return 100;
        }
        
        var vRange = votages[index] - votages[index+1];
        var vOff   = votages[index] - votage;
        
        var energyRange = energyLeft[index] - energyLeft[index+1];
        var energyOff   = energyRange * vOff/vRange;

        return energyLeft[index]-energyOff;
    }

    function AddBattery(scene) {

        batteryLayer = CCLayer.create();
        batteryLayer.setContentSize(CCSizeMake( 60, 32));
        batteryLayer.setAnchorpoint( 0, 0);
        batteryLayer.setPosition( 16, 42);
        batteryLayer.element.style.borderColor = "#eeeeee";
        batteryLayer.element.style.borderStyle = "solid";
        batteryLayer.element.style.borderRadius = "5px";
        scene.addChild(batteryLayer);

        var element1 = CCLayer.create();
        element1.setContentSize(CCSizeMake( 3, 10));
        element1.setAnchorpoint( 0, 0.8);
        element1.setPosition( batteryLayer.width, batteryLayer.height/2);
        element1.setColor("#eeeeee");
        element1.element.style.borderColor = "#eeeeee";
        element1.element.style.borderStyle = "solid";
        element1.element.style.borderRadius = "3px";
        batteryLayer.addChild(element1);

        var energyLayer = CCLayer.create();
        energyLayer.setContentSize(CCSizeMake( 60, 32));
        energyLayer.setAnchorpoint( 0, 0);
        energyLayer.setPosition( 0, 0);
        energyLayer.setColor(ccc3(88,255,88));
        energyLayer.setOpacity(0.6);
        batteryLayer.addChild(energyLayer);

        var powerFilter = CreateFilter(0.08);
        
        batteryLayer._powerPercent = 0;
        
        var lowPowerThreshold = 15;
        var lopoBatteryMaxVotage = 4.22;

        batteryLayer.setBatteryPower = function(v) {
            
            var percent = VotageToPercent(v/batteryLayer._s);

            var percentFiltered = powerFilter.getoutput(percent);
            
            if(percentFiltered>100) { percentFiltered = 100; }
            if(percentFiltered<0) { percentFiltered = 0;}
            
            if( percentFiltered < lowPowerThreshold ) {
                energyLayer.setColor(ccc3( 255, 0, 0));
            } else if( (v/batteryLayer._s) > lopoBatteryMaxVotage ) {
                energyLayer.setColor(ccc3(255,255,88));
            } else
            {
                energyLayer.setColor(ccc3(88,255,88));
            }
            
            energyLayer.setContentSize(CCSizeMake( 60*percentFiltered/100.0, 32));

            batteryLayer._heartbeatCounter = 0;
            
            batteryLayer._powerPercent = percentFiltered;
        }
        
        batteryLayer.getPowerByPercent = function() {
            return batteryLayer._powerPercent;
        }
        
        batteryLayer.isLowPower = function() {
            return batteryLayer._powerPercent < lowPowerThreshold;
        }

        batteryLayer.setOpacity(0);

        function EnableConnectionChecking() {

            batteryLayer._heartbeatCounter = 0;

            function CountHeartbeat() {
                
                if( ++batteryLayer._heartbeatCounter == 5 ) {
                    websocket.ready = false;
                    rainbow.runAction(FadeOut(1));
                    batteryLayer.runAction(FadeOut(1));
                    websocket.close();
                    batteryLayer._heartbeatCounter = 0;
                }
            }

            batteryLayer.runAction(RepeatForever(Sequence([DelayTime(1),CallFunc(function() {
                if(websocket.ready)
                    CountHeartbeat();
            })])));
        }

        EnableConnectionChecking();

        batteryLayer.destory = function () {
            if( typeof(batteryLayer) !== 'undefined' ) {
                batteryLayer.stopAllActions();
                batteryLayer.removeFromParent();
                batteryLayer = undefined;
            }
        }

        return batteryLayer;
    }
    
    function CreateSlider(onchange, minValue, maxValue, jumpValue) {
        
        jumpValue = jumpValue || (maxValue-minValue)*0.05;
        
        var slider = CCLayer.create();
        slider.setContentSize(CCSizeMake( 160, 30));
        slider.setColor("#1e5799");
        slider.setTouchEnabled(true);
        slider.element.style.borderRadius = "5px";
        
        var sliderBtnSize = 13;
        slider._floatValue = 0;
        slider._value = (maxValue-minValue)*slider._floatValue + minValue;
        
        slider.setValue = function(value) {
            slider._floatValue =  (value-minValue)*1.0/(maxValue-minValue);
            slider._value = value;
            slider._sliderButton.setPosition(sliderBtnSize/2+slider._floatValue*(slider.width-sliderBtnSize), slider.height/2);
        }
        
        slider.touchEnded = function( x, y) {
            
            if( x > sliderBtnSize/2 + (slider.width-sliderBtnSize)*slider._floatValue ) {
                slider._floatValue += jumpValue/(maxValue-minValue);
            } else if( x < sliderBtnSize/2 + (slider.width-sliderBtnSize)*slider._floatValue ) {
                slider._floatValue -= jumpValue/(maxValue-minValue);
            }
            
            if(slider._floatValue > 1 ) {
                slider._floatValue = 1;
                slider._value = maxValue;
            }
            
            if(slider._floatValue < 0 ) {
                slider._floatValue = 0;
                slider._value = minValue;
            }
            
            slider._sliderButton.setPosition(sliderBtnSize/2+slider._floatValue*(slider.width-sliderBtnSize), slider.height/2);
            slider._value = (maxValue-minValue)*slider._floatValue + minValue;
             
            onchange(slider._value);
        }
        
        var sliderTrack = CCLayer.create();
        sliderTrack.setContentSize(CCSizeMake( slider.width-sliderBtnSize, 1));
        sliderTrack.setPosition( (slider.width-sliderBtnSize)/2+sliderBtnSize/2, slider.height/2);
        sliderTrack.setColor("#ffffff");
        slider.addChild(sliderTrack);
                        
        var sliderButton = CCLayer.create();
        sliderButton.setContentSize(CCSizeMake( sliderBtnSize, sliderBtnSize));
        sliderButton.setPosition(sliderBtnSize/2+slider._floatValue*(slider.width-sliderBtnSize), slider.height/2);
        sliderButton.setColor("#ffffff");
        sliderButton.element.style.borderRadius = "6.5px";
        slider.addChild(sliderButton);
        slider._sliderButton = sliderButton;
        
        slider.addMark = function(value) {
            
            var floatValue =  (value-minValue)*1.0/(maxValue-minValue);
            
            var sliderMark = CCLayer.create();
            sliderMark.setContentSize(CCSizeMake( 1, 2));
            sliderMark.setColor("#ffffff");
            sliderMark.setPosition(sliderBtnSize/2+floatValue*(slider.width-sliderBtnSize), slider.height/2-2);
            slider.addChild(sliderMark);
            
            return sliderMark;
        }
        
        
        return slider;
    }
    
    var toolIconSize = 32;
    var toolIconIndex = 0;

    function CreateToolBarItem( scene, callback, toolItemIcon) {

		var toolButton = createButton( callback, toolItemIcon );

        scene.addChild(toolButton);
        toolButton.setScale(0.5);
        toolButton.index = toolIconIndex;
        toolButton.setPosition( toolIconSize*(toolButton.index*1.5+1), scene.height-toolIconSize);
        toolButton.setDepth(10);

        toolButton.layout = function( w, h) {
            toolButton.setPosition( toolIconSize*(toolButton.index*1.5+1), h-toolIconSize);
        }

        toolIconIndex++;

        return toolButton;
    }

    function AddSettingsLayer(scene) 
    {            
        settingsLayer = CCLayer.create();
        settingsLayer.setContentSize(CCSizeMake( scene.width-2*toolIconSize, scene.height-2*toolIconSize));
        settingsLayer.setAnchorpoint( 0, 1);
        settingsLayer.setPosition( toolIconSize*(++toolIconIndex), scene.height-toolIconSize);
        scene.addChild(settingsLayer);
        settingsLayer.setDepth(9);
        settingsLayer.setTouchEnabled(true);
        settingsLayer.element.style.overflow = "auto";
        settingsLayer.layout = function(w,h) {
            for (var i = 0; i < this.childs.length; i++) {
                if( typeof(this.childs[i].layout) === "function" ) {
                    this.childs[i].layout( w, h);
                }
            };
        }

        settingsLayer.setVisible(false);
        settingsLayerBg = CCLayer.create();
        settingsLayerBg.setContentSize(CCSizeMake( 0, 0));
        settingsLayerBg.setPosition( 0, settingsLayer.height);
        settingsLayerBg.element.style.borderRadius = "5px";
        scene.addChild(settingsLayerBg);
        settingsLayerBg.setOpacity(0.1);
        settingsLayerBg.setColor(ccc3( 255, 255, 255));
        settingsLayerBg.setDepth(8);

        var startV = 0;
        var endV   = 1;
        var settingsButton =
            createButton(
                function() {
                    // ignore touches when gear rotating 
                    if(settingsButton._runing) return;
                    settingsButton._runing = true;
                    
                    if( endV === 0 ) {
                        settingsLayer.setVisible( false );
                    }
                                
                    settingsLayer.runAction(
                        Sequence(
                            [ChangeValue( 0.4, startV, endV-startV, function(v) {
                                settingsLayerBg.setContentSize(CCSizeMake( settingsLayer.width*v, settingsLayer.height*v) );
                                settingsLayerBg.setPosition( toolIconSize+settingsLayer.width*v/2, toolIconSize+settingsLayer.height - settingsLayer.height*v/2);
                                settingsButton.setRotation(v*270);
                            }), CallFunc(function() {
                                
                                if( endV === 1 ) {
                                    settingsLayer.setOpacity(0.1);
                                    settingsLayer.setVisible(true);
                                    settingsLayer.runAction(FadeIn(0.2));
                                }
                                
                                var e = startV;
                                startV = endV;
                                endV   = e;
                                
                                settingsButton._runing = false;
                            })]
                        )
                    );
                },
                "settingsBtn.png"
            );
        settingsButton._runing = false;
        
        settingsLayerBg.layout = function(w,h) {
            
            settingsLayer.setContentSize(CCSizeMake( w-2*toolIconSize, h-2*toolIconSize));
            settingsLayer.setPosition( toolIconSize, h-toolIconSize);

            if( !settingsButton._runing ) {
                if( settingsLayer.isVisible() ) {
                    settingsLayerBg.setContentSize(CCSizeMake( settingsLayer.width, settingsLayer.height) );
                    settingsLayerBg.setPosition( toolIconSize+settingsLayer.width/2, toolIconSize+settingsLayer.height-settingsLayer.height/2);
                } else {
                    settingsLayerBg.setContentSize(CCSizeMake( 0, 0));
                    settingsLayerBg.setPosition( 0, h);
                }
            }
        };

        scene.addChild(settingsButton);
        settingsButton.setScale(0.5);
        settingsButton.setPosition( toolIconSize*toolIconIndex, scene.height-toolIconSize);
        settingsButton.setDepth(10);
        
        settingsButton.layout = function( w, h) {
            settingsButton.setPosition( toolIconSize, h-toolIconSize);
        }

    }
    


    function CreateDeviceButton(scene) 
    {        
        CreateToolBarItem( scene, function()
            {
                var profileCount = profiles.length;   
                var selectionOptions = [];

                for (var i = 0; i < profileCount; i++) {
                    selectionOptions.push(profiles[i].DEVICE_NAME);
                }
                
                QALayer.showDialog( "设备选择", selectionOptions, function(index) {
                    localStorage.ProfileIndex = index;
                    window.location.reload(false);
                });
            },
            "devicesBtn.png"
        );

        // var devicesButton =
        //     createButton(
        //         function()
        //         {
        //             var profileCount = profiles.length;   
        //             var selectionOptions = [];

        //             for (var i = 0; i < profileCount; i++) {
        //                 selectionOptions.push(profiles[i].DEVICE_NAME);
        //             }
                    
        //             QALayer.showDialog( "设备选择", selectionOptions, function(index) {
        //                 localStorage.ProfileIndex = index;
        //                 window.location.reload(false);
        //             });
        //         },
        //         "devicesBtn.png"
        //     );

        // scene.addChild(devicesButton);
        // devicesButton.setScale(0.5);
        // devicesButton.setPosition( toolIconSize*(toolIconIndex*1.5+1), scene.height-toolIconSize);
        // devicesButton.setDepth(10);

        // toolIconIndex++;
    }
    
    function CreateQADialog(scene) {

        var screenScale = 1;
    
        if( window.innerWidth < 375 ) {
            screenScale = window.innerWidth/375;
        }

        if( window.innerHeight > 812 ) {
            screenScale = window.innerHeight/812;
        }

        var lineHeight = parseInt(68*screenScale);

        QALayer = CCLayer.create();
        scene.addChild(QALayer);       
        QALayer.setDepth(15);
        QALayer.setVisible(false);
        QALayer.layout = function(w,h) {
            QALayer.setContentSize(CCSizeMake((scene.width), (scene.height)));
            QALayer.setPosition(scene.width/2, scene.height/2);
            for (var i = 0; i < QALayer.childs.length; i++) {
                if( typeof(QALayer.childs[i].layout) === "function" ) {
                    QALayer.childs[i].layout( QALayer.width, QALayer.height);
                }
            };
        }
        QALayer.layout( scene.width, scene.height);

        QALayer.useLightContentStyle = function() {
            QALayer.isLightContentStyle = true;
            questionLabel.setBgOpacity(0.1);
            questionLabel.setBgColor("#ffffff");
        }

        var questionLabel = createLabelDefaultStyle("", scene.width / 2, scene.height / 2 - lineHeight);
        QALayer.addChild(questionLabel);
        //questionLabel.setContentSize(CCSizeMake(scene.width, lineHeight - 1));
        questionLabel.setTextAlign("center");
        questionLabel.setFontSize( parseInt(28*screenScale) );
        questionLabel.setFontWeight("bold");

        if(QALayer.isLightContentStyle) {
            questionLabel.setBgOpacity(0.1);
            questionLabel.setBgColor("#ffffff");
        } else {
            questionLabel.setOpacity(0.8);
            questionLabel.setBgColor("#1e5799");
        }
        
        questionLabel.setColor("#FFFFFF");
        questionLabel.setVisible(false);
        questionLabel.setDepth(20);
        
        QALayer.showDialog = function ( questionText, selectionOptions, callback, callback1) {
            
            // callback will be callled when the dialog disapear after the animation finished
            // callback1 wiil be called just when user click a selection option

            function getBeginY()
            {
                var beginY = scene.height/2;

                if (typeof (selectionOptions) === "object") {
                    beginY = QALayer.height/2 - (selectionOptions.length * lineHeight) / 2;
                }

                return beginY;
            }

            questionLabel.setVisible(true);
            questionLabel.setString(questionText);

            QALayer.stopAllActions();
            QALayer.setVisible(true);

            if( typeof(questionLabel._answers) !== 'undefined' ) {
                for (var i = questionLabel._answers.length - 1; i >= 0; i--) {
                    questionLabel._answers[i].removeFromParent();
                }
            }

            var moveInDirection = 1;

            questionLabel.stopAllActions();
            questionLabel.setOpacity(0);
            questionLabel.runAction(FadeIn(0.6));
            questionLabel._answers = [];
            questionLabel.element.style["white-space"] = "nowrap";
            questionLabel.setFontSize( parseInt(28*screenScale) );

            questionLabel.layout = function(w,h) {
                var beginY = getBeginY();
                questionLabel.setContentSize(CCSizeMake(w, lineHeight-1));
                questionLabel.setPosition( w/2, beginY);
                questionLabel.adjustTextLength(questionLabel.width);
            }
            questionLabel.layout(QALayer.width, QALayer.height);

            function DefaultDisapearAnimation(index) {
                
                questionLabel.runAction(FadeOut(0.6));

                for (var i = 0; i < selectionOptions.length; ++i) {

                    var fadeAction = questionLabel._answers[i].fadeAction;
                    if( typeof(fadeAction) !=='undefined' ) {
                        questionLabel._answers[i].stopAction(fadeAction);
                    }

                    questionLabel._answers[i].touchEnded = null;

                    if (index != i) {
                        questionLabel._answers[i].runAction(Sequence([FadeOut(0.6), Remove()]));
                    } else {
                        questionLabel._answers[i].runAction(Sequence([FadeTo(0.6, 1), FadeOut(0.6), CallFunc(function () {
                            
                            QALayer.setVisible(false);

                            if (callback)
                                callback(index);

                        }), Remove()]));
                    }
                }
            }

            QALayer.__showRightAnswer = false;

            QALayer.onlyShowRightAnswer = function() {
                QALayer.__showRightAnswer = true;
            }

            function RightWrongDisapearAnimation(index, rightIndex) {
                
                var showResultTime = 0.2;
                var keepTime = index == rightIndex ? 1.0 : 3.0;
                var fadeOutTime = 0.5;

                questionLabel.runAction(Sequence([ DelayTime(keepTime+showResultTime), FadeOut(fadeOutTime)]));

                for (var i = 0; i < selectionOptions.length; ++i) {

                    var fadeAction = questionLabel._answers[i].fadeAction;
                    if( typeof(fadeAction) !=='undefined' ) {
                        questionLabel._answers[i].stopAction(fadeAction);
                    }

                    questionLabel._answers[i].touchEnded = null;

                    if ( i == index && index != rightIndex && !(QALayer.__showRightAnswer) ) {

                        // touched index not correct answer then show the wrong anamation
                        var wrongAnimation = Spawn([ TintTo( showResultTime, "#aa1e1e", true) , FadeTo( showResultTime, 0.9, true)]); //
                        questionLabel._answers[i].runAction(Sequence([ wrongAnimation, DelayTime(keepTime),FadeOut(fadeOutTime), Remove()]));
                        
                    } else if( i == rightIndex ) {

                        // high light the right answer
                        var rightAnimation = Spawn([ TintTo( showResultTime, "#1eaa1e", true), FadeTo( showResultTime, 0.9, true)]); //
                        questionLabel._answers[i].runAction(Sequence([ rightAnimation, DelayTime(keepTime), FadeOut(fadeOutTime), CallFunc(function () {
                        
                            QALayer.setVisible(false);

                            if (callback)
                                callback(index);
                        
                        }), Remove()]));

                    } else {
                        questionLabel._answers[i].runAction(Sequence([ DelayTime(keepTime+showResultTime), FadeOut(fadeOutTime), Remove()]));
                    }
                }
            }

            function onSelect(index) {

                var rightIndex = null;

                if(callback1)
                    rightIndex = callback1(index);

                if( rightIndex != null )
                    RightWrongDisapearAnimation( index, rightIndex);
                else
                    DefaultDisapearAnimation(index);

                QALayer.__showRightAnswer = false;
            }

            if (typeof (selectionOptions) === "object" && selectionOptions.length > 0) {

                for (var i = 0; i < selectionOptions.length; ++i) {

                    moveInDirection *= -1;

                    var answerLabel = createLabelDefaultStyle( selectionOptions[i], QALayer.width / 2, 0);

                    QALayer.addChild(answerLabel);

                    answerLabel.setContentSize(CCSizeMake(QALayer.width, lineHeight - 1));
                    answerLabel.setTextAlign("center");

                    if (QALayer.isLightContentStyle) {
                        answerLabel.setBgOpacity(0.1);
                        answerLabel.setBgColor("#ffffff");
                    } else {
                        answerLabel.setOpacity(0.8);
                        answerLabel.setBgColor("#1e5799");
                    }

                    answerLabel.setColor("#FFFFFF");
                    answerLabel.setDepth(20);
                    answerLabel.setFontSize( parseInt(23*screenScale) );
                    answerLabel.setFontWeight("bold");
                    answerLabel.setContentSize(CCSizeMake(QALayer.width, lineHeight - 1));
                    answerLabel.setPosition(scene.width / 2 - moveInDirection * scene.width, getBeginY() + lineHeight * (i + 1));
                    answerLabel.runAction(Sequence([DelayTime(1 + i * 0.3), Ease(ease.easeOutBack, MoveBy(0.6, moveInDirection * scene.width, 0))]));
                    answerLabel.adjustTextLength(answerLabel.width);

                    answerLabel.layout = function( w, h) {
                        var beginY = getBeginY();
                        this.setContentSize(CCSizeMake(w, lineHeight - 1));
                        this.setPosition( w/2, beginY + lineHeight * (this._index + 1));
                        this.adjustTextLength(this.width);
                    }
                    
                    if(!QALayer.isLightContentStyle) {
                        var fadeAction = RepeatForever(Sequence([DelayTime(i * 0.4), FadeIn(0.2, 1), FadeTo(0.4, 0.6), DelayTime(2 - i * 0.4)]));
                        answerLabel.fadeAction = fadeAction;
                        answerLabel.runAction(fadeAction);
                    }
                    
                    answerLabel._index = i;
                    answerLabel.setTouchEnabled(true);
                    answerLabel.touchEnded = function (x, y) {
                        onSelect(this._index);
                    }
                    questionLabel._answers.push(answerLabel);
                }
            }

            var need_disapear = false;
            var disapear_time = 2;

            if ((!selectionOptions)) {
                need_disapear = true;
            }

            if ( typeof (selectionOptions) === "number" && selectionOptions > 0 ) {
                disapear_time = selectionOptions;
                need_disapear = true;
            }

            QALayer.disapear = function() {
                questionLabel.runAction(Sequence([FadeOut(0.6), Hide()]));
            }
            
            if (need_disapear) {
                questionLabel.runAction(Sequence([DelayTime(disapear_time), FadeOut(0.6), Hide(), CallFunc(function () {
                    QALayer.setVisible(false);
                    if (typeof (callback) === "function") {
                        callback();
                    }
                })]));
            }

        }

        return QALayer;
    }
    
    function _Hide() {
        var obj = TimeAction(0);
        function step(p) {
            obj.target.setOpacity(0.01);
        }
        obj.step  = step;
        return obj;
    }
    
    function _Show() {
        var obj = TimeAction(0);
        function step(p) {
            obj.target.setOpacity(1);
        }
        obj.step  = step;
        return obj;
    }
    
    function AddDataViewer(scene) {
        
        var dataColors = [];
        
        function createOscilloscopeLayer() {
            
            var oscilloscopeLayer = CCLayer.create();
            oscilloscopeLayer.setContentSize( CCSizeMake( scene.width, scene.height));
            oscilloscopeLayer.setAnchorpoint( 0, 0);
            oscilloscopeLayer.setPosition( 0, 0);
            scene.addChild(oscilloscopeLayer);
                            
            var canvas = document.querySelector('canvas');
            if (!canvas) {
                canvas = document.createElement('canvas');
                oscilloscopeLayer.element.appendChild(canvas);
            }
            canvas.width  = oscilloscopeLayer.width;
            canvas.height = oscilloscopeLayer.height;
            var drawContext = canvas.getContext('2d');
            
            oscilloscopeLayer.drawContext = drawContext;
            
            var zeroYPos = canvas.height/2;
            
            var lastValues = [];
            
            var t = 0;
            
            oscilloscopeLayer.displayMessage = function(message) {
                drawContext.clearRect( 0, 0, canvas.width, 36);
                drawContext.fillStyle="#eeeeee";
                drawContext.fillText( message, 20, 20);
            }
            
            function drawAxis() {
                drawContext.beginPath();
                drawContext.moveTo( 0,   zeroYPos);
                drawContext.lineTo(  oscilloscopeLayer.width, zeroYPos);
                drawContext.lineWidth = 1;
                drawContext.strokeStyle = "#eeeeee";
                drawContext.stroke();
            }
            
            drawAxis();
            
            oscilloscopeLayer.layout = function(w,h) {
                
                oscilloscopeLayer.setContentSize( CCSizeMake( w, h));
                
                zeroYPos = canvas.height/2;

                canvas.width  = oscilloscopeLayer.width;
                canvas.height = oscilloscopeLayer.height;
                
                drawAxis();
            }

            oscilloscopeLayer.onDatas = function( dataArray ) {
                
                while( lastValues.length < dataArray.length ) {
                    lastValues.push(parseInt(dataArray[lastValues.length]));
                }
                
                for (var i = 0; i < dataArray.length; i++) {

                    var value = parseInt(dataArray[i]);
                    
                    drawContext.beginPath();
                    
                    if(t>0)
                        drawContext.moveTo( t-1, zeroYPos - lastValues[i]);
                    else
                        drawContext.moveTo( 0,   zeroYPos - lastValues[i]);
                    
                    lastValues[i] = value;
                    
                    drawContext.lineTo( t, zeroYPos - value );
                    
                    drawContext.lineWidth = 1;
                    drawContext.strokeStyle = dataColors[i];
                    drawContext.stroke();
                }
                
                if( ++t > canvas.width ) {
                    t = 0;
                    drawContext.clearRect( 0, 0, canvas.width, canvas.height);
                    drawAxis();
                }
                
            }
            
            return oscilloscopeLayer;
        }
        

        function CreateSwitchControl(callback)
        {
           var switchControl = CCLayer.create();
           switchControl.setContentSize(CCSizeMake(36,23));
           //switchControl.setColor("#aa0000");
           switchControl.element.innerHTML = "<input type='checkbox' id=\""+switchControl.id+":data_on\" class=\"mui-switch mui-switch-animbg\" style=\"margin-left:-8px;margin-top:-4px;\"  />";

            var e = document.getElementById(""+switchControl.id+":data_on");
            if(e)
            {
                e.onclick = function()
                {
                    switchControl.checked = this.checked;
                    callback(switchControl);
                }
            }

            switchControl.setChecked = function(checked){
                e.checked = checked;
                switchControl.checked = checked;
                callback(switchControl);
            }

           return switchControl;
        }

        function createDataIndexLayer() {
            
            var indexCells = [];
            var animateDuration = 0.2;
            var banner_height = 22;
            var hideIcon = false;

            var dataIndexLayer = CCScrollLayer.create();
            dataIndexLayer.setAnchorpoint( 1, 0);
            scene.addChild(dataIndexLayer);
            dataIndexLayer.setVisible(false);
            dataIndexLayer.isShow = false;

            dataIndexLayer.layout = function(w,h)
            {
                dataIndexLayer.setContentSize( CCSizeMake( 200, scene.height));
                dataIndexLayer.setContentHeight(42+indexCells.length*62);

                if(dataIndexLayer.isShow)
                    dataIndexLayer.setPosition( w, 0);
                else
                    dataIndexLayer.setPosition( w+dataIndexLayer.width-banner_height, 0);
            }
            dataIndexLayer.layout( scene.width, scene.height);

            if(dataIndexLayer.isShow)
                dataIndexLayer.setBgOpacity(0.1);
            else
                dataIndexLayer.setBgOpacity(0);

            dataIndexLayer.setColor("#ffffff");

            var topLabel = CCLabel.create("");
            topLabel.setBgColor("#00aaff");
            dataIndexLayer.addChild(topLabel);
            topLabel.setAnchorpoint( 0, 0);
            topLabel.setPosition(0, 0); //scrollView.contentHeight);
            topLabel.setColor("ffffff");
            topLabel.setTextAlign("center");
            topLabel.setDepth(2);

            var showIcon = null;
            var hideIcon = null;

            dataIndexLayer.show = function()
            {
                dataIndexLayer.runAction( MoveTo( animateDuration, scene.width, 0) );
                showIcon.setVisible(false);
                hideIcon.setVisible(true);
                dataIndexLayer.setBgOpacity(0.1);
                dataIndexLayer.isShow = true;
            }

            showIcon = createButton( dataIndexLayer.show, "show.png");
            topLabel.addChild(showIcon);
            showIcon.setScale(banner_height/64.0*0.618);
            showIcon.setAnchorpoint( 0.5, 0.5);
            showIcon.setPosition( banner_height/2, banner_height/2);
            if(dataIndexLayer.isShow) showIcon.setVisible(false);

            dataIndexLayer.hide = function()
            {
                var moveAction = MoveTo( animateDuration, scene.width+dataIndexLayer.width-banner_height, 0);
                dataIndexLayer.runAction(Sequence([ moveAction, CallFunc(function(){
                    dataIndexLayer.setBgOpacity(0);
                })]));
                hideIcon.setVisible(false);
                showIcon.setVisible(true);
                dataIndexLayer.isShow = false;
            }

            hideIcon = createButton( dataIndexLayer.hide, "hide.png");
            topLabel.addChild(hideIcon);
            hideIcon.setScale(banner_height/64.0*0.618);
            hideIcon.setAnchorpoint( 0.5, 0.5);
            hideIcon.setPosition( banner_height/2, banner_height/2);
            if(!dataIndexLayer.isShow) hideIcon.setVisible(false);

            (topLabel.layout = function(w,h) {
                topLabel.setContentSize(CCSizeMake(dataIndexLayer.width,banner_height));
            })( dataIndexLayer.width, dataIndexLayer.contentHeight);
            
            dataIndexLayer.onScroll = function(offset)
            {
                topLabel.setPosition(0,offset);
            }
            
            dataIndexLayer.addDataIndex = function( dataIndex, dataName) {
                
                var indexCell = CCLayer.create();
                var margin = 5;

                indexCell.index = parseInt(dataIndex);
                dataColors[indexCell.index] = '#'+Math.floor(Math.random()*0xffffff).toString(16);                
                
                dataIndexLayer.addChild(indexCell);
                indexCells.push(indexCell);

                indexCell.setContentSize( CCSizeMake( 150, 30));
                indexCell.setAnchorpoint( 0.5, 0);
                indexCell.setPosition( dataIndexLayer.width/2, 42+indexCell.index*62);
                indexCell.setColor(dataColors[indexCell.index]);

                dataIndexLayer.setContentHeight(42+indexCell.index*62+23+42);

                var switchControl = CreateSwitchControl(function(theSwitchControl) {
                    if( !theSwitchControl.checked )
                    {
                        dataColors[theSwitchControl.index] = 'transparent';
                    } else {
                        dataColors[theSwitchControl.index] = '#'+Math.floor(Math.random()*0xffffff).toString(16);
                        indexCells[theSwitchControl.index].setColor(dataColors[theSwitchControl.index]);
                    }
                });

                switchControl.setAnchorpoint( 0, 0.5);
                switchControl.setPosition(3,indexCell.height/2);
                switchControl.index = indexCell.index;
                indexCell.switchControl = switchControl;
                switchControl.setChecked(true);

                var indexLabel = CCLabel.create(dataName);
                indexLabel.setAnchorpoint(0,0);
                indexLabel.setPosition(switchControl.width+margin*2,0);
                indexLabel.setContentSize(CCSizeMake(indexCell.width-switchControl.width-margin*2, indexCell.height));
                indexLabel.index = indexCell.index;

                indexCell.addChild(indexLabel);
                indexCell.addChild(switchControl);

                indexCell.element.style.borderStyle = "solid";
                indexCell.element.style.borderWidth = "1px";
                indexCell.element.style.borderRadius = "2px";
                
                indexLabel.setTouchEnabled(true);

                indexLabel.touchEnded = function(x,y) 
                {
                    if(x > indexCell.width || x < 0 || y > indexCell.height || y < 0 ) {
                        indexLabel.touchCanceled();
                    } else {
                        indexCells[this.index].switchControl.setChecked(true);
                    }
                };
                
                indexLabel.touchCanceled = function() {
                    indexCells[this.index].switchControl.setChecked(false);
                };
            }
            
            dataIndexLayer.setMark = function(dataMark) {
                
                //clear
                dataColors.length = 0;
                
                //set mark
                for( var i=0; i<indexCells.length; ++i) {
                    indexCells[i].removeFromParent();
                    indexCells[i] = null;
                }
                
                topLabel.setString(dataMark);                

                indexCells.length = 0;

                if(!dataIndexLayer.isVisible())
                    dataIndexLayer.setVisible(true);

                if(!dataIndexLayer.isShow)
                    this.show();
            }
            
            return dataIndexLayer;
        }
        
        var viewer = {};
        
        var oscilloscopeLayer = createOscilloscopeLayer();
        
        var dataIndexLayer    = createDataIndexLayer();
        
        var currentDataMark = "null";

        viewer.onDataMessage = function( message ) {

            oscilloscopeLayer.displayMessage(message);

            var datas = message.split(',');
            oscilloscopeLayer.onDatas(datas);

            if( currentDataMark == "控制数据" && typeof(stllayer) !== "undefined" ) {
                stllayer.setMeshRotation( datas[1], datas[2], datas[3]);
            }
        }
        
        viewer.onDataMarkMessage = function(dataMark) {
            dataIndexLayer.setMark(dataMark);
            currentDataMark = dataMark;
        }
        
        viewer.onDataInfoMessage = function(infoArray) {
            dataIndexLayer.addDataIndex( infoArray[1], infoArray[2]);
        }
            
        return viewer;
    }
    
    function createEditableLabel( parent, value, pos, size, change_callback)  {
        
        var label = createLabelDefaultStyle( value, pos.x, pos.y);
        parent.addChild(label);
        label.setColor("#eeeeee");
        label.setContentSize( size );
        label.setTextAlign("center");
        label.setAnchorpoint( 0, 0);
        label.setPosition( pos.x, pos.y);

        var inputLayer = CCLayer.create();
        inputLayer.setContentSize(size);
        inputLayer.setAnchorpoint( 0, 0);
        inputLayer.setPosition( pos.x, pos.y);
        inputLayer.setColor(ccc3( 111, 222, 111));
        inputLayer.setVisible(false);
        
        label.setTouchEnabled(true);
        label._id = Math.random()*0xffffff;
        
        label.touchEnded = function( x, y)
        {
            label.setVisible(false);
            inputLayer.setVisible(true);
            parent.addChild(inputLayer);
            
            inputLayer.element.innerHTML = "<input id='" + this._id + "' placeholder='' style='text-align:center;width:100%;height:" + size.height + "px;background:Transparent;color:#ffffff;font-size:16;border:none;'></input>";
            
            function quit()
            {
                if(inputLayer.isVisible())
                {
                    if( label.getString() != e.value ) {
                        label.setString(e.value);
                        change_callback(e.value);
                    }
                    
                    label.setVisible(true);
                    inputLayer.setVisible(false);
                    inputLayer.removeFromParent();
                }
            }
            
            var e = document.getElementById(this._id);
            e.value =  label.getString();
            e.focus();
            
            e.onblur = function() {
                quit();
            };
            
            e.onkeypress =function() { 
                if( event.keyCode == 13 ) {
                    quit();
                }
            }
            
        }
        
        return label;
    }
    
    function onUpdateVar( var_name, var_value)
    {   
        if( var_name in sensorsLayer.dict ) {
            console.log("%c"+var_name + ":" + var_value, "color:#aa6666");
            if( var_value === "1" )
                sensorsLayer.onReady(var_name);
        }

        if( var_name === "控制数据" && typeof(stllayer) !== "undefined" )
        {
            if( parseInt(var_value) === 1 )
            {
                stllayer.show();
            } else {
                stllayer.hide();
            }
        }
    }

    function AddDataManager(scene) {
        
        var dataManager = {}
        
        dataManager.filters = {};
        dataManager.dict = {};
        
        dataManager.filtersEnabled = false;
                        
        var command_map = {};
        
        dataManager.command_map = command_map;
        
        var index = 0;

        function createDataCell( var_name, var_type, var_value) {
                
            var ui_width  = 168;
            var ui_height = 48;
            var ui_gap    = 10;
            
            var command_ui = CCLayer.create();
            command_ui.setContentSize( CCSizeMake( ui_width, ui_height));
            command_ui.setAnchorpoint( 0, 0);
            command_ui.index = index++;
            command_ui.setColor("#1e5799");
            command_ui.element.style.borderColor = "#eeeeee";
            command_ui.element.style.borderStyle = "solid";
            command_ui.element.style.borderRadius = "5px";
            command_ui.element.innerHTML = "<center>" + ( typeof(dataManager.dict[var_name]) === "undefined" ? var_name : dataManager.dict[var_name] ) + "</center>";
            command_ui.element.style.overflow = "hidden";
            
            command_ui.layout = function(w,h) 
            {
                var beginX    = ( settingsLayer.width - parseInt( settingsLayer.width/(ui_width+ui_gap) )*(ui_width+ui_gap) + ui_gap )/2;
                var beginY    = 32;
                var hSpace = settingsLayer.width - beginX*2;
                var hCount = parseInt((hSpace+ui_gap)/(ui_width+ui_gap));
                var posI = command_ui.index%hCount;
                var posJ = parseInt(command_ui.index/hCount);
                command_ui.setPosition( beginX + (command_ui.index%hCount)*(ui_width+ui_gap), beginY + posJ*(ui_height+ui_gap) );
            }
            
            command_ui.layout(settingsLayer.width,settingsLayer.height);

            settingsLayer.addChild(command_ui);
            
            if( var_value || var_type === "STRING" ) {
                
                if( var_type === "BOOL" ) {
                    
                    var onOffInput     = document.createElement('input');
                    
                    if(var_name.endsWith("_ERROR"))
                        onOffInput.setAttribute('class', "mui-switch-error mui-switch-error-animbg");
                    else
                        onOffInput.setAttribute('class', "mui-switch mui-switch-animbg");
                    
                    onOffInput.type    = "checkbox";
                    onOffInput.checked   = var_value === "0" ? false : true;
                    onOffInput.style = "margin-top:-4px; position:absolute;left:" + parseInt(ui_width/2-25) + "px";
                    onOffInput.onclick = function() {
                        if(websocket.ready) {
                            if( this.checked )
                                websocket.send( var_name + "#1");
                            else
                                websocket.send( var_name + "#0");
                        } else {
                            alert("network not ready!");
                        }
                    }
                    
                    if( Sys.isIOS ) {
                        
                        command_ui.setTouchEnabled(true);
                        
                        command_ui.touchEnded = function( x, y) {
                            onOffInput.checked   = !onOffInput.checked;
                            onOffInput.onclick();
                        }
                    }
                    
                    command_ui.element.appendChild(onOffInput);
                    
                    command_ui.updateData = function( value ) {
                        onOffInput.checked   = value === "0" ? false : true;
                    }
                    
                    command_ui.getData = function() {
                        return onOffInput.checked;
                    }
                    
                } else { // INT, FLOAT, STRING
                    
                    var label = createEditableLabel( command_ui, var_value ? var_value : "", ccp( 0, ui_height/2), CCSizeMake( ui_width, ui_height/2.0), function(value) {
                        
                        if(websocket.ready)
                            websocket.send( var_name + "#" + label.getString() );
                        else
                            alert("network not ready!");
                    });
                    
                    command_ui.updateData = function( value ) {
                        label.setString(value);
                    }
                    
                    command_ui.getData = function() {
                        return label.getString();
                    }
                }
            }
            else if( var_type === "FUNCTION" ) {
                
                command_ui.element.innerHTML = "";
                command_ui.paremeterLabel = createEditableLabel( command_ui, var_value, ccp( 0, ui_height/2), CCSizeMake( ui_width, ui_height/2.0), function(value) {
                });
                command_ui.paremeterLabel.setBgColor("#2f69aa");
                
                if( var_name ==="U" || var_name === "更新固件" ) {
                    
                    command_ui.paremeterLabel.setString("http://192.168.4.2/firmware.d1_mini.bin");
                    
                    getIPs(function(ip){
                           command_ui.paremeterLabel.setString("http://"+ip+"/firmware.d1_mini.bin");
                           });
                }
                
                var label = createLabelDefaultStyle( var_name, 0, 0);
                command_ui.addChild(label);
                label.setColor("#eeeeee");
                label.setContentSize(  CCSizeMake( ui_width, ui_height/2.0) );
                label.setTextAlign("center");
                label.setAnchorpoint( 0, 0);
                label.setPosition( 0, 0);

                label.setTouchEnabled(true);
                
                label.touchBegin = function( x, y) {
                    command_ui.setColor("#00aa00");
                    command_ui.element.style.borderColor = "#eeeeee";
                }
                
                label.touchEnded = function( x, y) {
                    if(websocket.ready) {
                        if( command_ui.paremeterLabel.getString() !== "" ) {
                            var sendString =  var_name + '#' + command_ui.paremeterLabel.getString();
                            console.log(sendString);
                            websocket.send(sendString);
                        } else {
                            alert("paremeter is empty!");
                        }
                    } else {
                        alert("network not ready!");
                    }
                    command_ui.setColor("#1e5799");
                    command_ui.element.style.borderColor = "#eeeeee";
                }
                
                label.touchCanceled = function( x, y) {
                    command_ui.setColor("#1e5799");
                    command_ui.element.style.borderColor = "#eeeeee";
                }
                
            } else if( var_type === "VOID_FUNCTION") {
                
                command_ui.element.innerHTML = "";
                
                var label = createLabelDefaultStyle( var_name, 0, 0);
                command_ui.addChild(label);
                label.setColor("#eeeeee");
                label.setContentSize( CCSizeMake( ui_width, ui_height/2.0) );
                label.setTextAlign("center");
                label.setAnchorpoint( 0, 0);
                label.setPosition( 0, ui_height/4.0);
                
                command_ui.setTouchEnabled(true);

                command_ui.touchBegin = function( x, y) {
                    command_ui.setColor("#00aa00");
                    command_ui.element.style.borderColor = "#eeeeee";
                }
                
                command_ui.touchEnded = function( x, y) {
                    if(websocket.ready) {
                        websocket.send(var_name);
                        if( var_name === "启动" ) {
                            sensorsLayer.onopen();
                        }
                    } else {
                        alert("network not ready!");
                    }
                    command_ui.setColor("#1e5799");
                    command_ui.element.style.borderColor = "#eeeeee";
                }
                
                command_ui.touchCanceled = function( x, y) {
                    command_ui.setColor("#1e5799");
                    command_ui.element.style.borderColor = "#eeeeee";
                }
            }
            
            return command_ui;
        }
        
        dataManager.onDataMessage = function(infoArray) {
            
            var var_name   = infoArray[2];
            var var_type   = infoArray[1];
            var var_value  = null;
            
            switch(var_type) {
                case "BOOL": case "INT": case "FLOAT": case "STRING":
                    var varInfo = var_name.split('#');
                    var_name = varInfo[0];
                    var_value    = varInfo[1];
                    break;
                case "FUNCTION":
                case "VOID_FUNCTION":
                    break;
            }
            
            onUpdateVar( var_name, var_value);
            
            if( dataManager.filtersEnabled == true && typeof(dataManager.filters[var_name]) === "undefined"  && dataManager.filters[var_name] !== true ) return;
            
            if( typeof(command_map[var_name]) === 'undefined' ) {
                var command_ui = createDataCell( var_name, var_type, var_value);
                command_map[var_name] = command_ui;
            } else {
                // found the command
                if( typeof(command_map[var_name].updateData) !== "undefined")
                    command_map[var_name].updateData(var_value);
            }

        }
        
        return dataManager;
    }
    
    function CreateKeyboardController() 
    {
        var keyMap = {};

        function C( c ) {
             return ( c.charCodeAt(0) - 'a'.charCodeAt(0) ) + 65; 
        }

        function OnKeyDown(evt) 
        {
            evt = (evt) ? evt : window.event;
            
            keyCode = evt.keyCode;

            if( typeof(keyMap[keyCode]) !== 'undefined' ) {
                if( !keyMap[keyCode].isDown ) {
                    keyMap[keyCode].isDown = true;
                    keyMap[keyCode].callback( keyCode, true);
                }
            }
        }
        
        function OnKeyUp(evt) 
        {   
            evt = (evt) ? evt : window.event;
            
            keyCode = evt.keyCode;

            if( typeof(keyMap[keyCode]) !== 'undefined' ) {
                keyMap[keyCode].isDown = false;
                keyMap[keyCode].callback( keyCode, false);
            }
        }
        
        function bindKey( keyCode, callback) 
        {
            keyMap[keyCode] = {};
            keyMap[keyCode].callback = callback;
            keyMap[keyCode].isDown   = false;
        }

        function bindChar( keyChar, callback)
        {
            var keyCode = C(keyChar);
            bindKey( keyCode, callback);
        }

        document.onkeydown = OnKeyDown;
        document.onkeyup = OnKeyUp;

        keyMap.bindKey  = bindKey;
        keyMap.bindChar = bindChar;

        return keyMap;
    }
    
    function CreateSensorsLayer( scene )
    {
        var sensors = [{ "image":"gyroscope-icon.png", "var_name":"GYRO_STABLE"}];
        var sensor_dict = {};
        var size = CCSizeMake( 300, 186);
        
        sensorsLayer = CCLayer.create();
        sensorsLayer.setContentSize(size);
        sensorsLayer.setColor(ccc3( 255, 255, 255));
        sensorsLayer.setBgOpacity(0.2);
        sensorsLayer.setVisible(false);
        scene.addChild(sensorsLayer);
        
        sensorsLayer.layout = function(w,h)
        {
            sensorsLayer.setPosition( scene.width/2, scene.height/2);
        }
        sensorsLayer.layout(scene.width,scene.height);
        
        var iconDistance = 80;
        var startX = size.width/2 - (sensors.length-1)*(iconDistance/2);
        
        sensorsLayer.icons = [];
                                                  
        for(var i=0; i<sensors.length; i++) {
            sensor_dict[sensors[i].var_name] = true;
            var icon = CCSprite.create(sensors[i].image);
            icon.setScale(0.5);
            icon.setOpacity(0.5);
            sensorsLayer.addChild(icon);
            icon.setPosition( startX+iconDistance*i, size.height/2);
            sensorsLayer.icons.push(icon);
        }
        
        sensorsLayer.dict = sensor_dict;
        
        sensorsLayer.onopen = function() {
            sensorsLayer.setVisible(true);
            for(var i=0; i<sensorsLayer.icons.length; i++) {
                 var breathEffect = RepeatForever(Sequence([FadeTo(0.6, 0.5), FadeTo(0.6, 1.0)]));
                 sensorsLayer.icons[i].runAction(breathEffect);
                 sensorsLayer.icons[i].ready =false;
            }
        }
        
        sensorsLayer.onclose = function() {

            for(var i=0; i<sensorsLayer.icons.length; i++) {
                 sensorsLayer.icons[i].stopAllActions();
                sensorsLayer.icons[i].setOpacity(1);
                 sensorsLayer.icons[i].ready =false;
            }

            sensorsLayer.setVisible(false);
        }

        sensorsLayer.onReady = function(var_name)
        {
            for(var i=0; i<sensors.length; i++) {
                if( sensors[i].var_name === var_name ) {
                    sensorsLayer.icons[i].stopAllActions();
                    sensorsLayer.icons[i].setOpacity(1);
                    sensorsLayer.icons[i].ready = true;
                }
            }
            var allready = true;
            
            for(var i=0; i<sensors.length; i++) {
                if( sensorsLayer.icons[i].ready === false ) {
                     allready = false;
                     break;
                }
            }
            
            if( allready ) {
                 sensorsLayer.runAction(Sequence([DelayTime(3.0), Hide()]));
            }
        }
    }

    function CreatePosViewer(scene)
    {
        stllayer = CreateSTLViewerLayer('model/QuadCopter.stl');
        scene.addChild(stllayer);
        stllayer.setDepth(0);

        stllayer.setTouchEnabled(true);

        stllayer.touchBegin = function( x, y) {
            stllayer.beginTouchX = x;
            stllayer.beginTouchY = y;
        };

        stllayer.touchMoved = function( x, y) {
            var dx = x - stllayer.beginTouchX;
            var dy = y - stllayer.beginTouchY;

            stllayer.setPosition(stllayer.x+dx,stllayer.y+dy);
        };

        stllayer.touchEnded = function ( x, y) {

            var dx = x - stllayer.beginTouchX;
            var dy = y - stllayer.beginTouchY;

            stllayer.setPosition(stllayer.x+dx,stllayer.y+dy);

            stllayer.beginTouchX = -1;
            stllayer.beginTouchY = -1;
        };

        stllayer.hide  = function() {
            stllayer.setVisible(false);
            stllayer.stopAnimation();
        };

        var closeBtn =  createButton( stllayer.hide, "close.png");
        stllayer.addChild(closeBtn);
        closeBtn.setScale(0.3);
        closeBtn.setPosition(stllayer.width,0);

        stllayer.show = function() {
            stllayer.setVisible(true);
            stllayer.startAnimation();
        };

        stllayer.hide();

        CreateToolBarItem( scene, stllayer.show, "stateView.png");
    }

    function init() {
        
        scene = CreateScene();
        
        AddRainbow(scene);
        CreateWebSocket();
        
        CreateSenderQueue(scene);
        
        AddSettingsLayer(scene);
        CreateDeviceButton(scene);
        CreateQADialog(scene);
        CreateSensorsLayer(scene);
                                  
        dataViewer  = AddDataViewer(scene);
        dataManager = AddDataManager(scene);

        if(DICT_ENABLED) {
            dataManager.dict = DICT;
        }
        
        dataManager.filtersEnabled = FILTERS_ENABLED;
        dataManager.filters = FILTERS;

        var keyController = CreateKeyboardController();
        
        keyController.bindChar('m', function(keyCode,isDown) {
            if( isDown ) {
                websocket.send("MOTORS_ON#1");
            } else {
                websocket.send("MOTORS_ON#0");
            }
        });

        CreatePosViewer(scene);
    }
    
    init();
    
    var obj = new Object();
    obj.show = function() {
        scene.setVisible(true);
        scene.runAction(Sequence([DelayTime(1.5), CallFunc(function(){
        })]))
    }
    
    obj._scene = scene;

    return obj;
}

function createProcessBar()
{
    var processLayer = CCLayer.create();

    processLayer.__percent = 0;
    processLayer.__width  = 80;
    processLayer.__height = 16;

    processLayer.__setContentSize = processLayer.setContentSize;
    processLayer.__setContentSize(CCSizeMake( processLayer.__width, processLayer.__height));

    var processLayerBg = CCLayer.create();
    processLayer.addChild(processLayerBg);
    processLayerBg.setContentSize(CCSizeMake( processLayer.__width, processLayer.__height));
    processLayerBg.setColor("#ffffff");
    processLayerBg.setOpacity(0.1);
    processLayerBg.setAnchorpoint( 0, 0);
    processLayerBg.setPosition( 0, 0);

    var finishedLayer = CCLayer.create();
    finishedLayer.setContentSize(CCSizeMake( processLayer.__width, processLayer.__height));
    finishedLayer.setAnchorpoint( 0, 0);
    finishedLayer.setPosition( 0, 0);
    finishedLayer.setColor(ccc3(88,255,88));
    finishedLayer.setOpacity(0.6);
    processLayer.addChild(finishedLayer);
    
    processLayer.__percent = 0;
    processLayer._w = 60;            

    processLayer.setContentSize = function(size) {
        
        processLayer.__width  = size.width;
        processLayer.__height = size.height;

        processLayer.__setContentSize(CCSizeMake( processLayer.__width, processLayer.__height));
        processLayerBg.setContentSize(CCSizeMake( processLayer.__width, processLayer.__height));
        
        processLayer.setProcess(processLayer.__percent);
    }

    processLayer.setProcess = function(percent) {
                        
        if(percent>100) { percent = 100; }
        if(percent<0) { percent = 0;}
        
        finishedLayer.setContentSize(CCSizeMake( processLayer.__width*percent/100.0, processLayer.__height));
        
        processLayer.__percent = percent;
    }
    
    processLayer.getProcess = function() {
        return processLayer.__percent;
    }

    processLayer.destory = function () {
        if( typeof(processLayer) !== 'undefined' ) {
            processLayer.stopAllActions();
            processLayer.removeFromParent();
            processLayer = undefined;
        }
    }

    return processLayer;
}

function LoadingScene(sceneToLoad) 
{
    var w = window.innerWidth;
    var h = window.innerHeight;

    var scene = CCScene.create();
    scene.setContentSize(CCSizeMake(w, h));
    scene.setPosition(w/2,h/2);
    scene.element.setAttribute('class','scene');

    scene.layout = function ( w, h) {
        scene.setContentSize(CCSizeMake(w, h));
        scene.setPosition(w/2,h/2);
    }
    
    var process_bar = createProcessBar();
    scene.addChild(process_bar);
    process_bar.setAnchorpoint( 0.5, 0.5);

    process_bar.layout = function(width,height)
    {
        process_bar.setContentSize(CCSizeMake(300, 3));
        process_bar.setPosition(scene.width/2,scene.height/2+15);
    }
    
    process_bar.layout(scene.width,scene.height);
    
    var processLabel = createLabelDefaultStyle( "LOADING %0", scene.width/2, scene.height/2);
    scene.addChild(processLabel);
    processLabel.setColor("#FFFFFF");
    processLabel.setTextAlign("center");
    
    processLabel.layout = function(width,height) 
    {
        processLabel.setContentSize(CCSizeMake(scene.width,20));
        processLabel.setPosition(scene.width/2, scene.height/2);
    }
    processLabel.layout(scene.width,scene.height);
    
    var percent = 0;
    var filter_paremeter = 0.618;

    scene.jump = function()
    {
        sceneToLoad.show();
        scene.stopAllActions();
        scene.removeAllChildsAndCleanUp(true);
        scene.removeFromParent();
    }

    scene.runAction(RepeatForever(Sequence([DelayTime(0.1), CallFunc(function() 
    {
        percent = (percent * filter_paremeter) + (getLoadingPercentage() * (1-filter_paremeter));
        
        var p = parseInt(percent+0.5);
        processLabel.setString("LOADING "+ p +"%");
        process_bar.setProcess(p);
        
        if( parseInt(percent+0.5) === 100 & isAllResourceReady() ) {
            setTimeout( scene.jump, 500);
        }
        
    })])));
}

function Start() {
    var main_scene = MainScene();
    LoadingScene(main_scene);
    StartAnimation(1/60);
}

Start();
