export const prodConfig ={
    jwt:{
        secretOrKey: process.env.PROD_SECRET || "auxriliarSecret"
    }
}