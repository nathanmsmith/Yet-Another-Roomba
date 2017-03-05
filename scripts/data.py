#!/usr/bin/env python

import create2api

bot = create2api.Create2()

bot.get_packet(100)
print("Angle: " + str(bot.sensor_state["angle"]))
print("Distance: " + str(bot.sensor_state["distance"]))
