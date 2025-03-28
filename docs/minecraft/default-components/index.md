---
title: Getting started
sidebar_position: 1
---

# Introduction

:::info
Basic JSON knowledge is required
:::

Default Components allows you to change the data components of any item in the game, vanilla and modded.  
The mod works with datapacks and can be easily setup

If the mod is present on the client it will synchronize all the components and display the custom components on other mods and the creative inventory

## Creating a datapack

To create the datapack you must head to you world folder, then to `datapacks`  
There you create a folder with the name of your choice  
Inside the folder create a `pack.mcmeta` file and a `data` folder

On `pack.mcmeta` put the following:
```json title="pack.mcmeta"
{
  "pack": {
    "description": "Custom default components",
    "pack_format": 61
  }
}
```
Feel free to customize the `description` content

## Configuring

All items have a unique ID in the following format: `namespace:path`, for example `minecraft:diamond`  
To visualize the [identifier](https://minecraft.wiki/w/Resource_location#Conversion_to_string) enable advanced tooltips with `F3 + H`,
it will show in dark gray at the bottom of the item tooltip  
Note both the `namespace` and the `path` separately

:::info
The [namespace](https://minecraft.wiki/w/Resource_location#Namespaces) is the mod id of the item, for vanilla Minecraft it is `minecraft`  
The path represents the item, but may not always match the item name, for example, `Block of Diamond` is `diamond_block`
:::

Inside the `data` folder you will create a new folder with the name being the [namespace](https://minecraft.wiki/w/Resource_location#Namespaces) of the item you want to change

Inside your namespace folder, create a new folder named `default_components` and navigate into it

Now create a file named `<path>.json` with `<path>` being the item's path  
**To modify the components of ALL items you must create a file named `all.json` in the `minecraft` namespace**

Now, inside the JSON file, put the following content:
```json
{
  "add": {},
  "remove": []
}
```

Inside `add` you will put the components to add/override, on the format `"<component>": <value>`  
For `remove` you will use the format `"<component>"`

Both `add` and `remove` are optional

The list of all vanilla components and their structure can be found [here](https://minecraft.wiki/w/Data_component_format#List_of_components)

:::danger
Some components are required for items to function, and removing them may render them useless or even result in **crashes**
:::

At the end it should look something like this:
```json
{
  "add": {
    "minecraft:consumable": {},
    "minecraft:food": {
      "saturation": 1,
      "nutrition": 1
    }
  },
  "remove": [
    "minecraft:max_stack_size"
  ]
}
```
Now your datapack is ready for use!

To enable it run `/datapack enable <datapack>`  
If you already have the datapack enabled simply run `/reload` to update the components

Players with the mod will have their items updated immediately, vanilla players may need to open a chest
or move items around for the changes to show for their clients
