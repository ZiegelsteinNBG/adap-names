import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(other: string[], delimiter?: string) {
<<<<<<< HEAD
        if(other !== undefined) this.components = other;
        if(delimiter !== undefined) this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        let res: string = '';
        let size: number = this.getNoComponents();
        let counter: number = 0;

        while(counter < size){
            if(this.components[counter] !== ""){
                res += this.getComponent(counter);
                if(counter != size-1){
                    res += delimiter;
                }
            }
            counter ++;
        }
        return res;
    }

    public asDataString(): string {
        let res: string = '';
        let size: number = this.getNoComponents();
        let counter: number = 0;

        while(counter < size){
            if(this.components[counter] !== ""){
                res += this.insertEscCh(this.getComponent(counter));
                if(counter != size-1){
                    res += DEFAULT_DELIMITER;
                }

            }
            counter ++;
        }
        return res;
    }

    public isEmpty(): boolean {
        return (this.getNoComponents() === 0);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if(!this.isValidIdx(i))return '';
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if(this.isValidIdx(i)) this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if(this.isValidIdx(i)) this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        if (c != undefined){
            this.components.push(c);
        } 
    }

    public remove(i: number): void {
        if(this.isValidIdx(i))this.components[i] = '';
    }

    public concat(other: Name): void {
        let idx: number = 0;
        while(idx < other.getNoComponents()){
            this.append(other.getComponent(idx));
        }
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

    public getComponent(i: number): string {
        throw new Error("needs implementation or deletion");
    }

    public setComponent(i: number, c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public insert(i: number, c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public append(c: string): void {
        throw new Error("needs implementation or deletion");
    }

    public remove(i: number): void {
        throw new Error("needs implementation or deletion");
    }

    public concat(other: Name): void {
        throw new Error("needs implementation or deletion");
>>>>>>> e42a56b49aa591786b0ab19e98e56ff3d3fa09d5
    }

    protected insertEscCh(i: string): string {
        return i.replaceAll(this.delimiter, ESCAPE_CHARACTER+this.delimiter);
    }

    protected delEscCh(i: string): string {
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

