#!/usr/bin/env bash

RED='\033[0;31m'
GREEN='\033[0;32m'
ORANGE='\033[0;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
DGRAY='\033[1;30m'
LRED='\033[1;31m'
LGREEN='\033[1;32m'
YELLOW='\033[0;33m'
LBLUE='\033[1;34m'
LPURPLE='\033[1;35m'
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

banner "Patching jscodeshift"
patch -Nu "$DIR/../node_modules/jscodeshift/src/Runner.js" -i "$DIR/jscodeshift.patch"

banner "Codemod"
echo "${SRCDIRS::-1}" | yarn codemod -t "$DIR/codemod/cmCodegen.ts" --stdin
ret=$?
if [ $ret -ne 0 ]; then
  printf "\n${LRED}[ERROR] Error running codemod. Lint fixing will continue to prevent many changed files.${NC}\n"
fi

banner "Fixing lint issues"
yarn lerna run lint:fix --scope '@tacs/{server,web,domain,caller-id-lookup,document-processor,exchangerate-service,file-upload,mail-parser}'

if [ $ret -ne 0 ]; then
  printf "\n${LRED}Errors occured during generation. Some files may be left in an inconsistent state.${NC}\n"
fi
exit $ret
