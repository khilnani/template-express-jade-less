#!/bin/sh

if [ ! -d node_modules ]; then

  ## Globals
  npm install -g forever
  npm install -g handlebars
  npm install -g gulp

  ## Project Specific
   
  npm install
else
  echo "node_modules already exists"
fi

