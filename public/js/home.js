
const newTaskForm = $('#new-task__form')
const newTaskInput = $('#new-task__input')
const tasks = $('#tasks')
const taskApi = 'https://todolist-production-ceb7.up.railway.app/api/task'

const addNewTask = (event) => {
	event.preventDefault()
	
	let title = newTaskInput.val()
	newTaskInput.val('')
	
	if(!title) {
		return
	}
	
	$.ajax({
		url: taskApi,
		type: 'POST',
		data: {
			title: title
		}
	})
	.then(data => {
		renderTask(data._id, data.title)
	})
	.catch(err => {
		console.log(err)
	})
}

const renderTask = (taskId, textInput) => {	
	let taskHTML = `
		<div class="task" data-id="${taskId}">
			<div class="task__content">
				<input type="text" class="task__content__text" value="${textInput}" readonly>
				<div class="task__actions">
					<button class="task__edit-button">Edit</button>
					<button class="task__delete-button">Delete</button>
				</div>
			</div>
		</div>
	`
	
	tasks.append(taskHTML)
}

const saveTask = (taskId, inputText) => {
	$.ajax({
		url: `${taskApi}/${taskId}`,
		type: 'PUT',
		data: {
			title: inputText
		}
	})
	.then(data => {
		console.log(`Update thanh cong task co id: ${taskId}`)
	})
	.catch(err => {
		console.log(err)
	})
}

const editTask = (event) => {
	// Button sẽ là edit khi chưa sửa, save khi sửa xong
	let buttonTarget = $(event.target) 
	let task = buttonTarget.closest('.task')
	let content = buttonTarget.closest('.task__content')
	let contentInput = content.find('.task__content__text')
	let taskId = task.data('id')
	
	if(contentInput.prop('readonly')) { // Bắt đầu sửa
		contentInput.prop('readonly', false) // Cho phép chỉnh sửa title
		buttonTarget.text('Save') // Button khi đang sửa là save
	} else { // Đang sửa
		let newTitle = contentInput.val()
		
		if(!newTitle) { //Kiểm tra title có hợp lệ
			return //Không hợp lệ thì tiếp tục edit
		}
		
		contentInput.prop('readonly', true)
		buttonTarget.text('Edit') // Button khi sửa xong là edit
		
		saveTask(taskId, newTitle) // Update trong db
	}
}

const deleteTask = (event) => {
	let task = $(event.target).closest('.task')
	let taskId = task.data('id')
	
	$.ajax({
		url: `${taskApi}/${taskId}`,
		type: 'DELETE'
	})
	.then(data => {
		task.remove()
		console.log(data)
	})
	.catch(err => {
		console.log(err)
	})
}

const loadTask = () => {
	$.ajax({
        url: taskApi,
        type: 'GET'
    })
	.then(data => {
		for(let i = 0; i < data.length; i++) {
			renderTask(data[i]._id, data[i].title)
		}
	})
	.catch(err => {
        console.log(err)
    })
}

$(document).ready(loadTask)

$(document).on('submit', newTaskForm, addNewTask)

$(document).on('click', '.task__edit-button', editTask)

$(document).on('click', '.task__delete-button', deleteTask)