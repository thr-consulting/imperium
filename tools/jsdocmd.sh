#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null && pwd )"

cat README.md > ../../docs/api/$1.md
NODE_ENV=development $PWD/../../node_modules/.bin/jsdoc2md -c ./jsdoc.json --source " " --separators -g none -p table -m table --plugin dmd-clear >> ../../docs/api/$1.md

# --partial $DIR/dmd/sig-name.hbs $DIR/dmd/body.hbs
# --plugin dmd-clear
