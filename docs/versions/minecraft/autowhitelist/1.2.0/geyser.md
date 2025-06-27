---
title: Geyser support
sidebar_position: 5
---

# Geyser support

:::info
The mod only supports Geyser with Floodgate, it will not enable the geyser support of Floodgate is not detected
:::

AutoWhitelist 1.2.0 and later fully supports [GeyserMC](https://geysermc.org/) with [Floodgate](https://geysermc.org/wiki/floodgate/)

When the server starts the mod will check for the presence of Geyser and Floodgate, if both are detected the mod will update the commands to allow the players to register their Bedrock account

To register a Bedrock account the user must provide the `account_type` as `Bedrock` on the end of the command.

If a user is in Geyser's cache they can simply provide their Bedrock username and the mod will add them to the whitelist as any other player.  
In the case the user is not in Geyser's cache they can instead provide their Floodgate UUID, which can be obtained [here](https://mcprofile.io/)
