// Type definitions for ag-grid v13.1.2
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
export interface ColumnVO {
    id: string;
    displayName: string;
    field: string;
    aggFunc: string;
}
export interface IEnterpriseGetRowsRequest {
    startRow: number;
    endRow: number;
    rowGroupCols: ColumnVO[];
    valueCols: ColumnVO[];
    groupKeys: string[];
    filterModel: any;
    sortModel: any;
}
export interface IEnterpriseGetRowsParams {
    request: IEnterpriseGetRowsRequest;
    successCallback(rowsThisPage: any[], lastRow: number): void;
    failCallback(): void;
}
export interface IEnterpriseDatasource {
    getRows(params: IEnterpriseGetRowsParams): void;
}
