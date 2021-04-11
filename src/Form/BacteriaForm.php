<?php declare(strict_types=1);
/**
 * Created 2021-04-11
 * Author Dmitry Kushneriov
 */

namespace App\Form;

use App\Entity\Ecosystem;
use App\Entity\Bacteria;
use App\Exception\ValidationFailedException;

class BacteriaForm extends AbstractForm
{
    public function create(Ecosystem $ecosystem, array $attributes): Bacteria
    {
        $bacteria = new Bacteria();
        $bacteria->setEcosystem($ecosystem);
        $this->setAttributes($bacteria, $attributes);

        return $bacteria;
    }

    private function setAttributes(Bacteria $bacteria, array $attributes): self
    {
        if (!empty($attributes['type'])) {
            $bacteria->setType($attributes['type']);
        }
        if (!empty($attributes['count'])) {
            $bacteria->setCount((int)$attributes['count']);
        }

        $errors = $this->validator->validate($bacteria);
        if ($errors->count() > 0) {
            throw new ValidationFailedException((string)$errors, $errors);
        }

        return $this;
    }
}