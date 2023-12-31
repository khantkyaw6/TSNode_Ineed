"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
        default: '',
    },
    needs: [{ type: mongoose_1.Schema.Types.ObjectId, ref: 'need' }],
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)('user', userSchema);
//# sourceMappingURL=User.js.map