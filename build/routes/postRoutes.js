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
const Post_1 = __importDefault(require("../models/Post"));
class PostRoute {
    constructor() {
        this.router = (0, express_1.Router)();
        this.routes();
    }
    getPosts(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const posts = yield Post_1.default.find({});
            res.json(posts);
        });
    }
    getPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(req.params.url);
            const post = yield Post_1.default.find({ url: req.params.url });
            res.json({ data: post, message: 'Received', statusCode: 201 });
        });
    }
    createPost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            // console.log(req.body);
            const { title, url, content, image } = req.body;
            const newPost = new Post_1.default({ title, url, content, image });
            yield newPost.save();
            res.json({ data: newPost, message: 'Post Created Successfully', statusCode: 201 });
        });
    }
    updatePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            //console.log(req.params.url);
            //console.log(req.body);
            const { url } = req.params;
            const post = yield Post_1.default.findOneAndUpdate({ url }, req.body, { returnOriginal: false });
            res.json({ data: post, message: 'Post Updated successfully', statusCode: 200 });
        });
    }
    deletePost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { url } = req.params;
            const post = yield Post_1.default.findOneAndDelete({ url });
            res.json({ data: post, message: 'Post Deleted Successfully', statusCode: 200 });
        });
    }
    routes() {
        this.router.get('/', this.getPosts);
        this.router.get('/:url', this.getPost);
        this.router.post('/', this.createPost);
        this.router.put('/:url', this.updatePost);
        this.router.delete('/:url', this.deletePost);
    }
}
const postRoute = new PostRoute();
exports.default = postRoute.router;
