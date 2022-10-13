/**
 * Copyright 2019 Google LLC
 *
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * version 3 as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 */


export class Amplitude {
	constructor(source){
		this.meter = new Tone.Meter();
		source.connect(this._meter);
		console.log("inputNum", source.numberOfInputs)
		console.log("outputNum", source.numberOfOutputs)
	}

	getAmplitude(){
		return Math.pow(Tone.dbToGain(this._meter.getValue()), 0.8)
	}
	getLastNode(){
		return this.meter;
	}
}
