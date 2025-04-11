<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Role>
 */
class RoleFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->unique()->jobTitle(),
            'permissions' => json_encode(['read' => true]),
            'description' => $this->faker->sentence(),
        ];
    }

    public function admin()
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Admin',
                'permissions' => json_encode([
                    'users' => [
                        'view' => true,
                        'create' => true,
                        'update' => true,
                        'delete' => true,
                    ],
                    'roles' => [
                        'view' => true,
                        'create' => true,
                        'update' => true,
                        'delete' => true,
                    ],
                    'document_types' => [
                        'view' => true,
                        'create' => true,
                        'update' => true,
                        'delete' => true,
                    ],
                    'statistics' => [
                        'view' => true,
                    ],
                ]),
                'description' => 'Administrator with full system access',
            ];
        });
    }

    /**
     * Indicate that the role is for an employee.
     *
     * @return $this
     */
    public function employee()
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Employee',
                'permissions' => json_encode([
                    'document_requests' => [
                        'view' => true,
                        'update' => true,
                        'approve' => true,
                    ],
                    'documents' => [
                        'view' => true,
                        'create' => true,
                    ],
                    'messages' => [
                        'view' => true,
                        'create' => true,
                    ],
                    'events' => [
                        'view' => true,
                        'create' => true,
                        'update' => true,
                    ],
                ]),
                'description' => 'Municipal employee with document processing capabilities',
            ];
        });
    }

    /**
     * Indicate that the role is for a citizen.
     *
     * @return $this
     */
    public function citizen()
    {
        return $this->state(function (array $attributes) {
            return [
                'name' => 'Citizen',
                'permissions' => json_encode([
                    'document_requests' => [
                        'view' => true,
                        'create' => true,
                    ],
                    'documents' => [
                        'view' => true,
                    ],
                    'messages' => [
                        'view' => true,
                        'create' => true,
                    ],
                    'events' => [
                        'view' => true,
                    ],
                ]),
                'description' => 'Citizen with limited access to request documents and view events',
            ];
        });
    }

}
