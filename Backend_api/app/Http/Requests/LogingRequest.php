<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class LogingRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        // Autoriser tous les utilisateurs à effectuer cette requête
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'email' => 'required|email', // L'email est requis et doit être valide
            'password' => 'required|string|min:6', // Le mot de passe est requis, doit être une chaîne et avoir au moins 6 caractères
        ];
    }

    /**
     * Get custom messages for validation errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'email.required' => 'L\'adresse e-mail est obligatoire.',
            'email.email' => 'Veuillez fournir une adresse e-mail valide.',
            'password.required' => 'Le mot de passe est obligatoire.',
            'password.min' => 'Le mot de passe doit contenir au moins 6 caractères.',
        ];
    }
}