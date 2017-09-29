// Type definitions for ag-grid v13.1.2
// Project: http://www.ag-grid.com/
// Definitions by: Niall Crosby <https://github.com/ag-grid/>
export declare class ExpressionService {
    private expressionToFunctionCache;
    private logger;
    private setBeans(loggerFactory);
    evaluate(expressionOrFunc: Function | string, params: any): any;
    private evaluateExpression(expression, params);
    private createExpressionFunction(expression);
    private createFunctionBody(expression);
}
