<?php

namespace Database\Seeders;

use App\Models\Evenment;
use Illuminate\Database\Seeder;

class EvenmentSeeder extends Seeder
{
    public function run(): void
    {
        // Create 5 published events
        Evenment::factory()
            ->count(5)
            ->published()
            ->create();

        // Create 3 unpublished events
        Evenment::factory()
            ->count(3)
            ->unpublished()
            ->create();
    }
}
