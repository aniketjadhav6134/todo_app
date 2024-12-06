import mongoose from "mongoose"

const connection = () =>{
        mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
        }, (err) => {
            if (err) {
                console.log(err)
            } else {
                console.log("DB Connected")
            }
        })
}

export default connection;