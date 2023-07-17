@echo off
set /p commit_message="Enter a commit message: "

echo.
echo Committing with message: "%commit_message%"

git checkout master
git pull
git add .
git commit -m "%commit_message%"
git push origin master

echo.
echo Done!
pause
