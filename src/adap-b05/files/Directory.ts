import { Node } from "./Node";
import { error } from "console";
import { ExceptionType, AssertionDispatcher } from "../common/AssertionDispatcher";
import { Exception } from "../common/Exception";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";


export class Directory extends Node {

    protected childNodes: Set<Node> = new Set<Node>();

    constructor(bn: string, pn: Directory) {
        super(bn, pn);
    }

    public add(cn: Node): void {
        this.childNodes.add(cn);
    }

    public remove(cn: Node): void {
        this.childNodes.delete(cn); // Yikes! Should have been called remove
    }

    public findNodes(bn: string): Set<Node> {

        let res: Set<Node> = new Set<Node>();
 
        if(this.baseName === bn) res.add(this);
        for(let ch of this.childNodes){
                ch.findNodes(bn).forEach(n => res.add(n))
        }
    

        return res;
    }

}