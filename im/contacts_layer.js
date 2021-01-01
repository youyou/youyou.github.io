    
function setup_contacts_layer(contacts_layer)
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
        var label = CCLabel.create("");
        cell.addChild(label);
        cell.label = label;

        //label.padding = 20;
        label.setAnchorpoint( 0, 0);
        label.setPosition( label_left, 0);
        //label.setColor("#cccccc");
        label.setColor("#eeeeee");
        label.setFontSize(15);
        //label.setBgColor("#aa0000");
        label.layout = function( w, h)
        {
          this.setContentSize(CCSizeMake( w - label_left, h));
        }
        label.layout( cell.width, cell.height);

        // head icon
        var head_icon = CCSprite.create("asset/img/head.jpg");

        cell.addChild(head_icon);
        
        head_icon.setPosition( head_icon_padding + head_icon_size/2, cell.height/2);
        head_icon.setScale(head_icon_scale);
        head_icon.element.style.borderRadius = "5px";
      }

      cell.label.setString(view.dataSource[row]);
      //cell.label.setString(""+row);

      return cell;
  }

  function cell_event( row, event )
  {
    if( event == "delete" )
    {

    }
    else if( event == "deleted" )
    {

    }
    else if( event ==  "end" )
    {

    }
  }
  
  //contacts_layer.setColor("#006699");

  var contacts = create_table_view(CCSizeMake( contacts_layer.width, contacts_layer.height), 50, 1, 0, update_cell, cell_event);

  contacts.setDataSource(["youyou","youyou1","youyou2","youyou3","youyou4","youyou5"]);

  contacts.setAnchorpoint(0,0);
  contacts.setPosition(0,31);

  contacts.layout = function( w, h)
  {
    this.setContentSize(CCSizeMake(w,h-tab_bar.height-30));
  };
  contacts.layout( contacts_layer.width, contacts_layer.height);

  contacts_layer.addChild(contacts);
}