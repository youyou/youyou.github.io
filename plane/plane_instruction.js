function createSTLViewerOnLayer( div, mesh ) {
    
    if (!Detector.webgl) Detector.addGetWebGLMessage();
    var container, stats;
    var camera, cameraTarget, scene, renderer;
    var stlViewer = {};
    stlViewer.running = true;
    
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
            loadingDom.parentNode.removeChild(loadingDom);
            loadingDom = document.getElementById('loadingText');
            loadingDom.parentNode.removeChild(loadingDom);
            
            var material = new THREE.MeshPhongMaterial({
                color: 0xcccccc,
                specular: 0x111111,
                shininess: 200
            });
            
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.set(0, -0.5, -1.5);
            mesh.rotation.set(0, -Math.PI / 2, 0);
            mesh.scale.set(0.01, 0.01, 0.01);
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
        if( stlViewer.running 
        && div.parentNode ) {
            requestAnimationFrame(animate);
        } else {
            cclog("render stoped!");
        }
        render();
    }

    function render() {
        var timer = Date.now() * 0.0005;
        camera.position.x = Math.cos(timer) * 3;
        camera.position.z = Math.sin(timer) * 3;
        camera.lookAt(cameraTarget);
        renderer.render(scene, camera);
    }
    
    stlViewer.stopAnimation = function() {
        this.running = false;
    };
    
    init();
    animate();
    
    return stlViewer;
}

function ViewPlaneDrawing() {
    viewer.show();
}

//TODO::
// 4. 添加二维码
// 5. 淘宝店宝贝资料
// 6. 延迟停电飞机

var sceneWidth  = 487;
var sceneHeight = 692;

var skyColor  = ccc3( 22, 125, 178);
var contents  = [
                    {   
                        text:"教你造飞机",
                        baseText: "<div style='width:100%;height:15%;'></div><center><h1>",
                        endText: "</h1><div style='width:100%;height:50%;'><img width=30% style='margin-top:20%;top:50%;' src='//qr.api.cli.im/qr?data=http%253A%252F%252Fenglishlearning.duapp.com%252Fplane%252Fplane_v2.html&level=H&transparent=false&bgcolor=%23ffffff&forecolor=%23000000&blockpixel=12&marginblock=1&logourl=&size=280&kid=cliim&key=e9d9cdfe9168b5d7e6816060c491ff76'></img></div>扫一扫查看详细教程</center>" 
                    },
                    {
                        text:"制作步骤",
                        baseText:"<center><h3 style='line-height:10px;'>",
                        endText:
                              "</h3></center><center><table width='98%' height='86%' >"
                            + "<tr height='33%'><td>1.切割材料<br/><img src='instructions/CutMaterial.png' style='width:100%;height=80%;'/></td><td>2.将机翼碾压到接近下面形状<br/><img src='instructions/WingMake.png' style='width:100%;height=80%;'/></td></tr>"
                            + "<tr height='33%'><td>3.在机身两侧和机翼底部粘贴碳纤维片<br/><img src='instructions/PasteFilber.png' style='width:100%;height=80%;'/></td><td>4.将飞机机翼上折成V字型(需要折断碳纤维片)<br/><img src='instructions/WingFinished.png' style='width:100%;height=80%;'/></td></tr>"
                            + "<tr height='33%'><td>5.在机身上粘上尾翼和机翼<br/><img src='instructions/Plane.png' style='width:100%;height=80%;'/></td><td>6.粘好电机和电源<br/><img src='instructions/PlaneFinished.png' style='width:100%;height=80%;'/></td></tr>"
                            + "</table></center><center><p 'line-height:10px;'>帮她飞向天空，你是一个小英雄</p></center>"
                    }
                ];

var currentPageIndex = 0;

function ChangeValue( time, beginValue, dValue, valueFunc ) {
    var obj = TimeAction(time);
    function start( target ) {
        obj._start( target);
        obj._beginValue = beginValue;
    }
    function step( p ) {
        valueFunc( obj._beginValue + dValue * p );
    }
    function end(){
        obj._end();
    }
    obj.start  = start;
    obj.step = step;
    obj.end = end;
    return obj;
}

function PlaneScene() {

    var scene = null;
    var signalMarks = [];
    var plane = null;
    var dialog = null;
    var currentSTLViewer = null;
    
    function CreateScene()
    {    
        var w = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
        var h = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
        
        //var sceneHeight = sceneHeight | sceneWidth*h/w;
        var scene = CCScene.create();

        scene.setContentSize(CCSizeMake( sceneWidth, sceneHeight));
        scene.setColor(skyColor);
        scene.setTouchEnabled(true);
        scene.setVisible(false);
        scene.element.setAttribute( 'class','scene');
        
        if( sceneHeight > window.innerHeight ) {
            scene.element.style.marginTop = "-" + parseInt(window.innerHeight/2) + "px";
        }

        return scene;
    }

    function AddClouds( scene ) {

        function initCloud(c) {
            
            var tx = scene.width + c.width/2;
            var ty = math.random( 40, scene.height*0.382-40);
            
            if( c.inited ) {
                c.setPosition( tx, ty);
            } else {
                c.setPosition( math.random( 0, scene.width), ty);
            }

            var delayTime = math.random( 0, 30) * 0.03;
            var moveTime  = i;

            var seq = [];
            if( !c.inited ) {
                moveTime *= (c.width/2 + c.x) / (scene.width+c.width);
                seq.push( MoveBy( moveTime, -(c.width/2 + c.x)) );
            } else {
                seq.push( DelayTime(delayTime));
                seq.push( MoveBy( moveTime, -(scene.width+c.width)));
            }

            seq.push( CallFunc(initCloud));
            c.runAction(Sequence(seq));
            
            c.inited = true;
        }

        function oncloudload() {
                initCloud(this);
        }
        
        for(var i=1; i<=3;++i) {

            var cloud = CCSprite.create( "cloud"+ i +".png");
            scene.addChild(cloud);
            cloud.inited = false;
            cloud._index = i;
            cloud.setScale(0.8);

            cloud.onload = oncloudload;
        }
    }

    function AddPlane( scene ) {
        
        var plane = CCSprite.create( "plane.png");
        scene.addChild(plane);
        plane.setPosition(scene.width/2, scene.height/2);
        plane.setScale(0.5);
        plane.element.style.transform = "rotate("+(-3)+"deg)";

        plane.runAction(RepeatForever(ChangeValue(16, 0, 2*Math.PI, function(v) {
            
            var verticalRange = 30;
            var pitchRange    = 5;

            var h = Math.cos(v)*verticalRange;
            var pitch = -1*Math.sin(v)*pitchRange;

            plane.setPosition( scene.width/2, scene.height/2 + h );
            plane.element.style.transform = "rotate("+pitch+"deg)";

        })));

    }

    function AddEarth(scene) {
        var earth = CCSprite.create( "earth.png");
        scene.addChild(earth);
        earth.setPosition(scene.width/2, scene.height+280);
        earth.runAction(RepeatForever(ChangeValue(365, 0, -360, function(v){
            earth.element.style.transform = "rotate("+v+"deg)";
        })));
    }
    
    function Valid3DModelDiv(scene) {
        var div = document.getElementById("3dmodel");
        if(div) {
            var w = scene.width-100;
            div.setAttribute( "width", w);
            div.setAttribute( "height", w*0.618);
            var mesh = div.getAttribute("model");
            currentSTLViewer = createSTLViewerOnLayer( div, mesh );
        }
    }
    
    function IsPlaneDrawingViewerBtnNeeded(dialog) {
        
        var div = document.getElementById("PlaneDrawing");
        if(div) {
            
            var btnText = div.getAttribute("btnText");
            btnText = btnText || '查看图纸';
            
            if(dialog._viewBtn) {
                dialog._viewBtn.setString(btnText);
            }
            
            var ul = document.getElementById('dowebok');
            ul.innerHTML = div.innerHTML;
            
            viewer.destroy();
            viewer = new Viewer(document.getElementById('dowebok'), {
                url: 'data-original'
            });
            
            return true;
        } else {
            return false;
        }
    }
    
    function AddDialog(scene) {
        
        var dialogWidth  = (scene.width-30);
        var dialogHeight = (scene.height-30);
        
        var dialog = CCLayer.create();
        scene.addChild(dialog);
        dialog.setPosition( scene.width/2, scene.height/2);
        dialog.setColor(ccc3( 255, 255, 255));
        dialog.setOpacity(0);
        dialog.setContentSize( CCSizeMake(dialogWidth, dialogHeight) );

        var textShaddowLayer = CCLayer.create();
        scene.addChild(textShaddowLayer);
        textShaddowLayer.setPosition( scene.width/2+1, scene.height/2+1);
        textShaddowLayer.setContentSize( CCSizeMake( dialogWidth, dialogHeight ) );

        var textLayer = CCLayer.create();
        scene.addChild(textLayer);
        textLayer.setPosition( scene.width/2, scene.height/2);
        //textLayer.setColor("#00ff00");
        textLayer.setContentSize( CCSizeMake( dialogWidth, dialogHeight ) );

        var pageIndexLabel = createLabelDefaultStyle( "", (textLayer.width/2), (textLayer.height-20));
        textLayer.addChild(pageIndexLabel);
        pageIndexLabel.setColor( ccc3( 255, 255, 255));
        pageIndexLabel.setAnchorpoint( 0.5, 0);
        pageIndexLabel.setContentSize(CCSizeMake(textLayer.width,16));
        pageIndexLabel.setTextAlign("center");
        pageIndexLabel.setOpacity(0);
        
        var resultLabelShaddow = createLabelDefaultStyle( "", dialogWidth/2, dialogHeight/2);
        textShaddowLayer.addChild(resultLabelShaddow);
        resultLabelShaddow.setColor( ccc3( 0, 0, 0));
        resultLabelShaddow.setAnchorpoint( 0.5, 0.5);
        resultLabelShaddow.setContentSize(CCSizeMake( dialogWidth, dialogHeight ));

        var resultLabel = createLabelDefaultStyle( "", dialogWidth/2, dialogHeight/2);
        textLayer.addChild(resultLabel);
        resultLabel.setColor( ccc3( 255, 255, 255));
        resultLabel.setAnchorpoint( 0.5, 0.5);
        resultLabel.setContentSize(CCSizeMake( dialogWidth, dialogHeight));

        dialog.setText = function(text) {
            resultLabelShaddow.setString(text);
            resultLabel.setString(text);
            resultLabelShaddow.element.id = "shaddow";
        };

        dialog.beginTextAnimate = function( text, baseText, endText) {
            
            dialog.text = text;
            dialog.numDisplayed = 0;
            
            var appendTextAction = 
                            CallFunc(
                                function() {
                                    dialog.numDisplayed += 1;
                                    dialog.setText( baseText + dialog.text.substr( 0, dialog.numDisplayed) );
                                }
                            );

            var repeatAppendTextAction = Repeat( Sequence([ appendTextAction, DelayTime(0.15) ]), dialog.text.length );

            dialog.runAction(
                Sequence([
                    repeatAppendTextAction,
                    CallFunc(function() {
                        dialog.setText( baseText + dialog.text + endText );
                        Valid3DModelDiv(scene);
                        if( IsPlaneDrawingViewerBtnNeeded(dialog)
                        && dialog._viewBtn !== null ) {
                            dialog._viewBtn.setVisible(true);
                        }
                    }
                )])
            );

        };

        dialog._curIndex = 0;
        dialog.show = function( text, baseText, endText) {
            
            if( text === "" ) {
                dialog.setOpacity(0);
            } else {
                dialog.setOpacity(0.1);
            }
            
            pageIndexLabel.setString( "");

            dialog.runAction(
                Sequence(
                    [
                        Ease(
                            ease.elastic, 
                            ChangeValue( 0.5, 0, 1, function(v) {
                                dialog.setContentSize( CCSizeMake( dialogWidth*v, dialogHeight*v ) );
                            })
                        ),
                        CallFunc(function() {
                            if( dialog._curIndex > 0 ) {
                                pageIndexLabel.setString( "- " + dialog._curIndex + " -");
                            }
                            dialog.beginTextAnimate( text, baseText, endText);
                        })
                    ])
            );
        };

        dialog.showCurrentPage = function() {
            if( currentPageIndex < contents.length  
                && currentPageIndex>=0 
            ) {
                dialog.show(contents[currentPageIndex].text, contents[currentPageIndex].baseText||"", contents[currentPageIndex].endText||"");
            } else {
                dialog.show( "ERROR:page index " + currentPageIndex + " out of range 0 - " + (contents.length-1), "", "");
            }
        };

        dialog.setDX = function( dx ) {
            var mx = dx * 0.36;
            dialog.setPosition( scene.width/2+mx, scene.height/2);
            textShaddowLayer.setPosition( scene.width/2+1+mx, scene.height/2+1);
            textLayer.setPosition( scene.width/2+mx, scene.height/2);
        };

        dialog.back = function() {
            
            var backTime = 0.2;

            var dialogBackAction = MoveTo( backTime, scene.width/2,scene.height/2);
            dialog.runAction(dialogBackAction);

            var textShaddowLayerBackAction = MoveTo( backTime, scene.width/2+1,scene.height/2+1);
            textShaddowLayer.runAction(textShaddowLayerBackAction);

            var textLayerBackAction = MoveTo( backTime, scene.width/2,scene.height/2);

            textLayer.runAction(Sequence([ textLayerBackAction, CallFunc(function(){
                if( 
                    IsPlaneDrawingViewerBtnNeeded(dialog)
                    && dialog._viewBtn !== null ) {
                    dialog._viewBtn.setVisible(true);
                }
            })]));
            
        };

        dialog.forward = function() {
            
            dialog._curIndex += 1;

            var backTime = 0.2;
            
            if(currentSTLViewer!==null){
                currentSTLViewer.stopAnimation();
                currentSTLViewer = null;
            }
            
            var dialogBackAction = MoveTo( backTime, -scene.width/2, scene.height/2);
            dialog.runAction(Sequence([
                                dialogBackAction,
                                CallFunc(function() {
                                    dialog.stopAllActions();
                                    dialog.setText("");
                                    dialog.setDX(0);
                                    dialog.showCurrentPage();
                                })
                            ]));

            var textShaddowLayerBackAction = MoveTo( backTime, -scene.width/2+1,scene.height/2+1);
            textShaddowLayer.runAction(textShaddowLayerBackAction);
                                
            var textLayerBackAction = MoveTo( backTime, -scene.width/2,scene.height/2);
            textLayer.runAction(textLayerBackAction);
        };

        dialog.backward = function() {
            
            dialog._curIndex -= 1;

            var backTime = 0.2;
            
            if(currentSTLViewer!==null) {
                currentSTLViewer.stopAnimation();
                currentSTLViewer = null;
            }
            
            var dialogBackAction = MoveTo( backTime, 3*scene.width/2, scene.height/2);
            dialog.runAction(Sequence([
                                dialogBackAction,
                                CallFunc(function() {
                                    dialog.stopAllActions();
                                    dialog.setText("");
                                    dialog.setDX(0);
                                    dialog.showCurrentPage();
                                })
                            ]));

            var textShaddowLayerBackAction = MoveTo( backTime, 3*scene.width/2+1,scene.height/2+1);
            textShaddowLayer.runAction(textShaddowLayerBackAction);
                                
            var textLayerBackAction = MoveTo( backTime, 3*scene.width/2,scene.height/2);
            textLayer.runAction(textLayerBackAction);
        };

        return dialog;
    }
    
    function AddTouchLayer(scene) {

        var touchLayer = CCLayer.create();
        scene.addChild(touchLayer);
        touchLayer.setPosition( scene.width/2, scene.height/2);
        touchLayer.setContentSize( CCSizeMake( (scene.width), (scene.height) ) );
        touchLayer.setTouchEnabled(true);
        
        touchLayer._controledObject = null;
        touchLayer._viewBtn = null;
        
        var beginX = -1;
        var minFlipDistance = 100;

        touchLayer.touchBegin = function( x, y) {
            beginX = x;
            if( touchLayer._viewBtn !== null ) {
                touchLayer._viewBtn.setVisible(false);
            }
        };
        
        touchLayer.touchMoved = function( x, y) {
            var dx = x - beginX;
            if( touchLayer._controledObject !== null ) {
                touchLayer._controledObject.setDX(dx);
            }
        };

        touchLayer.touchEnded = function( x, y) {
            var dx = x - beginX;
            
            if(touchLayer._controledObject === null) return; 

            if(  Math.abs(dx) < minFlipDistance ) {
                touchLayer._controledObject.back();
            } 
            else if ( dx < -1*minFlipDistance ) {
                
                if( currentPageIndex + 1 < contents.length ) {
                    currentPageIndex += 1;
                    touchLayer._controledObject.forward();
                } else {
                    touchLayer._controledObject.back();
                }

            } 
            else if ( dx > minFlipDistance ) {

                if( currentPageIndex - 1 >= 0 ) {
                    currentPageIndex -= 1;
                    touchLayer._controledObject.backward();
                } else {
                    touchLayer._controledObject.back();
                }

            }

            beginX = -1;
        };

        touchLayer.touchCanceled = touchLayer.touchEnded;

        touchLayer.setControledObject = function(obj) {
            touchLayer._controledObject = obj;
        };

        return touchLayer;
    }
    
    function AddViewPlaneDrawingButton( scene ) {
        
        var viewBtn = createLabelDefaultStyle( "查看图纸", 0, 0);
        viewBtn.setContentSize(CCSizeMake( scene.width-50, 0));
        viewBtn.setAnchorpoint( 0.5, 0);
        scene.addChild(viewBtn);
        viewBtn.setColor("#6cf");
        viewBtn.setTextAlign("center");
        viewBtn.setPosition( scene.width/2, (scene.height-70));
        viewBtn.setTouchEnabled(true);
        viewBtn.touchEnded = ViewPlaneDrawing;
        
        viewBtn.runAction( RepeatForever(Sequence([ FadeTo(0.8,0.3), FadeTo(0.8,1)])) );
        
        viewBtn.setVisible(false);
        
        return viewBtn;
    }

    function AddRainbow(scene) {
        var rainbow = CCSprite.create( "rainbow.png");
        scene.addChild(rainbow);
        rainbow.onload = function() {
            rainbow.setPosition( scene.width*1.2, rainbow.height/6);
        }
    }

    (function init() {
        
        scene = CreateScene();
        
        AddClouds(scene);
        AddPlane(scene);
        AddRainbow(scene);
        AddEarth(scene);
        
        dialog = AddDialog(scene);
        var touchLayer = AddTouchLayer(scene);
        touchLayer.setControledObject(dialog);
        
        var viewBtn = AddViewPlaneDrawingButton(scene);
        touchLayer._viewBtn = viewBtn;
        dialog._viewBtn = viewBtn;
        
    })();
    
    var obj = new Object();
    obj.show = function(){
        scene.setVisible(true);
        scene.runAction(Sequence([DelayTime(1.5), CallFunc(function(){
            dialog.showCurrentPage();
        })]))
    }

    return obj;
}

function LoadingScene(sceneToLoad) {
    
    var w = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    var h = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
    
    var scene = CCScene.create();
    scene.setContentSize(CCSizeMake(320, 320*h/w));
    scene.setColor(skyColor);
    scene.element.setAttribute('class','scene');
    
    var processLabel = createLabelDefaultStyle( "LOADING %0", scene.width/2, scene.height/2);
    scene.addChild(processLabel);
    processLabel.setContentSize(CCSizeMake(scene.width,20));
    processLabel.setColor("#FFFFFF");
    processLabel.setTextAlign("center");
    
    processLabel.runAction(RepeatForever(Sequence([DelayTime(0.1), CallFunc(function() {
        processLabel.setString("LOADING %"+ parseInt(getLoadingPercentage()));
        if( isAllResourceReady() ) {
            sceneToLoad.show();
            scene.removeAllChildsAndCleanUp(true);
            scene.removeFromParent();
            processLabel.stopAllActions();
        }
    })])));
}

function LandscapeTipScene() {
    
    var scene = CCScene.create();
    scene.setContentSize(CCSizeMake(320, 480));
    scene.setColor(skyColor);
    scene.setTouchEnabled(true);
    scene.setVisible(false);
    
    var tipLabel = createLabelDefaultStyle( "请竖屏观看！", 160, 240);
    scene.addChild(tipLabel);
    tipLabel.setContentSize(CCSizeMake(320,20));
    tipLabel.setColor("#aa55cc");
    tipLabel.setTextAlign("center");
    
    SetOrintationLisener(function(orintation) { //检测横竖屏旋转
        if( orintation === "landscape" ) {
            //scene.setVisible(true);
            //SetTimeScale(0);
        } else if( orintation === "portrait" ){
            scene.setVisible(false);
            SetTimeScale(1);
        }
    });
}

function StartGame() {
    var driver = PlaneScene();
    LoadingScene(driver);
    LandscapeTipScene();
    StartAnimation(1/60);
}

StartGame();