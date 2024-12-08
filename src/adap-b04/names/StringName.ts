import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException} from "../common/IllegalArgumentException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.noComponents = this.count(other);
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
        InvalidStateException.assertIsNotNullOrUndefined(this.name);
        InvalidStateException.assertCondition((this.noComponents > 0),"Cannot set a component on an empty components array.");
        return this.noComponents;
    }

    public getComponent(i: number): string {
        InvalidStateException.assertIsNotNullOrUndefined(this.name);
        InvalidStateException.assertCondition((this.noComponents > 0),"Cannot set a component on an empty components array.");
    
        IllegalArgumentException.assertCondition((i >= 0 && i < this.noComponents), "Index out of Bounds");
        
        const components = this.splitRespectingEscapes();
        return components[i];
    }

    public setComponent(i: number, c: string) {
        InvalidStateException.assertIsNotNullOrUndefined(this.name);
        InvalidStateException.assertCondition((this.noComponents > 0),"Cannot set a component on an empty components array.");
    
        IllegalArgumentException.assertCondition((i >= 0 && i < this.noComponents), "Index out of Bounds");
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
       
        const components = this.splitRespectingEscapes();
        this.name = "";
        for(let n:number = 0; n < components.length; n++){
            if(i === n){
                this.name += this.insertEscCh(c) + this.delimiter;
            }else{
                this.name += components[n]+this.delimiter;
            }
        }
    }

    public insert(i: number, c: string) {
        InvalidStateException.assertIsNotNullOrUndefined(this.name);
        InvalidStateException.assertCondition((this.getNoComponents() > 0),"Cannot set a component on an empty components array.");
    
        IllegalArgumentException.assertCondition((i >= 0 && i < this.getNoComponents()), "Index out of Bounds");
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        ++this.noComponents;
        const components = this.splitRespectingEscapes();
        this.name = "";
        for(let n:number = 0; n < components.length; n++){
            if(i === n){
                this.name += this.insertEscCh(c) + this.delimiter;
            }
            this.name += components[n]+this.delimiter;
        }
    }

    public append(c: string) {
        InvalidStateException.assertIsNotNullOrUndefined(this.name);
        InvalidStateException.assertCondition((this.getNoComponents() > 0),"Cannot set a component on an empty components array.");
    
        IllegalArgumentException.assertIsNotNullOrUndefined(c);
        let preLen = this.getNoComponents();
        this.name += this.delimiter+c;
        ++this.noComponents;
        MethodFailedException.assertCondition((preLen+1 === this.getNoComponents()), "Failed to remove: Comp not empty");
    }

    public remove(i: number) {
        InvalidStateException.assertIsNotNullOrUndefined(this.name);
        InvalidStateException.assertCondition((this.getNoComponents() > 0),"Cannot set a component on an empty components array.");
    
        IllegalArgumentException.assertCondition((i >= 0 && i < this.getNoComponents()), "Index out of Bounds");
        
        const components = this.splitRespectingEscapes();
        let del;
        this.name = "";
        for(let n:number = 0; n < components.length; n++){
            if(i !== n){
                this.name += components[n];
            }else{
                del = components[i];
            }
            if(n != 0 && n != components.length-1)this.name += this.delimiter;
        }
        this.noComponents--;
        MethodFailedException.assertCondition((this.splitRespectingEscapes()[i] !== del), "Failed to remove: Comp not empty");
    
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

    private count(c: string): number{
        const parts: string[] = [];
        let currentPart = "";
        let isEscaped = false;
        let count = 1;

        for (let i = 0; i < this.name.length; i++) {
            const char = this.name[i];

            if (char === ESCAPE_CHARACTER && !isEscaped) {
                
                isEscaped = true;
            } else if (char === this.delimiter && !isEscaped) {

                parts.push(currentPart);
                count++;
                currentPart = "";
            } else {
                currentPart += char;
                isEscaped = false;
            }
        }
        
        parts.push(currentPart); 
        return count;
    }
    protected insertEscCh(i: string): string {
        return i.replaceAll(this.delimiter, ESCAPE_CHARACTER+this.delimiter);
    }

    protected replaceEscCh(i: string): string {
        return (i || '').replaceAll(ESCAPE_CHARACTER + this.delimiter, this.delimiter);
    }

}