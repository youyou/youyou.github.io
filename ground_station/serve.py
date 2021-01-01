#!/usr/bin/python
# -*- coding: utf-8 -*-

import SimpleHTTPServer
import SocketServer

Handler = SimpleHTTPServer.SimpleHTTPRequestHandler 

httpd = SocketServer.TCPServer(("", 80), Handler)

httpd.serve_forever()
