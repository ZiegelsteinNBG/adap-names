import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException} from "../common/IllegalArgumentException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        IllegalArgumentException.assertIsNotNullOrUndefined(baseName);
        IllegalArgumentException.assertIsNotNullOrUndefined(parent);
        super(baseName, parent);
    }

    public open(): void {
        // do something
    }

    public read(noBytes: number): Int8Array {
        // read something
        return new Int8Array();
    }

    public close(): void {
        // do something
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}