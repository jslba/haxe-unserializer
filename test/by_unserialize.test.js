const { List, Bytes, IntMap, StringMap, Enum, Class } = require('haxe-type');
const Unserializer = require("../source/index");

/******************************************************************************
 * JavaScript native type :                                                   *
 ******************************************************************************/

/* Array
 ******************************************************************************/
test('unserialize array', function () {
	let result = Unserializer.unserialize("ai4i5u3i7ni1i2h");
	expect(result).toStrictEqual([4, 5, null, null, null, 7, null, 1, 2]);
});

/* Boolean
 ******************************************************************************/
test('unserialize true', function () {
	let result = Unserializer.unserialize("t");
	expect(result).toStrictEqual(true);
});

test('unserialize false', function () {
	let result = Unserializer.unserialize("f");
	expect(result).toStrictEqual(false);
});

/* Date
 ******************************************************************************/
test('unserialize date', function () {
	let result = Unserializer.unserialize("v2022-11-22 19:09:17");
	expect(result).toStrictEqual(new Date(1669140557000));
});

/* Null
 ******************************************************************************/
test('unserialize null', function () {
	let result = Unserializer.unserialize("n");
	expect(result).toStrictEqual(null);
});

/* Number (Zero, Integer, Float, Positive / Negative infinity, NaN)
 ******************************************************************************/
test('unserialize zero', function () {
	let result = Unserializer.unserialize("z");
	expect(result).toStrictEqual(0);
});

test('unserialize positive int', function () {
	let result = Unserializer.unserialize("i53");
	expect(result).toStrictEqual(53);
});

test('unserialize negative int', function () {
	let result = Unserializer.unserialize("i-53");
	expect(result).toStrictEqual(-53);
});

test('unserialize positive float', function () {
	let result = Unserializer.unserialize("d53.333");
	expect(result).toStrictEqual(53.333);
});

test('unserialize negative float', function () {
	let result = Unserializer.unserialize("d-53.333");
	expect(result).toStrictEqual(-53.333);
});

test('unserialize positive infinity', function () {
	let result = Unserializer.unserialize("p");
	expect(result).toStrictEqual(Infinity);
});

test('unserialize negative infinity', function () {
	let result = Unserializer.unserialize("m");
	expect(result).toStrictEqual(-Infinity);
});

test('unserialize NaN', function () {
	let result = Unserializer.unserialize("k");
	expect(result).toStrictEqual(NaN);
});

/* Object
 ******************************************************************************/
test('unserialize object', function () {
	let result = Unserializer.unserialize("oy3:fooy3:Fooy3:baroy3:Bary3:BARgy3:bazy3:Bazg");
	expect(result).toStrictEqual({
		foo: "Foo",
		bar: {
			Bar: "BAR"
		},
		baz: "Baz"
	});
});

test('unserialize circular reference', function () {
	let result = Unserializer.unserialize("oy4:selfr0g"),
		test = {};
	test.self = test;
	expect(result).toStrictEqual(test);
})

/* String
 ******************************************************************************/
test('unserialize string', function () {
	let result = Unserializer.unserialize("y17:Hello%20World%20!");
	expect(result).toStrictEqual("Hello World !");
});

/* Error (Exception).
 ******************************************************************************/
test('unserialize Error', function () {
	let error = "xy27:Sample%20error%20serialized";
	expect(() =>
		Unserializer.unserialize(error)
	).toThrow(new Error("Sample error serialized"));
});

/******************************************************************************
 * « haxe-type » type :                                                       *
 ******************************************************************************/

/* List (haxe.ds.List)
 ******************************************************************************/
test('unserialize list', function () {
	let result = Unserializer.unserialize("li4i5nnni7ni1i2h"),
		list = new List();
	list.push(4, 5, null, null, null, 7, null, 1, 2);
	expect(result).toStrictEqual(list);
});

/* Bytes (haxe.io.Bytes)
 ******************************************************************************/
test('unserialize bytes', function () {
	let byte = Bytes.ofString("Hello World!"),
		result = Unserializer.unserialize("s16:SGVsbG8gV29ybGQh");
	expect(result.buffer).toStrictEqual(byte.buffer);
});

/* IntMap (haxe.ds.IntMap)
 ******************************************************************************/
test('unserialize intmap', function () {
	let imap = new IntMap({ 4: null, 5: 45, 6: 7 }),
		result = Unserializer.unserialize("q:4n:5i45:6i7h");
	expect(result).toStrictEqual(imap);
});

/* StringMap (haxe.ds.StringMap)
 ******************************************************************************/
test('unserialize stringmap', function () {
	let smap = new StringMap({ x: 2, k: null }),
		result = Unserializer.unserialize("by1:xi2y1:knh");
	expect(result).toStrictEqual(smap);
});

/* Enum (experimental)
 ******************************************************************************/
test('unserialize enum', function () {
	class Foo extends Enum {
		static __construct__ = ['Bar'];
		static Bar = new this('Bar', 0);
	}
	Foo.resolve();
	let result = Unserializer.unserialize("wy3:Fooy3:Bar:0");
	expect(result).toStrictEqual(Foo.Bar);
});

test('unserialize enum with param', function () {
	class Foo extends Enum {
		static __construct__ = ['Bar'];
		static Bar(args) {
			return new this('Bar', 0, args);
		}
	}
	Foo.resolve();
	let result = Unserializer.unserialize("wy3:Fooy3:Bar:1y3:Baz");
	expect(result).toStrictEqual(Foo.Bar("Baz"));
});

/* Class (experimental)
 ******************************************************************************/
test('unserialize class', function () {
	class Point extends Class {
		constructor(x, y) {
			super();
			this.x = x;
			this.y = y;
		}
	}
	Point.resolve();
	let result = Unserializer.unserialize("cy5:Pointy1:xzy1:yzg");
	expect(result).toStrictEqual(new Point(0, 0));
});