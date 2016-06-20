var FirstObject = function(a){
    this.a = arguments[0] || a || 0;
};
FirstObject.build = function(args){
    args = args || [];
    return new FirstObject(args[0]);
};

var SecondObject = function(a, b){
    this.a = arguments[0] || a || 0;
    this.b = arguments[1] || b || 0;
};
SecondObject.build = function(args){
    args = args || [];
    return new SecondObject(args[0], args[1]);
};

var ThirdObject = function() {

};
ThirdObject.build = function(args){
    args = args || [];
    return new ThirdObject();
};

var Factory = (function(){
    var objects = {
        "First": FirstObject,
        "Second": SecondObject,
        "Third": ThirdObject
    };

    return {
        /**
         *
         * @param desiredObject
         * @param args
         * @returns {null}
         * @constructor
         */
        GetNewNumberedObject: function(desiredObject, args) {
            args = args || [];
            var obj = objects[desiredObject];
            return obj.build ? obj.build(args): null;
        }
    }
})();


var first = Factory.GetNewNumberedObject("First", [76]);
var second = Factory.GetNewNumberedObject("Second", [9, 27]);
var third = Factory.GetNewNumberedObject("Third", []);