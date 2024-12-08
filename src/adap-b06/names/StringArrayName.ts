import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";
import { IllegalArgumentException} from "../common/IllegalArgumentException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        IllegalArgumentException.assert(this.isNullOrUndefined(other));
        this.components = other;
    }

    public getNoComponents(): number {
        InvalidStateException.assert(this.isNullOrUndefined(this.components));
        InvalidStateException.assert((this.components.length > 0),"Cannot set a component on an empty components array.");
       
        return this.components.length;
    }

    public getComponent(i: number): string {
        InvalidStateException.assert(this.isNullOrUndefined(this.components));
        InvalidStateException.assert((this.components.length > 0),"Cannot set a component on an empty components array.");
        IllegalArgumentException.assert((i >= 0 && i < this.components.length), "Index out of Bounds");
        let copy = {...this};
        return copy.components[i];
    }

    public setComponent(i: number, c: string) : StringArrayName{
        InvalidStateException.assert(this.isNullOrUndefined(this.components));
        InvalidStateException.assert((this.components.length > 0),"Cannot set a component on an empty components array.");
        let copy = {...this};
        IllegalArgumentException.assert((i >= 0 && i < this.components.length), "Index out of Bounds");
        IllegalArgumentException.assert(this.isNullOrUndefined(c));
        copy.components[i] = c;
        return copy;
    }

    public insert(i: number, c: string): StringArrayName {
        InvalidStateException.assert(this.isNullOrUndefined(this.components));
        InvalidStateException.assert((this.components.length > 0),"Cannot set a component on an empty components array.");
       
        IllegalArgumentException.assert((i >= 0 && i < this.components.length), "Index out of Bounds");
        IllegalArgumentException.assert( this.isNullOrUndefined( c));
        let copy = {...this};
        let prevLen: number = this.components.length;
        copy.components.splice(i, 0, c);
        MethodFailedException.assert((this.components.length == prevLen+1), "Failed to insert: incorrect Comp No");
        return copy;
    }

    public append(c: string): StringArrayName {
            InvalidStateException.assert(this.isNullOrUndefined(this.components));
            InvalidStateException.assert((this.components.length > 0),"Cannot set a component on an empty components array.");
        
            IllegalArgumentException.assert(this.isNullOrUndefined(c));
            let copy = {...this};
            let prevLen: number = this.components.length;
            copy.components.push(c);
            MethodFailedException.assert((this.components.length == prevLen+1), "Failed to append: incorrect Comp No");
            return copy;
    }

    public remove(i: number): StringArrayName {
            InvalidStateException.assert(this.isNullOrUndefined(this.components));
            InvalidStateException.assert((this.components.length > 0),"Cannot set a component on an empty components array.");
            let copy = {...this};
            IllegalArgumentException.assert((i >= 0 && i < this.components.length), "Index out of Bounds");
            this.components[i] = "";
            MethodFailedException.assert((this.components[i] === ""), "Failed to remove: Comp not empty");
            return copy;
    }


}