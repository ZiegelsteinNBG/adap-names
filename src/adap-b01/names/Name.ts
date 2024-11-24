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

<<<<<<< HEAD
    // Constructor 
=======
    /** Expects that all Name components are properly masked */
>>>>>>> 15d5493659b8e30ea180d58abe21ceea7223432d
    constructor(other: string[], delimiter?: string) {
        if(other !== undefined) this.components = other;
        if(delimiter !== undefined) this.delimiter = delimiter;
    }

<<<<<<< HEAD
    /** Returns human-readable representation of Name instance */
    // @methodtype Query Method: Get Method
    public asNameString(delimiter: string = this.delimiter): string {
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
=======
    /**
     * Returns a human-readable representation of the Name instance using user-set control characters
     * Control characters are not escaped (creating a human-readable string)
     * Users can vary the delimiter character to be used
     */
    public asString(delimiter: string = this.delimiter): string {
        throw new Error("needs implementation");
    }

    /** 
     * Returns a machine-readable representation of Name instance using default control characters
     * Machine-readable means that from a data string, a Name can be parsed back in
     * The control characters in the data string are the default characters
     */
    public asDataString(): string {
        throw new Error("needs implementation");
>>>>>>> 15d5493659b8e30ea180d58abe21ceea7223432d
    }

    // @methodtype Query Method: Get Method
    public getComponent(i: number): string {
        if(!this.isValidIdx(i))return '';
        return this.components[i];
    }

<<<<<<< HEAD
    // @methodtype Mutation Method: Set Method
=======
    /** Expects that new Name component c is properly masked */
>>>>>>> 15d5493659b8e30ea180d58abe21ceea7223432d
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

<<<<<<< HEAD
    // @methodtype Query Method: Get Method
    public getNoComponents(): number {
        return this.components.length;
    }

    // @methodtype mutation method: set method
=======
    /** Expects that new Name component c is properly masked */
>>>>>>> 15d5493659b8e30ea180d58abe21ceea7223432d
    public insert(i: number, c: string): void {
        if(this.isValidIdx(i)) this.components.splice(i, 0, c);
    }

<<<<<<< HEAD
    // @methodtype mutation method: command method
=======
    /** Expects that new Name component c is properly masked */
>>>>>>> 15d5493659b8e30ea180d58abe21ceea7223432d
    public append(c: string): void {
        if (c != undefined) this.components.push(c);
    }

    // @methodtype mutation method: command method
    public remove(i: number): void {
        if(this.isValidIdx(i))
        this.components[i] = '';
    }

}
