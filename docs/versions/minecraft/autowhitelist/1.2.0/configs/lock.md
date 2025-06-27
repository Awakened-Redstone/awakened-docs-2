---
title: Entry Lock
sidebar_position: 3
---

# Entry lock

The entry lock is the time a new whitelist entry is locked for, stopping the player from changing or removing it.  
It still can be removed with the `/whitelist remove` command during the lock period.  
It is intended to prevent players from abusing the mod

## Allowed values

|    Symbol    |     Effect      |
|:------------:|:---------------:|
|     `-1`     |    Infinite     |
|     `0`      |    Disabled     |
| `<timeunit>` | Calculated time |

Setting the lock to `-1` will make it infinite.  
Setting it to `0` will disable the lock.

## Time format

| Symbol | Time Unit |
|:------:|:---------:|
|  `y`   |   Years   |
|  `M`   |  Months   |
|  `w`   |   Weeks   |
|  `d`   |   Days    |
|  `h`   |   Hours   |
|  `m`   |  Minutes  |
|  `s`   |  Seconds  |

Example:  
`1M3w2d5h` locks for 1 month, 3 weeks, 2 days and 5 hours  
`1M 3w 2d 5h` is also valid

**Spaces and other invalid characters are ignored**
