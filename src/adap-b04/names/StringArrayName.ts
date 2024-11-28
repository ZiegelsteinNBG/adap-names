import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { MethodFailureException } from "../common/MethodFailureException";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException} from "../common/IllegalArgumentException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
<<<<<<< HEAD
        IllegalArgumentException.assertIsNotNullOrUndefined(other);
        super(delimiter);
        this.components = other;
    }

    // public clone(): Name {
    //     throw new Error("needs implementation");
    // }

    // public asString(delimiter: string = this.delimiter): string {
    //     throw new Error("needs implementation");
    // }

    // public toString(): string {
    //     throw new Error("needs implementation");
    // }

    // public asDataString(): string {
    //     throw new Error("needs implementation");
    // }

    // public isEqual(other: Name): boolean {
    //     throw new Error("needs implementation");
    // }

    // public getHashCode(): number {
    //     throw new Error("needs implementation");
    // }

    // public isEmpty(): boolean {
    //     throw new Error("needs implementation");
    // }

    // public getDelimiterCharacter(): string {
    //     throw new Error("needs implementation");
    // }

    public getNoComponents(): number {
        InvalidStateException.assertIsNotNullOrUndefined(this.components);
        InvalidStateException.assertCondition((this.components.length > 0),"Cannot set a component on an empty components array.");
       
        return this.components.length;
    }

    public getComponent(i: number): string {
        InvalidStateException.assertIsNotNullOrUndefined(this.components);
        InvalidStateException.assertCondition((this.components.length > 0),"Cannot set a component on an empty components array.");
        IllegalArgumentException.assertCondition((i >= 0 && i < this.components.length), "Index out of Bounds");
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        InvalidStateException.assertIsNotNullOrUndefined(this.components);
        InvalidStateException.assertCondition((this.components.length > 0),"Cannot set a component on an empty components array.");
       
        IllegalArgumentException.assertCondition((i >= 0 && i < this.components.length), "Index out of Bounds");
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        return this.components[i];
    }

    public insert(i: number, c: string) {
        InvalidStateException.assertIsNotNullOrUndefined(this.components);
        InvalidStateException.assertCondition((this.components.length > 0),"Cannot set a component on an empty components array.");
       
        IllegalArgumentException.assertCondition((i >= 0 && i < this.components.length), "Index out of Bounds");
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        let prevLen: number = this.components.length;
        this.components.splice(i, 0, c);
    }

    public append(c: string) {
            InvalidStateException.assertIsNotNullOrUndefined(this.components);
            InvalidStateException.assertCondition((this.components.length > 0),"Cannot set a component on an empty components array.");
        
            IllegalArgumentException.assertIsNotNullOrUndefined(c);
            let prevLen: number = this.components.length;
            this.components.push(c);
            MethodFailureException.assertCondition((this.components.length == prevLen+1), "Failed to append: incorrect Comp No");
    }

    public remove(i: number) {
            InvalidStateException.assertIsNotNullOrUndefined(this.components);
            InvalidStateException.assertCondition((this.components.length > 0),"Cannot set a component on an empty components array.");
        
            IllegalArgumentException.assertCondition((i >= 0 && i < this.components.length), "Index out of Bounds");
            this.components[i] = "";
            MethodFailureException.assertCondition((this.components[i] === ""), "Failed to remove: Comp not empty");
    }

    // public concat(other: Name): void {
    //     throw new Error("needs implementation");
    // }
=======
        super();
        throw new Error("needs implementation or deletion");
    }

    public clone(): Name {
        throw new Error("needs implementation or deletion");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation or deletion");
    }

    public asDataString(): string {
        throw new Error("needs implementation or deletion");
    }

    public isEqual(other: Name): boolean {
        throw new Error("needs implementation or deletion");
    }

    public getHashCode(): number {
        throw new Error("needs implementation or deletion");
    }

    public isEmpty(): boolean {
        throw new Error("needs implementation or deletion");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation or deletion");
    }

    public getNoComponents(): number {
        throw new Error("needs implementation or deletion");
    }

    public getComponent(i: number): string {
        throw new Error("needs implementation or deletion");
    }

    public setComponent(i: number, c: string) {
        throw new Error("needs implementation or deletion");
    }

    public insert(i: number, c: string) {
        throw new Error("needs implementation or deletion");
    }

    public append(c: string) {
        throw new Error("needs implementation or deletion");
    }

    public remove(i: number) {
        throw new Error("needs implementation or deletion");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
    }
>>>>>>> e42a56b49aa591786b0ab19e98e56ff3d3fa09d5
}