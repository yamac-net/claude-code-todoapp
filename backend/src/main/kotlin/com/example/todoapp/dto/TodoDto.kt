package com.example.todoapp.dto

import java.time.LocalDateTime

data class TodoDto(
    val id: Long,
    val title: String,
    val description: String?,
    val completed: Boolean,
    val createdAt: LocalDateTime,
    val updatedAt: LocalDateTime
)

data class CreateTodoRequest(
    val title: String,
    val description: String? = null
)

data class UpdateTodoRequest(
    val title: String?,
    val description: String?,
    val completed: Boolean?
)