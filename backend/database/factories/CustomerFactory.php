<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Customer>
 */
class CustomerFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'username' => $this->faker->userName(),
            'email' => $this->faker->unique()->safeEmail(),
            'address' => [
                'street' => $this->faker->streetName(),
                'suite' => $this->faker->secondaryAddress(),
                'city' => $this->faker->city(),
                'zipcode' => $this->faker->postcode(),
            ],
            'phone' => $this->faker->phoneNumber(),
            'website' => $this->faker->domainName(),
            'company' => [
                'name' => $this->faker->company(),
                'catchPhrase' => $this->faker->catchPhrase(),
                'bs' => $this->faker->bs(),
            ],
        ];
    }
}
