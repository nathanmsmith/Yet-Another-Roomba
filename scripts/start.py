#!/usr/bin/env python

import create2api

#CHANGE LINE 108 IN CREATE2API TO THE CORRECT SERIAL (Run ls /dev/tty.*)

#Create a Create2. This will automatically try to connect to your
#   robot over serial
bot = create2api.Create2()

#Start the Create2
bot.start()

#Put the Create2 into 'safe' mode so we can drive it
bot.safe()
