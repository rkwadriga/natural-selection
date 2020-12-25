<?php declare(strict_types=1);

namespace App\Controller;

use App\Exception\HttpException;
use App\Service\EcosystemService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class EcosystemController extends AbstractController
{
    /**
     * @param EcosystemService $ecosystemService
     * @return JsonResponse
     *
     * @Route("/ecosystems", name="app_cosystem_list", methods={"get"})
     */
    public function list(EcosystemService $ecosystemService): JsonResponse
    {
        try {
            return $this->json($ecosystemService->getList($this->getUser()));
        } catch (\Exception $e) {
            throw new HttpException($e);
        }
    }
}