// Type definitions for ag-grid v13.1.2
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
import { Column } from "../entities/column";
import { IFilterComp } from "../interfaces/iFilter";
export declare class FilterManager {
    private $compile;
    private $scope;
    private gridOptionsWrapper;
    private gridCore;
    private popupService;
    private valueService;
    private columnController;
    private rowModel;
    private eventService;
    private enterprise;
    private context;
    private columnApi;
    private gridApi;
    static QUICK_FILTER_SEPARATOR: string;
    private allFilters;
    private quickFilter;
    private advancedFilterPresent;
    private externalFilterPresent;
    private availableFilters;
    init(): void;
    registerFilter(key: string, Filter: any): void;
    setFilterModel(model: any): void;
    private setModelOnFilterWrapper(filter, newModel);
    getFilterModel(): any;
    isAdvancedFilterPresent(): boolean;
    private setAdvancedFilterPresent();
    private updateFilterFlagInColumns();
    isAnyFilterPresent(): boolean;
    private doesFilterPass(node, filterToSkip?);
    private parseQuickFilter(newFilter);
    setQuickFilter(newFilter: any): void;
    private checkExternalFilter();
    onFilterChanged(): void;
    isQuickFilterPresent(): boolean;
    doesRowPassOtherFilters(filterToSkip: any, node: any): boolean;
    private doesRowPassQuickFilterNoCache(node);
    private doesRowPassQuickFilterCache(node);
    private doesRowPassQuickFilter(node);
    doesRowPassFilter(node: any, filterToSkip?: any): boolean;
    private getQuickFilterTextForColumn(column, rowNode);
    private aggregateRowForQuickFilter(node);
    private onNewRowsLoaded();
    private createValueGetter(column);
    getFilterComponent(column: Column): IFilterComp;
    getOrCreateFilterWrapper(column: Column): FilterWrapper;
    cachedFilter(column: Column): FilterWrapper;
    private createFilterInstance(column);
    private checkFilterHasAllMandatoryMethods(filterInstance, column);
    private createParams(filterWrapper);
    private createFilterWrapper(column);
    private initialiseFilterAndPutIntoGui(filterWrapper);
    private getFilterFromCache(filterType);
    private onNewColumnsLoaded();
    destroyFilter(column: Column): void;
    private disposeFilterWrapper(filterWrapper);
    destroy(): void;
    private assertMethodHasNoParameters(theMethod);
}
export interface FilterWrapper {
    column: Column;
    filter: IFilterComp;
    scope: any;
    gui: HTMLElement;
}
