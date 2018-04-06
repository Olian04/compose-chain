import { Exception } from "handlebars";

export interface IComposer {
    compose(): (iter: any[]) => any,
    map(cb: (value: any) => any): IComposer;
}

export class Composer implements IComposer {
    private preComposition: string;
    private postComposition: string;
    private composition: {signature: string, callback: Function}[];
    private isStatic: boolean;

    constructor(isStatic: boolean) {
        this.isStatic = isStatic;
        this.composition= [];
        this.preComposition = 'iter.reduce((res, v) => {';
        this.postComposition = 'return [...res, v];}, []);';
    }

    /**
     * The way compose works is heavily inspired by the way webpack works in dev mode.
     */
    public compose() {
        // cb is an array of references to the callback methods
        // this is needed because a callback might need the context where it was defined
        // ex: let r = []; cc.each(v => r.push(v));
        const cb = this.composition.map(v => v.callback);
        return (iter: any[]) => eval(
            this.preComposition 
            + this.composition.map(v => v.signature).join('')
            + this.postComposition
        );
    }
    
    public map(cb: (value: any) => any) {
        if (this.isStatic) return new Composer(false).map(cb);

        this.composition.push({
            signature: `v = cb[${this.composition.length}](v);`,
            callback: cb
        });
        return this;
    }

    public filter(cb: (value: any) => any) {
        if (this.isStatic) return new Composer(false).filter(cb);

        this.composition.push({
            signature: `if (cb[${this.composition.length}](v)) return res;`,
            callback: cb
        });
        return this;
    }

    public each(cb: (value: any) => any) {
        if (this.isStatic) return new Composer(false).each(cb);

        this.composition.push({
            signature: `cb[${this.composition.length}](v);`,
            callback: cb
        });
        return this;
    }

    public reduce(cb: (previous: any, next: any) => any, initial) {
        if (this.isStatic) return new Composer(false).reduce(cb, initial);
        throw new Exception('Reduce is not yet implemented!');

        this.composition.push({
            signature: `cb[${this.composition.length}](v);`,
            callback: cb
        });
        return this;
    }

    
}

export const cc = new Composer(true);

export default cc;

