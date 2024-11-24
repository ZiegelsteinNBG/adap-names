import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.length = 1;
    }

<<<<<<< HEAD
    getNoComponents(): number {
        return this.length;
    }

    getComponent(i: number): string {
        if (i < 0 || i >= this.length) {
            throw new Error("Index out of bounds");
        }
        const components = this.splitRespectingEscapes();
        return components[i];
    }
    setComponent(n: number, c: string) {
        const components = this.splitRespectingEscapes();
        this.name = "";
        for(let i:number = 0; i < components.length; i++){
            if(i === n){
                this.name += this.insertEscCh(c) + this.delimiter;
            }else{
                this.name += components[i]+this.delimiter;
            }
            
        }
    }

    insert(n: number, c: string) {
        if(!this.isValidIdx(n))return
        ++this.length;
        const components = this.splitRespectingEscapes();
        this.name = "";
        for(let i:number = 0; i < components.length; i++){
            if(i === n){
                this.name += this.insertEscCh(c) + this.delimiter;
            }
            this.name += components[i]+this.delimiter;
        }
    }
    append(c: string) {
        ++this.length;
    }
    remove(i: number) {
        if(!this.isValidIdx(i))return
        const components = this.splitRespectingEscapes();
        this.name = "";
        for(let n:number = 0; n < components.length; n++){
            if(i !== n){
                this.name += components[i];
            }
            this.name += this.delimiter;
        }
    }



    private splitRespectingEscapes(): string[] {
        const parts: string[] = [];
        let currentPart = "";
        let isEscaped = false;

        for (let i = 0; i < this.name.length; i++) {
            const char = this.name[i];

            if (char === ESCAPE_CHARACTER && !isEscaped) {
                
                isEscaped = true;
            } else if (char === this.delimiter && !isEscaped) {

                parts.push(currentPart);
                currentPart = "";
            } else {
                
                currentPart += char;
                isEscaped = false;
            }
        }
        
        parts.push(currentPart); 
        return parts;
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
>>>>>>> 15d5493659b8e30ea180d58abe21ceea7223432d
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
    }

}