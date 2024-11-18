import { Name, DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
        super(delimiter);
        this.components = other;
    }

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
    }

}