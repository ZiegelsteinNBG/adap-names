export class Name {

    public readonly DEFAULT_DELIMITER: string = '.';
    private readonly ESCAPE_CHARACTER = '\\';

    private components: string[] = [];
    private delimiter: string = this.DEFAULT_DELIMITER;

    // Constructor 
    constructor(other: string[], delimiter?: string) {
        if(other !== undefined) this.components = other;
        if(delimiter !== undefined) this.delimiter = delimiter;
    }

    /** Returns human-readable representation of Name instance */
    // @methodtype mutation method: command
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
    }

    // @methodtype Query Method: Get Method
    public getComponent(i: number): string {
        if(!this.isValidIdx(i))return '';
        return this.components[i];
    }

    // @methodtype Mutation Method: Set Method
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
