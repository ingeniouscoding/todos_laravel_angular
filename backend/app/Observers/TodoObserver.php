<?php

namespace App\Observers;

use App\Models\Todo;
use Illuminate\Support\Facades\Auth;

class TodoObserver
{
    public function creating(Todo $todo)
    {
        $todo->user_id = Auth::id();
    }
}
