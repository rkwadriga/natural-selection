<?php

namespace App\Entity;

use App\Repository\BacteriaRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=BacteriaRepository::class)
 */
class Bacteria
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\ManyToOne(targetEntity=Ecosystem::class, inversedBy="bacterias")
     * @ORM\JoinColumn(nullable=false)
     */
    private Ecosystem $ecosystem;

    /**
     * @ORM\Column(type="enumBacteriaType")
     */
    private string $type;

    /**
     * @ORM\Column(type="integer")
     */
    private int $count;

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

    public function getCount(): ?int
    {
        return $this->count;
    }

    public function setCount(int $count): self
    {
        $this->count = $count;

        return $this;
    }
}
