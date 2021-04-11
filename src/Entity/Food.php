<?php

namespace App\Entity;

use App\Repository\FoodRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=FoodRepository::class)
 */
class Food
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\ManyToOne(targetEntity=Ecosystem::class, inversedBy="foods")
     * @ORM\JoinColumn(nullable=false)
     */
    private Ecosystem $ecosystem;

    /**
     * @ORM\Column(type="enumFoodType")
     */
    private string $type;

    /**
     * @ORM\Column(type="float")
     */
    private float $density;

    /**
     * @ORM\Column(type="integer")
     */
    private int $reproductionSpeed;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEcosystem(): ?Ecosystem
    {
        return $this->ecosystem;
    }

    public function setEcosystem(Ecosystem $ecosystem): self
    {
        $this->ecosystem = $ecosystem;

        return $this;
    }

    public function getType(): ?string
    {
        return $this->type;
    }

    public function setType(string $type): self
    {
        $this->type = $type;

        return $this;
    }

    public function getDensity(): ?float
    {
        return $this->density;
    }

    public function setDensity(float $density): self
    {
        $this->density = $density;

        return $this;
    }

    public function getReproductionSpeed(): ?int
    {
        return $this->reproductionSpeed;
    }

    public function setReproductionSpeed(int $reproductionSpeed): self
    {
        $this->reproductionSpeed = $reproductionSpeed;

        return $this;
    }
}
