import {Request, Response , Router} from 'express';
import Post from '../models/Post';
class PostRoute {
    router:Router

    constructor(){
        this.router = Router();
        this.routes();
    }

   public async getPosts(req:Request,res:Response):Promise<void>{
        const posts  = await Post.find({});
        res.json(posts);       
    }

   public async getPost(req:Request, res:Response):Promise<void>{
        console.log(req.params.url);
        const post = await Post.find({url:req.params.url});
        res.json({data:post,message:'Received',statusCode:201});
    }

   public async createPost(req:Request, res:Response):Promise<void>{
       // console.log(req.body);
        const {title, url, content, image} = req.body;
        const newPost =  new Post({title, url, content, image});
        await newPost.save();
        res.json({data:newPost,message:'Post Created Successfully',statusCode:201});
    }

   public async updatePost(req:Request, res:Response):Promise<void>{
        //console.log(req.params.url);
        //console.log(req.body);
        const {url} = req.params;
        const post = await Post.findOneAndUpdate({url},req.body, {returnOriginal:false});
        res.json({data:post,message:'Post Updated successfully',statusCode:200});
    }

   public async deletePost(req:Request, res:Response):Promise<void>{
        const {url} = req.params;
        const post = await Post.findOneAndDelete({url});
        res.json({data:post,message:'Post Deleted Successfully',statusCode:200});
    }

    routes(){
        this.router.get('/',this.getPosts);
        this.router.get('/:url',this.getPost);
        this.router.post('/',this.createPost);
        this.router.put('/:url',this.updatePost);
        this.router.delete('/:url',this.deletePost);

    }
}

const postRoute = new PostRoute();
export default postRoute.router;