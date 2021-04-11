<?php declare(strict_types=1);
/**
 * Created 2021-04-11
 * Author Dmitry Kushneriov
 */

namespace App\Form;

use App\Entity\Ecosystem;
use App\Entity\User;
use App\Exception\ValidationFailedException;
use Doctrine\Persistence\ManagerRegistry;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Validator\Validator\ValidatorInterface;

class EcosystemForm extends AbstractForm
{
    private FoodForm $foodForm;

    private BacteriaForm $bacteriaForm;

    public function __construct(FoodForm $foodForm, BacteriaForm $bacteriaForm, ValidatorInterface $validator, ManagerRegistry $doctrine)
    {
        parent::__construct($validator, $doctrine);
        $this->foodForm = $foodForm;
        $this->bacteriaForm = $bacteriaForm;
    }


    public function create(User $user, Request $request): Ecosystem
    {
        $entityManager = $this->doctrine->getManager();

        $ecosystem = new Ecosystem();

        $user->addEcosystem($ecosystem);

        $this
            ->setFoods($ecosystem, $request)
            ->setBacterias($ecosystem, $request)
            ->setAttributes($ecosystem, $request);

        $entityManager->persist($user);
        $entityManager->persist($ecosystem);
        $entityManager->flush();

        return $ecosystem;
    }

    private function setFoods(Ecosystem $ecosystem, Request $request): self
    {
        if (!is_array($request->get('foods'))) {
            return $this;
        }

        $entityManager = $this->doctrine->getManager();
        foreach ($request->get('foods') as $attributes) {
            if (!is_array($attributes)) {
                continue;
            }
            $food = $this->foodForm->create($ecosystem, $attributes);
            $ecosystem->addFood($food);
            $entityManager->persist($food);
        }

        return $this;
    }

    private function setBacterias(Ecosystem $ecosystem, Request $request): self
    {
        if (!is_array($request->get('bacterias'))) {
            return $this;
        }

        $entityManager = $this->doctrine->getManager();
        foreach ($request->get('bacterias') as $attributes) {
            if (!is_array($attributes)) {
                continue;
            }
            $bacteria = $this->bacteriaForm->create($ecosystem, $attributes);
            $ecosystem->addBacteria($bacteria);
            $entityManager->persist($bacteria);
        }

        return $this;
    }

    private function setAttributes(Ecosystem $ecosystem, Request $request): self
    {
        if ($request->get('name') !== null) {
            $ecosystem->setName($request->get('name'));
        }
        if ($request->get('width') !== null) {
            $ecosystem->setWidth((int)$request->get('width'));
        }
        if ($request->get('height') !== null) {
            $ecosystem->setHeight((int)$request->get('height'));
        }
        if ($request->get('duration') !== null) {
            $ecosystem->setDuration((int)$request->get('duration'));
        }
        if ($request->get('speed') !== null) {
            $ecosystem->setDuration($request->get('speed'));
        }
        $errors = $this->validator->validate($ecosystem);
        if ($errors->count() > 0) {
            throw new ValidationFailedException((string)$errors, $errors);
        }

        return $this;
    }
}