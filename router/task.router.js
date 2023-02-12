const express = require('express')
const router = express.Router()
const TaskModel = require('../models/task.model.js')

//lay du lieu tu db
router.get('/', (req, res, next) => {
	TaskModel.find({})
	.then((task) => {
		res.json(task)
	})
	.catch((err) => {
		res.status(500).json('Khong tim thay du lieu')
	})
})

//tao moi du lieu
router.post('/', (req, res, next) => {
	TaskModel.create({
		title: req.body.title
	})
	.then((task) => {
		res.json(task);
	})
	.catch((err) => {
		res.status(500).json('Error creating task')
	})
})	

//sua du lieu trong db
router.put('/:id', (req, res, next) => {
	let id = req.params.id
	let newTitle = req.body.title
	
	TaskModel.findByIdAndUpdate(id, {
        title: newTitle
    })
	.then((task) => {
		res.json('Update thanh cong')
	})
	.catch((err) => {
		res.status(500).json('Khong tim thay du lieu')
	})
})

//Xoa du lieu trong db
router.delete('/:id', (req, res, next) => {
    let id = req.params.id
	console.log(id)
    TaskModel.findByIdAndRemove(id)
    .then(data => {
        res.json('Xoa task thanh cong')
    })
    .catch(err => {
        res.status(500).json('Chua xoa tai khoan')
    })
})


module.exports = router

