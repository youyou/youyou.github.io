function create_chat_layer( parent_node, title, message)
{
  var chat_layer = CreateCoverLayer( parent_node );

  // title
  var title_label = CCLabel.create(title);
  chat_layer.addChild(title_label);
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
  title_label.layout( chat_layer.width, chat_layer.height);

  var back_button = CCSprite.create("asset/img/back.png");
  title_label.addChild(back_button);

  back_button.setAnchorpoint(0.5,0.5);
  back_button.setScale(0.3);
  back_button.setPosition( title_label.height/2, title_label.height/2);

  back_button.setTouchEnabled(true);
  back_button.touchEnded = function( x, y)
  {
    PopView();
  };

  var input_layer = CCLayer.create();
  chat_layer.addChild(input_layer);

  input_layer.setColor("#ffffff");
  input_layer.setAnchorpoint( 0, 0);
  input_layer.setBgOpacity(0.1);
  input_layer.target_height = 45;
  input_layer.layout = function( w, h)
  {
    input_layer.setContentSize(CCSizeMake( w, input_layer.target_height));
    input_layer.setPosition( 0, h - input_layer.target_height);

    var textarea = document.getElementById("message_input");
    if( textarea )
    {
      textarea.style.height = (input_layer.height - 10) + "px";
      textarea.style.width  = (input_layer.width-150) + "px";
    }
  }

  input_layer.element.align = "center";
  input_layer.element.innerHTML =
    "<textarea id='message_input' rows=1 style='font-size:16px;line-height:28px;margin-top:5px;height:auto;overflow:scroll;background-color:#ffffff25;color:white;border:none;border-radius:10px;outline:none;resize:none;' ></textarea>";
    
  var max_textarea_height = 125;

  var textarea = document.getElementById("message_input");

  textarea.addEventListener("input", (e) => {

    textarea.style.height = "35px";

    var target_height = e.target.scrollHeight;

    cclog("target_height:" + target_height);

    input_layer.target_height = target_height + 10;

    if(input_layer.target_height > max_textarea_height)
      input_layer.target_height = max_textarea_height;

    chat_layer.layout(chat_layer.parent.width, chat_layer.parent.height);
  });

  input_layer.layout( chat_layer.width, chat_layer.height);

  var content_layer = CCLayer.create();
  chat_layer.addChild(content_layer);

  content_layer.setAnchorpoint( 0, 0);
  content_layer.setPosition( 0, 30);

  content_layer.layout = function( w, h)
  {
      content_layer.setContentSize(CCSizeMake( w, h - 30 - input_layer.height));
  };
  content_layer.layout( chat_layer.width, chat_layer.height);

  content_layer.element.style.overflow = "auto";

  content_layer.addMessage = function( message, bLeft)
  {
    var align = bLeft ? "left" : "right";

    content_layer.element.innerHTML += "<div align='" + align + "' style='height:auto;margin:2px;padding:15px;padding-left:72;padding-right:72;position:relative;'><div style='width:auto;display:inline-block !important;display:inline;color:#eeeeee;background-color:#ffffff25;border-radius:10px;padding:10px;' align='left'>"  + message + "</div><img src='asset/img/head.jpg' style='width:42px;height:42px;border-radius:21px;background-color:blue;"+align+":15px;top:15px;position:absolute;'></img></div>";    
  };

  for(var index = 0; index < message.length; index++)
  {
    content_layer.addMessage(message[index], index%2==0);
  }

  // send button
  var send_button = CCLabel.create("发送");
  input_layer.addChild(send_button);
  send_button.setColor("#ffffff");
  send_button.setBgColor("#ffffff");
  send_button.setBgOpacity(0.2);
  send_button.setTextAlign("center");

  send_button.setAnchorpoint( 0.5, 0.5);
  send_button.layout = function( w, h)
  {
    send_button.setContentSize(CCSizeMake( 75, h));
    send_button.setPosition( w - 75/2, h/2);
  };
  send_button.layout(input_layer.width, input_layer.height);

  send_button.setTouchEnabled(true);

  send_button.touchEnded = function( x, y)
  {
      var textarea = document.getElementById("message_input");

      if( textarea.value === "" ) return;

      content_layer.addMessage( textarea.value, false);

      textarea.value = "";

      input_layer.target_height = 45;

      chat_layer.layout(chat_layer.parent.width, chat_layer.parent.height);
      
      content_layer.element.scrollTo( 0, content_layer.element.scrollHeight)
  };
  
  content_layer.element.scrollTo( 0, content_layer.element.scrollHeight)
  
  return chat_layer;
}

//create_chat_layer(message);