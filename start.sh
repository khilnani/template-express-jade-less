#!/usr/bin/env sh

mkdir logs
NODE_ENV=production forever start -l NAME.log -e logs/error.log -o logs/output.log -a NAME.js
