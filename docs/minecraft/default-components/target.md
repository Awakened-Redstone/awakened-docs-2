---
title: Targeting
sidebar_position: 1
---

# Tags, wildcards and custom targets

:::info
The `target` field is optional.
:::

The `target` field is a powerful option. By default the mod uses the folder path and file name to choose what item to modify, but that can be changed using the `target` field.

The field takes identifiers, tags and wildcards. Identifiers are simple, you can find them at the bottom of advanced tooltips. Tags can be found when typing `#` in the creative search tab,
or you can find them on the [wiki](https://minecraft.wiki/w/Item_tag_(Java_Edition))

## Wildcards

:::warning
Wildcards are currently experimental and may change in the future
:::

Wildcards are a custom system, with the structure `namespace:*`. When a wildcard is used, all items under the given namespace will have the given component modifications.  
To apply modifications to all items in the game use the special wildcard `*`.

## Application order

The mod sorts the modifications on the following order:
- All modifications are first sorted by alphabetical order
- After they are sorted by target type
  - Wildcards have higher sorting value, applying first
  - Tags and items are positioned right after, applying after wildcards
  - Files without the target field are applied last

The order of application allows you to override components, for example, make all logs able to mine stone, and oak logs specifically able to mine obsidian
A newer application has the power of overriding changes of past ones, so components on files without `target` have higher priority than the ones from wildcards
