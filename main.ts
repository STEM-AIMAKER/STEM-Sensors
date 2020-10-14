namespace HANSHIN_STEM_SENSORS {
    let buffer = ""
    let sensor=0
    let MPU6050_x=0
    let MPU6050_y=0
    let MPU6050_z=0
    let Gyro_x=0
    let Gyro_y=0
    let Gyro_z=0
    let pm25=0
    let pm10=0
    let tvoc=0
    let co2=0
    let temperature=0.0
    let humidity=0.0

    export enum MODE {
        //% blockId="Active" block="Active"
        Active=0,
        //% blockId="Passive" block="Passive"
        Passive=1
    }

    //% blockId=getMPU6050X block="Get MPU6050 X" 
    export function getMPU6050X() : number {
        return MPU6050_x;
    }

    //% blockId=getMPU6050Y block="Get MPU6050 Y" 
    export function getMPU6050Y() : number {
        return MPU6050_y;
    }

    //% blockId=getMPU6050Z block="Get MPU6050 Z" 
    export function getMPU6050Z() : number {
        return MPU6050_z;
    }

    //% blockId=getGyroX block="Get Gyro X" 
    export function getGyroX() : number {
        return MPU6050_x;
    }

    //% blockId=getGyroY block="Get Gyro Y" 
    export function getGyroY() : number {
        return MPU6050_y;
    }

    //% blockId=getGyroZ block="Get Gyro Z" 
    export function getGyroZ() : number {
        return MPU6050_z;
    }

    //% blockId=getPM25 block="Get PM25" 
    export function getPM25(): number {
        return pm25;
    }

    //% blockId=getPM10 block="Get PM10" 
    export function getPM10(): number {
        return pm10;
    }

    //% blockId=getTVOC block="Get TVOC" 
    export function getTVOC(): number {
        return tvoc;
    }

    //% blockId=getCO2 block="Get CO2" 
    export function getCO2(): number {
        return co2;
    }

    //% blockId=getTemperature block="Get temperature" 
    export function getTemperature(): number {
        return temperature;
    }

    //% blockId=getHumidity block="Get humidity" 
    export function getHumidity(): number {
        return humidity;
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
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    export function setMPU6050Model(mode: MODE, activeInterval: number) : void {
        sensor = 1
        if( mode === MODE.Active ) {
            let modeCmd= "AT+SPMODE="+activeInterval
            serial.writeString(modeCmd)
        }
        else {
            serial.writeString("AT+SPDATA")
        }
    }

    //% blockId=queryMPU6050Data block="Query MPU6050 data" 
    export function queryMPU6050Data(): void {
        sensor = 1
        serial.writeString("AT+SPDATA")
    }

    //% blockId=setGyroModel block="Set Gyro Model to |mode=%mode active interval time=%activeInterval second"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    export function setGyroModel(mode: MODE, activeInterval: number) : void {
        sensor = 2
        if( mode === MODE.Active ) {
            let modeCmd2= "AT+GYMODE="+activeInterval
            serial.writeString(modeCmd2)
        }
        else {
            serial.writeString("AT+GYDATA")
        }
    }

    //% blockId=queryGyroData block="Query gyro data" 
    export function queryGyroData() : void {
        sensor = 2
        serial.writeString("AT+GYDATA")
    }

    //% blockId=setPM_T7Model block="Set PM_T7 Model to |mode=%mode active interval time=%activeInterval second"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    export function setPM_T7Model(mode: MODE, activeInterval: number) : void {
        sensor = 3
        if( mode === MODE.Active ) {
            let modeCmd3= "AT+MODE="+activeInterval
            serial.writeString(modeCmd3)
        }
        else {
            serial.writeString("AT+DATA")
        }
    }

    //% blockId=queryGyroData block="Query gyro data" 
    export function queryPM_T7Data() : void {
        sensor = 3
        serial.writeString("AT+DATA")
    }

    //% blockId=setSGP30Model block="Set SGP30 Model to |mode=%mode active interval time=%activeInterval second"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    export function setSGP30Model(mode: MODE, activeInterval: number) : void {
        sensor = 4
        if( mode === MODE.Active ) {
            let modeCmd4= "AT+MODE="+activeInterval
            serial.writeString(modeCmd4)
        }
        else {
            serial.writeString("AT+DATA")
        }
    }
    
    //% blockId=querySGP30Data block="Query SGP30 data" 
    export function querySGP30Data() : void {
        sensor = 4
        serial.writeString("AT+DATA")
    }

    //% blockId=setSHT31Model block="Set SHT31 Model to |mode=%mode active interval time=%activeInterval second"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    export function setSHT31Model(mode: MODE, activeInterval: number) : void {
        sensor = 5
        if( mode === MODE.Active ) {
            let modeCmd5= "AT+MODE="+activeInterval
            serial.writeString(modeCmd5)
        }
        else {
            serial.writeString("AT+DATA")
        }
    }

    //% blockId=querySHT31Data block="Query SHT31 data" 
    export function querySHT31Data() : void {
        sensor = 5
        serial.writeString("AT+DATA")
    }
 
    let line = ""
    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
        line = serial.readLine()
        switch( sensor ) {
            default:
                break;
            case 1: // MPU6050
            {
                MPU6050_x= parseInt(line.substr(1,5))
                if( line.substr(0,1) === "-")
                    MPU6050_x *= -1
                MPU6050_y= parseInt(line.substr(7,5))
                if( line.substr(6,1) === "-")
                    MPU6050_y *= -1
                MPU6050_z= parseInt(line.substr(13,5))
                if( line.substr(12,1) === "-")
                    MPU6050_z *= -1
            }
                break;
            case 2: // Gyro
            {
                Gyro_x= parseInt(line.substr(1,5))
                if( line.substr(0,1) === "-")
                    Gyro_x *= -1
                Gyro_y= parseInt(line.substr(7,5))
                if( line.substr(6,1) === "-")
                    Gyro_y *= -1
                Gyro_z= parseInt(line.substr(13,5))
                if( line.substr(12,1) === "-")
                    Gyro_z *= -1
            }
                break;
            case 3: // PM_T7
            {
                pm25 = parseInt(line.substr(0,4))
                pm10 = parseInt(line.substr(-4,4))
            }
                break;
            case 4: // SGP30 
            {
                tvoc = parseInt(line.substr(0,5))
                co2 = parseInt(line.substr(-5,5))
            }
                break;
            case 5: // SHT31 
            {
                temperature = parseFloat(line.substr(1,5))
                if(line.substr(0,1) === "-" )
                    temperature *= -1
                humidity = parseFloat(line.substr(-5,5))
            }
                break;
        }
    })
}
