"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("../models/User"));
class UserRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield User_1.default.find({});
            res.json(users);
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.username);
            const user = yield User_1.default.findOne({ username: req.params.username }).populate('posts', 'title url');
            res.json({ data: user, message: 'Received', statusCode: 201 });
        });
    }
    createUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body);
            const newUser = new User_1.default(req.body);
            yield newUser.save();
            res.json({ data: newUser, message: 'User Created Successfully', statusCode: 201 });
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.params.username);
            //console.log(req.body);
            const { username } = req.params;
            const user = yield User_1.default.findOneAndUpdate({ username }, req.body, { returnOriginal: false });
            res.json({ data: user, message: 'User Updated successfully', statusCode: 200 });
        });
    }
    deleteUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = req.params;
            const user = yield User_1.default.findOneAndDelete({ username });
            res.json({ data: user, message: 'User Deleted Successfully', statusCode: 200 });
        });
    }
    routes() {
        this.router.get('/', this.getUsers);
        this.router.get('/:username', this.getUser);
        this.router.post('/', this.createUser);
        this.router.put('/:username', this.updateUser);
        this.router.delete('/:username', this.deleteUser);
    }
}
const userRoute = new UserRoute();
exports.default = userRoute.router;
