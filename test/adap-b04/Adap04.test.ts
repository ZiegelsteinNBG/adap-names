import { describe, it, expect } from "vitest";

import { Name } from "../../src/adap-b04/names/Name";
import { StringName } from "../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../src/adap-b04/names/StringArrayName";
import { IllegalArgumentException } from "../../src/adap-b04/common/IllegalArgumentException";
import { InvalidStateException } from "../../src/adap-b04/common/InvalidStateException";

describe("Basic StringName function tests", () => {
    it("test insert", () => {
      let n: Name = new StringName("oss.fau.de");
      n.insert(1, "cs");
      expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test append", () => {
      let n: Name = new StringName("oss.cs.fau");
      n.append("de");
      expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test remove", () => {
      let n: Name = new StringName("oss.cs.fau.de");
      n.remove(0);
      expect(n.asString()).toBe("cs.fau.de");
    });
  });
  
  describe("Basic StringArrayName function tests", () => {
    it("test insert", () => {
      let n: Name = new StringArrayName(["oss", "fau", "de"]);
      n.insert(1, "cs");
      expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test append", () => {
      let n: Name = new StringArrayName(["oss", "cs", "fau"]);
      n.append("de");
      expect(n.asString()).toBe("oss.cs.fau.de");
    });
    it("test remove", () => {
      let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
      n.remove(0);
      expect(n.asString()).toBe("cs.fau.de");
    });
  });
  
  describe("Delimiter function tests", () => {
    it("test insert", () => {
      let n: Name = new StringName("oss#fau#de", '#');
      n.insert(1, "cs");
      expect(n.asString()).toBe("oss#cs#fau#de");
    });
  });
  
  describe("Escape character extravaganza", () => {
    it("test escape and delimiter boundary conditions", () => {
      let n: Name = new StringName("oss.cs.fau.de", '#');
      expect(n.getNoComponents()).toBe(1);
      expect(n.asString()).toBe("oss.cs.fau.de");
      n.append("people");
      expect(n.asString()).toBe("oss.cs.fau.de#people");
    });
  });

  describe("Delimiter function tests", () => {
    it("should throw an exception when inserting at an invalid index", () => {
      const n = new StringArrayName(["oss", "fau", "de"], "#");
  
      expect(() => {
        n.insert(10, "cs"); // Invalid index
      }).toThrow(IllegalArgumentException);
    });
  
    it("should throw an exception when accessing an empty components array", () => {
      const n = new StringArrayName([], "#");
  
      expect(() => {
        n.setComponent(0, "oss"); // Invalid operation on empty array
      }).toThrow(InvalidStateException);
    });
  
    it("should throw an exception when inserting null", () => {
      const n = new StringArrayName(["oss", "fau", "de"], "#");
  
      expect(() => {
        n.insert(1, null as unknown as string); // Invalid input
      }).toThrow(IllegalArgumentException);
    });
  });

  // TODO: Missing Tests due to too many Exception cases, soooo much work >:((