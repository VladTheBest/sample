<?php

namespace App\Repositories\Moderator;

use App\Models\Moderator;

class ModeratorEloquent implements ModeratorRepository
{
    private $moderator;

    /**
     * ModeratorEloquent constructor.
     * @param Moderator $moderator
     */
    public function __construct(Moderator $moderator)
    {
        $this->moderator = $moderator;
    }

    /**
     * @param array $params
     * @return array of moderators
     */
    public function all(array $params)
    {
        $page = $params['page'] ?? 1;
        $limit = $params['limit'] ?? 10;
        $withTrashed = $params['trashed'] ?? true;
        $search = $params['search'] ?? false;

        $items = $this->moderator
            ->limit($limit)
            ->orderBy('id', 'desc')
            ->offset(($page - 1) * $limit);

        if ($withTrashed) {
            $items = $items->withTrashed();
        }

        if ($search) {
            $items = $items
                ->where(function ($query) use ($search) {
                    $query
                        ->where('username', 'ilike', "%$search%")
                        ->orWhereRaw("concat(first_name, ' ', last_name) ILIKE '%$search%'");
                });
        }

        return [
            'total' => $this->count($params),
            'data' => $items->get()
        ];
    }

    /**
     * @param array $params
     * @return int
     */
    public function count(array $params)
    {
        $withTrashed = $params['trashed'] ?? true;
        $search = $params['search'] ?? false;

        $items = $this->moderator;

        if ($withTrashed) {
            $items = $items->withTrashed();
        }

        if ($search) {
            $items = $items
                ->where(function ($query) use ($search) {
                    $query
                        ->where('username', 'ilike', "%$search%")
                        ->orWhereRaw("concat(first_name, ' ', last_name) ILIKE '%$search%'");
                });
        }

        return $items->count();
    }

    /**
     * @param int $id
     * @return Moderator object
     * @throws \Exception
     */
    public function get(int $id)
    {
        $item = $this->moderator
            ->with(['creator'])
            ->find($id);
        if (empty($item)) {
            throw new \Exception('Moderator not found');
        }

        return $item;
    }

    /**
     * @param array $data
     * @return Moderator object
     * @throws \Exception
     */
    public function create(array $data)
    {
        $item = $this->moderator->create($data);
        return $this->get($item['id']);
    }

    /**
     * @param int $id
     * @param array $data
     * @return Moderator object
     * @throws \Exception
     */
    public function update(int $id, array $data)
    {
        $item = $this->moderator->find($id);
        if (empty($item)) {
            throw new \Exception('Moderator not found');
        }

        $item->update($data);
        return $this->get($id);
    }

    /**
     * @param int $id
     * @return boolean is trashed
     * @throws \Exception
     */
    public function delete(int $id)
    {
        $item = $this->moderator->find($id);
        if (empty($item)) {
            throw new \Exception('Moderator not found');
        }

        if ($item->username === 'admin') {
            throw new \Exception('Can`t delete main admin');
        }

        return $item->delete();
    }

    /**
     * @param int $id
     * @return boolean is restored
     * @throws \Exception
     */
    public function restore(int $id)
    {
        $item = $this->moderator->withTrashed()->find($id);
        if (empty($item)) {
            throw new \Exception('Moderator not found');
        }

        return $item->restore();
    }

    /**
     * @param int $id
     * @return boolean is deleted
     * @throws \Exception
     */
    public function trash(int $id)
    {
        $item = $this->moderator->withTrashed()->find($id);
        if (empty($item)) {
            throw new \Exception('Moderator not found');
        }

        if ($item->username === 'admin') {
            throw new \Exception('Can`t delete main admin');
        }

        return $item->forceDelete();
    }

    /**
     *
     * @return array of moderators roles
     * @throws \Exception
     */
    public function amountModerators()
    {
        $managers = $this->moderator->where('role', 'manager')->count();
        $admins = $this->moderator->where('role', 'admin')->count();


        if (empty($admins)) {
            throw new \Exception('Admins not found');
        }

        return [
          'managers' => $managers,
          'admins' => $admins,
        ];
    }
}
