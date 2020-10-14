//% block="Hanshin STEM sensors" weight=10 color=#1E90FF icon="\uf136"
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
    let dht11_humidity = -999.0
    let dht11_temperature = -999.0
    let dht11_readSuccessful = false
    
    export enum MODE {
        //% blockId="Active" block="Active"
        Active=0,
        //% blockId="Passive" block="Passive"
        Passive=1
    }

    //% blockId=mpu6050X block="Get MPU6050 X" 
    export function mpu6050X() : number {
        return MPU6050_x;
    }

    //% blockId=mpu6050Y block="Get MPU6050 Y" 
    export function mpu6050Y() : number {
        return MPU6050_y;
    }

    //% blockId=mpu6050Z block="Get MPU6050 Z" 
    export function mpu6050Z() : number {
        return MPU6050_z;
    }

    //% blockId=gyroX block="Get Gyro X" 
    export function gyroX() : number {
        return Gyro_x;
    }

    //% blockId=gyroY block="Get Gyro Y" 
    export function gyroY() : number {
        return Gyro_y;
    }

    //% blockId=gyroZ block="Get Gyro Z" 
    export function gyroZ() : number {
        return Gyro_z;
    }

    //% blockId=pM25 block="Get PM25" 
    export function pM25(): number {
        return pm25;
    }

    //% blockId=pM10 block="Get PM10" 
    export function pM10(): number {
        return pm10;
    }

    //% blockId=tVOC block="Get TVOC" 
    export function tVOC(): number {
        return tvoc;
    }

    //% blockId=cO2 block="Get CO2" 
    export function cO2(): number {
        return co2;
    }

    //% blockId=temperatureValue block="Get temperature" 
    export function temperatureValue(): number {
        return temperature;
    }

    //% blockId=humidityValue block="Get humidity" 
    export function humidityValue(): number {
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
        basic.pause(300)
        serial.readString();
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
    export function setPMT7Model(mode: MODE, activeInterval: number) : void {
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
    export function queryPMT7Data() : void {
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

    //% block="Query DHT11 Data pin $dataPin|Wait 2 sec after query $wait"
    //% wait.defl=true
    export function queryDHT11Data(dataPin: DigitalPin, wait: boolean) 
    {
        //initialize
        let startTime: number = 0
        let endTime: number = 0
        let checksum: number = 0
        let checksumTmp: number = 0
        let dataArray: boolean[] = []
        let resultArray: number[] = []
        for (let index = 0; index < 40; index++) dataArray.push(false)
        for (let index2 = 0; index2 < 5; index2++) resultArray.push(0)
        dht11_humidity = -999.0
        dht11_temperature = -999.0
        dht11_readSuccessful = false

        startTime = input.runningTimeMicros()
0
        //request data
        pins.digitalWritePin(dataPin, 0) //begin protocol
        basic.pause(18)
       // pins.setPull(dataPin, PinPullMode.PullUp)
        pins.digitalReadPin(dataPin)
        control.waitMicros(20)
        while (pins.digitalReadPin(dataPin) == 1);
        while (pins.digitalReadPin(dataPin) == 0); //sensor response
        while (pins.digitalReadPin(dataPin) == 1); //sensor response

        //read data (5 bytes)
        for (let index3 = 0; index3 < 40; index3++) {
            while (pins.digitalReadPin(dataPin) == 1);
            while (pins.digitalReadPin(dataPin) == 0);
            control.waitMicros(28)
            //if sensor pull up data pin for more than 28 us it means 1, otherwise 0
            if (pins.digitalReadPin(dataPin) == 1) dataArray[index3] = true
        }

        endTime = input.runningTimeMicros()

        //convert byte number array to integer
        for (let index4 = 0; index4 < 5; index4++)
            for (let index22 = 0; index22 < 8; index22++)
                if (dataArray[8 * index4 + index22]) resultArray[index4] += 2 ** (7 - index22)

        //verify checksum
        checksumTmp = resultArray[0] + resultArray[1] + resultArray[2] + resultArray[3]
        checksum = resultArray[4]
        if (checksumTmp >= 512) checksumTmp -= 512
        if (checksumTmp >= 256) checksumTmp -= 256
        if (checksum == checksumTmp) dht11_readSuccessful = true

        //read data if checksum ok
        if (dht11_readSuccessful) {
            dht11_humidity = resultArray[0] + resultArray[1] / 100
            dht11_temperature = resultArray[2] + resultArray[3] / 100
        }
        //wait 2 sec after query if needed
        if (wait) basic.pause(2000)
    }

    //% blockId=dHT11Humidity block="Get DHT11 humidity" 
    export function dHT11Humidity(): number {
        return dht11_humidity;
    }
    
    //% blockId=dHT11Temperature block="Get DHT11 temperature" 
    export function dHT11Temperature(): number {
        return dht11_temperature;
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

                //basic.showNumber(temperature)
            }
                break;
        }
    })
}
