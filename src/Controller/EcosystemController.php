<?php declare(strict_types=1);

namespace App\Controller;

use App\Exception\HttpException;
use App\Form\EcosystemForm;
use App\Service\EcosystemService;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\HttpFoundation\Request;

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

    /**
     * @param EcosystemForm $form
     * @param Request $request
     * @return JsonResponse
     *
     * @Route("ecosystem", name="app_ecosystem_create", methods={"PUT"})
     */
    public function create(EcosystemForm $form, Request $request): JsonResponse
    {
        try {
            $ecosystem = $form->create($this->getUser(), $request);
            return $this->json($ecosystem);
        } catch (\Exception $e) {
            throw new HttpException($e);
        }
    }
}