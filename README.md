
## Hanshin STEM Sensors

This library is convenient for Hanshin STEM sensor

## Basic usage
Initial serial on startup
```blocks
let pm25=0
HANSHIN_STEM_SENSORS.initSerial(Tx,Rx)
```
On button pressed event, Set the mode of the corresponding sensor
Take PM_T7 for example

```blocks
input.onButtonPressed(Button.A, function () {
    HANSHIN_STEM_SENSORS.setPM_T7Model(HANSHIN_STEM_SENSORS.MODE.Active, 3)    
})
```

After set sensor mode, get it's value when needed
```blocks
input.onButtonPressed(Button.B, function () {
    pm25 = HANSHIN_STEM_SENSORS.getPM25()
    basic.showNumber(pm25)
})
```

## Suported targets

* for PXT/microbit

## License

MIT
