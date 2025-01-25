import type { LitElement } from "lit";

type Constructor<T> = new (...args: any[]) => T;

type ExtractParams<T extends string> = 
    T extends `${infer _Start}:${infer Param}/${infer Rest}`
        ? { [K in Param | keyof ExtractParams<Rest>]: string }
        : T extends `${infer _Start}:${infer Param}`
            ? { [K in Param]: string }
            : {};

export const litFetch = <TBase extends Constructor<LitElement>, Name extends string, URL extends string>(Base: TBase, name: Name, url: URL) => {
    const dataPropName = `${name}Data`;
    const errorPropName = `${name}Error`;
    const loadingPropName = `${name}Loading`;
    const fetchPropName = `${name}Fetch`;

    type dataPropNameType = {
        [D in Name as `${D}Data`]: any | null;
    };

    type fetchPropNameType = {
        [D in Name as `${D}Fetch`]: (params: ExtractParams<URL>) => void;
    };

    type LirFetchProps = dataPropNameType & fetchPropNameType;
    
    class LitFetchClass extends Base {
        #data: null | any = null; 
        #error: null | Error = null;
        #loading = false;

        get [dataPropName](): any | null {
            return this.#data
        }
        set [dataPropName](value: any | null) {
            const oldValue = this.#data;
            this.#data = value;
            this.requestUpdate(dataPropName, oldValue);
        }

        get [errorPropName](): Error | null {
            return this.#error;
        }
        set [errorPropName](value: Error | null) {
            const oldValue = this.#error;
            this.#error = value;
            this.requestUpdate(errorPropName, oldValue);
        }

        get [loadingPropName](): boolean {
            return this.#loading;
        }
        set [loadingPropName](value: boolean) {
            const oldValue = this.#loading;
            this.#loading = value;
            this.requestUpdate(loadingPropName, oldValue);
        }

        [fetchPropName](params: ExtractParams<URL>) {
            
        }
    }
    return LitFetchClass as unknown as Constructor<LitFetchClass & LirFetchProps>;
  }