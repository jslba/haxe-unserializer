# [Unserializer][index] implement of [haxe.Unserializer][02]

![npm](https://img.shields.io/npm/v/haxe-unserializer?color=blue&style=flat)
![tests](https://img.shields.io/static/v1?label=tests&message=24%20passed&color=brightgreen&style=flat)
![GitHub](https://img.shields.io/github/license/jslba/haxe-unserializer?style=flat)

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

> **Note**   
> If you are looking  for how to  use it, you  can look at some  examples in the
> [unit tests][unittests].

## Constructor

```hx
new Unserializer(data: String, {
    DEBUG_MODE: Bool = false,
    ENUM_RESOLVER: Object = {},
    CLASS_RESOLVER: Object = {}
})
```

## Variables

```hx
public i: Int
```

```hx
public buffer: String
```

```hx
// buffer length
public length: Int
```

```hx
public StringCache: Array<String>
```

```hx
public ObjectCache: Array<Mixed>
```

```hx
public DEBUG_MODE: Bool
```

```hx
public ENUM_RESOLVER: Object
```

```hx
public CLASS_RESOLVER: Object
```

## Methods

```hx
static unserialize
```

```hx
// return the unserialized buffer
public run(): Mixed
```

```hx
// internal function, a description soon
public readCache(cache: Array): Mixed
```

```hx
// internal function, a description soon
public readArrayScheme(type: String, end: String): Array
```

```hx
// internal function, a description soon
public readNumberScheme(type: String): Int|Float
```

```hx
// internal function, a description soon
public readObjectScheme(type: String, end: String): Object
```

```hx
// internal function, a description soon
public readStringScheme(type: String): String
```

```hx
// internal function, a description soon
public readEnum(type: String): Enum
```

```hx
// internal function, a description soon
public resolveClass(name: String, values: Object): Class
```

[index]: /source/index.js
[unittests]: /test/by_unserialize.test.js
[02]: https://api.haxe.org/haxe/Unserializer.html
[03]: https://haxe.org/manual/std-serialization-format.html