import { Class, Enum } from "haxe-type";

export = Unserializer;

declare class Unserializer {
    static unserialize(data: string): any;
    constructor(data: string, { DEBUG_MODE, ENUM_RESOLVER, CLASS_RESOLVER }: {
        DEBUG_MODE?: boolean;
        ENUM_RESOLVER?: {};
        CLASS_RESOLVER?: {};
    });
    i: number;
    buffer: string;
    length: number;
    StringCache: string[];
    ObjectCache: any[];
    DEBUG_MODE: boolean;
    ENUM_RESOLVER: {};
    CLASS_RESOLVER: {};
    run(): any;
    readCache(cache: string[] | any[]): any;
    readArrayScheme(type: string, end: string): any[];
    readNumberScheme(type: string): number;
    readObjectScheme(type: string, end: string): {};
    readStringScheme(type: string): string;
    readEnum(type: string): Enum;
    resolveClass(name: string, values: any): Class;
}