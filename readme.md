# [Unserializer][01] implement of [haxe.Unserializer][02]
The Unserializer class can be used to  decode values and objects from a `String`
created by the `Serializer` class.   
This class can be used in two ways :
 - create a `new Unserializer()` instance  with a given  serialization `String`,
then call its `run()` method until all values are extracted.
 - call `Unserializer.unserialize()` to unserialize a  single value from a given
`String`.

The specification of the serialization format can be found [here][03].

**List of supported formats**
 - JavaScript native type :
   - Array
   - Boolean
   - Date
   - Null
   - Number (Zero, Integer, Float, Positive / Negative infinity, NaN)
   - Object
   - String
   - Error (Exception).
 - « haxe-type » type :
   - List (haxe.ds.List)
   - Bytes (haxe.io.Bytes)
   - IntMap (haxe.ds.IntMap)
   - StringMap (haxe.ds.StringMap)
   - Enum (experimental)
   - Class (experimental)

**List of unsupported formats**
 - ObjectMap (haxe.ds.ObjectMap)
 - custom

<!-- Soon
## Static methods
## Constructor
## Methods
-->
# Some examples of use
```js
Unserializer.unserialize("y6:Sample"); // output "Sample"

class MyEnum extends Enum {
	static __construct__ = ['EnumName'];
	static EnumName() = new this('EnumName', 0);
}
MyEnum.resolve();

Unserializer.unserialize("axy4:testjy6:MyEnum:0:0h"); // ends the script with the callable error <Error> "test"

// With DEBUG_MODE :
new Unserializer("axy4:testjy6:MyEnum:0:0h", {
    DEBUG_MODE = true
}).run();
/* output <Array> [
    <Error> "test",
    <Array> ['DEBUG_VALUES', 'MyEnum', 0]
] */

// With DEBUG_MODE and valid ENUM_RESOLVER :
new Unserializer("axy4:testjy6:MyEnum:0:0h", {
    DEBUG_MODE = true,
    ENUM_RESOLVER = window.__enum__
}).run();
/* output <Array> [
    <Error> "test",
    <MyEnum> ['EnumName', 0]
] */

// /!\ DEBUG_VALUES aren't serializable after unserialization /!\
```

[01]: /source/index.js
[02]: https://api.haxe.org/haxe/Unserializer.html
[03]: https://haxe.org/manual/std-serialization-format.html