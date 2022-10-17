import { connect } from 'mongoose'
import { MONGODB } from '../src/config.js'

(async () => {
    try {
        const db = await connect(MONGODB)
        console.log('DB CONNECTED')
    } catch (error) {
        console.log(error)
    }
})()