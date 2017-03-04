import create2api
import time

#CHANGE LINE 108 IN CREATE2API TO THE CORRECT SERIAL (Run ls /dev/tty.*)

#Create a Create2. This will automatically try to connect to your
#   robot over serial
bot = create2api.Create2()

#Start the Create2
bot.start()

#Put the Create2 into 'safe' mode so we can drive it
bot.safe()

#Tell the Create2 to drive straight forward at a speed of 100 mm/s
#bot.drive_straight(100)

#bot.turn_clockwise(100)

#Wait for 5 seconds
#time.sleep(5)
#bot.clean()
for i in range(100):
    bot.get_packet(100)
    #dump = json.dumps(bot.sensor_state, indent=4, sort_keys=True)
    #dump = json.loads(bot.sensor_state)
    print "angle: ", bot.sensor_state["angle"]
    print "distance: ", bot.sensor_state["distance"]
    bot.drive(100, -1000) #velocity, radius of turn (-1 and 1 for turn in place)
    time.sleep(1)
#Tell the Create2 to drive straight backward at a speed of 100 mm/s
#bot.drive_straight(-100)

#Wait for 5 seconds
time.sleep(5)

#Stop the bot
bot.drive_straight(0)

#Close the connection
bot.destroy()
