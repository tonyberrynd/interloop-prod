// ag-grid-enterprise v13.1.2
import { IContextMenuFactory, RowNode, Column, IAfterGuiAttachedParams } from "ag-grid";
export declare class ContextMenuFactory implements IContextMenuFactory {
    private context;
    private popupService;
    private gridOptionsWrapper;
    private rowModel;
    private init();
    private getMenuItems(node, column, value);
    showMenu(node: RowNode, column: Column, value: any, mouseEvent: MouseEvent): void;
}
export interface IContextMenuAfterGuiAttachedParams extends IAfterGuiAttachedParams {
    hidePopupCallback: (event?: any) => void;
}
