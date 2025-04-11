<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        Role::updateOrCreate(
            ['name' => 'Admin'],
            [
                'permissions' => json_encode([
                    'users' => ['view' => true, 'create' => true, 'update' => true, 'delete' => true],
                    'roles' => ['view' => true, 'create' => true, 'update' => true, 'delete' => true],
                    'document_types' => ['view' => true, 'create' => true, 'update' => true, 'delete' => true],
                    'statistics' => ['view' => true],
                ]),
                'description' => 'Administrator with full system access'
            ]
        );

        Role::updateOrCreate(
            ['name' => 'Employee'],
            [
                'permissions' => json_encode([
                    'document_requests' => ['view' => true, 'update' => true, 'approve' => true, 'reject' => true],
                    'documents' => ['view' => true, 'create' => true],
                    'messages' => ['view' => true, 'create' => true],
                    'events' => ['view' => true, 'create' => true, 'update' => true, 'delete' => true],
                ]),
                'description' => 'Municipal employee who handles document requests'
            ]
        );

        Role::updateOrCreate(
            ['name' => 'Citizen'],
            [
                'permissions' => json_encode([
                    'document_requests' => ['view' => true, 'create' => true],
                    'documents' => ['view' => true, 'download' => true],
                    'messages' => ['view' => true, 'create' => true],
                    'events' => ['view' => true],
                ]),
                'description' => 'Regular citizen who can request documents'
            ]
        );

        $this->command->info('Roles seeded successfully.');
    }
}
