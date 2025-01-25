import type { LitElement } from "lit";

type Constructor<T> = new (...args: any[]) => T;

type ExtractParams<T extends string> = 
    T extends `${infer _Start}:${infer Param}/${infer Rest}`
        ? { [K in Param | keyof ExtractParams<Rest>]: string }
        : T extends `${infer _Start}:${infer Param}`
            ? { [K in Param]: string }
            : {};

export const litFetch = <DataType, TBase extends Constructor<LitElement>>(Base: TBase, url: string, name: string) => {
    const dataPropName = `${name}Data`;
    const errorPropName = `${name}Error`;
    const loadingPropName = `${name}Loading`;
    const fetchPropName = `${name}Fetch`;
    
    class LitFetchClass extends Base {
        #data: null | DataType = null; 
        #error: null | Error = null;
        #loading = false;

        get [dataPropName](): DataType | null {
            return this.#data
        }
        set [dataPropName](value: DataType | null) {
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

        [fetchPropName](params: ExtractParams<typeof url>) {
            
        }
    }
    return LitFetchClass as Constructor<typeof LitFetchClass> & TBase;
  }