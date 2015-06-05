# Twitch Follower App

So this is an app you can use to keep track of how many people follow you now and also will auto generate a text file you
point obs to. It auto updates so as people follow your channel it will change the number and obs will auto see it so if
you have the text showing on your stream people can see it there.

The core is finished and more updates will come that will add support for subs and other features people request.

To use this program you must have node downloaded and installed. you can get node from http://nodejs.org also you will
need to download this program (button is to the right) and unzip if necessary. you can put it anywhere you like. This app
also works on linux.

Steps to run the program

1. Run npm install (Only need to do this first time once downloaded)
2. Run start.bat (do not close this window and it will tell you every time it runs by saying it fired) to exit
   when done streaming press ctrl + c. first time running make sure to select option 2 to set the settings
3. Open OBS (If not already open).
4. In your sources make a text layer and tell it to pull from goal.txt which will show up the first time the
   app fires a check to twitch. Every time some one follows you and twitch has it saved it will auto update 
   count on the screen.

# Plans For Future

1. add sub support instead of followers it will be based on subs.
2. Anything else the community or I can think of.
