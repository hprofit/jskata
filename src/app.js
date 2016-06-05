// *********************** Demonstrates basic object creation *********************** //
var myFirstObject = {
    starterProperty: "Yehaw"
};

myFirstObject.newProperty = "Some stuff goes here";

myFirstObject.newFunction = function() {};

myFirstObject.functionWithSelfReference = function() {
    return this.newProperty;
};

myFirstObject.functionWithIncorrectNestedSelfReference = function () {
    return (function() {
        return this.newProperty;    // Will return undefined as 'this' is not the object scope
    })();
};

myFirstObject.functionWithNestedSelfReference = function () {
    var self = this;

    return (function() {
        return self.newProperty;    // Will return the object's newProperty as we have "saved" the scope reference
    })();
};

myFirstObject.newProperty = "Changed!";

// *********************** Demonstrates basic object inheritance *********************** //
// Creates a copy of myFirstObject as it is (or whatever object you pass it, including an empty object - {})
// NOTE: Whatever properties or functions were on the original object are copied into anotherObject's prototype object!
// This means you will still be able to call these functions, but they are buried one object deep! JS looks for a given
// property one "level" at a time, meaning if it's not on the base object, it will then examine the prototype
// Overriding properties in the prototype is called "property shadowing" as all you're really doing is putting an instance
// of the "overridden" property on the base object so that JS finds it there before going to the prototype to look

var anotherObject = Object.create(myFirstObject);

anotherObject.functionWithSelfReference(); // Will return "Changed!"


anotherObject.newProperty = "Changed back! Wait no-sh*t.";

anotherObject.functionWithSelfReference(); // Will return "Changed back! Wait no-sh*t."

myFirstObject.functionWithSelfReference(); // Will return "Changed!"

// Overriding the original function
anotherObject.functionWithSelfReference = function () {
    return "I have been overridden!";
};

myFirstObject.functionWithSelfReference();  // Will return "Changed!"

anotherObject.functionWithSelfReference();  // Will return "I have been overridden!"

anotherObject.personalProperty = "Personal, keep out!";

anotherObject.onlyAnotherObjectCanSeeThis = function () {
    return anotherObject.personalProperty;
};

// This will not work! myFirstObject does not have this function!
// myFirstObject.onlyAnotherObjectCanSeeThis();

anotherObject.onlyAnotherObjectCanSeeThis();


// The above note can be demonstrated here in the console. Note the functions and properties that were NOT overridden
// on anotherObject are all within it's prototype
console.log(myFirstObject);
console.log(anotherObject);




// *********************** Demonstrates an object with a constructor function *********************** //
// NOTE: This method also allows object creation via the "new" keyword
var ParentClass = function(constructorArgs) {
    constructorArgs = constructorArgs || {};    // Make sure we're dealing with an object and not an undefined reference

    this.parentProperty = constructorArgs.firstProperty;


    var privateVariable = "This is a private variable because it only exists within this function scope.";

    // Function will return 'this' implicitly
};

// *********************** Demonstrates adding non-prototype functions *********************** //
ParentClass.nonPrototypeFunction = function () {
    return "This function is not on the object prototype. This means it can be ";
};

ParentClass.nonPrototypeFunctionWithThisReference = function () {
    // This will return undefined as "this" simply refers to this function scope and NOT an instance of the object
    return this.parentProperty;
};


// *********************** Demonstrates prototype functions and this reference *********************** //
ParentClass.prototype.publicFunction = function () {
    // Must have a newly made ParentClass object to use this function
    return "This is a proto-typically inherited function that anything can see.";
};

ParentClass.prototype.getFirstProperty = function () {
    // Must have a newly made ParentClass object to use this function
    return this.firstProperty;
};

ParentClass.prototype.getPrivateVariableWILLFAIL = function () {
    // Must have a newly made ParentClass object to use this function
    return privateVariable; // This will not work as privateVariable is private to the constructor function!
};


// *********************** Demonstrates dealing with non-prototype functions from within the object *********************** //
ParentClass.prototype.callNonPrototypeFunctionWILLFAIL = function() {
    // This will not work as nonPrototypeFunction is not copied to new instances of the constructor function but rather
    // kept on the constructor function itself (ParentClass in this case)
    return this.nonPrototypeFunction();
};

ParentClass.prototype.callNonPrototypeFunction = function() {
    // This will call the constructor's nonPrototypeFunction
    return ParentClass.nonPrototypeFunction();
};




ParentClass.nonPrototypeFunction();

var newParent = new ParentClass({
    firstProperty: "Some property"
});

newParent.publicFunction();
newParent.getFirstProperty();






// *********************** Demonstrates prototypical object inheritance *********************** //
function ChildClass(constructorArgs) {
    constructorArgs = constructorArgs || {};

    // Call the ParentClass constructor
    ParentClass.call(this, constructorArgs);

    this.secondProperty = constructorArgs.secondProperty;
}

// Replace our prototype with the ParentClass'
ChildClass.prototype = Object.create(ParentClass.prototype);

// Set the constructor to our own rather than the ParentClass
// Without this step, the above creation of the ParentClass.prototype would have the constructor set as the ParentClass'
ChildClass.prototype.constructor = ChildClass;

ChildClass.prototype.childFunction = function() {
    return "Only the newly made ChildClass will have access to this function!";
};

ChildClass.prototype.getProperties = function() {
    return {
        first: this.firstProperty,
        second: this.secondProperty
    };
};

// *********************** Demonstrates prototypical object overriding *********************** //
ChildClass.prototype.getFirstProperty = function () {
    return "And you thought this would return the firstProperty, how silly! Have the secondProperty instead: " + this.secondProperty;
};

// This will not work because nonPrototype functions are NOT inherited. You would need to call ParentClass.nonPrototypeFunction
// ChildClass.nonPrototypeFunction();

var newChild = new ChildClass({
    firstProperty: "Another property",
    secondProperty: "Yet another property"
});

newChild.publicFunction();
newChild.getFirstProperty();
newChild.childFunction();

// Just like in basic object creation, you'll see the ParentClass' prototype object copied into ChildClass. ChildClass'
// prototype will read as the ParentClass' because we made it a copy of it!
console.log(ParentClass.prototype);
console.log(ChildClass.prototype);


//  I'm tired. - Holden