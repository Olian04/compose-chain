

type Iter<T> = Array<T>;
interface IComposer<T, R> {
    map<U>( callback: (value: T) => U ): R;
}
interface ICallableComposer<T> extends IComposer<T, ICallableComposer<T>> {
    (iter: Iter<T>): any;
}

function composer<T>(): ICallableComposer<T> {
    const composition: Function[] = [];

    //@ts-ignore
    const co: ICallableComposer = function<T>(iter: Iter<T>): any {
        return iter.map(v => 
            composition.reduce((v, f) => f(v), v)
        );
    }
    co.map = cb => {
        composition.push(cb);
        return co;
    };
    return co;
}

composer<Number>()
    .map(v => v * 2);
