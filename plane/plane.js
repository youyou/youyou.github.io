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

var skyColor  = ccc3( 22, 125, 178);
var contents  = [
                    {   
                        text:"教你造飞机",
                        baseText: "<div style='width:100%;height:15%;'></div><center><h1>",
                        endText: "</h1><div style='width:100%;height:50%;'></div>向左滑动翻页</center>"
                    },
                    {
                        text:"飞行是人类一直以来的梦想，可以说每个孩子小时候都曾梦想过"
                           + "拥有一架属于自己的小飞机。而我小时候，也曾尝试过造飞机，"
                           + "但由于知识匮乏，材料短缺并未成功。长大后，我们随时都可以去乘坐飞机，"
                           + "但是在我的心里造飞机的梦想一直未曾磨灭。近日玩无人机重燃了我造飞机的梦想。"
                           + "经过大约一个月的努力，从飞不动，到飞几米高，再到能飞几十米的高度。"
                           + "现在，我将一种简单的飞机模型制作方法公布出来。"
                           + "期望能够帮助爱好航模的小同学完成造飞机的梦想, 提高动手能力。"
                           + "或许能成为点燃小朋友对飞行器强烈兴趣的星星之火。",
                        baseText:"<center><h3 style='line-height:0px;'>前言</h3></center>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp",
                        endText:""
                    },
                    {
                        text:"飞机概况",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/>"+
                        "<ul>" +
                            "<li>重量:26克</li>" +
                            "<li>推力:11克</li>" +
                            "<li>续航时间:10分钟</li>" +
                        "</ul>"
                        +"<center><div id='3dmodel' model='steps/plane_finished_with_motor.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"制作材料",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center>" +
                                "<ul>" +
                                    "<li>泡沫板[30.5cm*30cm*5mm]</li>" +
                                    "<li>锂电池[300mah]</li>" +
                                    "<li>电机[716空心杯电机]</li>" +
                                    "<li>螺旋桨[4.5cm]</li>" +
                                    "<li>泡沫胶</li>" +
                                    "<li>充电器</li>" +
                                "</ul>"
                    },
                    {
                        text:"制作机身",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><div id='PlaneDrawing' btnText='查看机身图纸' style='display:none;' >"
                        + "<li><img data-original='body.svg' src='body.svg' style='width:80%;' alt='机身图纸' /></li>"
                        + "<li><img data-original='cutting_line.svg' src='cutting_line.svg' style='width:80%;' alt='飞机切割图纸' /></li>"
                        + "</div><center><i>在kt板上按照图纸标注尺寸切割出机身</i><br/><br/><div id='3dmodel' model='release/body.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"制作尾翼",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText: "</h2></center><br/><div id='PlaneDrawing' btnText='查看尾翼图纸' style='display:none;'>"
                        + "<li><img data-original='empennage.svg' src='empennage.svg' style='width:80%;' alt='尾翼图纸' /></li>"
                        + "<li><img data-original='cutting_line.svg' src='cutting_line.svg' style='width:80%;' alt='切割图纸' /></li>"
                        +"</div><center><div id='3dmodel' model='release/empennage.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"制做机头加强片",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><div id='PlaneDrawing' btnText='查看机头加强片图纸' style='display:none;'>"
                        + "<li><img data-original='head_strengthen.svg' src='head_strengthen.svg' style='width:80%;' alt='加强片图纸' /></li>"
                        + "<li><img data-original='cutting_line.svg' src='cutting_line.svg' style='width:80%;' alt='切割图纸' /></li>"
                        +"</div><center><i>数量:2块</i><br/><br/><div id='3dmodel' model='release/headStrengthen.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"制做机翼材料",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><div id='PlaneDrawing' btnText='查看机翼图纸' style='display:none;'>"
                        + "<li><img data-original='wing.svg' src='wing.svg' style='width:80%;' alt='机头加强片图纸' /></li>"
                        + "<li><img data-original='cutting_line.svg' src='cutting_line.svg' style='width:80%;' alt='切割图纸' /></li>"
                        +"</div><center><i>数量:2块</i><br/><br/><div id='3dmodel' model='release/wing.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"将两块机翼材料叠起来用双面胶粘合",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><center><div id='3dmodel' model='release/wing_piled.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"按照图纸削去机翼的两个棱",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><div id='PlaneDrawing' btnText='查看机翼制作图纸' style='display:none;'>"
                        + "<li><img data-original='wing_cut.svg' src='wing_cut.svg' style='width:80%;' alt='查看机翼制作图纸' /></li>"
                        +"</div><center><div id='3dmodel' model='release/wing_after_cut.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"碾压机翼的两个棱使机翼平滑",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><center><div id='3dmodel' model='release/wing_after_compaction.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"沿着机翼底部中位线划一条缝并把机翼上折7度左右",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><center><div id='3dmodel' model='release/wing_finished.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"将两块机头加强件用双面胶粘在机头两侧",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><center><i>在此步骤之前可以在机身上粘贴碳纤维片加强机身强度！</i></br><div id='3dmodel' model='steps/body_strengthen.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"将尾翼用胶水站在机身尾部",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><center><div id='3dmodel' model='steps/body_with_empennage.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"将制作好的机翼用胶水粘在机身上",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><center><i>注意：不太贴合的地方需要用刀子稍微修一下</i><br/><br/><div id='3dmodel' model='steps/plane_finished.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"将电机粘在电机架上,将电池放入机头上的电池槽里",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><div id='PlaneDrawing' btnText='查看电机和电池位置' style='display:none;'>"
                        +"<li><img data-original='motor_and_battery_place.svg' src='motor_and_battery_place.svg' style='width:80%;' alt='机头加强片图纸' /></li>"
                        +"</div><center><div id='3dmodel' model='steps/plane_finished_with_motor.stl'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"飞机调试",
                        baseText:"<center><h2>",
                        endText:"</h2></center>"
                            + "1.将螺旋将凸面朝电机安装在电机轴上<br/>"
                            + "2.将电机的两根导线与电池的两根导线相连，如果风向不朝后将连线对调一下<br/>"
                            + "3.在保持连线不变的情况,下安装上插头<br/>"
                            + "4.飞机起飞时水平抛出，如果飞机往下冲,则将水平尾翼尾部轻轻向上弯折。如果飞机往上飞，然后又栽到地上，将飞机尾翼尾部向下弯折。<br/>"
                            + "5.飞机向左倾斜时,将水平尾翼左边向下弯折右边向上弯折。向右倾斜时,将水平尾翼右边向下弯折，左边向上弯折。<br/>"
                    },
                    {
                        text:"建议",
                        baseText:"<center><h2>",
                        endText:"</h2></center>"
                            + "1.不懂的问家长<br/>"
                            + "2.将充电模块安装在飞机上并安装开关虽然会增加一定的重量，但是可以避免多次拔插插头造成接触不良<br/>"
                            + "3.飞机机身损坏可以使用胶水修补，大面积损坏可以在广告点买5mm厚KT板重做<br/>"
                            + "4.熟悉了以后,除了调整飞机尾翼以外,还可以调整飞机机翼攻角和飞机推力线,甚至可以自己设计一架更加优秀的飞机<br/>"
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
    
    function CreateScene() {
        
        var w = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
        var h = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
        
        var scene = CCScene.create();
        scene.setContentSize(CCSizeMake(320, 320*h/w));
        scene.setColor(skyColor);
        scene.setTouchEnabled(true);
        scene.setVisible(false);
        scene.element.setAttribute('class','scene');
        
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
        
        var dialogWidth  = (scene.width-50);
        var dialogHeight = (scene.height-50);
        
        var dialog = CCLayer.create();
        scene.addChild(dialog);
        dialog.setPosition( scene.width/2, scene.height/2);
        dialog.setColor(ccc3( 255, 255, 255));
        dialog.setOpacity(0);
        dialog.setContentSize( CCSizeMake( dialogWidth, dialogHeight ) );

        var textShaddowLayer = CCLayer.create();
        scene.addChild(textShaddowLayer);
        textShaddowLayer.setPosition( scene.width/2+1, scene.height/2+1);
        textShaddowLayer.setContentSize( CCSizeMake( dialogWidth, dialogHeight ) );

        var textLayer = CCLayer.create();
        scene.addChild(textLayer);
        textLayer.setPosition( scene.width/2, scene.height/2);
        textLayer.setContentSize( CCSizeMake( dialogWidth, dialogHeight ) );

        var pageIndexLabel = createLabelDefaultStyle( "", (textLayer.width/2), (textLayer.height-20));
        textLayer.addChild(pageIndexLabel);
        pageIndexLabel.setColor( ccc3( 255, 255, 255));
        pageIndexLabel.setAnchorpoint( 0.5, 0);
        pageIndexLabel.setContentSize(CCSizeMake(textLayer.width,16));
        pageIndexLabel.setTextAlign("center");
        pageIndexLabel.setOpacity(0.6);
        
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
    
    function AddAuthor(scene) {
        var authorText = createLabelDefaultStyle( "<font size='0.5'>作者:胥友</font>", scene.width/2, 0);
        authorText.setContentSize(CCSizeMake(scene.width, 10));
        authorText.setAnchorpoint( 0.5, 1);
        authorText.setColor("#eee");
        authorText.setTextAlign("center");
        authorText.setPosition( scene.width/2, (scene.height-10));
        scene.addChild(authorText);
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
        
        AddAuthor(scene);
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