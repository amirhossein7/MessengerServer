import { Request, Response, NextFunction } from "express";
import path from 'path';


class MainController {

    index(req: Request, res: Response, next: NextFunction){        
        return res.sendFile(path.resolve('./src/Views/index.html'));
    }
}

export default new MainController();