<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AppointmentRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
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
            "scheduled_time" => "required",
            "vet_id" => "required|integer",
            "animal_id" => "required|integer",
            "package_id" => "nullable|integer",
            "appointment_status_id" => "required|integer",
            "price" => "required|numeric",
            "services" => "required_if:package_id,null|array",
            "services.*" => "integer",
        ];
    }
}
