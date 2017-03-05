#!/usr/bin/env python

import create2api
import time
import BaseHTTPServer
import json

HOST_NAME = 'localhost' #
PORT_NUMBER = 666 # Maybe set this to 9000.


bot = create2api.Create2()



class MyHandler(BaseHTTPServer.BaseHTTPRequestHandler):
    def do_HEAD(s):
        s.send_response(200)
        s.send_header("Content-type", "text/json")
        s.end_headers()
    def do_GET(s):
        """Respond to a GET request."""
        s.send_response(200)
        s.send_header("Content-type", "text/html")
        s.end_headers()
        #s.wfile.write(

        bot.get_packet(100)
        json.dump({'Angle': str(bot.sensor_state["angle"]), 'Distance' : str(bot.sensor_state["distance"])}, s.wfile)

if __name__ == '__main__':
    server_class = BaseHTTPServer.HTTPServer
    httpd = server_class((HOST_NAME, PORT_NUMBER), MyHandler)
    print time.asctime(), "Server Starts - %s:%s" % (HOST_NAME, PORT_NUMBER)
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        pass
    httpd.server_close()
    print time.asctime(), "Server Stops - %s:%s" % (HOST_NAME, PORT_NUMBER)

