<?php declare(strict_types=1);
/**
 * Created 2021-04-11
 * Author Dmitry Kushneriov
 */

namespace App\Form;

use App\Entity\Ecosystem;
use App\Entity\Food;
use App\Exception\ValidationFailedException;

class FoodForm extends AbstractForm
{
    public function create(Ecosystem $ecosystem, array $attributes): Food
    {
        $food = new Food();
        $food->setEcosystem($ecosystem);
        $this->setAttributes($food, $attributes);

        return $food;
    }

    private function setAttributes(Food $food, array $attributes): self
    {
        if (isset($attributes['type'])) {
            $food->setType($attributes['type']);
        }
        if (!empty($attributes['density'])) {
            $food->setDensity((float)$attributes['density']);
        }
        if (!empty($attributes['reproductionSpeed'])) {
            $food->setReproductionSpeed((int)$attributes['reproductionSpeed']);
        }
        $errors = $this->validator->validate($food);
        if ($errors->count() > 0) {
            throw new ValidationFailedException((string)$errors, $errors);
        }

        return $this;
    }
}