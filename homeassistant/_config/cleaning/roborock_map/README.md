## Token extraction

Token extraction is needed only for miiocli to run commands. Token is supported only by Mi Home app (not by Roborock app!)

**And in general this is not needed for map extaction**

## Map extraction to file

Use this project to extract map to file https://github.com/da-mkay/mihome-vacuum-map-dl . The downside is that you will need to connect vacuum via Mi Home app temporary to have this ability.

You will need to enter Mi Home credentials

## Zones and points extraction

After map is extracted into a file, you can load it via Java based map viewer 

```sh
java -Dorg.slf4j.simpleLogger.defaultLogLevel=info -jar roboMapViewer3.0.0-1.jar
```

then select area and you will see coordinates in debug window

## Latest coordinates

- fireplace (27114,26750,30029,28021)
- terrace_exit (24343,25536,25500,28564)
- livingroom_entertainment (24300,25550,27933,28650)
- wardrobe point (29467,30183)
- kitchen point (33133,25150)
- tech room point (32367,28183)