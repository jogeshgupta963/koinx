"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    if (err instanceof Error) {
        return res.status(400).json({
            errors: [
                {
                    message: err.message,
                },
            ],
        });
    }
    return res.status(400).json({
        errors: [
            {
                message: err,
            },
        ],
    });
};
exports.errorHandler = errorHandler;
