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
        
        var regEndWithStl = new RegExp(".stl$");
        var regEndWithDae = new RegExp(".dae$");
        
        var loader = null;
        if( regEndWithStl.test(mesh) ) {
            
            // ASCII file
            loader = new THREE.STLLoader();
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
            
        } else if( regEndWithDae.test(mesh) ) {
            
    		loader = new THREE.ColladaLoader();
    		loader.load( mesh, function ( collada ) {
    		    
        	    var loadingDom = document.getElementById('loadingText');
                loadingDom.parentNode.removeChild(loadingDom);
                loadingDom = document.getElementById('loadingText');
                loadingDom.parentNode.removeChild(loadingDom);
                
                collada.scene.scale.set(0.25, 0.25, 0.25);
                collada.scene.rotation.set(-Math.PI / 2, 0, 0);
                collada.scene.position.set(-1.5, -0.5, 0);
                
    		    scene.add( collada.scene );
    		} );
        }
				
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
        camera.position.x = Math.cos(timer) * 3.6;
        camera.position.z = Math.sin(timer) * 3.6;
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
                           + "经过数月的努力，从飞不动到能飞几十米高，后来实现了通过手机遥控飞机飞行。"
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
                            "<li>能源:锂电池</li>" +
                            "<li>续航时间:10分钟</li>" +
                        "</ul>"
                        +"<center><div id='3dmodel' model='tutorial_resource/assembly/plane_finished.dae'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"制作材料",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center>" +
                                "<ul>" +
                                    "<li>KT板[30cm*30cm*0.5cm]</li>" +
                                    "<li>电源模块</li>" +
                                    "<li>电机[716空心杯电机]</li>" +
                                    "<li>螺旋桨[4.5cm]</li>" +
                                    "<li>DIY专用胶水</li>" +
                                "</ul>" +
                                "<br/><div id='PlaneDrawing' btnText='如何获得材料' style='display:none;' link='￥Uhhgffjcf￥' />"
                    },
                    {
                        text:"制作机身",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><div id='PlaneDrawing' btnText='查看机身图纸' style='display:none;' >"
                        + "<li><img data-original='tutorial_resource/body.svg' src='tutorial_resource/body.svg' style='width:80%;' alt='机身图纸' /></li>"
                        + "<li><img data-original='tutorial_resource/cutting_drawings.svg' src='tutorial_resource/cutting_drawings.svg' style='width:80%;' alt='切割图纸' /></li>"
                        + "</div><center><i>在kt板上按照图纸标注尺寸切割出机身</i><br/><br/><div id='3dmodel' model='tutorial_resource/components/body.dae'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"加强机身",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2><center><i>在机身上粘贴碳纤维让机身更结实</i><br/><br/><div id='3dmodel' model='tutorial_resource/components/body_with_carbon_fiber.dae'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"制作尾翼",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText: "</h2></center><br/><div id='PlaneDrawing' btnText='查看尾翼图纸' style='display:none;'>"
                        + "<li><img data-original='tutorial_resource/empennage.svg' src='tutorial_resource/empennage.svg' style='width:80%;' alt='尾翼图纸' /></li>"
                        + "<li><img data-original='tutorial_resource/cutting_drawings.svg' src='tutorial_resource/cutting_drawings.svg' style='width:80%;' alt='切割图纸' /></li>"
                        + "</div><center><div id='3dmodel' model='tutorial_resource/components/empennage.dae'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"制做机翼材料",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><div id='PlaneDrawing' btnText='查看机翼图纸' style='display:none;'>"
                        + "<li><img data-original='tutorial_resource/wing.svg' src='tutorial_resource/wing.svg' style='width:80%;' alt='机头加强片图纸' /></li>"
                        + "<li><img data-original='tutorial_resource/cutting_drawings.svg' src='tutorial_resource/cutting_drawings.svg' style='width:80%;' alt='切割图纸' /></li>"
                        +"</div><center><div id='3dmodel' model='tutorial_resource/components/wing.dae'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"碾压机翼使机翼中间厚两边薄",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><center><div id='3dmodel' model='tutorial_resource/components/wing_after_compaction.dae'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"加强机翼",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><center><i>在机翼下表面粘贴碳纤维</i><br/><br/><div id='3dmodel' model='tutorial_resource/components/wing_after_compaction_with_carbon_fiber.dae'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"沿着机翼底部中位线划一条缝并把机翼上折7度左右",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><center><i>需要折断碳纤维,完成后在划出的缝隙里填充一些胶水让机翼保持上翘</i><br/><br/><div id='3dmodel' model='tutorial_resource/components/wing_finished.dae'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"将尾翼用胶水粘在机身尾部",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><center><div id='3dmodel' model='tutorial_resource/assembly/body_with_empennage.dae'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"将制作好的机翼用胶水粘在机身上",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><center><div id='3dmodel' model='tutorial_resource/assembly/empty_plane_finished.dae'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"将电机粘在电机架上,将电池模块粘贴在机头部位",
                        baseText:"&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<center><h2>",
                        endText:"</h2></center><br/><center><i>如果螺旋桨顺时针转动，将电池模块粘在机头右侧，反之粘在左侧</i><br/><br/><div id='3dmodel' model='tutorial_resource/assembly/plane_finished.dae'/><div id='loadingText'>正在载入模型...</div></div></center>"
                    },
                    {
                        text:"飞机调试",
                        baseText:"<center><h2>",
                        endText:"</h2></center>"
                            + "1.电源模块上有一个充电插孔，可以使用手机数据线给飞机充电。红灯亮表示正在充电，绿灯亮表示已经充满。<br/><br/>"
                            + "2.飞机向左倾斜时,将水平尾翼左边后沿向下弯折右边后沿向上弯折。向右倾斜时,将水平尾翼右边后沿向下弯折，左边后沿向上弯折。<br/><br/>"
                            + "3.飞机起飞时水平抛出，如果飞机往下冲,则将水平尾翼左右两侧后沿轻轻向上弯折。如果飞机往上飞，然后又栽到地上，将飞机尾翼左右两侧后沿向下弯折。<br/><br/>"
                    },
                    {
                        text:"建议",
                        baseText:"<center><h2>",
                        endText:"</h2></center>"
                            + "1.使用胶水时先涂上胶水再凉一会再粘合，这样干的快。<br/><br/>"
                            + "2.选择空旷的地方飞行，如果飞机挂到树上，取飞机时必须保证自身安全且不破坏树木。<br/><br/>"
                            + "3.如果飞机调试好，可以飞几十米乃至上百米高，飞行数公里远。如果飞机飞走，不能应为追飞机而不顾安全。<br/><br/>"
                            + "4.如果飞机飞走，说明你成功了，而且说明你具备了制作遥控飞机的能力，可以尝试制作遥控飞机。<br/>"
                    },
                    {
                        text:"愿我们捡到晶莹的石子，美丽的贝壳~",
                        baseText:"<center><table><tr/><td><img height=40 src='headicon.jpeg'></img></td><td><center><font size=4 style='line-height:23px;'>日光海岸</font><br/><font size=1 style='background-color:green;'>新开淘宝店铺</font></center></td></table></center><br/><center><i>",
                        endText:"</i></center>",
                        hideBackground:true,
                        hidePageIndex:true,
                        allowComment:true,
                        showRainbow:true
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
    
    var glScene = null;
    var scene = null;
    var signalMarks = [];
    var plane = null;
    var dialog = null;
    var currentSTLViewer = null;
    
    function CreateScene() {
        
        var w = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
        var h = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
        
        var scene = CCScene.create();
        
        if( !Sys.isAndroid && !Sys.isIOS ) {
            scene.setContentSize(CCSizeMake(320, 520));
        } else {
            scene.setContentSize(CCSizeMake(320, 320*h/w));
        }
        
        scene.setColor(skyColor);
        scene.setTouchEnabled(true);
        //scene.setVisible(false);
        scene.element.setAttribute('class','scene');
        
        return scene;
    }
    
    function CreateTransparentScene() {
        
        var w = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
        var h = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
        
        var scene = CCScene.create();
        
        if( !Sys.isAndroid && !Sys.isIOS ) {
            scene.setContentSize(CCSizeMake(320, 520));
        } else {
            scene.setContentSize(CCSizeMake(320, 320*h/w));
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
                seq.push( MoveBy( moveTime, -(c.width/2 + c.x), 0) );
            } else {
                seq.push( DelayTime(delayTime));
                seq.push( MoveBy( moveTime, -(scene.width+c.width), 0));
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
            plane.setRotation(pitch);
            //plane.element.style.transform = "rotate("+pitch+"deg)";

        })));

    }

    function AddEarth(scene) {
        var earth = CCSprite.create( "earth.png");
        scene.addChild( earth );
        earth.setPosition(scene.width/2, scene.height+280);
        earth.runAction(RepeatForever(ChangeValue(365, 0, -360, function(v) {
            earth.setRotation(v);
        })));
        return earth;
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
            
            var link = div.getAttribute("link");
            if( link ) {
                dialog._viewBtn._link = link;
            } else {
                dialog._viewBtn._link = null;
            }
            
            var ul = document.getElementById('dowebok');
            ul.innerHTML = div.innerHTML;
            
            if( typeof(viewer) !== 'undefined' ) {
                viewer.destroy();
                viewer = undefined;
            }
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
            
            var flipAudio = document.getElementById('FlipPage');
            if(flipAudio) flipAudio.play();
            
            if( contents[currentPageIndex].hideBackground ) {
                dialog.setOpacity(0);
            } else {
                dialog.setOpacity(0.1);
            }
            
            if( contents[currentPageIndex].allowComment ) {
                if(typeof(commentInputer) !== 'undefined')
                    commentInputer.enable();
            } else {
                if(typeof(commentInputer) !== 'undefined')
                    commentInputer.disable();
            }
            
            if( contents[currentPageIndex].showRainbow ) {
                if( typeof(rainbow) !== 'undefined' ) {
                    rainbow.show();
                }
            } else {
                if( typeof(rainbow) !== 'undefined' ) {
                    rainbow.hide();
                }
            }
            
            pageIndexLabel.setString("");
            
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
                                if( !contents[currentPageIndex].hidePageIndex )
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
            if(typeof(inputElement)!=='undefined') {
                inputElement.cancel();
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
                    if( typeof(commentRef) !== 'undefined' ) {
                        commentRef.setPage(currentPageIndex);
                    }
                } else {
                    touchLayer._controledObject.back();
                }
            } 
            else if ( dx > minFlipDistance ) {
                if( currentPageIndex - 1 >= 0 ) {
                    currentPageIndex -= 1;
                    touchLayer._controledObject.backward();
                    if( typeof(commentRef) !== 'undefined' ) {
                        commentRef.setPage(currentPageIndex);
                    }
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
        viewBtn.touchEnded = function() {
            
            var audio = document.getElementById("Button");
            if(audio) audio.play();
            
            if(viewBtn._link) {
                cilpboard().copyText( viewBtn._link, function(ok) {
                    if(ok) {
                        viewBtn.setString("已复制淘口令,打开手机淘宝查看");
                    }
                });
            } else {
                ViewPlaneDrawing();
            }
        }
        
        viewBtn.runAction( RepeatForever(Sequence([ FadeTo(0.8,0.3), FadeTo(0.8,1)])) );
        
        viewBtn.setVisible(false);
        
        return viewBtn;
    }

    function AddRainbow(scene) {
        
        rainbow = CCSprite.create( "rainbow.png");
        scene.addChild(rainbow);
        
        rainbow.onload = function() {
            rainbow.setPosition( scene.width*1.2, rainbow.height/6);
        }
        
        rainbow.setVisible(false);
        
        rainbow.hiding = false;
                
        rainbow.show = function() {
            rainbow.hiding = false;
            rainbow.stopAllActions();
            rainbow.setVisible(true);
            rainbow.setOpacity(0);
            rainbow.runAction(Sequence([DelayTime(3),FadeIn(1)]));
        }
        
        rainbow.hide = function() {
            if( (!rainbow.isVisible()) || (rainbow.hiding) ) return;
            rainbow.hiding = true;
            rainbow.stopAllActions();
            rainbow.runAction(Sequence([FadeOut(1),CallFunc(function(){
                rainbow.setVisible(false);
                rainbow.hiding = false;
            })]));
        }
        
    }
    
    function getNowFormatDate() {
        var date = new Date();
        var seperator1 = "-";
        var seperator2 = ":";
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        if (month >= 1 && month <= 9) {
            month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
            strDate = "0" + strDate;
        }
        var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
                + " " + date.getHours() + seperator2 + date.getMinutes()
                + seperator2 + date.getSeconds();
        return currentdate;
    }
    
    var getRandomColor = function() {
        var colors = [ ccc3( 0, 31, 62),    ccc3( 0, 166, 217),  ccc3( 127, 220, 254),
                       ccc3( 58, 204, 204), ccc3( 178, 13, 203), ccc3( 47, 204, 63),
                       ccc3( 2, 255, 112),  ccc3(254, 220, 1),   ccc3( 255, 66, 54),
                       ccc3( 221, 221, 221)];
        return colors[parseInt(colors.length*Math.random())%colors.length];
    }
    
    function html_encode(str) {   
        var s = "";   
        if (str.length == 0) return "";   
        s = str.replace(/&/g, "&gt;");   
        s = s.replace(/</g, "&lt;");   
        s = s.replace(/>/g, "&gt;");   
        s = s.replace(/ /g, "&nbsp;");   
        s = s.replace(/\'/g, "&#39;");   
        s = s.replace(/\"/g, "&quot;");   
        s = s.replace(/\n/g, "<br>");   
        return s;   
    }

    function OutputComment( comment ) {
        var commentLabel = createLabelDefaultStyle( html_encode(comment), scene.width*1.5, 0);
        scene.addChild(commentLabel);
        commentLabel.setContentSize(CCSizeMake( scene.width, 30));
        commentLabel.setAnchorpoint(0,0);
        commentLabel.setColor(getRandomColor());
        commentLabel.setPosition(scene.width, (scene.height-30)*Math.random());
        commentLabel.setTextAlign("left");
        commentLabel.runAction(Sequence([ MoveBy( 6, -(scene.width*2) ),CallFunc(function(){
            commentLabel.removeFromParent();
        })]));
    }
        
    function EnableComment( scene ) {
        
        var config = {
          authDomain: "fly.wilddogio.com",
          syncURL: "https://fly.wilddogio.com/"
        };
        
        wilddog.initializeApp(config);
        
        var old_comments = [];
        
        var ref = wilddog.sync().ref("/Pages");
        ref._started = false;
        ref._currentPage = -1;
        
	    ref.setPage = function( pageIndex ) {
	        
	        if( ref._currentPage >= 0 ) {
	            ref.child("Page"+ref._currentPage).off(); // remove observer
	            old_comments.length = 0; // remove data
	        }
	        
	        ref._started = false;
	        ref._currentPage = pageIndex;
	        
	        ref.child("Page"+ref._currentPage).on('child_added', function(snapshot) {
        		var text = snapshot.val();
        		if( ref._started === false ) {
        		    cclog( "old comment:" + text);
        		    old_comments.push(text);
        		} else{
        		    cclog( "new comment:" + text);
        		    old_comments.push(text);
        		    OutputComment( text);
        		}
	        });
            
	        if( pageIndex == 0 )
	            ref.child('PageViewed').push(returnCitySN.cname + "|" + getNowFormatDate() + "|" + returnCitySN.cip);
	        
	        scene.runAction(Sequence([DelayTime(3),CallFunc(function(){
	            ref._started = true;
	        })]));
	    }
	    
        ref.setPage(0);
	    
	    scene.runAction(RepeatForever(Sequence([DelayTime(3),CallFunc(function() {
            if( old_comments.length > 0 )
                OutputComment( old_comments[parseInt(Math.random()*old_comments.length)] );
	    })])));
	    
	    commentRef = ref;
    }
    
    function AddCommentInputer(scene) {
        
        commentInputer = {};
        commentInputer._enabled = false;
        
        var commentBtn = CCSprite.create( "comment.png");
        scene.addChild(commentBtn);
        commentBtn.setAnchorpoint( 1, 1);
        commentBtn.setPosition( scene.width-10, scene.height-10);
        commentBtn.setScale(0.5);
        commentBtn.setVisible(false);
        commentBtn.setDepth(20);
        
        var inputLayerStandY =  scene.height+30;
        
        var inputLayer = CCLayer.create();
        scene.addChild(inputLayer);
        inputLayer.setContentSize( CCSizeMake( scene.width-50, 30 ) );
        inputLayer.setAnchorpoint( 0.5, 1);
        inputLayer.setPosition( scene.width/2, inputLayerStandY);
        inputLayer.setDepth(20);
        
        var inputLayerBg = CCLayer.create();
        inputLayer.addChild(inputLayerBg);
        inputLayerBg.setContentSize( CCSizeMake( inputLayer.width, inputLayer.height ) );
        inputLayerBg.setPosition( inputLayer.width/2, inputLayer.height/2);
        inputLayerBg.setColor("#ffffff");
        inputLayerBg.element.style.borderRadius = "15px";
        inputLayerBg.setOpacity(0.3);
        
        var inputLayerFg = CCLayer.create();
        inputLayer.addChild(inputLayerFg);
        inputLayerFg.setContentSize( CCSizeMake( inputLayer.width-60, inputLayer.height ) );
        inputLayerFg.setAnchorpoint( 0, 0);
        inputLayerFg.setPosition( 15, 0);
        inputLayerFg.element.innerHTML = "<input id='name_input' placeholder='请输入内容' style='text-align:left;outline:none;-webkit-input-placeholder:#fff;width:100%;height:32px;background:Transparent;color:#ffffff;font-size:16;border:none;'></input>";
        inputLayerFg.setTouchEnabled(true);
        inputLayerFg.setOpacity(0.86);
        
        inputElement = document.getElementById('name_input');
        
        var sendLabel = createLabelDefaultStyle( "发送", inputLayer.width, inputLayer.height/2);
        inputLayer.addChild(sendLabel);
        sendLabel.setAnchorpoint(1,0.5);
        sendLabel.setContentSize(CCSizeMake( 50, 26));
        sendLabel.setTextSize(18); //by px
        sendLabel.setPosition( inputLayer.width-0.5, inputLayer.height/2);
        sendLabel.setColor("#39f");
        sendLabel.setTextAlign("center");
        sendLabel.element.style.borderRadius = "10px";
        sendLabel.element.style.lineHeight = "26px";
        sendLabel.setOpacity(0.86);
        sendLabel.setTouchEnabled(true);
        
        inputLayer._enabled = false;  // enabled is true means the comment inputer is out
        sendLabel._enabled = false;   // sendLabel enabled means the input textbox is focused 
        
        inputLayer.enable = function() {
            if( !inputLayer._enabled ) {
                inputLayer._enabled = true;
                inputLayer.stopAllActions();
                inputLayer.runAction(Sequence([ Ease( ease.easeOutBack, MoveTo(0.5,scene.width/2,scene.height/2)), CallFunc(function(){
                    var text = inputElement.value;
                    if( text.length > 0 ) {
                        inputElement.focus();
                    }
                })]));
                inputLayer.setOpacity(0);
                inputLayer.runAction(FadeIn(0.5));
            }
        }
        
        inputLayer.disable = function() {
            if( inputLayer._enabled ) {
                inputLayer.stopAllActions();
                inputLayer.runAction(MoveTo(0.3,scene.width/2, inputLayerStandY));
                inputLayer._enabled = false;
                inputLayer.runAction(FadeOut(0.3));
            }
        }
        
        commentBtn.show = function() {
            if( !commentBtn._enabled ) {
                commentBtn._enabled = true;
                commentBtn.stopAllActions();
                commentBtn.setVisible(true);
                commentBtn.setOpacity(0);
                commentBtn.runAction(Sequence([FadeIn(0.5),CallFunc(function() {
                    commentBtn.setTouchEnabled(true);
                    commentBtn.runAction(RepeatForever(Sequence([ FadeTo(0.5,0.6), FadeTo(0.5,1)])));
                })]));
            }
        }
        
        commentBtn.hide = function() {
            if( commentBtn._enabled ) {
                commentBtn._enabled = false;
                commentBtn.stopAllActions();
                commentBtn.runAction(Sequence([FadeOut(0.5),CallFunc(function() {
                    commentBtn.setTouchEnabled(false);
                    commentBtn.setVisible(false);
                })]));
            }
        }
        
        commentBtn.touchEnded = function() {
            if( !inputLayer._enabled ) {
                var audio = document.getElementById("Button");
                if(audio) audio.play();
                inputLayer.enable();
                commentBtn.hide();
            }
        }
        
        commentInputer.enable = function() {
            if(!commentInputer._enabled) {
                commentBtn.show();
                commentInputer._enabled = true;
            }
        }
        
        commentInputer.disable = function() {
            if(commentInputer._enabled) {
                inputLayer.disable();
                commentBtn.hide();
                commentInputer._enabled = false;
            }
        }
        
        inputLayerFg.touchEnded = function() {
            if( inputLayer._enabled ) {
                inputElement.focus();
            }
        }
        
        inputElement.onfocus = function() {
            sendLabel.runAction( RepeatForever(Sequence([ FadeTo(0.5,0.6), FadeTo(0.5,1)])) );
            sendLabel._enabled = true;
        }
        
        inputElement.onblur = function() {
            sendLabel.stopAllActions();
            sendLabel._enabled = false;
            sendLabel.setOpacity(0.86);
            
            inputLayer.disable();
            commentBtn.show();
        }
        
        inputElement.cancel = function() {
            if(commentInputer._enabled) {
                if(sendLabel._enabled) {
                    inputElement.blur();
                }
                inputElement.onblur();
            }
        }
        
        sendLabel.touchEnded = function() {
            if( sendLabel._enabled 
            && typeof(commentRef) !== 'undefined' ) {
                var text = inputElement.value;
                
                if( text.length > 35 ) {
                    alert("字数太长了！");
                    return;
                }
                
                if( text.length == 0 ) {
                    return;
                }
                
                if( text !== "" ) {
                    commentRef.child("Page"+commentRef._currentPage).push(text);
                    inputElement.value = "";
                    inputElement.blur();
                }
            }
        }
    }
    
    function AudioAutoPlay(id){
        var audio = document.getElementById(id);
        audio.play();
        document.addEventListener("WeixinJSBridgeReady", function () {
            audio.play();
        }, false);
    }
    
    (function init() {
        
        scene = CreateScene();
        
        if(!Sys.isIOS) EnableOpenGL(scene);
        
        AddClouds(scene);
        AddPlane(scene);
        AddRainbow(scene);
        AddEarth(scene);
        
        if( scene._isGLNode ) {
            glScene = scene;
            scene = CreateTransparentScene();
        }
        
        dialog = AddDialog(scene);
        var touchLayer = AddTouchLayer(scene);
        touchLayer.setControledObject(dialog);
        touchLayer.setDepth(10);
        
        var viewBtn = AddViewPlaneDrawingButton(scene);
        touchLayer._viewBtn = viewBtn;
        dialog._viewBtn = viewBtn;
        dialog._viewBtn.setDepth(15);
                    
        EnableComment( scene );
        AddCommentInputer(scene);
        AudioAutoPlay("BgMusic");
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
    if( !Sys.isAndroid && !Sys.isIOS ) {
        scene.setContentSize(CCSizeMake(320, 520));
    } else {
        scene.setContentSize(CCSizeMake(320, 320*h/w));
    }
    scene.setColor(skyColor);
    scene.element.setAttribute('class','scene');
    
    var processLabel = createLabelDefaultStyle( "LOADING 0%", scene.width/2, scene.height/2);
    scene.addChild(processLabel);
    processLabel.setContentSize(CCSizeMake(scene.width,20));
    processLabel.setColor("#FFFFFF");
    processLabel.setTextAlign("center");
    
    processLabel.runAction(RepeatForever(Sequence([DelayTime(0.1), CallFunc(function() {
        processLabel.setString("LOADING "+ parseInt(getLoadingPercentage()) + "%");
        if( isAllResourceReady() ) {
            sceneToLoad.show();
            scene.removeAllChildsAndCleanUp(true);
            scene.removeFromParent();
            processLabel.stopAllActions();
        }
    })])));
}

function LandscapeTipScene() {
    
    var w = window.innerWidth < window.innerHeight ? window.innerWidth : window.innerHeight;
    var h = window.innerWidth > window.innerHeight ? window.innerWidth : window.innerHeight;
    
    var scene = CCScene.create();
    if( !Sys.isAndroid && !Sys.isIOS ) {
        scene.setContentSize(CCSizeMake(320, 520));
    } else {
        scene.setContentSize(CCSizeMake(320, 320*h/w));
    }
    scene.setTouchEnabled(true);
    scene.setVisible(false);
    scene.element.setAttribute('class','scene');
    
    var tipLabel = createLabelDefaultStyle( "请竖屏观看！", scene.width/2, scene.height/2);
    scene.addChild(tipLabel);
    tipLabel.setContentSize(CCSizeMake(320,20));
    tipLabel.setTextAlign("center");
    tipLabel.setOpacity(0.6);
    
    SetOrintationLisener(function(orintation) { //检测横竖屏旋转
        if( orintation === "landscape" ) {
            //scene.setContentSize(CCSizeMake( 320, 320*window.innerHeight/window.innerWidth));
            //tipLabel.setPosition( 160, window.innerWidth/2);
            //scene.setVisible(true);
            //SetTimeScale(0);
        } else if( orintation === "portrait" ){
            scene.setVisible(false);
            //SetTimeScale(1);
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
