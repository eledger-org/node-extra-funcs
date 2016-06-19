#!/bin/bash

if [ ! -f "$(which yuidoc)" ]; then
  echo "Try installing yuidoc before generating docs." 1>&2
  echo "    sudo npm install -g yuidocjs" 1>&2

  exit 1
fi

yuidoc -o gen .

