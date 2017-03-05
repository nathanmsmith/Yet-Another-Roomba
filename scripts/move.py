#!/usr/bin/env python

import create2api
import sys

bot = create2api.Create2()

velocity = float(sys.argv[1])
angle = float(sys.argv[2])

bot.drive(velocity, angle)
