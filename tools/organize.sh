#!/usr/bin/env bash

LGREEN='\033[1;32m'
LCYAN='\033[1;36m'
NC='\033[0m'

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

SRCDIRS=""
mapfile -t M < <( ls -1 "$DIR/../packages/" )
for i in "${M[@]}"
do
  if [ "$i" != "examples" ]
  then
    SRCDIRS+="packages/$i/src"$'\n'
  fi
done

mapfile -t M < <( ls -l "$DIR/../packages/examples/" )
for i in "${M[@]}"
do
  SRCDIRS+="packages/examples/$i/src"$'\n'
done

banner () {
  printf "\n${LCYAN}#################################################${NC}\n"
  printf "  ${LGREEN}%s${NC}\n" "$1"
  printf "${LCYAN}#################################################${NC}\n"
}

banner "Sorting package.json files"
npx sort-package-json
yarn lerna run sort

cd "$DIR/.." || exit
