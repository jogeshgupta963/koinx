"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestValidator = void 0;
const express_validator_1 = require("express-validator");
function requestValidator(req, res, next) {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            data: errors.array(),
        });
    }
    next();
}
exports.requestValidator = requestValidator;
