@echo off
setlocal enabledelayedexpansion

:: Set the base name and start number
set "base_name=2024-nash-"
set "extension=.jpg"
set /a counter=0

:: Loop through all files in the folder
for %%F in (*%extension%) do (
    :: Build the new file name
    set "new_name=!base_name!!counter!!extension!"

    :: Rename the file
    ren "%%F" "!new_name!"

    :: Increment the counter
    set /a counter+=1
)

echo All files have been renamed successfully!
pause
