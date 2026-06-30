"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
router.get('/', (_req, res) => {
    res.json({
        message: 'List all users',
        users: [],
    });
});
router.post('/', (_req, res) => {
    res.status(201).json({ message: 'Create a new user' });
});
exports.default = router;
