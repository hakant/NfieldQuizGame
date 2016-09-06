var HID = require('node-hid');
var BitMask = require('bit-mask');
var BitArray = require('node-bitarray');
var bitwise = require('bitwise');
var socket = require('socket.io-client')('https://frill-crafter.hyperdev.space');

var device = new HID.HID("USB_054c_1000_14200000");

device.on("data", function(data) {
    SendEventForController1(data);
    SendEventForController2(data);
    SendEventForController3(data);
    SendEventForController4(data);
});

function SendEventForController1(data){
    var byte1 = bitwise.readByte(data[4]);
    var byte2 = bitwise.readByte(data[3]);

    var numberOfButtonsPressed = 0;
    var buttonId = 0;

    if (byte2[0]){
        numberOfButtonsPressed++;
        buttonId = 0;
    }

    if (byte1[4]){
        numberOfButtonsPressed++;
        buttonId = 1;
    }

    if (byte1[5]){
        numberOfButtonsPressed++;
        buttonId = 2;
    }

    if (byte1[6]){
        numberOfButtonsPressed++;
        buttonId = 3;
    }

    if (byte1[7]){
        numberOfButtonsPressed++;
        buttonId = 4;
    }

    if (numberOfButtonsPressed === 1){
        Emit(1, buttonId);
    }
}

function SendEventForController2(data){
    var byte = bitwise.readByte(data[3]);

    var numberOfButtonsPressed = 0;
    var buttonId = 0;

    if (byte[1]){
        numberOfButtonsPressed++;
        buttonId = 1;
    }

    if (byte[2]){
        numberOfButtonsPressed++;
        buttonId = 2;
    }

    if (byte[3]){
        numberOfButtonsPressed++;
        buttonId = 3;
    }

    if (byte[4]){
        numberOfButtonsPressed++;
        buttonId = 4;
    }

    if (byte[5]){
        numberOfButtonsPressed++;
        buttonId = 0;
    }

    if (numberOfButtonsPressed === 1){
        Emit(2, buttonId);
    }
}

function SendEventForController3(data){
    var byte1 = bitwise.readByte(data[3]);
    var byte2 = bitwise.readByte(data[2]);

    var numberOfButtonsPressed = 0;
    var buttonId = 0;

    if (byte1[6]){
        numberOfButtonsPressed++;
        buttonId = 1;
    }

    if (byte1[7]){
        numberOfButtonsPressed++;
        buttonId = 2;
    }

    if (byte2[0]){
        numberOfButtonsPressed++;
        buttonId = 3;
    }

    if (byte2[1]){
        numberOfButtonsPressed++;
        buttonId = 4;
    }

    if (byte2[2]){
        numberOfButtonsPressed++;
        buttonId = 0;
    }

    if (numberOfButtonsPressed === 1){
        Emit(3, buttonId);
    }
}

function SendEventForController4(data){
    var byte = bitwise.readByte(data[2]);

    var numberOfButtonsPressed = 0;
    var buttonId = 0;

    if (byte[3]){
        numberOfButtonsPressed++;
        buttonId = 1;
    }

    if (byte[4]){
        numberOfButtonsPressed++;
        buttonId = 2;
    }

    if (byte[5]){
        numberOfButtonsPressed++;
        buttonId = 3;
    }

    if (byte[6]){
        numberOfButtonsPressed++;
        buttonId = 4;
    }

    if (byte[7]){
        numberOfButtonsPressed++;
        buttonId = 0;
    }

    if (numberOfButtonsPressed === 1){
        Emit(4, buttonId);
    }
}

function Emit(controllerId, buttonId){
    socket.emit('button-clicked', `{ "ControllerId": ${controllerId}, "ButtonId": ${buttonId} }`);
}