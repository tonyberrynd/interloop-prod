// Type definitions for ag-grid v13.1.2
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { RowNode } from "./entities/rowNode";
import { GetContextMenuItems, GetMainMenuItems, GetRowNodeIdFunc, GridOptions, NavigateToNextCellParams, NodeChildDetails, PostProcessPopupParams, ProcessRowParams, TabToNextCellParams } from "./entities/gridOptions";
import { GridApi } from "./gridApi";
import { ColDef, ColGroupDef, IAggFunc } from "./entities/colDef";
import { ColumnApi } from "./columnController/columnController";
import { IViewportDatasource } from "./interfaces/iViewportDatasource";
import { IDatasource } from "./rowModels/iDatasource";
import { GridCellDef } from "./entities/gridCell";
import { IEnterpriseDatasource } from "./interfaces/iEnterpriseDatasource";
import { BaseExportParams, ProcessCellForExportParams } from "./exportParams";
import { AgEvent } from "./events";
export interface PropertyChangedEvent extends AgEvent {
    currentValue: any;
    previousValue: any;
}
export declare class GridOptionsWrapper {
    private static MIN_COL_WIDTH;
    static PROP_HEADER_HEIGHT: string;
    static PROP_GROUP_REMOVE_SINGLE_CHILDREN: string;
    static PROP_PIVOT_HEADER_HEIGHT: string;
    static PROP_GROUP_HEADER_HEIGHT: string;
    static PROP_PIVOT_GROUP_HEADER_HEIGHT: string;
    static PROP_FLOATING_FILTERS_HEIGHT: string;
    private gridOptions;
    private columnController;
    private eventService;
    private enterprise;
    private frameworkFactory;
    private gridApi;
    private columnApi;
    private environment;
    private propertyEventService;
    private domDataKey;
    private agWire(gridApi, columnApi);
    private destroy();
    init(): void;
    getDomData(element: Node, key: string): any;
    setDomData(element: Element, key: string, value: any): any;
    isEnterprise(): boolean;
    isRowSelection(): boolean;
    isRowDeselection(): boolean;
    isRowSelectionMulti(): boolean;
    getContext(): any;
    isPivotMode(): boolean;
    isPivotTotals(): boolean;
    isRowModelInfinite(): boolean;
    isRowModelViewport(): boolean;
    isRowModelEnterprise(): boolean;
    isRowModelDefault(): boolean;
    isFullRowEdit(): boolean;
    isSuppressFocusAfterRefresh(): boolean;
    isShowToolPanel(): boolean;
    isToolPanelSuppressRowGroups(): boolean;
    isToolPanelSuppressValues(): boolean;
    isToolPanelSuppressPivots(): boolean;
    isToolPanelSuppressPivotMode(): boolean;
    isSuppressTouch(): boolean;
    useAsyncEvents(): boolean;
    isEnableCellChangeFlash(): boolean;
    isGroupSelectsChildren(): boolean;
    isGroupSelectsFiltered(): boolean;
    isGroupHideOpenParents(): boolean;
    isGroupMultiAutoColumn(): boolean;
    isGroupRemoveSingleChildren(): boolean;
    isGroupIncludeFooter(): boolean;
    isGroupSuppressBlankHeader(): boolean;
    isSuppressRowClickSelection(): boolean;
    isSuppressCellSelection(): boolean;
    isSuppressMultiSort(): boolean;
    isGroupSuppressAutoColumn(): boolean;
    isSuppressDragLeaveHidesColumns(): boolean;
    isSuppressScrollOnNewData(): boolean;
    isForPrint(): boolean;
    isAutoHeight(): boolean;
    isSuppressHorizontalScroll(): boolean;
    isSuppressLoadingOverlay(): boolean;
    isSuppressNoRowsOverlay(): boolean;
    isSuppressFieldDotNotation(): boolean;
    getPinnedTopRowData(): any[];
    getPinnedBottomRowData(): any[];
    isFunctionsPassive(): boolean;
    isSuppressTabbing(): boolean;
    isSuppressChangeDetection(): boolean;
    isSuppressAnimationFrame(): boolean;
    getQuickFilterText(): string;
    isCacheQuickFilter(): boolean;
    isUnSortIcon(): boolean;
    isSuppressMenuHide(): boolean;
    getRowStyle(): any;
    getRowClass(): string | string[];
    getRowStyleFunc(): Function;
    getRowClassFunc(): (params: any) => string | string[];
    getPostProcessPopupFunc(): (params: PostProcessPopupParams) => void;
    getDoesDataFlowerFunc(): (data: any) => boolean;
    getIsFullWidthCellFunc(): (rowNode: RowNode) => boolean;
    getFullWidthCellRendererParams(): any;
    isEmbedFullWidthRows(): boolean;
    getBusinessKeyForNodeFunc(): (node: RowNode) => string;
    getHeaderCellRenderer(): any;
    getApi(): GridApi;
    getColumnApi(): ColumnApi;
    isDeltaRowDataMode(): boolean;
    isEnsureDomOrder(): boolean;
    isEnableColResize(): boolean;
    isSingleClickEdit(): boolean;
    isSuppressClickEdit(): boolean;
    isStopEditingWhenGridLosesFocus(): boolean;
    getGroupDefaultExpanded(): number;
    getAutoSizePadding(): number;
    getMaxConcurrentDatasourceRequests(): number;
    getMaxBlocksInCache(): number;
    getCacheOverflowSize(): number;
    getPaginationPageSize(): number;
    getCacheBlockSize(): number;
    getInfiniteInitialRowCount(): number;
    isPurgeClosedRowNodes(): boolean;
    isSuppressPaginationPanel(): boolean;
    getRowData(): any[];
    isGroupUseEntireRow(): boolean;
    isEnableRtl(): boolean;
    getAutoGroupColumnDef(): ColDef;
    isGroupSuppressRow(): boolean;
    getRowGroupPanelShow(): string;
    getPivotPanelShow(): string;
    isAngularCompileRows(): boolean;
    isAngularCompileFilters(): boolean;
    isAngularCompileHeaders(): boolean;
    isDebug(): boolean;
    getColumnDefs(): (ColDef | ColGroupDef)[];
    getColumnTypes(): {
        [key: string]: ColDef;
    };
    getDatasource(): IDatasource;
    getViewportDatasource(): IViewportDatasource;
    getEnterpriseDatasource(): IEnterpriseDatasource;
    isEnableSorting(): boolean;
    isAccentedSort(): boolean;
    isEnableCellExpressions(): boolean;
    isEnableGroupEdit(): boolean;
    isSuppressMiddleClickScrolls(): boolean;
    isSuppressPreventDefaultOnMouseWheel(): boolean;
    isSuppressColumnVirtualisation(): boolean;
    isSuppressContextMenu(): boolean;
    isAllowContextMenuWithControlKey(): boolean;
    isSuppressCopyRowsToClipboard(): boolean;
    isEnableFilter(): boolean;
    isPagination(): boolean;
    isEnableServerSideFilter(): boolean;
    isEnableServerSideSorting(): boolean;
    isSuppressMovableColumns(): boolean;
    isAnimateRows(): boolean;
    isSuppressColumnMoveAnimation(): boolean;
    isSuppressAggFuncInHeader(): boolean;
    isSuppressAggAtRootLevel(): boolean;
    isEnableRangeSelection(): boolean;
    isPaginationAutoPageSize(): boolean;
    isRememberGroupStateWhenNewData(): boolean;
    getIcons(): any;
    getAggFuncs(): {
        [key: string]: IAggFunc;
    };
    getSortingOrder(): string[];
    getAlignedGrids(): GridOptions[];
    getGroupRowRendererParams(): any;
    getOverlayLoadingTemplate(): string;
    getOverlayNoRowsTemplate(): string;
    isSuppressAutoSize(): boolean;
    isSuppressParentsInRowNodes(): boolean;
    isEnableStatusBar(): boolean;
    isAlwaysShowStatusBar(): boolean;
    isFunctionsReadOnly(): boolean;
    isFloatingFilter(): boolean;
    getDefaultColDef(): ColDef;
    getDefaultColGroupDef(): ColGroupDef;
    getDefaultExportParams(): BaseExportParams;
    isSuppressCsvExport(): boolean;
    isSuppressExcelExport(): boolean;
    getHeaderCellTemplate(): string;
    getHeaderCellTemplateFunc(): (params: any) => string | HTMLElement;
    getNodeChildDetailsFunc(): ((dataItem: any) => NodeChildDetails);
    getGroupRowAggNodesFunc(): (nodes: RowNode[]) => any;
    getContextMenuItemsFunc(): GetContextMenuItems;
    getMainMenuItemsFunc(): GetMainMenuItems;
    getRowNodeIdFunc(): GetRowNodeIdFunc;
    getNavigateToNextCellFunc(): (params: NavigateToNextCellParams) => GridCellDef;
    getTabToNextCellFunc(): (params: TabToNextCellParams) => GridCellDef;
    isValueCache(): boolean;
    isValueCacheNeverExpires(): boolean;
    isAggregateOnlyChangedColumns(): boolean;
    getProcessSecondaryColDefFunc(): (colDef: ColDef) => void;
    getProcessSecondaryColGroupDefFunc(): (colGroupDef: ColGroupDef) => void;
    getSendToClipboardFunc(): (params: any) => void;
    getProcessRowPostCreateFunc(): (params: ProcessRowParams) => void;
    getProcessCellForClipboardFunc(): (params: ProcessCellForExportParams) => any;
    getProcessCellFromClipboardFunc(): (params: ProcessCellForExportParams) => any;
    getViewportRowModelPageSize(): number;
    getViewportRowModelBufferSize(): number;
    getClipboardDeliminator(): string;
    setProperty(key: string, value: any): void;
    addEventListener(key: string, listener: Function): void;
    removeEventListener(key: string, listener: Function): void;
    getHeaderHeight(): number;
    getFloatingFiltersHeight(): number;
    getGroupHeaderHeight(): number;
    getPivotHeaderHeight(): number;
    getPivotGroupHeaderHeight(): number;
    isExternalFilterPresent(): boolean;
    doesExternalFilterPass(node: RowNode): boolean;
    getDocument(): Document;
    getLayoutInterval(): number;
    getMinColWidth(): number;
    getMaxColWidth(): number;
    getColWidth(): number;
    getRowBuffer(): number;
    getScrollbarWidth(): number;
    private checkForDeprecated();
    getLocaleTextFunc(): Function;
    globalEventHandler(eventName: string, event?: any): void;
    getRowHeightAsNumber(): number;
    getRowHeightForNode(rowNode: RowNode): number;
    isDynamicRowHeight(): boolean;
    private isNumeric(value);
    private specialForNewMaterial(defaultValue, materialValue);
    private getDefaultRowHeight();
}