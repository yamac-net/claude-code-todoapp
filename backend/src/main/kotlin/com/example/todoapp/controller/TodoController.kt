package com.example.todoapp.controller

import com.example.todoapp.dto.CreateTodoRequest
import com.example.todoapp.dto.TodoDto
import com.example.todoapp.dto.UpdateTodoRequest
import com.example.todoapp.service.TodoService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/todos")
class TodoController(private val todoService: TodoService) {

    @GetMapping
    fun getAllTodos(): List<TodoDto> {
        return todoService.getAllTodos()
    }

    @GetMapping("/{id}")
    fun getTodoById(@PathVariable id: Long): ResponseEntity<TodoDto> {
        val todo = todoService.getTodoById(id)
        return if (todo != null) {
            ResponseEntity.ok(todo)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @PostMapping
    fun createTodo(@RequestBody request: CreateTodoRequest): ResponseEntity<TodoDto> {
        val todo = todoService.createTodo(request)
        return ResponseEntity.status(HttpStatus.CREATED).body(todo)
    }

    @PutMapping("/{id}")
    fun updateTodo(@PathVariable id: Long, @RequestBody request: UpdateTodoRequest): ResponseEntity<TodoDto> {
        val todo = todoService.updateTodo(id, request)
        return if (todo != null) {
            ResponseEntity.ok(todo)
        } else {
            ResponseEntity.notFound().build()
        }
    }

    @DeleteMapping("/{id}")
    fun deleteTodo(@PathVariable id: Long): ResponseEntity<Void> {
        return if (todoService.deleteTodo(id)) {
            ResponseEntity.noContent().build()
        } else {
            ResponseEntity.notFound().build()
        }
    }
}