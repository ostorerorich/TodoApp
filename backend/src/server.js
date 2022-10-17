import express from 'express'
import morgan from 'morgan'
import './mongoose.js'
import { PORT } from './config.js'
import appRoutes from './routes/task.routes.js'
import cors from 'cors'
const app = express()


app.use(morgan('dev'))
app.use(express.urlencoded({ extended:false }))
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:5173'
}))


app.use('/', appRoutes)



app.listen(PORT)
console.log('up', PORT)

