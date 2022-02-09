<?php

namespace App\Http\Controllers\Todos;

use App\Models\Todo;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use App\Http\Requests\StoreTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Http\Resources\TodoCollection;
use App\Http\Resources\TodoResource;
use Illuminate\Http\Response;

class TodoController extends Controller
{
    public function index()
    {
        $columns = ['id', 'body', 'is_completed', 'category'];

        $todos = Todo::select($columns)
            ->where('user_id', Auth::id())
            ->get();

        return TodoResource::collection($todos);
    }

    public function store(StoreTodoRequest $request)
    {
        $todo = Todo::create($request->validated());

        return new TodoResource($todo);
    }

    public function show(Todo $todo)
    {
        return new TodoResource($todo);
    }

    public function update(UpdateTodoRequest $request, Todo $todo)
    {
        $todo->update($request->validated());

        return new TodoResource($todo);
    }

    public function destroy(Todo $todo)
    {
        $todo->delete();

        return response('', Response::HTTP_NO_CONTENT);
    }
}
