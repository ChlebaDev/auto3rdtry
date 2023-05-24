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

basic.forever(() => {
    if (radioMessage2 === 128) {
        autickoJede(0, 0);

    } else if (radioMessage2 === 0) {
        autickoJede(-255, -215);

    } else if (radioMessage2 === 255) {
        autickoJede(255, 215)

    } else if (radioMessage2 >= 129) {
        const speed = (radioMessage2 - 128) * 2;
        const equality = speed / 6;
        autickoJede(speed, speed - equality);

    } else if (radioMessage2 <= 127) {
        const speedR = (128 - radioMessage2) * -2;
        const equalityR = speedR / 6;
        autickoJede(speedR, speedR + equalityR);
    } 












});