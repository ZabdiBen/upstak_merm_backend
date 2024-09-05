import mongoose from "mongoose";

/*
* ! useNewUrlParser is a deprecated option: useNewUrlParser has no effect since Node.js
* 
*/


const conectarDB = async () => {
    try{
        const connection = await mongoose.connect(process.env.MONGO_URI)

        const url = `${connection.connection.host}:${connection.connection.port}`;

        console.log(`MongoDB conectado en: ${url}`);

    } catch (error) {
        console.log(`error: ${error.message}`);
        /**
         * * process se usa para terminar procesos en node
         */
        process.exit(1)
    }
}

export default conectarDB;