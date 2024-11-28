export const DEFAULT_DELIMITER: string = '.';
export const ESCAPE_CHARACTER = '\\';

/**
 * A name is a sequence of string components separated by a delimiter character.
 * Special characters within the string may need masking, if they are to appear verbatim.
 * There are only two special characters, the delimiter character and the escape character.
 * The escape character can't be set, the delimiter character can.
 * 
 * Homogenous name examples
 * 
 * "oss.cs.fau.de" is a name with four name components and the delimiter character '.'.
 * "///" is a name with four empty components and the delimiter character '/'.
 * "Oh\.\.\." is a name with one component, if the delimiter character is '.'.
 */
export class Name {

    private delimiter: string = DEFAULT_DELIMITER;
    private components: string[] = [];

    // Constructor 
    /** Expects that all Name components are properly masked */

    constructor(other: string[], delimiter?: string) {
        if(other !== undefined) this.components = other;
        if(delimiter !== undefined) this.delimiter = delimiter;
    }


    /** Returns human-readable representation of Name instance */
    // @methodtype Query Method: Get Method
    public asString(delimiter: string = this.delimiter): string {
        let res: string = '';
        let size: number = this.getNoComponents();
        let counter: number = 0;

        while(counter < size){
            res += this.getComponent(counter);
            if(counter != size-1){
                res += delimiter;
            }
            counter ++;
        }
        return res;
    }

    // @methodtype Query Method: Get Method
    public getComponent(i: number): string {
        if(!this.isValidIdx(i))return '';
        return this.components[i];
    }


    /** Expects that new Name component c is properly masked */
    public setComponent(i: number, c: string): void {
        if(this.isValidIdx(i)) this.components[i] = c;
    }

    // protected Helpermethod (could be Assertion Method instead)
    // @methodtype Query Method: Boolean Query Method
    protected isValidIdx(i: number): boolean {
        if(i < 0 || i >= this.getNoComponents()){
            return false;
        }else{
            return true;
        }
    }


    // @methodtype Query Method: Get Method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype mutation method: set method

    public insert(i: number, c: string): void {
        if(this.isValidIdx(i)) this.components.splice(i, 0, c);
    }

    // @methodtype mutation method: command method
    public append(c: string): void {
        if (c != undefined) this.components.push(c);
    }

    // @methodtype mutation method: command method
    public remove(i: number): void {
        if(this.isValidIdx(i))
        this.components[i] = '';
    }

}
