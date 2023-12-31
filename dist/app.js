"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const dotenv_1 = __importDefault(require("dotenv"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
mongoose_1.default.connect(process.env.DATABASE || '').then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log('Server is running at Port ', PORT);
    });
    app.use(index_1.default);
    app.use(errorMiddleware_1.default);
});
//# sourceMappingURL=app.js.map