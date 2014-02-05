#!/bin/sh -x


## Globals

npm install -g bower
npm install -g forever

## Project Specific
 
npm install --production

## Client/Web Specific

bower install --allow-root
