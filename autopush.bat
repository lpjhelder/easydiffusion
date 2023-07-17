# Here is the modified batch file that performs git operations (pull, add, commit, push) and 
# displays which branch the operations are being performed on.

batch_script = r"""
@echo off
set /p commit_message="Enter a commit message: "

echo.
echo Committing with message: "%commit_message%"

echo.
echo Getting current branch...
for /f "tokens=2" %%b in ('git rev-parse --abbrev-ref HEAD') do (
    set current_branch=%%b
)

echo.
echo Current branch is: %current_branch%

echo.
echo Pulling latest changes from %current_branch%...
git pull origin %current_branch%

echo.
echo Staging changes...
git add .

echo.
echo Committing changes...
git commit -m "%commit_message%"

echo.
echo Pushing commits to %current_branch%...
git push origin %current_branch%

echo.
echo Done!
pause
"""

with open("git_push_pull.bat", "w") as file:
    file.write(batch_script)

"git_push_pull.bat script created successfully."
