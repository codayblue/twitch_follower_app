# twitch follower app

So this is an app you can use to keep track of how many people follow you now and also will auto generate a text file you
point obs to. It auto updates so as people follow your channel it will change the number and obs will auto see it so if
you have the text showing on your stream people can see it there.

Right now it is working and you can use it but you will have to set the settings by hand. I plan on fixing this very soon with
batch files. Also you will need node in order for the app to work. So if you would like to run it now you can do a git clone 
or download from github. After you have it you can open up settings.csv, this is the file that holds the settings. So the order
you change them in is channel, what is your goal (ex Monthly, Weekly, Yearly), then you have whats the goal how many followers
are you aiming for, then last is the interval (in seconds). The interval does not show up on stream but is how often you want to
pull information from twitch. I suggest leaving that at 60 seconds.

# Plans for furture

1. add batch files to set settings and start the app.
2. add sub support instead of followers it will be based on subs.
3. Anything else the community or I can think of.
