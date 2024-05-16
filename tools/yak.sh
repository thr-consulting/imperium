#!/usr/bin/env bash

# This script opens certain environments in yakuake

SOURCE=${BASH_SOURCE[0]}
while [ -L "$SOURCE" ]; do # resolve $SOURCE until the file is no longer a symlink
  DIR=$( cd -P "$( dirname "$SOURCE" )" >/dev/null 2>&1 && pwd )
  SOURCE=$(readlink "$SOURCE")
  [[ $SOURCE != /* ]] && SOURCE=$DIR/$SOURCE # if $SOURCE was a relative symlink, we need to resolve it relative to the path where the symlink file was located
done
DIR=$( cd -P "$( dirname "$SOURCE" )/.." >/dev/null 2>&1 && pwd )

LCYAN='\033[1;36m'
NC='\033[0m'

source "$DIR/tools/yaklib.sh"

show_help () {
  printf "${LCYAN}Yakuake Script${NC}\n\n"
  printf "Usage:  yak.sh [COMMAND]\n\n"
	printf "A helper script for opening dev environments in yakuake\n\n"
	printf "Commands:\n"
	printf "  close      Close all tabs starting with the word @imp\n"
	printf "  all        Build/run all packages\n"
	printf "  auth       Build auth packages\n"
	printf "  examples   Build example packages\n"
	printf "\n"
}

all () {
  local tid
  tid=$(newTabWithNamePath "@imp/auth-client" "$DIR/packages/auth-client")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/auth-client")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/auth-graphql-client" "$DIR/packages/auth-graphql-client")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/auth-graphql-client")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/auth-server" "$DIR/packages/auth-server")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/auth-server")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/authorization" "$DIR/packages/authorization")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/authorization")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/client" "$DIR/packages/client")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/client")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/cluster" "$DIR/packages/cluster")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/cluster")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/connector" "$DIR/packages/connector")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/connector")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/domaindriven" "$DIR/packages/domaindriven")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/domaindriven")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/graphql-client" "$DIR/packages/graphql-client")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/graphql-client")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/graphql-server" "$DIR/packages/graphql-server")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/graphql-server")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/layout" "$DIR/packages/layout")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/layout")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/router" "$DIR/packages/router")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/router")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/server" "$DIR/packages/server")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/server")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/state" "$DIR/packages/state")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/state")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/voyager" "$DIR/packages/voyager")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/voyager")
  runCommand $tid "yarn build --watch"
}

auth () {
  local tid
  tid=$(newTabWithNamePath "@imp/auth-client" "$DIR/packages/auth-client")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/auth-client")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/auth-graphql-client" "$DIR/packages/auth-graphql-client")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/packages/auth-graphql-client")
  runCommand $tid "yarn build --watch"
}

examples () {
  local tid
  tid=$(newTabWithNamePath "@imp/ex-domain" "$DIR/examples/domain")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/examples/domain")
  runCommand $tid "yarn build --watch"

  tid=$(newTabWithNamePath "@imp/ex-server" "$DIR/examples/server")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/examples/server")
  runCommand $tid "yarn start"

  tid=$(newTabWithNamePath "@imp/ex-web" "$DIR/examples/web")
  runCommand $tid "yarn ts --watch"
  tid=$(splitTerminalTopBottom $tid "$DIR/examples/web")
  runCommand $tid "yarn start"
}

close () {
  local sessions
  getSessions sessions
  for el in "${sessions[@]}"; do
    closeTabIfNameMatches "$el" "^@imp.*"
  done
}

case "$1" in
  "all")
    all
    exit 0;
  ;;
  "auth")
    auth
    exit 0;
  ;;
  "examples")
    examples
    exit 0;
  ;;
  "close")
    close
    exit 0;
  ;;
  *)
    show_help
  ;;
esac
