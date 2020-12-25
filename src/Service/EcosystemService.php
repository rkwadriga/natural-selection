<?php declare(strict_types=1);

namespace App\Service;

use App\Entity\User;

class EcosystemService extends AbstractService
{
    public function getList(User $user): array
    {
        return [1, 2, 3];
    }
}