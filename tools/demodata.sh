#!/usr/bin/env bash

LGREEN='\033[1;32m'
LCYAN='\033[1;36m'
NC='\033[0m'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

banner () {
  printf "\n${LCYAN}#################################################${NC}\n"
  printf "  ${LGREEN}%s${NC}\n" "$1"
  printf "${LCYAN}#################################################${NC}\n"
}

if [ -f "$DIR/../packages/examples/server/.env" ]
then
  export $(cat "$DIR/../packages/examples/server/.env" | sed 's/#.*//g' | xargs)
fi

banner "Adding Users"
psql "$POSTGRESQL_URL" -f "$DIR/demodata/users.sql"
banner "Adding Photos"
psql "$POSTGRESQL_URL" -f "$DIR/demodata/photos.sql"
