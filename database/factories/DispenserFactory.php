<?php

namespace Database\Factories;

use App\Models\Dispenser;
use App\Models\company;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Model>
 */
class DispenserFactory extends Factory
{

    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Dispenser::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition()
    {
        $capacity = fake()->numberBetween(10, 100);

        return [
            'token' => Str::uuid(),
            'capacity' => $capacity,
            'current_capacity' => $capacity,
            'lat' => fake()->randomFloat(11, 0, 50),
            'lng' => fake()->randomFloat(11, 0, 50),
            'company_id' => Company::factory(),
        ];
    }
}
