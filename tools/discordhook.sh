#!/usr/bin/env bash

# Check lerna for changed packages
PKGS=($(yarn -s lerna changed --json | jq -r '.[].name'))

# Build newline separated string of package names and versions
DESC="\`\`\`\n"
for i in "${PKGS[@]}"
do
  DESC+="$i: $(yarn info --non-interactive --json $i | jq -r '.data."dist-tags".canary')\n"
done
DESC+="\n\`\`\`"

# Build final JSON
JSON="{\"embeds\":[{\"color\":65336,\"title\":\"THR-Addons Canary Release\",\"description\":\"$DESC\"}]}"

# Send to webhook
curl -X POST -H "Content-Type: application/json" -d "$JSON" "$DISCORD_WEBHOOK"
