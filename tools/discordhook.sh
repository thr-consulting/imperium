#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
source "$DIR/../node_modules/.bin/common"

# Get changed packages
PKGS=()
get_changed_packages PKGS

# Build newline separated string of package names and versions
DESC="\`\`\`\n"
for i in "${PKGS[@]}"
do
  DESC+="$i: $(yarn info --non-interactive --json $i | jq -r '.data."dist-tags".canary')\n"
done
DESC+="\n\`\`\`"

# Send to discord
"$DIR/../node_modules/.bin/discord" "Imperium Canary Release" "$DESC"
