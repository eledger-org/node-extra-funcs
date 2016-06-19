#!/bin/bash

if [ -f "node_modules/.bin/jsdoc" ]; then
  cmd="node node_modules/.bin/jsdoc"
elif [  -f "$(which jsdoc)" ]; then
  cmd="jsdoc"
else
  echo "Try installing jsdoc before generating docs." 1>&2
  echo "    npm install jsdoc"                        1>&2
  echo "Or install it globally"                       1>&2
  echo "    sudo npm install -g jsdoc"                1>&2

  exit 1
fi

rm -rf gen
$cmd -d gen .

