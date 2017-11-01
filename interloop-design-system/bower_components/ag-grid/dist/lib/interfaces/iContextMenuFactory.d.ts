// Type definitions for ag-grid v13.1.2
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Column } from "../entities/column";
import { RowNode } from "../entities/rowNode";
export interface IContextMenuFactory {
    showMenu(node: RowNode, column: Column, value: any, mouseEvent: MouseEvent): void;
}
