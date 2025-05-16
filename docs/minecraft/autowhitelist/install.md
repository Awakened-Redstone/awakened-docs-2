---
title: Getting started
sidebar_position: 2
outline: deep
---

<script setup>
import Callout from "@component/Callout.vue";
import ModrinthLink from "@component/ModrinthLink.vue";
import DetailedInstructions from "@component/detailed_instructions/Component.vue";
</script>

# Installing

::: tip
Basic JSON or JSON5 knowledge is highly recommended.
:::

## Installing the mod

Make sure you download the correct version for your server's Minecraft version.

1. Download the mod from <ModrinthLink slug="autowhitelist">Modrinth</ModrinthLink>
2. Download the required dependencies <ModrinthLink slug="fabric-api">FabricAPI</ModrinthLink> and <ModrinthLink slug="fabric-language-kotlin">Fabric Language Kotlin</ModrinthLink>
3. Put the downloaded files in your `mods` folder
4. Start the server, this will generate the config file at `config/autowhitelist.json5`

### Setting up the Discord bot

The mod requires a Discord bot, you can create a new one or choose an existing one in the [Discord developer portal](https://discord.com/developers/applications)  
Make sure it has the `Server members intent` enabled

<DetailedInstructions src="/assets/autowhitelist/tutorial/create_app.gif" title="How to create an app">
  <ol class="!my-0 flex flex-col h-fit lg:text-lg xl:text-xl gap-2">
    <li>Visit the <a href="https://discord.com/developers/applications" target="_blank" rel="noopener noreferrer">Discord developer portal</a></li>
    <li>Click <code>New Application</code></li>
    <li>Name the application</li>
    <li>Agree to the developer terms of service</li>
    <li>Create the application</li>
    <li>Select <code>Bot</code> on the sidebar</li>
    <li>Enable the <code>Server members intent</code></li>
    <li>Disable <code>Public bot</code></li>
    <li>Save the changes</li>
  </ol>
</DetailedInstructions>

## Configuring the mod

### Bot token

Copy the bot token from the developer console and add it to the mod config

<DetailedInstructions src="/assets/autowhitelist/tutorial/get_token.gif" title="How to get the bot token">
<h2 class="!mt-0 !border-0 !pt-0 text-red-400">Never share or publish the bot token!</h2>
  <ol class="!my-0 flex flex-col h-fit lg:text-lg xl:text-xl gap-2">
    <li>Scroll to the top of the <code>Bot</code> page</li>
    <li>Click <code>Reset Token</code></li>
    <li>Click <code>Yes, do it!</code></li>
    <li>Insert your 2FA if required</li>
    <li>Click <code>Copy</code></li>
    <li>Put the token in the mod config</li>
  </ol>
</DetailedInstructions>

```json5 {3}
  "lock_time": "1d",
  // Your bot token. Never share it, anyone with it has full control of the bot
  "token": "NEVER SHARE YOUR BOT TOKEN",
  "discord_server_id": 0,
  // When enabled, all interactions and slash commands will be ephemeral, meaning only the user can see the response.
  "ephemeral_replies": true,
```

### Server ID

Copy the Discord server/guild id of the server where you added the bot to

<DetailedInstructions src="/assets/autowhitelist/tutorial/get_server_id.gif" title="How to get the server id">
  <Callout type="info">
    To get the server id you need to enable developer mode on Discord.<br/>
    On the app go to <code>Settings > App Settings > Advanced</code> and enable <code>Developer Mode</code>.
  </Callout>
  <ol class="!my-0 flex flex-col h-fit lg:text-lg xl:text-xl gap-2">
    <li>Right-click the server icon</li>
    <li>Click <code>Copy Server ID</code></li>
  </ol>
</DetailedInstructions>

```json5 {4}
  "lock_time": "1d",
  // Your bot token. Never share it, anyone with it has full control of the bot
  "token": "NEVER SHARE YOUR BOT TOKEN",
  "discord_server_id": 0,
  // When enabled, all interactions and slash commands will be ephemeral, meaning only the user can see the response.
  "ephemeral_replies": true,
```

### Adding the bot to your server

Create the url to add the bot to a server and use it to add it to the server you plan to use it on

<DetailedInstructions src="/assets/autowhitelist/tutorial/add_to_server.gif" title="How to add the bot">
  <ol class="!my-0 flex flex-col h-fit lg:text-lg xl:text-xl gap-2">
    <li>Select <code>OAuth2</code> on the sidebar</li>
    <li>Select <code>bot</code> and <code>applications.commands</code> in <code>Scopes</code></li>
    <li>Select <code>Send messages</code> in <code>Bot permission</code></li>
    <li>Copy the generated URL</li>
    <li>Open the URL in your browser</li>
    <li>Select the Discord server the bot should work on</li>
    <li>Click <code>Authorize</code></li>
  </ol>
</DetailedInstructions>

### Configuring the entries
::: tip
[You can use the entry generator for an easier setup](configs/generator)
:::

On the config file, `entries` will be empty by default, there you will configure what the server will do when
whitelisting the players.

All of them takes a list of `roles` that will be used to whitelist the players, and a `type` that will be used to
determine what the server will do when whitelisting the players.

`roles` takes either the role ID or the role name, prefixed by an `@`, you can use both ways on the same entry

Any extra keys (if any) go inside the `execute` object

The format is
```json5
{
  // The Discord roles that will be used to whitelist the players
  "roles": ["Discord role id", "@Or the role name"],
  // The method that will be used to whitelist the players
  "type": "namespace:path",
  // Any extra option goes in here, it defines what will be done when the entry runs, for adding/removing to the whitelist
  "execute": {}
}
```

When a player is moved between entries, for example, due to a role change, the mod will execute the code for removal of the 
old entry and right after it executes the code for adding into the new entry

:::details Example
Let's take this example config:
```json5 no-copy
{
  "roles": ["@Role 1"],
  "type": "autowhitelist:execute_command",
  "execute": {
    "on_add": "say {player} joined the cool team",
    "on_remove": "say {player} is no longer cool"
  }
},
{
  "roles": ["@Role 2"],
  "type": "autowhitelist:execute_command",
  "execute": {
    "on_add": "say {player} is now awesome",
    "on_remove": "say {player} left the awesome team"
  }
}
```

Once I register while having `@Role 1` the server will announce:
```log
[23:31:22] [AutoWhitelist] AwakenedRedstone joined the cool team
```
Now, I got a new role, `@Role 2`  
The server will follow with:
```log
[23:33:53] [AutoWhitelist] AwakenedRedstone is no longer cool
[23:33:53] [AutoWhitelist] AwakenedRedstone is now awesome
```
:::
