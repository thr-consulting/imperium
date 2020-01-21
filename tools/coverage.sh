#!/usr/bin/env bash

BIN=$PWD/../../node_modules/.bin
COVERAGE=$PWD/../../docs/assets/coverage
NAME=`basename $PWD`

# Delete previous coverage info
rm -rf $COVERAGE/$NAME

# Generage coverage info
$BIN/jest --coverage

# Generate coverbadge svg
cat $COVERAGE/$NAME/lcov.info | $BIN/coverbadge -o $COVERAGE/$NAME/coverage.svg

# Copy template index.html and replace text
cp $PWD/../../tools/template.html $COVERAGE/$NAME/index.html
sed -i -e 's/IFRAMEURL/\.\/lcov-report\/index.html/g' $COVERAGE/$NAME/index.html
sed -i -e "s/XX_TITLE/$NAME/g" $COVERAGE/$NAME/index.html
