#!/usr/bin/env bash

BIN=$PWD/../../node_modules/.bin
COVERAGE=$PWD/../../docs/assets/coverage
NAME=$1
COLLECT_DEFAULT="src/**/*.js"
COLLECT_PASSED=$2
COLLECT=${COLLECT_PASSED:-"src/**/*.js"}

$BIN/jest --coverage --coverageDirectory $COVERAGE/$NAME --collectCoverageFrom=$COLLECT  && cat $COVERAGE/$NAME/lcov.info | $BIN/coverbadge -o $COVERAGE/$NAME/coverage.svg

cp $PWD/../../tools/template.html $COVERAGE/$NAME/index.html
sed -i -e 's/IFRAMEURL/\.\/lcov-report\/index.html/g' $COVERAGE/$NAME/index.html
sed -i -e "s/XX_TITLE/$NAME/g" $COVERAGE/$NAME/index.html
