"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const index_1 = __importDefault(require("./routes/index"));
const uuid_1 = require("uuid");
const dotenv_1 = __importDefault(require("dotenv"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const errorMiddleware_1 = __importDefault(require("./middlewares/errorMiddleware"));
const utils_1 = require("./utils/utils");
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
const fileStorage = multer_1.default.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'images');
    },
    filename: (_req, file, cb) => {
        cb(null, `${(0, uuid_1.v4)()}_${file.originalname}`);
    },
});
const fileFilter = (_req, file, cb) => {
    if (file.mimetype === 'image/png' ||
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
app.use(express_1.default.json());
app.use((0, multer_1.default)({ storage: fileStorage, fileFilter }).single('profileImage'));
app.use('/images', express_1.default.static(path_1.default.join(utils_1.rootDir, 'images')));
mongoose_1.default.connect(process.env.DATABASE || '').then(() => {
    console.log('Connected to the database');
    app.listen(PORT, () => {
        console.log('Server is running at Port ', PORT);
    });
    app.use(index_1.default);
    app.use(errorMiddleware_1.default);
});
//# sourceMappingURL=app.js.map