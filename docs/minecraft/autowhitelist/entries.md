---
title: Entry actions
sidebar_position: 3
---

# Entry actions

:::tip
[You can use the entry generator for an easier setup](configs/generator.md)
:::

Every entry must have an action type.

The mod offers 5 types by default, but other mods can add their own.  
AutoWhitelist offers built in support for LuckPerms, with 2 of the 5 types being part of the integration.

Every action includes the process of whitelisting the player.

The provided "Extra fields" are the fields that go into `execute`

## Whitelist
This action type does nothing, use it when you want to just whitelist the players.

## Join Team
:::warning Deprecated
This action has been deprecated in favor of the [Command](#command) action.
:::
This action adds the player to the given vanilla team when whitelisted.

### Extra fields
- `associate_team`: The id of the vanilla team the player will be added to

### Actions:
- **On Add:** Adds the player to the given team  
- **On Remove:** Removes the player to the given team

## Execute Command
:::warning
Do not provide the / before the command as it is implied by the game when the server executes a command
:::
This action executes the given command when the player is added/removed from the entry.

The action supports the use of the placeholder `{player}` in the commands.

All commands are executed with the server as context and with the operator level specified in the mod configs.

### Extra fields
- `on_add`: The command that will be executed when the player is added to the entry
- `on_remove`: The command that will be executed when the player is removed from the entry

### Actions:
- **On Add:** Executes the command specified on `on_add`
- **On Remove:** Executes the command specified on `on_remove`

## Luckperms Group
This action adds the player to the given group when whitelisted.

### Extra fields
- `group`: The LuckPerms group to be given to the player

### Actions:
- **On Add:** Adds the player to the given group
- **On Remove:** Removes the player to the given group

## Luckperms Permission
This action gives the player the given permission when whitelisted.

### Extra fields
- `permission`: The permission to be given to the player

### Actions:
- **On Add:** Gives the player the given permission
- **On Remove:** Removes the given permission from the player
