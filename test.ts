// test DHT11
//input.onButtonPressed(Button.B, function () {
//  HANSHIN_STEM_SENSORS.queryDHT11Data(DigitalPin.P1,true)
//  basic.showNumber(HANSHIN_STEM_SENSORS.getDHT11Temperature())  
//})

// test SHT3X
input.onButtonPressed(Button.A, function () {
    //HANSHIN_STEM_SENSORS.setSHT31Model(HANSHIN_STEM_SENSORS.MODE.Active, 3)
    //HANSHIN_STEM_SENSORS.setTOFMode(HANSHIN_STEM_SENSORS.MODE.Active, 3)
})

basic.forever(function () {
    basic.pause(5000)
    //basic.showNumber(HANSHIN_STEM_SENSORS.getTemperature())  
    basic.showNumber(aimakeruartsensors.tofDistanceValue())
})
