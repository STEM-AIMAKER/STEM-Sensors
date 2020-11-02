/**
 * Hanshin STEM Sensors
 */
//% color=190 weight=100 icon="\uf1ec" block="HANSHIN: UART Sensors"
//% groups=['DHT11', 'Gyroscope+Accelerometer', 'PM2.5','SGP30','SHT31X','Time of Flight(TOF)','others']
namespace HANSHIN_STEM_SENSORS {
/**
 * Hanshin STEM Sensors
 */
// color=190 weight=100 icon="\uf1ec" block="Hanshin STEM Sensors"
// groups=['DHT11', 'Gyroscope+Accelerometer', 'PM2.5',SGP30','SHT31X','Time of Flight(TOF)','others']
    let buffer = ""
    let sensor=0
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
    let tof_distance = 0
    
    export enum MODE {
        //% blockId="Active" block="Active"
        Active=0,
        //% blockId="Passive" block="Passive"
        Passive=1
    }

    //% blockId=initSerial block="Init serial port to |TX = %Tx RX=%RX"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    function initSerial(Tx: SerialPin, Rx: SerialPin): void {
        serial.redirect(Tx, Rx, 9600)
        buffer = serial.readString()
        basic.pause(100)
        serial.writeString("AT")
        basic.pause(300)
        serial.readString();
    }

    //% blockId=dHT11Humidity block="Get DHT11 humidity" 
    //% group="DHT11"
    export function dHT11Humidity(): number {
        return dht11_humidity;
    }
    
    //% blockId=dHT11Temperature block="Get DHT11 temperature" 
    //% group="DHT11"
    export function dHT11Temperature(): number {
        return dht11_temperature;
    }

    //% block="Query DHT11 Data pin $dataPin|Wait 2 sec after query $wait"
    //% wait.defl=true
    //% group="DHT11"
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

    //% blockId=gyroZ block="Get Gyro Z" 
    //% group="Gyroscope+Accelerometer"
    export function gyroZ() : number {
        return Gyro_z;
    }

    //% blockId=gyroY block="Get Gyro Y" 
    //% group="Gyroscope+Accelerometer"
    export function gyroY() : number {
        return Gyro_y;
    }

    //% blockId=gyroX block="Get Gyro X" 
    //% group="Gyroscope+Accelerometer"
    export function gyroX() : number {
        return Gyro_x;
    }
    
    //% blockId=queryGyroData block="Query gyro data" 
    //% group="Gyroscope+Accelerometer"
    export function queryGyroData() : void {
        sensor = 2
        serial.writeString("AT+GYDATA")
    }
    //% blockId=setGyroModel block="Set Gyro Model to |mode=%mode active interval time=%activeInterval second at serial TX=%Tx Rx=%Rx"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    //% group="Gyroscope+Accelerometer"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% blockExternalInputs=true
    export function setGyroModel(mode: MODE, activeInterval: number,Tx: SerialPin, Rx: SerialPin) : void {
        sensor = 2
        initSerial(Tx,Rx)
        if( mode === MODE.Active ) {
            let modeCmd22= "AT+GYMODE="+activeInterval
            serial.writeString(modeCmd22)
        }
        else {
            serial.writeString("AT+GYDATA")
        }
    }
    
    //% blockId=pM25 block="Get PM25" 
    //% group="PM2.5"
    export function pM25(): number {
        return pm25;
    }

    //% blockId=pM10 block="Get PM10" 
    //% group="PM2.5"
    export function pM10(): number {
        return pm10;
    }
    
    //% blockId=queryGyroData block="Query gyro data" 
    //% group="PM2.5"
    export function queryPMT7Data() : void {
        sensor = 3
        serial.writeString("AT+DATA")
    }

    //% blockId=setPM_T7Model block="Set PM_T7 Model to |mode=%mode active interval time=%activeInterval second at serial TX=%Tx Rx=%Rx"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    //% group="PM2.5"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% blockExternalInputs=true
    export function setPMT7Model(mode: MODE, activeInterval: number,Tx: SerialPin, Rx: SerialPin) : void {
        sensor = 3
        initSerial(Tx,Rx)
        if( mode === MODE.Active ) {
            let modeCmd3= "AT+MODE="+activeInterval
            serial.writeString(modeCmd3)
        }
        else {
            serial.writeString("AT+DATA")
        }
    }

    //% blockId=tVOC block="Get TVOC" 
    //% group="SGP30"
    export function tVOC(): number {
        return tvoc;
    }

    //% blockId=cO2 block="Get CO2" 
    //% group="SGP30"
    export function cO2(): number {
        return co2;
    }

    //% blockId=querySGP30Data block="Query SGP30 data" 
    //% group="SGP30"
    export function querySGP30Data() : void {
        sensor = 4
        serial.writeString("AT+DATA")
    }
    //% blockId=setSGP30Model block="Set SGP30 Model to |mode=%mode active interval time=%activeInterval second at serial TX=%Tx Rx=%Rx"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    //% group="SGP30"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% blockExternalInputs=true
    export function setSGP30Model(mode: MODE, activeInterval: number,Tx: SerialPin, Rx: SerialPin) : void {
        sensor = 4
        initSerial(Tx,Rx)
        if( mode === MODE.Active ) {
            let modeCmd4= "AT+MODE="+activeInterval
            serial.writeString(modeCmd4)
        }
        else {
            serial.writeString("AT+DATA")
        }
    }
    
    //% blockId=temperatureValue block="Get temperature" 
    //% group="SHT31X"
    export function temperatureValue(): number {
        return temperature;
    }

    //% blockId=humidityValue block="Get humidity" 
    //% group="SHT31X"
    export function humidityValue(): number {
        return humidity;
    }
    //% blockId=querySHT31Data block="Query SHT31X data" 
    //% group="SHT31X"
    export function querySHT31Data() : void {
        sensor = 5
        serial.writeString("AT+DATA")
    }
   
    //% blockId=setSHT31XModel block="Set SHT31X Model to |mode=%mode active interval time=%activeInterval second at serial TX=%Tx Rx=%Rx"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    //% group="SHT31X"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% blockExternalInputs=true
    export function setSHTX31Model(mode: MODE, activeInterval: number,Tx: SerialPin, Rx: SerialPin) : void {
        sensor = 5
        initSerial(Tx,Rx)
        if( mode === MODE.Active ) {
            let modeCmd5= "AT+MODE="+activeInterval
            serial.writeString(modeCmd5)
        }
        else {
            serial.writeString("AT+DATA")
        }
    }

    //% blockId=tofDistanceValue block="Get TOF Distance" 
    //% group="Time of Flight(TOF)"
    export function tofDistanceValue(): number {
        return tof_distance;
    }    
    //% blockId=queryTOFData block="Query TOF data(mm)" 
    //% group="Time of Flight(TOF)"
    export function queryTOFData(): void {
        sensor = 6
        serial.writeString("AT+DATA")
    }

    //% blockId=setTOFMode block="Set TOF Model to |mode=%mode active interval time=%activeInterval second at serial TX=%Tx Rx=%Rx"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% group="Time of Flight(TOF)"
    //% blockExternalInputs=true
    export function setTOFMode(mode: MODE, activeInterval: number,Tx: SerialPin, Rx: SerialPin) : void {
        sensor = 6
        initSerial(Tx,Rx)
        if( mode === MODE.Active ) {
            let modeCmd= "AT+MODE="+activeInterval
            serial.writeString(modeCmd)
        }
        else {
            serial.writeString("AT+DATA")
        }
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
            case 6: // TOF
            {
                tof_distance = parseInt(line)
            }
            break;
        }
    })
}
