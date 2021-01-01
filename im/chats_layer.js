function setup_chats_layer(chats_layer)
{
  // table view
  function update_cell( view, row)
  {
      var cell = view.getCell("cell");

      if( typeof(cell.label) === "undefined" )
      {
        cell.setColor("#ffffff");
        cell.setBgOpacity(0.1);

        var head_icon_original_size = 64;
        var head_icon_scale = 0.6;
        var head_icon_size  = head_icon_original_size*head_icon_scale;
        var head_icon_padding = 10;

        var label_left = head_icon_size + head_icon_padding*2;

        // message preview label
        var label = CCLabel.create("test!");
        cell.addChild(label);
        cell.label = label;

        label.padding = 20;
        label.setAnchorpoint( 0, 0);
        label.setPosition( label_left, cell.height/2);
        label.setColor("#cccccc");
        label.setFontSize(13);
        //label.setBgColor("#aa0000");
        label.layout = function( w, h)
        {
          this.setContentSize(CCSizeMake( w - label_left, h/2));
        }
        label.layout( cell.width, cell.height);

        //label.element.style["font-family"] = "Helvetical";

        // head icon
        var head_icon = CCSprite.create("asset/img/head.jpg");

        cell.addChild(head_icon);
        
        head_icon.setPosition(label.padding/2 + head_icon_size/2, cell.height/2);
        head_icon.setScale(head_icon_scale);
        head_icon.element.style.borderRadius = "5px";

        // name label
        var name_label = CCLabel.create("youyou");
        cell.addChild(name_label);
        cell.name_label = name_label;

        name_label.setAnchorpoint( 0, 0);
        name_label.setPosition( label_left, 0);
        name_label.setColor("#eeeeee");
        //name_label.setColor("#003377");
        name_label.setFontSize(13);
        name_label.layout = function( w, h)
        {
          this.setContentSize(CCSizeMake( w - label_left, cell.height/2));
        }
        name_label.layout( cell.width, cell.height);

        // new message dot
        var dot = CCLayer.create();
        dot.setContentSize(CCSizeMake( 6, 6));
        dot.setPosition( label.padding/2 + head_icon_size-1, (cell.height - head_icon_size)/2 );
        dot.setColor("#ff0000");
        cell.addChild(dot);
        dot.element.style.borderRadius = "3px";
      }

      cell.label.setString(view.dataSource[row]);
      //cell.label.setString(""+row);

      return cell;
  }

  function cell_event( row, event )
  {
    console.log(event+":"+row);
    
    if( event == "delete" )
    {

    }
    else if( event == "deleted" )
    {

    }
    else if( event ==  "end" )
    {
      // load chat of user
      var message = ["我: 好的","你已添加xxx,可以开始聊天了","[语音通话]","[偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑][偷笑]","[语音通话]","你已添加xxx,可以开始聊天了","[语音通话]","[偷笑][偷笑][偷笑]","[语音通话]","[语音通话]","你已添加xxx,可以开始聊天了","[语音通话]","[偷笑][偷笑][偷笑]","[语音通话]"];
      
      var chat_layer = create_chat_layer( scene, "youyou", message);
      
      PushView(chat_layer);
    }
  }
  
  var chats = create_table_view(CCSizeMake( chats_layer.width, chats_layer.height), 50, 1, 0, update_cell, cell_event);

  chats.setDataSource(["我: 好的","你已添加xxx,可以开始聊天了","[语音通话]","[偷笑][偷笑][偷笑]","[语音通话]","你已添加xxx,可以开始聊天了","[语音通话]","[偷笑][偷笑][偷笑]","[语音通话]","[语音通话]","你已添加xxx,可以开始聊天了","[语音通话]","[偷笑][偷笑][偷笑]","[语音通话]"]);

  chats.setAnchorpoint(0,0);
  chats.setPosition(0,31);

  chats.layout = function( w, h)
  {
    this.setContentSize(CCSizeMake(w,h-tab_bar.height-30));
  };
  chats.layout( chats_layer.width, chats_layer.height);

  chats_layer.addChild(chats);
}