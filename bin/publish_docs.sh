#!/bin/bash

if [ ! -d "gen" ]; then
  echo "Generate docs first using:"                             1>&2
  echo "    ./bin/build_docs.sh"                                1>&2

  exit 1
fi

if [ git diff-index --quiet HEAD -- ]; then
  echo "Stash your changes first before trying to publish docs" 1>&2

  exit 1
fi

orphan="--orphan"

SAVED_BRANCH=$(git branch | sed 's/\* //g')

if ! git checkout "$orphan" gh-pages; then
  git checkout gh-pages
fi

find . \
  -not -path '.' \
  -not -path '**/.git/**' \
  -not -path '**/.git' \
  -not -path '**/gen' \
  -not -path '**/gen/**' \
  -exec rm -rf {} \;

mv gen/* .

rm -rf gen

git add .

git commit -m "gh-pages update ${RANDOM}.${RANDOM}"

git push

git checkout $SAVED_BRANCH

