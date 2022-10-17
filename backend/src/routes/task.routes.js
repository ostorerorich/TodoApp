import { Router } from 'express'
import taskSchema from '../model/task.schema.js'

const router = Router()

router.post('/new', async (req, res) => {
    try {
        const newTask = await taskSchema({ task: req.body.task })

        const savedTask = await newTask.save()

        res.status(200).json(savedTask)
    } catch (error) {
        res.status(400).json( error )

        console.log(error)
    }
})

router.get('/get', async (req, res) => {
    try {
        const getTasks = await taskSchema.find({})

        res.status(200).json(getTasks)
    } catch (error) {
        res.status(400).json( error )
    }
})

router.delete('/del/:id', async (req, res) => {
    try {
        const deleteTask = await taskSchema.findByIdAndDelete(req.params.id)

        res.status(200).json(deleteTask)
    } catch (error) {
        res.status(400).json(error)
    }
})

router.put('/upd/:id', async (req, res) => {
    try {
        const updateTask = await taskSchema.findById(req.params.id)

        updateTask.done = !updateTask.done

        updateTask.save()

        res.status(200).json(updateTask)
    } catch (error) {
        res.status(400).json(error)
    }
})

export default router
