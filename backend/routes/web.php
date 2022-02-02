<?php

use Illuminate\Support\Facades\Route;

Route::get('{any}', fn () =>  view('angular'))->where('any', '^(?!api).*$');

require __DIR__ . '/auth.php';
