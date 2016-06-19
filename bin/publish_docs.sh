#!/bin/bash

if [ ! -d "gen" ]; then
  echo "Generate docs first using:"  1>&2
  echo "    ./bin/build_docs.sh"     1>&2
fi

if [ git diff-index --quiet HEAD -- ]; then
  echo "Stash your changes first before trying to publish docs"

  exit 1
fi

SAVED_BRANCH=$(git branch | sed 's/\* //g')

git stash

git checkout --orphan gh-pages

git stash pop

git commit -m "gh-pages update $RANDOM"

git push

git checkout $SAVED_BRANCH

