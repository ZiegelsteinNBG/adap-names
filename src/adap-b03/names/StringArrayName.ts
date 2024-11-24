import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other;
    }

<<<<<<< HEAD
    getNoComponents(): number {
        return this.components.length;
    }

    getComponent(i: number): string {
        if(!this.isValidIdx(i)) return "";
        return this.components[i];
    }
    setComponent(i: number, c: string) {
        this.isValidIdx(i);
        this.components[i] = c;
    }

    insert(i: number, c: string) {
        if(this.isValidIdx(i)) this.components.splice(i, 0, c);
    }
    append(c: string) {
            if (c != undefined){
                this.components.push(c);
            } 
    }
    remove(i: number) {
        if(this.isValidIdx(i))
        this.components[i] = "";
=======
    public clone(): Name {
        throw new Error("needs implementation");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation");
    }

    public toString(): string {
        throw new Error("needs implementation");
    }

    public asDataString(): string {
        throw new Error("needs implementation");
    }

    public isEqual(other: Name): boolean {
        throw new Error("needs implementation");
    }

    public getHashCode(): number {
        throw new Error("needs implementation");
    }

    public isEmpty(): boolean {
        throw new Error("needs implementation");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation");
    }

    public getNoComponents(): number {
        throw new Error("needs implementation");
    }

    public getComponent(i: number): string {
        throw new Error("needs implementation");
    }

    public setComponent(i: number, c: string) {
        throw new Error("needs implementation");
    }

    public insert(i: number, c: string) {
        throw new Error("needs implementation");
    }

    public append(c: string) {
        throw new Error("needs implementation");
    }

    public remove(i: number) {
        throw new Error("needs implementation");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation");
>>>>>>> 15d5493659b8e30ea180d58abe21ceea7223432d
    }

}