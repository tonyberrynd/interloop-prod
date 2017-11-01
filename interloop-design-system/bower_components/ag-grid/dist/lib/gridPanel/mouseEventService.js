/**
 * ag-grid - Advanced Data Grid / Data Table supporting Javascript / React / AngularJS / Web Components
 * @version v13.1.2
 * @link http://www.ag-grid.com/
 * @license MIT
 */
"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var context_1 = require("../context/context");
var context_2 = require("../context/context");
var utils_1 = require("../utils");
var gridOptionsWrapper_1 = require("../gridOptionsWrapper");
var cellComp_1 = require("../rendering/cellComp");
var MouseEventService = (function () {
    function MouseEventService() {
    }
    MouseEventService.prototype.getRenderedCellForEvent = function (event) {
        var sourceElement = utils_1.Utils.getTarget(event);
        while (sourceElement) {
            var renderedCell = this.gridOptionsWrapper.getDomData(sourceElement, cellComp_1.CellComp.DOM_DATA_KEY_CELL_COMP);
            if (renderedCell) {
                return renderedCell;
            }
            sourceElement = sourceElement.parentElement;
        }
        return null;
    };
    MouseEventService.prototype.getGridCellForEvent = function (event) {
        var cellComp = this.getRenderedCellForEvent(event);
        return cellComp ? cellComp.getGridCell() : null;
    };
    __decorate([
        context_2.Autowired('gridOptionsWrapper'),
        __metadata("design:type", gridOptionsWrapper_1.GridOptionsWrapper)
    ], MouseEventService.prototype, "gridOptionsWrapper", void 0);
    MouseEventService = __decorate([
        context_1.Bean('mouseEventService')
    ], MouseEventService);
    return MouseEventService;
}());
exports.MouseEventService = MouseEventService;
