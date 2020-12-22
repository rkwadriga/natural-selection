<?php declare(strict_types=1);

namespace App\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class SecurityController extends AbstractController
{
    /**
     * @param Request $request
     * @return JsonResponse
     *
     * @Route("/auth/token", name="app_security_createtoken")
     */
    public function createToken(Request $request): JsonResponse
    {
        return $this->json([
            'access_token' => '11111',
            'refresh_token' => '22222'
        ]);
    }
}