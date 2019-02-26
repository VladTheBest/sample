<?php

namespace App\Http\Controllers;

use App\Http\Requests\Moderator\ModeratorCreateRequest;
use App\Http\Requests\Moderator\ModeratorIndexRequest;
use App\Http\Requests\Moderator\ModeratorUpdateRequest;
use App\Repositories\Moderator\ModeratorRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class ModeratorController extends Controller
{
    private $moderatorRepo;

    /**
     * ModeratorController constructor.
     * @param ModeratorRepository $moderatorRepo
     */
    public function __construct(ModeratorRepository $moderatorRepo)
    {
        $this->moderatorRepo = $moderatorRepo;
    }

    /**
     * Get list of moderators
     * @param ModeratorIndexRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(ModeratorIndexRequest $request)
    {
        try {
            $params = $request->only(['page', 'limit', 'trashed', 'search']);
            $result = $this->moderatorRepo->all($params);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Get one moderator
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function show(int $id)
    {
        try {
            $result = $this->moderatorRepo->get($id);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }


    /**
     * Create one moderator
     * @param ModeratorCreateRequest $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(ModeratorCreateRequest $request)
    {
        try {
            $data = $request->only(['username', 'password', 'first_name', 'last_name', 'phone', 'email', 'role']);
            $data['creator_id'] =  Auth::id();

            $data['password'] = Hash::make($data['password']);

            $result = $this->moderatorRepo->create($data);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }


    /**
     * Update one moderator
     * @param ModeratorUpdateRequest $request
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function update(ModeratorUpdateRequest $request, int $id)
    {
        try {
            $data = $request->only(['password', 'first_name', 'last_name', 'phone', 'email', 'role']);

            if(!empty($data['password'])){
                $data['password'] = Hash::make($data['password']);
            }

            $result = $this->moderatorRepo->update($id, $data);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Soft delete one moderator
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function destroy(int $id)
    {
        try {
            $result = $this->moderatorRepo->delete($id);

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Restore one moderator
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function restore(int $id)
    {
        try {
            $res = $this->moderatorRepo->restore($id);

            return response()->json($res);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Delete forever one moderator
     * @param int $id
     * @return \Illuminate\Http\JsonResponse
     */
    public function trash(int $id)
    {
        try {
            $res = $this->moderatorRepo->trash($id);

            return response()->json($res);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }

    /**
     * Get the amount of all moderators
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function amountModerators()
    {
        try {
            $res = $this->moderatorRepo->amountModerators();

            return response()->json($res);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
