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

    public getNoComponents(): number {
        InvalidStateException.assert(this.isNullOrUndefined(this.name));
        InvalidStateException.assert((this.noComponents > 0),"Cannot set a component on an empty components array.");
       
        return this.noComponents;
    }

    public getComponent(i: number): string {
        InvalidStateException.assert(this.isNullOrUndefined(this.name));
        InvalidStateException.assert((this.noComponents > 0),"Cannot set a component on an empty components array.");
    
        IllegalArgumentException.assert((i >= 0 && i < this.noComponents), "Index out of Bounds");
        let copy = {...this};
        const components = copy.splitRespectingEscapes();
        return components[i];
    }

    public setComponent(i: number, c: string): StringName {
        InvalidStateException.assert(this.isNullOrUndefined(this.name));
        InvalidStateException.assert((this.noComponents > 0),"Cannot set a component on an empty components array.");
    
        IllegalArgumentException.assert((i >= 0 && i < this.noComponents), "Index out of Bounds");
        IllegalArgumentException.assert(this.isNullOrUndefined(c));
        let copy = {...this};
        const components = copy.splitRespectingEscapes();
        copy.name = "";
        for(let n:number = 0; n < components.length; n++){
            if(i === n){
                copy.name += this.insertEscCh(c) + this.delimiter;
            }else{
                copy.name += components[n]+this.delimiter;
            }
        }
        return copy;
    }

    public insert(i: number, c: string): StringName {
        InvalidStateException.assert(this.isNullOrUndefined(this.name));
        InvalidStateException.assert((this.getNoComponents() > 0),"Cannot set a component on an empty components array.");
    
        IllegalArgumentException.assert((i >= 0 && i < this.getNoComponents()), "Index out of Bounds");
        IllegalArgumentException.assert(this.isNullOrUndefined(c));
        let copy = {...this};
        ++copy.noComponents;
        const components = copy.splitRespectingEscapes();
        copy.name = "";
        for(let n:number = 0; n < components.length; n++){
            if(i === n){
                copy.name += copy.insertEscCh(c) + copy.delimiter;
            }
            copy.name += components[n]+copy.delimiter;
        }

        return copy;
    }

    public append(c: string): StringName {
        InvalidStateException.assert(this.isNullOrUndefined(this.name));
        InvalidStateException.assert((this.getNoComponents() > 0),"Cannot set a component on an empty components array.");
        let copy = {...this};
        IllegalArgumentException.assert(this.isNullOrUndefined(c));
        let preLen = copy.getNoComponents();
        copy.name += copy.delimiter+c;
        ++copy.noComponents;
        MethodFailedException.assert((preLen+1 === copy.getNoComponents()), "Failed to remove: Comp not empty");
        return copy;
    }

    public remove(i: number): StringName {
        InvalidStateException.assert(this.isNullOrUndefined(this.name));
        InvalidStateException.assert((this.getNoComponents() > 0),"Cannot set a component on an empty components array.");
    
        IllegalArgumentException.assert((i >= 0 && i < this.getNoComponents()), "Index out of Bounds");
        let copy = {...this};
        const components = copy.splitRespectingEscapes();
        let del;
        copy.name = "";
        for(let n:number = 0; n < components.length; n++){
            if(i !== n){
                copy.name += components[n];
            }else{
                del = components[i];
            }
            if(n != 0 && n != components.length-1)copy.name += copy.delimiter;
        }
        copy.noComponents--;
        MethodFailedException.assert((copy.splitRespectingEscapes()[i] !== del), "Failed to remove: Comp not empty");
        return copy;
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