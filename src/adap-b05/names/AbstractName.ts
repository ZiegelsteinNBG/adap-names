import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException} from "../common/IllegalArgumentException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public clone(): Name {
        InvalidStateException.assertCondition(!this.isEmpty(), "Kein Component vorhanden");
        let n = { ...this };
        MethodFailedException.assertIsNotNullOrUndefined(n);
        return n;
    }

    public asString(delimiter: string = this.delimiter): string {
        InvalidStateException.assertCondition(!this.isEmpty(), "Kein Component vorhanden");
        let count: number = this.getNoComponents();
        if(count > 0){
            let str: string = this.getComponent(0);
            for(let i: number = 1; i < count; i++){
                if(this.getComponent(i-1) !="" )str += delimiter;
                str +=  this.replaceEscCh(this.getComponent(i)) ;
            }
            MethodFailedException.assertIsNotNullOrUndefined(str);
            return str;
        }
        return "";
    }

    public toString(): string {
        InvalidStateException.assertCondition(!this.isEmpty(), "Kein Component vorhanden");
        let count: number = this.getNoComponents();
        if(count > 0){
            let str: string = this.getComponent(0);
            for(let i: number = 1; i < count; i++){
                if(this.getComponent(i-1) !="")str += this.delimiter;
                str += this.getComponent(i);
            }
            MethodFailedException.assertIsNotNullOrUndefined(str);
            return str;
        }
        return "";
    }

    public asDataString(): string {
        InvalidStateException.assertCondition(!this.isEmpty(), "Kein Component vorhanden");
        let count: number = this.getNoComponents();
        if(count > 0){
            let str: string = this.getComponent(0);
            for(let i: number = 1; i < count; i++){
                str += this.getComponent(i) + DEFAULT_DELIMITER;
            }
            MethodFailedException.assertIsNotNullOrUndefined(str);
            return str;
        }
        return "";
    }

    public isEqual(other: Name): boolean {
        IllegalArgumentException.assertIsNotNullOrUndefined(other);
        return (this.asString() === other.asString());
    }

    public getHashCode(): number {
        let hashCode: number = 0;
        const s: string = this.asDataString();
        for (let i = 0; i < s.length; i++) {
            let c = s.charCodeAt(i);
            hashCode = (hashCode << 5) - hashCode + c;
            hashCode |= 0;
        }
        MethodFailedException.assertIsNotNullOrUndefined(hashCode);
        return hashCode;
    }

    public isEmpty(): boolean {
        return (this.getNoComponents() === 0);
    }

    public getDelimiterCharacter(): string {
        InvalidStateException.assertIsNotNullOrUndefined(this.delimiter);
        return this.delimiter;
    }

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    public concat(other: Name): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(other);
        let prevNo: number = this.getNoComponents();
        for(let i: number = 0; i < other.getNoComponents(); i++){
            this.append(other.getComponent(i));
        }
        MethodFailedException.assertCondition((this.getNoComponents() === prevNo+other.getNoComponents()), "Failed at concat, wrong length")
    }
    protected insertEscCh(i: string): string {
        return i.replaceAll(this.delimiter, ESCAPE_CHARACTER+this.delimiter);
    }

    protected replaceEscCh(i: string): string {
        return i.replaceAll(ESCAPE_CHARACTER+this.delimiter, this.delimiter);
    }
}