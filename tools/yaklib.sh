#!/bin/bash

addSession () {
  # Return=SessionId
  local id=$(qdbus org.kde.yakuake /yakuake/sessions org.kde.yakuake.addSession)
  echo "$id"
}

removeSession () {
  # $1=SessionId
  qdbus org.kde.yakuake /yakuake/sessions org.kde.yakuake.removeSession $1
}

removeTerminal () {
  # $1=TerminalId
  qdbus org.kde.yakuake /yakuake/sessions org.kde.yakuake.removeTerminal $1
}

splitTerminalTopBottom () {
  # $1=TerminalId $2=Path Return=NewTerminalId
  local id
  id=$(qdbus org.kde.yakuake /yakuake/sessions org.kde.yakuake.splitTerminalTopBottom $1)
  runCommand $id "cd $2"
  echo "$id"
}

setTabTitle () {
  # $1=SessionId $2=Title
  qdbus org.kde.yakuake /yakuake/tabs org.kde.yakuake.setTabTitle $1 "$2"
}

getActiveSession () {
  # Return=SessionId
  local id
  id=$(qdbus org.kde.yakuake /yakuake/sessions org.kde.yakuake.activeSessionId)
  echo "$id"
}

getTerminalForSession () {
  # $1=SessionId Return=TerminalId
  local id
  id=$(qdbus org.kde.yakuake /yakuake/sessions org.kde.yakuake.terminalIdsForSessionId $1)
  echo "$id"
}

runCommand () {
  # $1=TerminalId $2=Command
  qdbus org.kde.yakuake /yakuake/sessions org.kde.yakuake.runCommandInTerminal $1 "$2"
}

getSessions() {
  # $1=ArrayForSessionIds
  local -n arr=$1
  local list
  list=$(qdbus org.kde.yakuake /yakuake/sessions org.kde.yakuake.sessionIdList)
  IFS=',' read -r -a arr <<< $list
}

getTitle() {
  # $1=SessionId Return=TabTitle
  local title
  title=$(qdbus org.kde.yakuake /yakuake/tabs org.kde.yakuake.tabTitle $1)
  echo "$title"
}

closeTabIfNameMatches() {
  # $1=SessionId $2=Regex
  local title
  local regex
  title=$(getTitle "$1")
  regex=$2
  if [[ ${title} =~ ${regex} ]]; then
      removeSession "$1"
  fi
}

newTabWithNamePath () {
  # $1=Name $2=Path Return=TerminalId
  local id
  local tid
  id=$(addSession)
  setTabTitle $id "$1"
  tid=$(getTerminalForSession $id)
  runCommand $tid "cd $2"
  echo "$tid"
}
