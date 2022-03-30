import { NextFunction } from "express";

export function logHere(next: NextFunction){
    console.log("~~~~~~> here");   
    next();
    
}