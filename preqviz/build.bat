@echo off
REM Preqviz 2.0 - build the C graph program and regenerate data\results.js
gcc -std=c99 -Wall -Wextra -O2 -o preqviz.exe c\main.c c\graph.c c\traversal.c
if errorlevel 1 exit /b 1
preqviz.exe data\edges.txt data\results.js
if errorlevel 1 exit /b 1
fc /b data\results.js data\results.reference.js >nul && echo Output matches the reference. || echo WARNING: output differs from data\results.reference.js
