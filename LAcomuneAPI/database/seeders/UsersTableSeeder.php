<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersTableSeeder extends Seeder
{
    public function run(): void
    {
        // Create 1 admin
        User::factory()->admin()->create([
            'email' => 'admin@commune.com',
            'name' => 'Admin User'
        ]);

        // Create 10 employees
        User::factory()
            ->count(10)
            ->employee()
            ->create();

        // Create 10 citizens
        User::factory()
            ->count(10)
            ->citizen()
            ->create();
    }
}