'use strict';

// Create an instance
var wavesurfer;
var ch0_data;
var ch1_data;

class HapticArray{
    constructor() {
        this.devices = []
      }
    
    add(hapticdevice){
        this.devices.push(hapticdevice);
    }
    del(id){
        let cnt = 0;
        this.devices.forEach(device => {
            if (device.device.id == id){
                this.devices[cnt].disconnect()
                this.devices.splice(cnt, 1);
                console.log("device successfully disconneted" );
            }
            cnt = cnt + 1;
        });
    }
    send(data){
        this.devices.forEach(device => {
            device.writeEbafeaeedccaec(data);
        });
    }
}

var haptic_devices = new HapticArray();

class HapticDevice {

    constructor() {
      this.device = null;
      this.onDisconnected = this.onDisconnected.bind(this);
    }
    
    async request() {
      let options = {
        "filters": [{
          "namePrefix": "Haptic"
        }],
        "optionalServices": ["6e400001-b5a3-f393-e0a9-e50e24dcca9e"]
      };
      this.device = await navigator.bluetooth.requestDevice(options);
      if (!this.device) {
        throw "No device selected";
      }
      this.device.addEventListener('gattserverdisconnected', this.onDisconnected);
    }
    
    async connect() {
      if (!this.device) {
          Promise.reject('Device is not connected.');
        return 0
      }
      await this.device.gatt.connect();
      return 1
    }
    
    writeEbafeaeedccaec(data) {
      // RX Characteristic (6E400002-B5A3-F393-E0A9-E50E24DCCA9E)
      // Write or Write Without Response
      // Write data to the RX Characteristic to send it on to the UART interface.
      return this.device.gatt.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e")
      .then(service => service.getCharacteristic("6e400002-b5a3-f393-e0a9-e50e24dcca9e"))
      .then(characteristic => characteristic.writeValue(data))
      .catch(error => {
        console.log('Argh! ' + error);
      });
    }
  
    async startNotifications(listener) {
      // TX Characteristic (6E400003-B5A3-F393-E0A9-E50E24DCCA9E)
      // Notify
      // Enable notifications for the TX Characteristic to receive data from the application. The application transmits all data that is received over UART as notifications.
      const service = await this.device.gatt.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
      const characteristic = await service.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e");
      await characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', listener);
    }
  
    async stopNotifications(listener) {
        const service = await this.device.gatt.getPrimaryService("6e400001-b5a3-f393-e0a9-e50e24dcca9e");
        const characteristic = await service.getCharacteristic("6e400003-b5a3-f393-e0a9-e50e24dcca9e");
        await characteristic.stopNotifications();
        characteristic.removeEventListener('characteristicvaluechanged', listener);
    }
  
    disconnect() {
      if (!this.device) {
        return Promise.reject('Device is not connected.');
      }
      return this.device.gatt.disconnect();
    }
  
    onDisconnected() {
      console.log('Device is disconnected.');
    }
  }
function onebyte_to_twobyte_int(high, low){
    let tmp = (((high & 0xff) << 8) | (low & 0xff));
    return tmp;
}

function twobyte_int_to_onebyte(origin){
    let high = ((origin >> 8) & 0xff);
    let low = origin & 0xff;
    return [high, low];
}

function onebyte_to_fourbyte_float(origin){
    let buf = new ArrayBuffer(4);
    let view = new DataView(buf);
    origin.forEach(function (b, i) {
        view.setInt8(i, b);
    });
    return view.getFloat32(0);
}

function fourbyte_float_to_onebyte(origin){
    let high = ((origin >> 8) & 0xff);
    let low = origin & 0xff;
    return high, low;
}

function haptic_listener(event){
    let data_buffer = new ArrayBuffer(19);
    let view = new Uint8Array(data_buffer);

    for (var i = 0; i<19;i++){
        view[i] = event.currentTarget.value.getInt8(i);
    }
    console.log(view);
    console.log(data_buffer);
    // 0xF1 : battery info
    // 4byte float

    if (view[1]==-15){
        console.log("current battery" + onebyte_to_fourbyte_float([view[2],view[3],view[4],view[5]])/4.2);
    }
    // 0xF2 : echo [freq] [amp]
    // 2byte, 2byte
    if (view[1]==-14){
        console.log("WOW");
    }
    // 0xF3 : Device info [BLE Connection Interval MIN] [BLE Connection Interval MAX] [Freq MIN] [Freq MAX]
    // 2byte, 2byte, 2byte, 2byte
    if (view[1]==-13){
        console.log("WOW");
        console.log("BLE Connection Interval MIN from" + onebyte_to_twobyte_int(view[2],view[3]));
        console.log("BLE Connection Interval MAX from" + onebyte_to_twobyte_int(0,view[4],view[5]));
        console.log("Freq MIN" + onebyte_to_twobyte_int(view[6],view[7]));
        console.log("Freq MAX" + onebyte_to_twobyte_int(view[8],view[9]));
    }
    // 0xF4 : Device info2 [firmware version] [hardmware version] [MAC Address]
    // 2byte, 2byte, 6byte
    if (view[1]==-12){
        console.log("WOW");
    }
}

// Init & load audio file
document.addEventListener('DOMContentLoaded', function() {
    // Init
    wavesurfer = WaveSurfer.create({
        container: document.querySelector('#waveform'),
        waveColor: '#A8DBA8',
        progressColor: '#3B8686',
        normalize: true
    });

    // Load audio from URL
    wavesurfer.load('./assets/beat2.mp3');

    // Log errors
    wavesurfer.on('error', function(msg) {
        console.log(msg);
    });
    document
    .querySelector('[data-action="SendHapticPattern"]')
    .addEventListener('click', function(event) {
        let data_buffer = new ArrayBuffer(19);
        let view = new Int8Array(data_buffer);
        view[0] = 36; // STX 0x24
        view[1] = 2; // TYPE 0x02
        
        var tmp = twobyte_int_to_onebyte(300)
        view[2] = tmp[0]
        view[3] = tmp[1]
        tmp = twobyte_int_to_onebyte(50)
        view[4] = tmp[0]
        view[5] = tmp[1]
        
        view[17] = 13; // ETX 0x0D
        view[18] = 10; // ETX 0x0A
        console.log(view)
        haptic_devices.send(view);
        
    });

    document
    .querySelector('[data-action="DisconnectHapticDevice"]')
    .addEventListener('click', function(event) {
        let device = new HapticDevice();
        device.request()
        .then(_=> {
            haptic_devices.del(device.device.id);
        })
        .catch(error => {
            console.log('Argh! ' + error);
        });
    });

    document
    .querySelector('[data-action="SearchHapticDevice"]')
    .addEventListener('click', async event => {
        let device = new HapticDevice();
        await device.request()
        let flag = await device.connect();
        if (flag){
            await device.startNotifications(haptic_listener)
            haptic_devices.add(device);
        }
        console.log('> Name:             ' + device.device.name);
        console.log('> Id:               ' + device.device.id);
        console.log('> Connected:        ' + device.device.gatt.connected);
        });

    // Bind play/pause button
    document
        .querySelector('[data-action="play"]')
        .addEventListener('click', wavesurfer.playPause.bind(wavesurfer));

    // document
    // .querySelector('[data-action="lowPassFilter"]')
    // .addEventListener('click', function() {
    //     // load peaks from JSON file. See https://wavesurfer-js.org/faq/
    //     // for instructions on how to generate peaks
    //     // TODO: Change it to bandpass filter
    //         var lowwpass = wavesurfer.backend.ac.createBiquadFilter();
    //         console.log('lowpass-filter');
    //         lowwpass.frequency.value = 100;
    //         console.log(lowwpass);
    //         console.log(wavesurfer.backend.buffer);
    //         wavesurfer.backend.setFilter(lowwpass);
    //         console.log(wavesurfer.backend.buffer);
    //     });

    document
    .querySelector('[data-action="test"]')
    .addEventListener('click', function() {
        console.log(wavesurfer.getDuration());
        console.log(wavesurfer.backend.buffer.sampleRate);
        console.log(wavesurfer.backend.buffer.length);
        console.log(wavesurfer.backend.buffer.numberOfChannels);
        // console.log(wavesurfer.backend.mergedPeaks);
        
        ch0_data = wavesurfer.backend.buffer.getChannelData(0);
        ch1_data = wavesurfer.backend.buffer.getChannelData(1);
        // vocal, drum, guit, bass, inst
        wavesurfer.load('./assets/bass.mp3');

        // wavesurfer.backend.buffer.copyToChannel(ch0_data, 0);
        // wavesurfer.backend.buffer.copyToChannel(ch1_data, 1);
        
        // wavesurfer.loadDecodedBuffer(wavesurfer.backend.buffer);
    });

    document
    .querySelector('[data-action="test2"]')
    .addEventListener('click', function() {
        console.log(wavesurfer.getDuration());
        console.log(wavesurfer.backend.buffer.sampleRate);
        console.log(wavesurfer.backend.buffer.length);
        console.log(wavesurfer.backend.buffer.numberOfChannels);

        ch0_data = wavesurfer.backend.buffer.getChannelData(0);
        ch1_data = wavesurfer.backend.buffer.getChannelData(1);

        const hz = 100;
        const volume = 1.0;
        const sineWaveArray = new Float32Array(wavesurfer.backend.buffer.length);
        var i;
        var sampleTime;

        for (i = 0; i < sineWaveArray.length; i++) {
            sampleTime = i / wavesurfer.backend.buffer.sampleRate;
            // sineWaveArray[i] = Math.sin(Math.asin(ch0_data[i])* hz) * volume;
            // sineWaveArray[i] = Math.sin(Math.asin(ch0_data[i])* Math.PI * 2) * volume;
            sineWaveArray[i] = Math.sin(sampleTime * Math.PI * 2 * hz) * volume;
        }
        
        const ch0_haptic = new Float32Array(wavesurfer.backend.buffer.length);
        const ch1_haptic = new Float32Array(wavesurfer.backend.buffer.length);

        for (i = 0; i < sineWaveArray.length; i++) {
            ch0_haptic[i] = sineWaveArray[i]*Math.abs(ch0_data[i]);
            ch1_haptic[i] = sineWaveArray[i]*Math.abs(ch1_data[i]);
            // ch0_haptic[i] = sineWaveArray[i];
            // ch1_haptic[i] = sineWaveArray[i];
        }
        console.log(ch1_haptic)
        wavesurfer.backend.buffer.copyToChannel(ch0_haptic, 0);
        wavesurfer.backend.buffer.copyToChannel(ch1_haptic, 1);
        
        wavesurfer.loadDecodedBuffer(wavesurfer.backend.buffer);

        // console.log(wavesurfer.backend.data);
        // wavesurfer.load(osc)
    });

    // Progress bar
    (function() {
        const progressDiv = document.querySelector('#progress-bar');
        const progressBar = progressDiv.querySelector('.progress-bar');

        let showProgress = function(percent) {
            progressDiv.style.display = 'block';
            progressBar.style.width = percent + '%';
        };

        let hideProgress = function() {
            progressDiv.style.display = 'none';
        };

        wavesurfer.on('loading', showProgress);
        wavesurfer.on('ready', hideProgress);
        wavesurfer.on('destroy', hideProgress);
        wavesurfer.on('error', hideProgress);
    })();
});