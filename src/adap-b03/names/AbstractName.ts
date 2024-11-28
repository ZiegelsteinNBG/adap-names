import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }


    public asString(delimiter: string = this.delimiter): string {
        let count: number = this.getNoComponents();
        if(count > 0){
            let str: string = this.getComponent(0);
            for(let i: number = 1; i < count; count++){
                str += this.replaceEscCh(this.getComponent(i)) + delimiter;
            }
            return str;
        }
        return "";
    }

    
    public toString(): string {
        let count: number = this.getNoComponents();
        if(count > 0){
            let str: string = this.getComponent(0);
            for(let i: number = 1; i < count; count++){
                str += this.getComponent(i) + this.delimiter;
            }
            return str;
        }
        return "";
    }

    
    public asDataString(): string {
        let count: number = this.getNoComponents();
        if(count > 0){
            let str: string = this.getComponent(0);
            for(let i: number = 1; i < count; count++){
                str += this.getComponent(i) + DEFAULT_DELIMITER;
            }
            return str;
        }
        return "";
    }

    public isEqual(other: Name): boolean {
        return (this.asString() == other.asString())
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        return hashCode;
    }

    public clone(): Name {
        return { ...this };
    }

    public isEmpty(): boolean {
        return (this.getNoComponents() === 0);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        for(let i: number = 0; i < other.getNoComponents(); i++){
            this.append(other.getComponent(i));
        }
    }

    protected insertEscCh(i: string): string {
        return i.replaceAll(this.delimiter, ESCAPE_CHARACTER+this.delimiter);
    }

    protected replaceEscCh(i: string): string {
        return i.replaceAll(ESCAPE_CHARACTER+this.delimiter, this.delimiter);
    }
 
    protected isValidIdx(i: number): boolean {
        if(i < 0 || i >= this.getNoComponents()){
            return false;
        }else{
            return true;
        }
    }
}