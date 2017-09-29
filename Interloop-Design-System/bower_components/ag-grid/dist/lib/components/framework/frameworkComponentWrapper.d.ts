// Type definitions for ag-grid v13.1.2
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { IAfterGuiAttachedParams, IComponent } from "../../interfaces/iComponent";
/**
 * B the business interface (ie IHeader)
 * A the agGridComponent interface (ie IHeaderComp). The final object acceptable by ag-grid
 */
export interface FrameworkComponentWrapper {
    wrap<A extends IComponent<any, IAfterGuiAttachedParams>>(frameworkComponent: {
        new (): any;
    }, methodList: string[], optionalMethodList?: string[]): A;
}
export interface WrapableInterface {
    hasMethod(name: string): boolean;
    callMethod(name: string, args: IArguments): void;
    addMethod(name: string, callback: Function): void;
}
export declare abstract class BaseComponentWrapper<F extends WrapableInterface> implements FrameworkComponentWrapper {
    wrap<A extends IComponent<any, IAfterGuiAttachedParams>>(OriginalConstructor: {
        new (): any;
    }, mandatoryMethodList: string[], optionalMethodList?: string[]): A;
    abstract createWrapper(OriginalConstructor: {
        new (): any;
    }): F;
    private createMethod(wrapper, methodName, mandatory);
    private createMethodProxy(wrapper, methodName, mandatory);
}
