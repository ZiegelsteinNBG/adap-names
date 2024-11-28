import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    // String input is a single component
    constructor(other: string, delimiter?: string) {
<<<<<<< HEAD
        if(other !== undefined){
            this.name = other;
            this.noComponents++;
        } 
        if(delimiter !== undefined) this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        const components = this.splitRespectingEscapes();
        let str: string = "";
        for(let i:number = 0; i < components.length; i++){
            if(components[i] === "") continue;
            str += this.replaceEscCh(components[i]);
            if(i < components.length-1 && components[i+1] !== "") str += delimiter;
        }
        return str;
    }

    public asDataString(): string {
        const components = this.splitRespectingEscapes();
        let str: string = "";
        for(let i:number = 0; i < components.length; i++){
            if(components[i] === "") continue;
            str += components[i] ;
            if(i < components.length-1  && components[i+1] !== "") str += this.delimiter;

        }
        return str;
    }

    public isEmpty(): boolean {
        const components = this.splitRespectingEscapes();
        for(let i:number = 0; i < components.length; i++){
            if(components[i] !== "" || components[i] !== null){
                return false;
            }
        }
        return true;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(x: number): string {
        if (x < 0 || x >= this.noComponents) {
            throw new Error("Index out of bounds");
        }
        const components = this.splitRespectingEscapes();
        return components[x];
    }

    public setComponent(n: number, c: string): void {
        const components = this.splitRespectingEscapes();
        this.name = "";
        for(let i:number = 0; i < components.length; i++){
            if(i === n){
                this.name += c + this.delimiter;
            }else{
                this.name += components[i]+this.delimiter;
            }
            
        }
    }

    public insert(n: number, c: string): void {
        ++this.noComponents;
        const components = this.splitRespectingEscapes();
        this.name = "";
        for(let i:number = 0; i < components.length; i++){
            if(i === n){
                this.name += c + this.delimiter;
            }
            this.name += components[i]+this.delimiter;
        }
    }

    public append(c: string): void {
        this.noComponents ++;
        this.name += this.delimiter + this.insertEscCh(c);

    }

    public remove(n: number): void {
        const components = this.splitRespectingEscapes();
        this.name = "";
        for(let i:number = 0; i < components.length; i++){
            if(i !== n){
                this.name += components[i];
            }
            this.name += this.delimiter;
        }
    }

    public concat(other: Name): void {
        this.name += this.delimiter + other.asDataString();
        this.noComponents +=  other.getNoComponents();

=======
        throw new Error("needs implementation or deletion");
    }

    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation or deletion");
    }

    public asDataString(): string {
        throw new Error("needs implementation or deletion");
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation or deletion");
    }

    public isEmpty(): boolean {
        throw new Error("needs implementation or deletion");
    }

    public getNoComponents(): number {
        throw new Error("needs implementation or deletion");
    }

    public getComponent(x: number): string {
        throw new Error("needs implementation or deletion");
    }

    public setComponent(n: number, c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public insert(n: number, c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public append(c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public remove(n: number): void {
        throw new Error("needs implementation or deletion");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
>>>>>>> e42a56b49aa591786b0ab19e98e56ff3d3fa09d5
    }

    private insertEscCh(i: string): string {
        return i.replaceAll(this.delimiter, ESCAPE_CHARACTER+this.delimiter);
    }

    private replaceEscCh(i: string): string {
        return i.replaceAll(ESCAPE_CHARACTER+this.delimiter, this.delimiter);
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

    }
}
