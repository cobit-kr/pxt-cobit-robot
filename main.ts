enum Motor {
    //% block="left"
    Left = 0,
    //% block="right"
    Right = 1
}

enum MotorDirection {
    //% block="CCW"
    CCW = 0,
    //% block="CW"
    CW = 1
}

/**
 * Functions to operate the moto:bit
 */
//% color=#f44242 icon="\uf1b9" block="cobit-robot"
namespace cobit_robot {

	/**
	 * Run left or right motor to CCW or CW with speed of percent. 
     * @param motor left or right motor 
     * @param direction CCW or CW 
     * @param speed speed as percent
	 */
    //% blockId="cobit_runMotor" block="run %motor motor|motor %direction|at %speed|%"
    //% speed.min=0 speed.max=100
    //% weight=80
    export function runMotor(motor: Motor, direction: MotorDirection, speed: number): void {
        let pwr = 0
        speed = Math.abs(speed)
        if (speed > 100) {
            speed = 100
        }

        pwr = speed * 10
        if (pwr > 1024) {
            pwr = 1024
        }

        if (motor == Motor.Left) {
            if (direction == MotorDirection.CCW) {
                pins.digitalWritePin(DigitalPin.P13, 1)
                pins.analogWritePin(AnalogPin.P14, (1024 - pwr))
            } else if (direction == MotorDirection.CW) {
                pins.digitalWritePin(DigitalPin.P13, 0)
                pins.analogWritePin(AnalogPin.P14, pwr)
            }

        } else if (motor == Motor.Right) {
            if (direction == MotorDirection.CCW) {
                pins.digitalWritePin(DigitalPin.P15, 1)
                pins.analogWritePin(AnalogPin.P16, (1024 - pwr))
            } else if (direction == MotorDirection.CW) {
                pins.digitalWritePin(DigitalPin.P15, 1)
                pins.analogWritePin(AnalogPin.P16, pwr)
            }
        }
    }

	/**
	 * Stops the motor.
	 */
    //% weight=90
    //% blockId="cobit_stopMotor" block="motor stop"
    export function motorStop(): void {
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P16, 0)
    }

    /**
	 * Go forward
	 */
    //% speed.min=0 speed.max=100
    //% weight=90
    //% blockId="cobit_goForward" block="go forward at %speed|%"
    export function goForward(speed: number): void {
        let pwr = 0
        if (speed > 100) {
            speed = 100
        }
        pwr = speed * 10
        if (pwr > 1024) {
            pwr = 1024
        }
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, pwr)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P16, pwr)
    }

    /**
	 *  Go backward
	 */
    //% speed.min=0 speed.max=100
    //% weight=90
    //% blockId="cobit_goBackward" block="go backward at %speed|%"
    export function goBackward(speed: number): void {
        let pwr = 0
        if (speed > 100) {
            speed = 100
        }
        pwr = speed * 10
        if (pwr > 1024) {
            pwr = 1024
        }
        pins.digitalWritePin(DigitalPin.P13, 1)
        pins.analogWritePin(AnalogPin.P14, (1024 - pwr))
        pins.digitalWritePin(DigitalPin.P15, 1)
        pins.analogWritePin(AnalogPin.P16, (1024 - pwr))
    }

    /**
	 *  Turn left
	 */
    //% speed.min=0 speed.max=100
    //% weight=90
    //% blockId="cobit_turnLeft" block="turn left at %speed|%"
    export function turnLeft(speed: number): void {
        let pwr = 0
        if (speed > 100) {
            speed = 100
        }
        pwr = speed * 10
        if (pwr > 1024) {
            pwr = 1024
        }
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, pwr)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P16, 0)
    }

    /**
	 *  Turn right
	 */
    //% speed.min=0 speed.max=100
    //% weight=90
    //% blockId="cobit_turnRight" block="turn right at %speed|%"
    export function turnLight(speed: number): void {
        let pwr = 0
        if (speed > 100) {
            speed = 100
        }
        pwr = speed * 10
        if (pwr > 1024) {
            pwr = 1024
        }
        pins.digitalWritePin(DigitalPin.P13, 0)
        pins.analogWritePin(AnalogPin.P14, 0)
        pins.digitalWritePin(DigitalPin.P15, 0)
        pins.analogWritePin(AnalogPin.P16, pwr)
    }

    /**
	 *  Read ultrasonic sensor 
	 */
    //% weight=90
    //% blockId="cobit_readUltraSonic" block="read Ultrasoninc sensor with trigger %trigger| and ech %echo|"
    export function readUltraSonic(triggerPin: DigitalPin, echoPin: DigitalPin): number {
        let value = 0
        pins.digitalWritePin(DigitalPin.P1, 0)
        basic.pause(2)
        pins.digitalWritePin(DigitalPin.P1, 1)
        basic.pause(10)
        pins.digitalWritePin(DigitalPin.P1, 0)
        value = pins.pulseIn(DigitalPin.P2, PulseValue.High) / 58
        return value
    }


}