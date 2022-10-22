import {Request, Response , Router} from 'express';
import User from '../models/User';
class UserRoute {
    router:Router

    constructor(){
        this.router = Router();
        this.routes();
    }

   public async getUsers(req:Request,res:Response):Promise<void>{
        const users  = await User.find({});
        res.json(users);       
    }

   public async getUser(req:Request, res:Response):Promise<void>{
        console.log(req.params.username);
        const user = await User.findOne({username:req.params.username}).populate('posts','title url');
        res.json({data:user,message:'Received',statusCode:201});
    }

   public async createUser(req:Request, res:Response):Promise<void>{
       // console.log(req.body);
        
        const newUser =  new User(req.body);
        await newUser.save();
        res.json({data:newUser,message:'User Created Successfully',statusCode:201});
    }

   public async updateUser(req:Request, res:Response):Promise<void>{
        //console.log(req.params.username);
        //console.log(req.body);
        const {username} = req.params;
        const user = await User.findOneAndUpdate({username},req.body, {returnOriginal:false});
        res.json({data:user,message:'User Updated successfully',statusCode:200});
    }

   public async deleteUser(req:Request, res:Response):Promise<void>{
        const {username} = req.params;
        const user = await User.findOneAndDelete({username});
        res.json({data:user,message:'User Deleted Successfully',statusCode:200});
    }

    routes(){
        this.router.get('/',this.getUsers);
        this.router.get('/:username',this.getUser);
        this.router.post('/',this.createUser);
        this.router.put('/:username',this.updateUser);
        this.router.delete('/:username',this.deleteUser);

    }
}

const userRoute = new UserRoute();
export default userRoute.router;