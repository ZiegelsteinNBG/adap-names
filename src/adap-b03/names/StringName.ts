import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(other: string, delimiter?: string) {
        super(delimiter);
        this.name = other;
        this.noComponents = 1;
    }

    getNoComponents(): number {
        return this.noComponents;
    }

    getComponent(i: number): string {
        if (i < 0 || i >= this.noComponents) {
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
        ++this.noComponents;
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
        this.name += c;
        ++this.noComponents;
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
    }

}