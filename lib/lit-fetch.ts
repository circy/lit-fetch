import type { LitElement } from "lit";

type Constructor<T> = new (...args: any[]) => T;

type ExtractParams<T extends string> = 
    T extends `${infer _Start}:${infer Param}/${infer Rest}`
        ? { [K in Param | keyof ExtractParams<Rest>]: string }
        : T extends `${infer _Start}:${infer Param}`
            ? { [K in Param]: string }
            : {};

type LitFetchProps<RequestName extends string, RequestUrl extends string> = {
        [D in RequestName as `${D}Data`]: any | null;
    } & {
        [D in RequestName as `${D}Error`]: any | null;
    } & {
        [D in RequestName as `${D}Loading`]: boolean | null;
    } & {
        [D in RequestName as `${D}Fetch`]: (params: ExtractParams<RequestUrl>) => void;
};

export const getPropertyNames = (requestName: string) => {
    return  {
        dataPropName: `${requestName}Data`,
        errorPropName: `${requestName}Error`,
        loadingPropName: `${requestName}Loading`,
        fetchPropName: `${requestName}Fetch`,
    };
};

export const litFetch = <TBase extends Constructor<LitElement>, RequestName extends string, RequestUrl extends string>(base: TBase, requestName: RequestName, requestUrl: RequestUrl) => {
    const { dataPropName, errorPropName, loadingPropName, fetchPropName } = getPropertyNames(requestName);
    
    class LitFetchClass extends base {
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

        [fetchPropName](params: ExtractParams<RequestUrl>) {
            
        }
    }
    return LitFetchClass as unknown as Constructor<LitFetchClass & LitFetchProps<RequestName, RequestUrl>>;
  }