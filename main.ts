//% weight=10 color=#1E90FF icon="\uf136"
namespace HANSHIN_STEM_SENSORS {
    let buffer = ""

    enum MODE {
        Active=0,
        Passive=1
    }

    //% blockId=initSerial block="Init serial port to |TX = %Tx RX=%RX"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    export function initSerial(Tx: SerialPin, Rx: SerialPin): void {
        serial.redirect(Tx, Rx, 9600)
        buffer = serial.readString()
        basic.pause(100)
        serial.writeString("AT")
        basic.pause(100)
    }

    //% blockId=setMPU6050Model block="Set MPU6050 Model to |mode=%mode active interval time=%activeInterval second"
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    export function setMPU6050Model(mode: MODE, activeInterval: number) : void {
        if( mode === MODE.Active ) {
            let modeCmd= "ATSPMODE="+activeInterval
            serial.writeString(modeCmd)
        }
        else {
            serial.writeString("ATSPDATA")
        }
    }

    //% blockId=queryMPU6050Data block="Query MPU6050 data" 
    export function queryMPU6050Data(): void {
        serial.writeString("ATSPDATA")
    }


    export function setGyroModel(mode: MODE, activeInterval: number) : void {
        if( mode === MODE.Active ) {
            let modeCmd= "ATGYMODE="+activeInterval
            serial.writeString(modeCmd)
        }
        else {
            serial.writeString("ATGYDATA")
        }
    }

    export function queryGyroData() : void {
        serial.writeString("ATGYDATA")
    }

}