"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WaybillStatus = exports.OrderStatus = exports.OrderFlow = exports.AppointmentStatus = exports.PaymentMode = exports.ConsumptionStatus = exports.PayRule = exports.AppointmentCondition = exports.ContractStatus = exports.Gender = void 0;
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FAMALE"] = "FAMALE";
})(Gender = exports.Gender || (exports.Gender = {}));
var ContractStatus;
(function (ContractStatus) {
    ContractStatus["DRAFT"] = "DRAFT";
    ContractStatus["NOTEFFECTIVE"] = "NOTEFFECTIVE";
    ContractStatus["EFFECTIVE"] = "EFFECTIVE";
    ContractStatus["ABORTED"] = "ABORTED";
    ContractStatus["DELETED"] = "DELETED";
    ContractStatus["CANCELLED"] = "CANCELLED";
})(ContractStatus = exports.ContractStatus || (exports.ContractStatus = {}));
var AppointmentCondition;
(function (AppointmentCondition) {
    AppointmentCondition["PAYDEPOSIT"] = "PAYDEPOSIT";
    AppointmentCondition["PAYLEASEFEE"] = "PAYLEASEFEE";
    AppointmentCondition["RETURNDEPOSIT"] = "RETURNDEPOSIT";
    AppointmentCondition["RETURNMATERIAL"] = "RETURNMATERIAL";
})(AppointmentCondition = exports.AppointmentCondition || (exports.AppointmentCondition = {}));
var PayRule;
(function (PayRule) {
    PayRule["ABSOLUTE"] = "ABSOLUTE";
    PayRule["PERCENTAGE"] = "PERCENTAGE";
})(PayRule = exports.PayRule || (exports.PayRule = {}));
var ConsumptionStatus;
(function (ConsumptionStatus) {
    ConsumptionStatus["SUCCESS"] = "SUCCESS";
})(ConsumptionStatus = exports.ConsumptionStatus || (exports.ConsumptionStatus = {}));
var PaymentMode;
(function (PaymentMode) {
    PaymentMode["CASH"] = "CASH";
    PaymentMode["ALIPAY"] = "ALIPAY";
    PaymentMode["WECHAT"] = "WECHAT";
})(PaymentMode = exports.PaymentMode || (exports.PaymentMode = {}));
var AppointmentStatus;
(function (AppointmentStatus) {
    AppointmentStatus["NONPERFORMANCE"] = "NONPERFORMANCE";
    AppointmentStatus["INEXECUTION"] = "INEXECUTION";
    AppointmentStatus["PERFORMED"] = "PERFORMED";
})(AppointmentStatus = exports.AppointmentStatus || (exports.AppointmentStatus = {}));
var OrderFlow;
(function (OrderFlow) {
    OrderFlow["NONE"] = "NONE";
    OrderFlow["IN"] = "IN";
    OrderFlow["OUT"] = "OUT";
})(OrderFlow = exports.OrderFlow || (exports.OrderFlow = {}));
var OrderStatus;
(function (OrderStatus) {
    OrderStatus["DRAFT"] = "DRAFT";
    OrderStatus["PROCESSING"] = "PROCESSING";
    OrderStatus["COMPLETED"] = "COMPLETED";
})(OrderStatus = exports.OrderStatus || (exports.OrderStatus = {}));
var WaybillStatus;
(function (WaybillStatus) {
    WaybillStatus["NONE"] = "NONE";
    WaybillStatus["INTRANSIT"] = "INTRANSIT";
    WaybillStatus["Arrived"] = "Arrived";
})(WaybillStatus = exports.WaybillStatus || (exports.WaybillStatus = {}));
//# sourceMappingURL=schema.js.map