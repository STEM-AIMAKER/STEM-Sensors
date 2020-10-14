input.onButtonPressed(Button.A, function () {
    HANSHIN_STEM_SENSORS.initSerial(SerialPin.P16, SerialPin.P8)
   HANSHIN_STEM_SENSORS.setPM_T7Model(HANSHIN_STEM_SENSORS.MODE.Active, 3)  
})

basic.forever(function () {
    basic.pause(3000)
  basic.showNumber(HANSHIN_STEM_SENSORS.getPM25())  
})