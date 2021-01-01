
// TODO::
//
// move QALayer here
// move TableView here
//

function CreateScene()
{
    var w = window.innerWidth;
    var h = window.innerHeight;

    var scene = CCScene.create();
    scene.element.style.overflow = "visible";

    scene.setContentSize(CCSizeMake(w, h));
    scene.setPosition( w/2, h/2);
    //scene.setColor("#eeeeee");

    SetTouchEnabled( scene, true, true);
    
    //scene.setVisible(false);
    
    scene.element.setAttribute('class','scene');

    scene.setAnchorpoint( 0, 0);
    scene.setPosition( 0, 0);

    scene.layout = function ( w, h)
    {
      scene.setContentSize(CCSizeMake(w, h));

      for (var i = 0; i < scene.childs.length; i++) {
          if( typeof(scene.childs[i].layout) === "function" ) {
              scene.childs[i].layout( w, h);
          }
      };
    }

    function resize() {
        scene.layout( window.innerWidth, window.innerHeight);
    }

    window.addEventListener('resize', resize);

    function on_orintation_change(orintation) 
    {
      scene.layout( window.innerWidth, window.innerHeight);
    }
    SetOrintationLisener(on_orintation_change);

    return scene;
}

function CreateIcon(icon_path)
{
  var icon_img = CCSprite.create(icon_path);

  var icon_div = CCLayer.create();
  icon_div.element.style.overflow = "hidden";
  icon_div.image = icon_img;

  icon_div.setColor = function(color_str)
  {
    var offset = window.innerWidth;

    if( typeof(this.image.width) !== "undefined" )
      if( this.image.width > 0 )
        offset = parseInt(this.image.width);

    this.image.element.style.transform = "translateX(-"+offset+"px)";
    this.image.element.style.filter = "drop-shadow("+offset+"px 1px "+color_str+")";
    this.image.element.style.overflow = "hidden";
  };

  icon_img.onload = function()
  {
    icon_div.setContentSize(CCSizeMake(icon_img.width,icon_img.height));
    icon_div.setPosition(icon_div.x,icon_div.y);
    icon_div.addChild(icon_img);
    icon_img.setAnchorpoint( 0, 0);
  };

  icon_div.setScale = function(scale)
  {
    this.image.setScale(scale);
  };

  return icon_div;
}

// create a child layer that cover parent node
function CreateCoverLayer( parent_node )
{
  var cover_layer = CCLayer.create();

  parent_node.addChild(cover_layer);

  cover_layer.setAnchorpoint( 0, 0);
  cover_layer.setPosition( 0, 0);
  
  cover_layer.layout = function( w, h)
  {
    this.setContentSize(CCSizeMake( w, h));
  }
  cover_layer.layout( parent_node.width, parent_node.height);

  return cover_layer;
}

function CreateTabView( parent_node )
{
  var tab_view = CreateCoverLayer( parent_node );

  var tab_bar = CCLayer.create();
  tab_bar.setDepth(100);

  tab_view.addChild(tab_bar);

  tab_bar.setAnchorpoint( 0, 1);
  tab_bar.setColor("#ffffff");

  tab_bar.layout = function( w, h)
  {
    tab_bar.setContentSize( CCSizeMake( w, 50) );
    tab_bar.setPosition( 0, h);
  }
  tab_bar.layout( tab_view.width, tab_view.height);

  tab_view.tab_bar = tab_bar;

  tab_bar.parent = tab_view;
  tab_bar.num_tabs = 0;
  tab_bar.tabs = [];
  tab_bar.titles = [];
  tab_bar.icons = [];

  tab_bar.createTab = function( icon, title)
  {
    // tab layer
    var tab_layer = CCLayer.create();
    tab_bar.tabs.push(tab_layer);

    this.parent.addChild(tab_layer);

    tab_layer.setAnchorpoint( 0, 0);
    tab_layer.setPosition( 0, 0);

    tab_layer.setVisible(false);

    tab_layer.layout = function( w, h)
    {
      this.setContentSize(CCSizeMake( w, h));
    }
    tab_layer.layout( this.parent.width, this.parent.height);

    // title
    var title_label = CCLabel.create(title);
    tab_layer.addChild(title_label);
    title_label.setColor("#ffffff");
    title_label.setTextAlign("center");
    title_label.setAnchorpoint( 0, 0);
    title_label.setPosition( 0, 0);
    
    title_label.setBgColor("#ffffff");
    title_label.setBgOpacity(0.1);

    title_label.layout = function( w, h)
    {
      this.setContentSize( CCSizeMake( w, 30));
    };
    title_label.layout( tab_layer.width, tab_layer.height);

    var tab_title = CCLabel.create(title);
    tab_bar.titles.push(tab_title);

    tab_title.index = this.num_tabs;
    tab_title.tab_bar = this;

    this.addChild(tab_title);
    tab_title.setFontSize(10);
    //tab_title.setColor("#555555");
    tab_title.setAnchorpoint( 0, 0);
    tab_title.setTextAlign("center");
    //tab_title.setBgColor("#00aaff");

    var tab_icon = CreateIcon(icon); //CCSprite.create(icon);
    tab_bar.icons.push(tab_icon);

    tab_icon.index = this.num_tabs;
    tab_icon.tab_bar = this;
    //tab_icon.setColor("#555555");
    tab_icon.setScale(0.5);

    this.addChild(tab_icon);
    tab_icon.setAnchorpoint( 0.5, 0.5);
    this.num_tabs++;

    tab_title.layout = function( w, h)
    {
      var tab_width = (w/this.tab_bar.num_tabs);

      tab_title.setContentSize(CCSizeMake( tab_width, this.tab_bar.height/2));

      tab_title.setPosition( tab_width*this.index, this.tab_bar.height*2/3 - 6);
    }
    tab_title.layout( this.width, this.height);

    // tab title
    tab_icon.layout = function( w, h)
    {
      var tab_width = (w/this.tab_bar.num_tabs);

      //tab_icon.setContentSize(CCSizeMake( tab_width, this.tab_bar.height/2));

      tab_icon.setPosition( tab_width*this.index + tab_width/2, this.tab_bar.height/3);
    }
    tab_icon.layout( this.width, this.height);

    this.layout( this.parent.width, this.parent.height);

    return tab_layer;
  }

  tab_bar.setTouchEnabled(true);

  tab_bar.currentTabIndex = -1;

  tab_bar.selectTab = function(index) 
  {
    if( index == this.currentTabIndex )
      return;

    // focus layer
    for (var i = this.tabs.length - 1; i >= 0; i--) {
      this.tabs[i].setVisible(false);
    }
    this.tabs[index].setVisible(true);

    // focus tab
    for (var i = this.titles.length - 1; i >= 0; i--) {
      this.titles[i].setColor("#ffffff");
      this.titles[i].setOpacity(0.5);
    }
    //this.titles[index].setColor("#ffffff");
    this.titles[index].setOpacity(1);

    for (var i = this.icons.length - 1; i >= 0; i--) {
      this.icons[i].setColor("#ffffff");
      this.icons[i].setOpacity(0.5);
    }
    this.icons[index].setColor("#ffffff");
    this.icons[index].setOpacity(1);

    this.currentTabIndex = index;
  };

  tab_bar.touchEnded = function( x, y)
  {
    cclog( x + "," + y);
    
    var tab_width = (this.width/this.num_tabs);

    var tab_index = parseInt(Math.floor(parseInt(x)/parseInt(tab_width)));

    cclog("tab_index:" + tab_index);

    this.selectTab(tab_index);
  };

  return tab_view;
}


var view_stack = [];

view_stack.animating  = false;

function SetRootView(view)
{
  view_stack.push(view);
}

function PushView(to_view)
{
  if( view_stack.length <= 0  || view_stack.animating ) return;

  view_stack.animating  = true;

  var from_view = view_stack[view_stack.length-1];

  function end_animation()
  {
      from_view.setVisible(false);
      view_stack.animating = false;
  }

  from_view.runAction(MoveBy( 0.3, -from_view.width*0.618, 0));
  from_view.runAction(Sequence([FadeOut( 0.3), CallFunc(end_animation)]));

  to_view.setVisible(true);
  to_view.setPosition( to_view.width, 0);
  to_view.runAction(MoveTo( 0.3, 0, 0));

  view_stack.push(to_view);
}

function PopView()
{
  if( view_stack.length < 2 || view_stack.animating ) return;

  view_stack.animating  = true;

  var from_view = view_stack.pop();
  var to_view = view_stack[view_stack.length-1];

  function end_animation()
  {
      from_view.setVisible(false);
      view_stack.animating = false;
  }

  from_view.runAction(Sequence([MoveTo( 0.3, to_view.width, 0), CallFunc(end_animation)]));

  to_view.setVisible(true);
  to_view.runAction(MoveTo( 0.3, 0, 0));
  to_view.runAction(FadeIn( 0.3));
}
