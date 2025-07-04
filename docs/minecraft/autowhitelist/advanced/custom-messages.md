---
title: Custom messages
sidebar_position: 1
---

:::tip
You can generate a datapack with `/autowhitelist create-translations-datapack`
:::

:::info
Basic JSON knowledge is required
:::

To customize the messages you need to create a datapack

To create the datapack you must head to you world folder, then to `datapacks`  
There you create a folder with the name of your choice  
Inside the folder create a `pack.mcmeta` file and a `data` folder

On `pack.mcmeta` put the following:
```json title="pack.mcmeta"
{
  "pack": {
    "description": "Custom messages for AutoWhitelist",
    "pack_format": 61
  }
}
```
Feel free to customize the `description` content

Inside the `data` folder add a folder named `autowhiteist` and, inside `autowhitelist`, create another folder named `lang`

Inside the `lang` folder create a new file called `en_us.json`<br/>
In that file you will customize the mod messages.

:::tip
You don't need to include all translations, only the ones you want to change.
:::

You will also want to run `/datapack enable <your datapack>` <br/>
If you already have the datapack enabled make sure to run `/reload` to update the translations

```json title="en_us.json"
{
  "commands.autowhitelist.remove.failed": "Failed to remove player(s) from the whitelist. An error occurred or they weren't whitelisted.",

  "discord.command.description.register": "Adds the informed Minecraft account to the server whitelist",
  "discord.command.description.register.argument/username": "Your Minecraft username",
  "discord.command.description.register.argument/geyser": "Whenever it is a Java or Bedrock username",
  "discord.command.description.info": "Shows information about your user",
  "discord.command.description.admin/userinfo": "Shows information about the given user",
  "discord.command.description.admin/userinfo.argument/user": "The user to show the information about",
  "discord.command.description.admin/modify": "Modifies the whitelist entry for the given user, adds one if none is found",
  "discord.command.description.admin/modify.argument/user": "The Discord user to modify the entry of",
  "discord.command.description.admin/modify.argument/username": "The username to whitelist for the given user",

  "discord.command.option.register.geyser/java": "Java",
  "discord.command.option.register.geyser/bedrock": "Bedrock",
  "discord.command.option.admin/modify.geyser/java": "Java",
  "discord.command.option.admin/modify.geyser/bedrock": "Bedrock",

  "discord.command.register.success.title": "Welcome to the group!",
  "discord.command.register.success.message": "Your Minecraft account has been added to the whitelist.\n\n_Please remember that you can always get your entry removed if you break any rule._",
  "discord.command.register.last_steps.title": "Finishing some last things",
  "discord.command.register.last_steps.message": "You request has been accepted.\nPlease wait while I add you to the server whitelist.\nI'll let you know when everything is done.",
  "discord.command.register.username_already_registered.title": "This account is already registered",
  "discord.command.register.username_already_registered.message": "The account you inserted is already whitelisted on the server.",
  "discord.command.register.player_banned.title": "You seem to be banned from the server",
  "discord.command.register.player_banned.message": "Sorry, but I could not add you to the whitelist as you are banned from the server.",
  "discord.command.register.already_registered.title": "You're already registered",
  "discord.command.register.already_registered.message": "You already have an account registered. Extra accounts aren't supported.",
  "discord.command.register.same_username.title": "You're already registered",
  "discord.command.register.same_username.message": "Your linked account is already the same as the one you're trying to register. If you want to change it run the command again with the new username.",
  "discord.command.register.locked.title": "You can't do that yet",
  "discord.command.register.locked.message": "Your entry is currently locked, the account will be unlocked %s.\nUntil then you can't change the linked account.",
  "discord.command.register.fatal": "I could not add you to the whitelist.\nPlease contact a moderator.\n\n```%s```",
  "discord.command.register.invalid_username.title": "Invalid username",
  "discord.command.register.invalid_username.message": "The username you inserted is not valid, a **Minecraft Java Edition** username must contain:\n* Only alphanumerical characters (A-Z 0-9) upper or lower case\n* No spaces or special characters, by the exception of _\n* 3-16 characters",
  "discord.command.register.unknown_bedrock_profile.title": "Unknown profile",
  "discord.command.register.unknown_bedrock_profile.message": "The username you inserted is not in Geyser's cache. Please provide a Floodgate UUID instead.\nYou can use [mcprofile.io](<https://mcprofile.io/>) to get the UUID",
  "discord.command.register.fail.not_allowed.title": "Sorry, but I couldn't accept your request",
  "discord.command.register.fail.not_allowed.message": "It seems that you don't have the required subscription/member level or don't have your Twitch/Youtube account linked to your Discord account.\nPlease note that it may take up to an hour for Discord to give you the role",
  "discord.command.register.fail.account_data": "I couldn't get the public account data of `%s`. Is it a valid **Minecraft Java Edition** username?",

  "discord.command.modify.success.title": "Modified %s's entry",
  "discord.command.modify.success.message": "Successfully linked %s to the whitelist entry for `%s`",
  "discord.command.modify.last_steps.title": "Finishing changes",
  "discord.command.modify.last_steps.message": "Adding user to the whitelist...",
  "discord.command.modify.account.title": "This account is already registered",
  "discord.command.modify.username_already_registered.title": "This account is already registered",
  "discord.command.modify.username_already_registered.message": "The account you inserted is already whitelisted on the server.",
  "discord.command.modify.player_banned.title": "Can not add user",
  "discord.command.modify.player_banned.message": "The user was not added to the whitelist as the account you inserted is be banned from the server.",
  "discord.command.modify.already_registered.title": "User is already registered",
  "discord.command.modify.already_registered.message": "The user already has a registered account. Extra accounts aren't supported.",
  "discord.command.modify.same_username.title": "User is already registered",
  "discord.command.modify.same_username.message": "The linked account is already the same as the one you're trying to register. If you want to change it run the command again with the new username.",
  "discord.command.modify.fatal": "Failed to add user to the whitelist.\n\n```%s```",
  "discord.command.modify.invalid_username.title": "Invalid username",
  "discord.command.modify.invalid_username.message": "The username you inserted is not valid, a **Minecraft Java Edition** username must contain:\n* Only alphanumerical characters (A-Z 0-9) upper or lower case\n* No spaces or special characters, by the exception of _\n* 3-16 characters",
  "discord.command.modify.unknown_bedrock_profile.title": "Invalid username",
  "discord.command.modify.unknown_bedrock_profile.message": "The username you inserted is not valid, a **Minecraft Java Edition** username must contain:\n* Only alphanumerical characters (A-Z 0-9) upper or lower case\n* No spaces or special characters, by the exception of _\n* 3-16 characters",
  "discord.command.modify.fail.not_allowed.title": "Request refused",
  "discord.command.modify.fail.not_allowed.message": "The user doesn't have a registered role.\nPlease note that it may take up to an hour for Discord to give role from linked services",
  "discord.command.modify.fail.account_data": "Filed to get the public account data of `%s`. Is it a valid **Minecraft Java Edition** account?\n_It is only possible to register Minecraft Java Edition accounts._",

  "discord.command.userinfo.title": "User info",
  "discord.command.userinfo.description": "Information about %s",
  "discord.command.userinfo.roles": "Roles",
  "discord.command.userinfo.valid_roles": "Valid roles",
  "discord.command.userinfo.whitelisted": "Whitelisted",
  "discord.command.userinfo.qualifies": "Qualifies",

  "discord.command.info.missing.title": "You are not registered",
  "discord.command.info.missing.description": "There is no whitelist entry associated with your discord user",
  "discord.command.info.title": "Your whitelist entry",
  "discord.command.info.description": "Here is some info about your entry",
  "discord.command.info.field.username.title": "Username",
  "discord.command.info.field.username.description": "%s",
  "discord.command.info.field.role.title": "Detected Role",
  "discord.command.info.field.role.description": "%s",
  "discord.command.info.field.lock.title": "Lock expiration",
  "discord.command.info.field.lock.description.future": "Expires %s",
  "discord.command.info.field.lock.description.past": "Expired %s",
  "discord.command.info.field.lock.description.permanent": "Permanent",

  "discord.command.fail.title": "Something went wrong",
  "discord.command.fatal.title": "Something went badly wrong",
  "discord.command.fatal.generic": "A fatal error occurred!\nPlease contact a moderator.\n\n```%s```",
  "discord.command.fatal.exception": "Tried to execute the command but got an exception\n```%s```\n### Please contact a moderator\n\nIf you are an admin, please check the mod configs, if the issue persists open an issue on the mod's [GitHub page](https://github.com/Awakened-Redstone/AutoWhitelist/issues)",
  "discord.command.few_args.title": "Not enough arguments",
  "discord.command.few_args.message": "You didn't put the minimum amount of arguments required.\nCheck the help command to see the command usage.",
  "discord.command.feedback.received.title": "Command feedback",
  "discord.command.feedback.received.message": "Your request has been received and is being processed, if you don't get another feedback message within a minute than please contact a moderator.",
  "discord.command.feedback.message.signature": "AutoWhitelist by AwakenedRedstone",

  "discord.modal.register.title": "Register account",
  "discord.modal.register.input.label": "Minecraft username",
  "discord.modal.register.input.placeholder": "Username",
  "discord.modal.register.type.username": "Username",
  "discord.modal.register.type.uuid": "UUID",

  "discord.bot.activity.message": "on the Member Server"
}
```
