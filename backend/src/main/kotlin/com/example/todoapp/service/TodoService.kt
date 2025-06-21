package com.example.todoapp.service

import com.example.todoapp.dto.CreateTodoRequest
import com.example.todoapp.dto.TodoDto
import com.example.todoapp.dto.UpdateTodoRequest
import com.example.todoapp.entity.Todo
import com.example.todoapp.repository.TodoRepository
import org.springframework.stereotype.Service
import java.time.LocalDateTime

@Service
class TodoService(private val todoRepository: TodoRepository) {

    fun getAllTodos(): List<TodoDto> {
        return todoRepository.findAll().map { it.toDto() }
    }

    fun getTodoById(id: Long): TodoDto? {
        return todoRepository.findById(id).orElse(null)?.toDto()
    }

    fun createTodo(request: CreateTodoRequest): TodoDto {
        val todo = Todo(
            title = request.title,
            description = request.description
        )
        return todoRepository.save(todo).toDto()
    }

    fun updateTodo(id: Long, request: UpdateTodoRequest): TodoDto? {
        val todo = todoRepository.findById(id).orElse(null) ?: return null
        
        request.title?.let { todo.title = it }
        request.description?.let { todo.description = it }
        request.completed?.let { todo.completed = it }
        todo.updatedAt = LocalDateTime.now()
        
        return todoRepository.save(todo).toDto()
    }

    fun deleteTodo(id: Long): Boolean {
        return if (todoRepository.existsById(id)) {
            todoRepository.deleteById(id)
            true
        } else {
            false
        }
    }

    private fun Todo.toDto() = TodoDto(
        id = this.id,
        title = this.title,
        description = this.description,
        completed = this.completed,
        createdAt = this.createdAt,
        updatedAt = this.updatedAt
    )
}