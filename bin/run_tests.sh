#!/bin/bash

set -e

echo "=============MOCHA==============="
./node_modules/mocha/bin/mocha --recursive
echo "==============END================"

echo "=============ESLINT=============="

node ./node_modules/eslint/bin/eslint.js \
  *.js \
  example \
  test \

echo "Eslint passed."
echo "==============END================"

echo "============EXAMPLES============="

for exampleProj in examples/*; do
  node $exampleProj
done

echo "Examples passed."
echo "==============FIN================"

