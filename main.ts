/**
 * AIMaker STEM Sensors
 */
//% color=190 weight=100 icon="\uf1ec" block="AIMaker: UART Sensors"
//% groups=['6-Axis Inertial Measurement Unit', 'Air Quality Sensor','TVOC Sensor','High Precision Temperature and Humidity Sensor','IOT','Laser Distance Sensor','Body Temperature Sensor','Renewable energy board(M03U)','others']
namespace HANSHIN_STEM_SENSORS {
/**
 * AIMaker STEM Sensors
 */
//% color=190 weight=100 icon="\uf1ec" block="AIMaker: UART Sensors"
//% groups=['6-Axis Inertial Measurement Unit', 'Air Quality Sensor','TVOC Sensor','High Precision Temperature and Humidity Sensor','IOT','Laser Distance Sensor','Body Temperature Sensor','Renewable energy board(M03U)','others']
    let buffer = ""
    let sensor=0
    let angle_x = 0.0
    let angle_y = 0.0
    let angle_z = 0.0
    let pm25=0
    let pm10=0
    let tvoc=0
    let co2=0
    let temperature=0.0
    let humidity=0.0
//     let dht11_humidity = -999.0
//     let dht11_temperature = -999.0
//     let dht11_readSuccessful = false
    let tof_distance = 0

    // M03U
    let batteryV = 0
    let batteryA = 0
    let chargeV = 0
    let chargeA = 0
    
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
        serial.setRxBufferSize(128)
        serial.setTxBufferSize(128)
        buffer = serial.readString()
        basic.pause(100)
        serial.writeString("CM")
        basic.pause(300)
        serial.readString();
    }

//     //% blockId=dHT11Humidity block="Humidity" 
//     //% group="Temperature and Humidity Sensor"
//     export function dHT11Humidity(): number {
//         return dht11_humidity;
//     }
    
//     //% blockId=dHT11Temperature block="Temperature" 
//     //% group="Temperature and Humidity Sensor"
//     export function dHT11Temperature(): number {
//         return dht11_temperature;
//     }

//     //% block="Read Data pin $dataPin|Wait 2 sec after query $wait"
//     //% wait.defl=true
//     //% group="Temperature and Humidity Sensor"
//     export function queryDHT11Data(dataPin: DigitalPin, wait: boolean) 
//     {
//         //initialize
//         let startTime: number = 0
//         let endTime: number = 0
//         let checksum: number = 0
//         let checksumTmp: number = 0
//         let dataArray: boolean[] = []
//         let resultArray: number[] = []
//         for (let index = 0; index < 40; index++) dataArray.push(false)
//         for (let index2 = 0; index2 < 5; index2++) resultArray.push(0)
//         dht11_humidity = -999.0
//         dht11_temperature = -999.0
//         dht11_readSuccessful = false

//         startTime = input.runningTimeMicros()

//         //request data
//         pins.digitalWritePin(dataPin, 0) //begin protocol
//         basic.pause(18)
//        // pins.setPull(dataPin, PinPullMode.PullUp)
//         pins.digitalReadPin(dataPin)
//         control.waitMicros(20)
//         while (pins.digitalReadPin(dataPin) == 1);
//         while (pins.digitalReadPin(dataPin) == 0); //sensor response
//         while (pins.digitalReadPin(dataPin) == 1); //sensor response

//         //read data (5 bytes)
//         for (let index3 = 0; index3 < 40; index3++) {
//             while (pins.digitalReadPin(dataPin) == 1);
//             while (pins.digitalReadPin(dataPin) == 0);
//             control.waitMicros(28)
//             //if sensor pull up data pin for more than 28 us it means 1, otherwise 0
//             if (pins.digitalReadPin(dataPin) == 1) dataArray[index3] = true
//         }

//         endTime = input.runningTimeMicros()

//         //convert byte number array to integer
//         for (let index4 = 0; index4 < 5; index4++)
//             for (let index22 = 0; index22 < 8; index22++)
//                 if (dataArray[8 * index4 + index22]) resultArray[index4] += 2 ** (7 - index22)

//         //verify checksum
//         checksumTmp = resultArray[0] + resultArray[1] + resultArray[2] + resultArray[3]
//         checksum = resultArray[4]
//         if (checksumTmp >= 512) checksumTmp -= 512
//         if (checksumTmp >= 256) checksumTmp -= 256
//         if (checksum == checksumTmp) dht11_readSuccessful = true

//         //read data if checksum ok
//         if (dht11_readSuccessful) {
//             dht11_humidity = resultArray[0] + resultArray[1] / 100
//             dht11_temperature = resultArray[2] + resultArray[3] / 100
//         }
//         //wait 2 sec after query if needed
//         if (wait) basic.pause(2000)
//     }

    //% blockId=yawZ block="Yaw" 
    //% group="6-Axis Inertial Measurement Unit"
    export function yawZ() : number {
        return angle_z;
    }

    //% blockId=rollY block="Roll" 
    //% group="6-Axis Inertial Measurement Unit"
    export function rollY() : number {
        return angle_y;
    }

    //% blockId=pitchX block="Pitch" 
    //% group="6-Axis Inertial Measurement Unit"
    export function pitchX() : number {
        return angle_x;
    }
    
    //% blockId=queryGyroData block="Read gyro data" 
    //% group="6-Axis Inertial Measurement Unit"
    export function queryGyroData() : void {
        sensor = 2
        serial.writeString("CM+D08U")
        basic.pause(100)
    }
    //% blockId=setGyroModel block="Set Gyro Model to |mode=%mode active interval time=%activeInterval second at serial TX=%Tx Rx=%Rx"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    //% group="6-Axis Inertial Measurement Unit"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% blockExternalInputs=true
    export function setGyroModel(mode: MODE, activeInterval: number,Tx: SerialPin, Rx: SerialPin) : void {
        sensor = 2
        initSerial(Tx,Rx)
        if( mode === MODE.Active ) {
            let modeCmd22= "CM+D08U="+activeInterval
            serial.writeString(modeCmd22)
        }
        else {
            serial.writeString("CM+D08U")
        }
        basic.pause(100)
    }
   
    //% blockId=pM25 block="PM2.5" 
    //% group="Air Quality Sensor"
    export function pM25(): number {
        return pm25;
    }

    //% blockId=pM10 block="PM10" 
    //% group="Air Quality Sensor"
    export function pM10(): number {
        return pm10;
    }
    
    //% blockId=queryPMT7Data block="Read Air Quality data" 
    //% group="Air Quality Sensor"
    export function queryPMT7Data() : void {
        sensor = 3
        serial.writeString("CM+D11U")
        basic.pause(100)
    }

    //% blockId=setPM_T7Model block="Set PM_T7 Model to |mode=%mode active interval time=%activeInterval second at serial TX=%Tx Rx=%Rx"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    //% group="Air Quality Sensor"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% blockExternalInputs=true
    export function setPMT7Model(mode: MODE, activeInterval: number,Tx: SerialPin, Rx: SerialPin) : void {
        sensor = 3
        initSerial(Tx,Rx)
        if( mode === MODE.Active ) {
            let modeCmd3= "CM+D11U="+activeInterval
            serial.writeString(modeCmd3)
        }
        else {
            serial.writeString("CM+D11U")
        }
        basic.pause(100)
    }

    //% blockId=tVOC block="TVOC" 
    //% group="TVOC Sensor"
    export function tVOC(): number {
        return tvoc;
    }

    //% blockId=cO2 block="CO2" 
    //% group="TVOC Sensor"
    export function cO2(): number {
        return co2;
    }

    //% blockId=querySGP30Data block="Read SGP30 data" 
    //% group="TVOC Sensor"
    export function querySGP30Data() : void {
        sensor = 4
        serial.writeString("CM+D10U")
        basic.pause(100)
    }
    //% blockId=setSGP30Model block="Set SGP30 Model to |mode=%mode active interval time=%activeInterval second at serial TX=%Tx Rx=%Rx"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    //% group="TVOC Sensor"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% blockExternalInputs=true
    export function setSGP30Model(mode: MODE, activeInterval: number,Tx: SerialPin, Rx: SerialPin) : void {
        sensor = 4
        initSerial(Tx,Rx)
        if( mode === MODE.Active ) {
            let modeCmd4= "CM+D10U="+activeInterval
            serial.writeString(modeCmd4)
        }
        else {
            serial.writeString("CM+D10U")
        }
        basic.pause(100)
    }
    
    //% blockId=temperatureValue block="Temperature" 
    //% group="High Precision Temperature and Humidity Sensor"
    export function temperatureValue(): number {
        return temperature;
    }

    //% blockId=humidityValue block="Humidity" 
    //% group="High Precision Temperature and Humidity Sensor"
    export function humidityValue(): number {
        return humidity;
    }

    


    //% blockId=querySHTX31Data block="Read SHT31X data" 
    //% group="High Precision Temperature and Humidity Sensor"
    export function querySHTX31Data() : void {
        sensor = 5
        serial.writeString("CM+D09U")
        basic.pause(100)
    }
   
    //% blockId=setSHT31XModel block="Set SHT31X Model to |mode=%mode active interval time=%activeInterval second at serial TX=%Tx Rx=%Rx"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    //% group="High Precision Temperature and Humidity Sensor"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% blockExternalInputs=true
    export function setSHTX31Model(mode: MODE, activeInterval: number,Tx: SerialPin, Rx: SerialPin) : void {
        sensor = 5
        initSerial(Tx,Rx)
        if( mode === MODE.Active ) {
            let modeCmd5= "CM+D09U="+activeInterval
            serial.writeString(modeCmd5)
            basic.pause(150)
            serial.writeString(modeCmd5)
        }
        else {
            serial.writeString("CM+D09U")
        }
        basic.pause(100)
    }

    //% blockId=tofDistanceValue block="Distance" 
    //% group="Laser Distance Sensor"
    export function tofDistanceValue(): number {
        return tof_distance;
    }    
    //% blockId=queryTOFData block="Read distance(mm)" 
    //% group="Laser Distance Sensor"
    export function queryTOFData(): void {
        sensor = 6
        serial.writeString("CM+D12U")
        basic.pause(100)
    }

    //% blockId=setTOFMode block="Set laser distance sensor Model to |mode=%mode active interval time=%activeInterval second at serial TX=%Tx Rx=%Rx"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% group="Laser Distance Sensor"
    //% blockExternalInputs=true
    export function setTOFMode(mode: MODE, activeInterval: number,Tx: SerialPin, Rx: SerialPin) : void {
        sensor = 6
        initSerial(Tx,Rx)
        if( mode === MODE.Active ) {
            let modeCmd= "CM+D12U="+activeInterval
            serial.writeString(modeCmd)
        }
        else {
            serial.writeString("CM+D12U")
        }
        basic.pause(100)
    }

    let mlxTempture = 0
    //% blockId=mlx90614Temperature block="Temperature" 
    //% group="Body Temperature Sensor"
    export function mlx90614Temperature(): number {
        return mlxTempture;
    }

    //% blockId=queryMLX90614Data block="Read temperature" 
    //% group="Body Temperature Sensor"
    export function queryMLX90614Data(): void {
        sensor = 7
        serial.writeString("CM+D05U")
        basic.pause(100)
    }

    //% blockId=setMLX90614Mode block="Set sensor Model to |mode=%mode active interval time=%activeInterval second at serial TX=%Tx Rx=%Rx"
    //% mode.fieldEditor="gridpicker" mode.fieldOptions.columns=1
    //% activeInterval.min=1 activeInterval.max=9 activeInterval.defl=5
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% group="Body Temperature Sensor"
    //% blockExternalInputs=true
    export function setMLX90614Mode(mode: MODE, activeInterval: number,Tx: SerialPin, Rx: SerialPin) : void {
        sensor = 7
        initSerial(Tx,Rx)
        if( mode === MODE.Active ) {
            let modeCmd2= "CM+D05U="+activeInterval
            serial.writeString(modeCmd2)
        }
        else {
            serial.writeString("CM+D05U")
        }
        basic.pause(100)
    }

    //% blockId=batteryVoltage block="Battery voltage(mv)" 
    //% group="Renewable energy board(M03U)"
    export function batteryVoltage(): number {
        return batteryV;
    }

    //% blockId=batteryCurrent block="Battery current(ma)" 
    //% group="Renewable energy board(M03U)"
    export function batteryCurrent(): number {
       return batteryA;
    }

     //% blockId=chargeVoltage block="Charge voltage(mv)" 
    //% group="Renewable energy board(M03U)"
    export function chargeVoltage(): number {
       return chargeV;
    }

     //% blockId=chargeCurrent block="Charge current(ma)" 
    //% group="Renewable energy board(M03U)"
    export function chargeCurrent(): number {
       return chargeA;
    }

    //% blockId=queryM03UData block="Query M03U data at serial TX=%Tx Rx=%Rx" 
    //% group="Renewable energy board(M03U)"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    export function queryM03UData(Tx: SerialPin, Rx: SerialPin): void {
        initSerial(Tx,Rx)
        serial.writeString("CM+M03U")
        basic.pause(100)
    }
    //% blockId=setWifiInfo block="Connect to WIFI, |SSID=%name Password=%password at serial TX=%Tx Rx=%Rx"
    //% Tx.fieldEditor="gridpicker" Tx.fieldOptions.columns=4
    //% Rx.fieldEditor="gridpicker" Rx.fieldOptions.columns=4
    //% group="IOT"
    export function setWifiInfo(name: string, password: string,Tx: SerialPin, Rx: SerialPin): void {
        initSerial(Tx,Rx)
        serial.writeString("AT+CWMODE=3")
        basic.pause(300)        
        let cmdwifi = "AT+CWJAP=\"" + name + "\",\"" + password + "\""
        serial.writeString(cmdwifi)
        basic.pause(10000)
    }

    //% blockId=TriggerEvent block="Trigger event, |key=%key event=%event"
    //% group="IOT"
    export function triggerEvent(key: string, event: string): void {
        let cmd2 = "https://maker.ifttt.com/trigger/" + event + "/with/key/" + key
        serial.writeString(cmd2)
        basic.pause(100)
    }
    
    //% blockId=triggerThingSpeakEvent block="Trigger thing speak event, |key=%key field=%field value=%value"
    //% field.min=1 field.defl=1
    //% group="IOT"
    export function triggerThingSpeakEvent(key: string, field:number, value: string): void {
        let cmd22 = "https://api.thingspeak.com/update?api_key=" + key + "&field" + field +"=" + value
        serial.writeString(cmd22)
        basic.pause(100)
    }


    serial.onDataReceived(serial.delimiters(Delimiters.NewLine), function () {
        let line = serial.readLine() 
        if( line.length <= 1 )
            return ;
        let h0 = line.substr(0,1)
        sensor = 100
        if( h0 == "A" )
        {
            h0 = line.substr(0,2)
            if( h0 == "AT" )
            {
                sensor = 100
            }
            else if( line.length == 18 )
            {
                sensor=2
                line = line.substr(1)
            }
        } else if( h0 == "B" )
        {
            //sensor=2
            //line = line.substr(1)
        } else if( h0== "C" && line.length == 9 )
        {            
            sensor=3
            line = line.substr(1)
        }else if( h0== "D" && line.length == 11)
        {
            sensor=4
            line = line.substr(1)
        }else if( h0== "E" && line.length == 12 )
        {
            sensor=5
            line = line.substr(1)
        }else if( h0== "F" && line.length == 7 )
        {
            sensor=7
            line = line.substr(1)
        }else if( h0== "G" && line.length == 5 )
        {
            sensor=6
            line = line.substr(1)
        }
        else if( h0 == "M" && line.length == 21 )
        {
            sensor =8
            line = line.substr(1)
        }
        else
        {
            sensor=100
        }

        switch( sensor ) {
            default:
                break;
            case 1: // MPU6050
            {
                // acc_x= parseInt(line.substr(1,5))
                // if( line.substr(0,1) === "-")
                //     acc_x *= -1
                // acc_y= parseInt(line.substr(7,5))
                // if( line.substr(6,1) === "-")
                //     acc_y *= -1
                // acc_z= parseInt(line.substr(13,5))
                // if( line.substr(12,1) === "-")
                //     acc_z *= -1

                // let g = 9.8
                // acc_x = 2*g * acc_x / 32768
                // acc_y = 2*g * acc_y / 32768
                // acc_z = 2*g * acc_z / 32768

                // acc_x = Math.floor(1000*acc_x) / 1000
                // acc_y = Math.floor(1000*acc_y) / 1000
                // acc_z = Math.floor(1000*acc_z) / 1000  
            }
                break;
            case 2: // Gyro
            {
                angle_x = parseFloat(line.substr(1,4))
                if( line.substr(0,1) === "-")
                    angle_x *= -1
                    
                angle_y = parseFloat(line.substr(6,5))
                if( line.substr(5,1) === "-")
                    angle_y *= -1

                angle_z = parseFloat(line.substr(12,5))
                if( line.substr(11,1) === "-")
                    angle_z *= -1
                // Gyro_x= parseInt(line.substr(1,5))
                // if( line.substr(0,1) === "-")
                //     Gyro_x *= -1
                // Gyro_y= parseInt(line.substr(7,5))
                // if( line.substr(6,1) === "-")
                //     Gyro_y *= -1
                // Gyro_z= parseInt(line.substr(13,5))
                // if( line.substr(12,1) === "-")
                //     Gyro_z *= -1
                
                // Gyro_x = 1000 * Gyro_x / 32768
                // Gyro_y = 1000 * Gyro_y / 32768
                // Gyro_z = 1000 * Gyro_z / 32768
                
                // Gyro_x = Math.floor(100*Gyro_x) / 100
                // Gyro_y = Math.floor(100*Gyro_y) / 100
                // Gyro_z = Math.floor(100*Gyro_z) / 100                
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
            case 7: //MLX90614
            {
                mlxTempture = parseFloat(line.substr(1,5))
                if(line.substr(0,1) === "-" )
                    mlxTempture *= -1
            }
            break;
            case 8:
            {
                batteryV = parseInt(line.substr(1,4))
                batteryA = parseInt(line.substr(6,4))
                chargeV = parseInt(line.substr(11,4))
                chargeA = parseInt(line.substr(16,4))
            }
            break;
        }
    })
}
