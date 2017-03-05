#!/usr/bin/env python

bot.get_packet(100)
print "angle: ", bot.sensor_state["angle"]
print "distance: ", bot.sensor_state["distance"]
