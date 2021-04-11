<?php declare(strict_types=1);

namespace App\Entity;

use App\Exception\AuthException;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use App\Helpers\TimestampableEntity;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use App\Repository\UserRepository;

/**
 * @ORM\Entity(repositoryClass=UserRepository::class)
 * @ORM\Table(name="`user`", indexes={
        @ORM\Index(name="user_email_index", columns={"email"})
 * })
 * @UniqueEntity("email")
 * @ORM\HasLifecycleCallbacks()
 */
class User implements UserInterface
{
    use TimestampableEntity;

    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private int $id;

    /**
     * @var Token[]
     * @ORM\OneToMany(targetEntity=Token::class, mappedBy="user", orphanRemoval=true)
     */
    private $tokens;

    private ?Token $token = null;

    /**
     * @ORM\OneToMany(targetEntity=Ecosystem::class, mappedBy="user", orphanRemoval=true)
     */
    private Collection $ecosystems;

    /**
     * @ORM\Column(type="string", length=180, unique=true)
     * @Assert\NotBlank
     * @Assert\Email()
     */
    private string $email;

    /**
     * @ORM\Column(type="string", length=255)
     */
    private ?string $name;

    /**
     * @ORM\Column(type="json")
     */
    private array $roles = [];

    /**
     * @ORM\Column(type="string", length=64)
     * @Assert\NotBlank
     */
    private string $salt;

    /**
     * @var string The hashed password
     * @ORM\Column(type="string", length=255)
     * @Assert\NotBlank
     */
    private string $password;

    public function __construct()
    {
        $this->tokens = new ArrayCollection();
        $this->ecosystems = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Token[]
     */
    public function getTokens()
    {
        return $this->tokens;
    }

    public function addToken(Token $token): self
    {
        if (!$this->tokens->contains($token)) {
            $this->tokens->add($token);
            $token->setUser($this);
        }
        return $this;
    }

    public function removeToken(Token $token): self
    {
        if ($this->tokens->removeElement($token)) {
            // set the owning side to null (unless already changed)
            if ($token->getUser() === $this) {
                $token->setUser(null);
            }
        }
        if ($this->token === $token) {
            $this->token = null;
        }
        return $this;
    }

    public function getToken(): Token
    {
        if ($this->token === null) {
            throw new AuthException('User is not logged in', Response::HTTP_FORBIDDEN);
        }
        return $this->token;
    }

    public function setToken(Token $token): self
    {
        $this->token = $token;
        return $this;
    }

    /**
     * @return Collection|Ecosystem[]
     */
    public function getEcosystems(): Collection
    {
        return $this->ecosystems;
    }

    public function addEcosystem(Ecosystem $ecosystem): self
    {
        if (!$this->ecosystems->contains($ecosystem)) {
            $this->ecosystems[] = $ecosystem;
            $ecosystem->setUser($this);
        }

        return $this;
    }

    public function removeEcosystem(Ecosystem $ecosystem): self
    {
        if ($this->ecosystems->removeElement($ecosystem)) {
            // set the owning side to null (unless already changed)
            if ($ecosystem->getUser() === $this) {
                $ecosystem->setUser(null);
            }
        }

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;
        return $this;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): self
    {
        $this->name = $name;
        return $this;
    }

    public function getUsername(): string
    {
        return (string)$this->email;
    }

    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';
        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;
        return $this;
    }

    public function setPassword(string $password): self
    {
        $this->password = $password;
        return $this;
    }

    public function getSalt(): string
    {
        return (string)$this->salt;
    }

    public function setSalt(string $salt): self
    {
        $this->salt = $salt;
        return $this;
    }

    public function getPassword(): string
    {
        return (string)$this->password;
    }

    /**
     * Removes the last user's token
     */
    public function eraseCredentials()
    {
        /*if ($this->token !== null) {
            $this->removeToken($this->token);
        }*/
    }
}
