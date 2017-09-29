// Type definitions for ag-grid v13.1.2
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { IRowModel } from "./iRowModel";
export interface IEnterpriseRowModel extends IRowModel {
    purgeCache(route?: string[]): void;
    getBlockState(): any;
}
