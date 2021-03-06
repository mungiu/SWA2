class ImmutableEvent {
    constructor(_place, _time) {
        this.place = _place;
        if (_time == null) {
            this.time = new Date().toLocaleString();
        }
        else
            this.time = _time;

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutableEvent) {
            Object.freeze(this)
        }
    }

    getPlace() { return this.place }
    setPlace(_newPlace) { return new ImmutableEvent(_newPlace, this.time) }
    
    getTime() { return this.time }
    toString() { return `Place: ${this.getPlace()}, Time - ${this.getTime()}` }
}
var myEvent = new ImmutableEvent('Horsens', null);
console.log('TEST IMMUTABLE EVENT');
console.log('Data Must Change');
console.log(myEvent.toString());
var secondEvent = myEvent.setPlace('USA');
console.log(secondEvent.toString());
console.log('Data Must Remain The Same');
console.log(myEvent.toString());
myEvent.time = new Date(11111).toLocaleString();
console.log(myEvent.toString());

class ImmutableDataType extends ImmutableEvent {
    constructor(_unit, _type, _place, _time) {
        super(_place, _time);

        this.unit = _unit;
        this.type = _type;

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === ImmutableDataType) {
            Object.freeze(this)
        }
    }

    getUnit() { return this.unit }
    setUnit(newUnit) { return new ImmutableDataType(newUnit, this.type, this.place, this.time) }

    getType() { return this.type }
    setType(newType) { return new ImmutableDataType(this.unit, newType, this.place, this.time) }

    toString() { return `Unit: ${this.getUnit()}, Type: ${this.getType()}, Place: ${this.getPlace()}, Time: ${this.getTime()}` }
}
var myDataType = new ImmutableDataType('testUnit', 'testType', 'testPlace', null);
console.log()
console.log('TEST IMMUTABLE DATA TYPE');
console.log('Data Must Change');
console.log(myDataType.toString());
var secondData = myDataType.setUnit('UNIT_CHANGED');
var thirdData = secondData.setType('TYPE_CHANGED');
console.log(thirdData.toString());
console.log('Data Must Remain The Same');
console.log(myDataType.toString());
myDataType.type = "MANUALLY FORCED TYPE";
console.log(myDataType.toString());

class WeatherPrediction extends ImmutableDataType
{ 
    constructor(_unit, _type, _place, _time, _fromNum, _toNum)
    {
        super(_unit, _type, _place, _time);
        this.fromNum = _fromNum;
        this.toNum = _toNum;

        // MAKE THIS CLASS IMMUTABLE
        if (new.target === WeatherPrediction) {
            Object.freeze(this)
        }
    }

    getFrom() { return this.fromNum };
    setPlace(_fromNum) { return new WeatherPrediction(this.unit, this.type, 
        this.place, this.time, _fromNum, this.toNum) };

    getTo() { return this.toNum };
    setPlace(_toNum) { return new WeatherPrediction(this.unit, this.type, 
        this.place, this.time, this.fromNum, _toNum) };

    matches() //weatherData argument
    {
        /*
        delete this.fromNum;
        delete this.toNum;
        return this;
        //the weather prediction object must leave off the from and the to
        
        const comp1 = Object.keys(weatherData).length;
        const comp2 = Object.keys(this).length;
        if(comp1 === comp2)
        {
            return Object.keys(weatherData).every(
                key => this.hasOwnProperty(key)
                && this[key] === weatherData[key]);
        }
        else
        {
            return false;
        }
        */
    };

    toString() { return `Unit: ${this.unit}, Type: ${this.type}, Place: ${this.place}, 
    Time: ${this.getTime()}, From: ${this.fromNum}, To: ${this.toNum}` }
}
console.log("Weather Prediction Test")
var testW = new WeatherPrediction("MPH", "Wind", "Aarhus", null, 6, 12) 
console.log(testW.toString())
//console.log(testW.matches())
console.log(testW.getFrom())
console.log()


module.exports = WeatherPrediction;
//export default ImmutableDataType;  type = module <-- something for the html?