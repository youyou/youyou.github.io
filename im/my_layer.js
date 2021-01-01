//获取密钥对
function getRsaKeys(func)
{
    window.crypto.subtle.generateKey(
        {
            name: "RSA-OAEP",
            modulusLength: 2048, //can be 1024, 2048, or 4096
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: {name: "SHA-512"}, //can be "SHA-1", "SHA-256", "SHA-384", or "SHA-512"
        },
        true, //whether the key is extractable (i.e. can be used in exportKey)
        ["encrypt", "decrypt"] //must be ["encrypt", "decrypt"] or ["wrapKey", "unwrapKey"]
    ).then(function(key){
        window.crypto.subtle.exportKey(
            "pkcs8", 
            key.privateKey 
        ).then(function(keydata1){
            window.crypto.subtle.exportKey(
                "spki",
                key.publicKey 
            ).then(function(keydata2){
                var privateKey = RSA2text(keydata1,1);
                var publicKey = RSA2text(keydata2);
                func(privateKey,publicKey);
            }).catch(function(err){
                console.error(err);
            });
        })
        .catch(function(err){
            console.error(err);
        });
    })
    .catch(function(err){
        console.error(err);
    });
}

function RSA2text( buffer, isPrivate=0) {
        var binary = '';
        var bytes = new Uint8Array(buffer);
        var len = bytes.byteLength;
        for (var i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i]);
        }
        var base64 = window.btoa(binary);

        var text = "";//"-----BEGIN "+(isPrivate?"PRIVATE":"PUBLIC")+" KEY-----\n";
        
        text += base64.replace(/[^\x00-\xff]/g,"$&\x01").replace(/.{64}\x01?/g,"$&\n");

        //text += "\n-----END "+(isPrivate?"PRIVATE":"PUBLIC")+" KEY-----";

        return text;
}

function has_rsa_key_pair()
{
    var private_key = localStorage.getItem("private_key");
    var public_key  = localStorage.getItem("public_key");

    return private_key && public_key;
}

function str2ab(str) {
    const buf = new ArrayBuffer(str.length);
    const bufView = new Uint8Array(buf);
    for (let i = 0, strLen = str.length; i < strLen; i++) {
        bufView[i] = str.charCodeAt(i);
    }
    return buf;
}
    
function ab2str(buf) {
    return String.fromCharCode.apply(null, new Uint8Array(buf));
}

var public_key = null;
var private_key = null;

function rsa_encrypt(msg)
{
    let emsg = new TextEncoder().encode(msg);

    let encrypted = crypto.subtle.encrypt(
        {
            name: "RSA-OAEP"
        },
        public_key,
        emsg
    );

    return encrypted;
}

function rsa_decrypt(encrypted)
{
  return window.crypto.subtle.decrypt(
    {
      name: "RSA-OAEP"
    },
    private_key,
    encrypted
  );
}

function importPublicKey()
{
    var base64_public_key = localStorage.public_key;

    var binary_public_key = window.atob(base64_public_key);

    return window.crypto.subtle.importKey(
        "spki",
        str2ab(binary_public_key),
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        true,
        ["encrypt"]
    );
}

function importPrivateKey()
{
    var base64_private_key = localStorage.private_key;

    var binary_private_key = window.atob(base64_private_key);

    return window.crypto.subtle.importKey(
        "pkcs8",
        str2ab(binary_private_key),
        {
            name: "RSA-OAEP",
            hash: "SHA-256",
        },
        true,
        ["decrypt"]
    );
}

function test_rsa()
{
    if(!has_rsa_key_pair()) return;

    var original_message = "Hello World!";
    rsa_encrypt(original_message)
        .then(
            function(secret)
            {
                rsa_decrypt(secret).then(
                    function(message)
                    {
                        var result_message = ab2str(message);

                        if( original_message === result_message)
                            cclog("RSA encode and decode:PASS!");
                        else
                            cclog("RSA encode and decode:FAILED!");
                    }
                );
            }
        );
}

function setup_my_layer_ui(my_layer)
{
    test_rsa();

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
    if( event == "delete" ) {
    }
    else if( event == "deleted" ) {
    }
    else if( event ==  "end" ) {
    }
  }

  var items = create_table_view(CCSizeMake( contacts_layer.width, contacts_layer.height), 50, 1, 0, update_cell, cell_event);

  var public_key_string  = localStorage.getItem("public_key");
  var private_key_string = localStorage.getItem("private");

  public_key_string  = public_key_string ? public_key_string.substr(0,20) + "..." : "null";
  private_key_string = private_key_string ? private_key_string.substr(0,20) + "..." : "null";

  items.setDataSource([ "公钥:" + public_key_string,
                        "私钥:" + private_key_string,
                        "设置"]);

  items.setAnchorpoint(0,0);
  items.setPosition(0,31);

  items.layout = function( w, h)
  {
    this.setContentSize(CCSizeMake(w,h-tab_bar.height-30));
  };
  items.layout( contacts_layer.width, contacts_layer.height);

  my_layer.addChild(items);
}

function import_rsa_key_pair(on_finished)
{
    importPublicKey().then(function(key)
    {
        public_key = key;
        importPrivateKey().then(
                function(key)
                {
                    private_key = key;

                    on_finished();

                    //setup_my_layer_ui(my_layer);
                }
            );
    });
}

function generate_key_pair(on_finished)
{
    // generate rsa key pair
    getRsaKeys(function( privateKey, publicKey)
    {
      cclog(privateKey);
      
      localStorage.setItem( "private_key", privateKey);
      
      cclog(publicKey);
      
      localStorage.setItem( "public_key", publicKey);

      import_rsa_key_pair(on_finished);
    });
}

function setup_my_layer(my_layer)
{    
    localStorage.removeItem("public_key");

    // function on_finished_setup_rsa()
    // {
    //     setup_my_layer_ui(my_layer);
    // }
    // 
    // if( has_rsa_key_pair() )
    // {
    //     import_rsa_key_pair(on_finished_setup_rsa);
    // }
    // else
    // {
    //     generate_key_pair(on_finished_setup_rsa);
    // }
    
    setup_my_layer_ui(my_layer);
}