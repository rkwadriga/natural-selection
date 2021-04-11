<?php

namespace App\Entity;

use App\Repository\EcosystemRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=EcosystemRepository::class)
 */
class Ecosystem
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="ecosystems")
     * @ORM\JoinColumn(nullable=false)
     */
    private User $user;

    /**
     * @ORM\OneToMany(targetEntity=Food::class, mappedBy="ecosystem", orphanRemoval=true)
     */
    private Collection $foods;

    /**
     * @ORM\OneToMany(targetEntity=Bacteria::class, mappedBy="ecosystem", orphanRemoval=true)
     */
    private Collection $bacterias;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private string $name;

    /**
     * @ORM\Column(type="integer")
     */
    private int $width;

    /**
     * @ORM\Column(type="integer")
     */
    private int $height;

    /**
     * @ORM\Column(type="integer")
     */
    private int $duration;

    /**
     * @ORM\Column(type="float")
     */
    private float $speed;

    public function __construct()
    {
        $this->foods = new ArrayCollection();
        $this->bacterias = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(User $user): self
    {
        $this->user = $user;

        return $this;
    }

    /**
     * @return Collection|Food[]
     */
    public function getFoods(): Collection
    {
        return $this->foods;
    }

    public function addFood(Food $food): self
    {
        if (!$this->foods->contains($food)) {
            $this->foods[] = $food;
            $food->setEcosystem($this);
        }

        return $this;
    }

    public function removeFood(Food $food): self
    {
        if ($this->foods->removeElement($food)) {
            // set the owning side to null (unless already changed)
            if ($food->getEcosystem() === $this) {
                $food->setEcosystem(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection|Bacteria[]
     */
    public function getBacterias(): Collection
    {
        return $this->bacterias;
    }

    public function addBacteria(Bacteria $bacteria): self
    {
        if (!$this->bacterias->contains($bacteria)) {
            $this->bacterias[] = $bacteria;
            $bacteria->setEcosystem($this);
        }

        return $this;
    }

    public function removeBacteria(Bacteria $bacteria): self
    {
        if ($this->bacterias->removeElement($bacteria)) {
            // set the owning side to null (unless already changed)
            if ($bacteria->getEcosystem() === $this) {
                $bacteria->setEcosystem(null);
            }
        }

        return $this;
    }

    public function setName(string $name): self
    {
        $this->name = $name;

        return $this;
    }

    public function getWidth(): ?int
    {
        return $this->width;
    }

    public function setWidth(int $width): self
    {
        $this->width = $width;

        return $this;
    }

    public function getHeight(): ?int
    {
        return $this->height;
    }

    public function setHeight(int $height): self
    {
        $this->height = $height;

        return $this;
    }

    public function getDuration(): ?int
    {
        return $this->duration;
    }

    public function setDuration(int $duration): self
    {
        $this->duration = $duration;

        return $this;
    }

    public function getSpeed(): ?float
    {
        return $this->speed;
    }

    public function setSpeed(float $speed): self
    {
        $this->speed = $speed;

        return $this;
    }
}
