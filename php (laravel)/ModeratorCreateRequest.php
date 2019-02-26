<?php

namespace App\Http\Requests\Moderator;

use Illuminate\Foundation\Http\FormRequest;

class ModeratorCreateRequest extends FormRequest
{
    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'username' => 'required|string|max:255|unique:moderators',
            'password' => 'required|string|max:255',

            'email' => 'email|nullable|max:255',
            'phone' => 'string|nullable|max:255',
            'first_name' => 'string|nullable|max:255',
            'last_name' => 'string|nullable|max:255',

            'role' => 'in:admin,manager',
        ];
    }
}
