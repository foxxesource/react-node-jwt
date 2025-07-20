import mongoose from 'mongoose';
import app from './app.js';

mongoose.connect('mongodb://127.0.0.1:27017/backend')
    .then(() => {
        console.log('database connected')
        app.listen(3000, () => {
            console.log('server is running on localhost:3000')
        })
    }).catch((e) => {
         console.log('error', e.message)
    })

