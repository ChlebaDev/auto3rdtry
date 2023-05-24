radio.setTransmitPower(7);
let radioMessage1 = 0;
let radioMessage2 = 0;
let motorSpeed = 0;

radio.onDataPacketReceived(({ receivedString }) => {

    const x = receivedString.charCodeAt(0) + 0;
    const y = receivedString.charCodeAt(1) + 0;

    const ul = Math.map(x, 0, 255, -255, 255); // přizpůsobit našim kolům
    const ur = Math.map(y, 0, 255, -215, 215);

    radioMessage1 = x;
    radioMessage2 = y;
});

function autickoJede(lw: number = 0, rw: number = 0) {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, -lw);
    PCAmotor.MotorRun(PCAmotor.Motors.M4, rw);
}
function doleva() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, 110)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -255)
}

function doprava() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, 255)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, -80)
}

function stat() {
    PCAmotor.MotorRun(PCAmotor.Motors.M1, 0)
    PCAmotor.MotorRun(PCAmotor.Motors.M4, 0)
}
basic.forever(() => {
 //   if (radioMessage2 === 128) {
 //       autickoJede(0, 0);

   /* } else */ if (radioMessage2 >= 176) {
        const speed = (radioMessage2 - 128) * 2;
        autickoJede(speed, speed);

    } else if (radioMessage2 <= 80) {
        const speedR = (128 - radioMessage2) * -2;
        autickoJede(speedR, speedR)
    } else if (radioMessage1 > 150) {
        doprava()
    } else if (radioMessage1 < 100) {
        doleva()
   } else if (radioMessage1 === 128 || radioMessage2 === 128) {
        stat()
   }



}); // rovně doleva, dozadu doleva, rovně doprava, dozadu doprava