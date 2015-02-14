@echo off
title Twitch Follower App - Settings
echo Please enter the information requested below!
set /P CNAME="Please enter your channel name (just like how it shows on your twitch URL): " || set CNAME=nothingchoosen
set /P TIMELINE="What Time line are looking for (Default is Weekly): " || set TIMELINE=Weekly
set /P GOAL="How many Followers is your goal (Default is 50): " || set GOAL=50
set /P INTERVAL="How Often do you want to check twitch (in seconds and Default is 60): " || set INTERVAL=60
if NOT %CNAME% == nothingchoosen (@echo %CNAME%,%TIMELINE%,%GOAL%,%INTERVAL% > settings.csv) Else (echo ERROR: You have to have a channel to use this program)
set /P exit="Press enter to close..."