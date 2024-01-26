func open_graph()
{
    doJSString("open_graph();");
}

func fillRect(x,y,w,h)
{
    doJSString("graph.fillRect("+x+","+y+","+w+","+h+");");
}

func setPixel( x, y)
{
    fillRect(x,y,1,1);
}

func fillColor(r,g,b,a)
{
    code = "graph.fillStyle=\"rgba("+r+","+g+","+b+","+a+")\";";
    doJSString(code);
}

func beginPath()
{
	doJSString("graph.beginPath();");
}

func moveTo(x,y)
{
	doJSString("graph.moveTo("+x+","+y+");");
}

func lineTo(x,y)
{
	doJSString("graph.lineTo("+x+","+y+");");
}

func getWindowSize()
{
	size = Object();
	size.width = doJSStringInt("display_layer.width");
	size.height = doJSStringInt("display_layer.height");
	return size;
}

open_graph();

window_size = getWindowSize();

print( window_size.width, window_size.height);

fillColor(255,255,255,255);

beginPath();

moveTo( 0, window_size.height/2);

for( i=1; i<window_size.width; i+=1)
{   
    lineTo( i, cos(i*0.1)*window_size.height/4 + window_size.height/2 );
}