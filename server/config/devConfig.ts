export const devConfig ={
    jwt:{
        secretOrKey: process.env.DEV_SECRET || "auxriliarSecret"
    }
}