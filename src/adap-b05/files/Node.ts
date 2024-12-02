import { error } from "console";
import { ExceptionType, AssertionDispatcher } from "../common/AssertionDispatcher";
import { Exception } from "../common/Exception";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";

import { Name } from "../names/Name";
import { Directory } from "./Directory";
import { RootNode } from "./RootNode";

export class Node {

    protected baseName: string = "";
    protected parentNode: Directory;

    constructor(bn: string, pn: Directory) {
        this.doSetBaseName(bn);
        this.parentNode = pn; // why oh why do I have to set this
        this.initialize(pn);
    }

    protected initialize(pn: Directory): void {
        this.parentNode = pn;
        this.parentNode.add(this);
    }

    public move(to: Directory): void {
        this.parentNode.remove(this);
        to.add(this);
        this.parentNode = to;
    }

    public getFullName(): Name {
        const result: Name = this.parentNode.getFullName();
        result.append(this.getBaseName());
        return result;
    }

    public getBaseName(): string {
        return this.doGetBaseName();
    }

    protected doGetBaseName(): string {
        return this.baseName;
    }

    public rename(bn: string): void {
        this.doSetBaseName(bn);
    }

    protected doSetBaseName(bn: string): void {
        this.baseName = bn;
    }

    public getParentNode(): Directory {
        return this.parentNode;
    }

    /**
     * Returns all nodes in the tree that match bn
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        this.assertIsValidBaseName(bn, ExceptionType.PRECONDITION);
        
        let resn = new Set<Node>();
        try{
            if(bn === this.getBaseName())resn.add(this);
            // if(this.getParentNode() === RootNode.getRootNode() ) return resn;
            // let t_res: Set<Node> = this.getParentNode().findNodes(bn);
            // for(let i: number = 0; i < t_res.size; i++){
            // this.parentNode.findNodes(bn)?.forEach(node => resn?.add(node));    
            // } 
            
            this.assertClassInvariants();
        }catch(error)
        {
            if(error instanceof ServiceFailureException){
                throw error;
            }
            ServiceFailureException.assertCondition(false, "Failed findNotes()", error as Exception);
        }
        return resn;
        
    }

    protected assertClassInvariants(): void {
        const bn: string = this.doGetBaseName();
        this.assertIsValidBaseName(bn, ExceptionType.CLASS_INVARIANT);
    }

    protected assertIsValidBaseName(bn: string, et: ExceptionType): void {
        const condition: boolean = (bn != "");
        AssertionDispatcher.dispatch(et, condition, "invalid base name");
    }

}
