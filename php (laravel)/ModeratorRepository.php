<?php


namespace App\Repositories\Moderator;

interface ModeratorRepository
{
    /**
     * Get list of moderators
     * @param array $params - for filter/reorder list
     * @return mixed
     */
    public function all(array $params);

    /**
     * Get count of moderators
     * @param array $params
     * @return mixed
     */
    public function count(array $params);

    /**
     * Get one moderator
     * @param int $id
     * @return mixed
     */
    public function get(int $id);

    /**
     * Create one moderator
     * @param array $data
     * @return mixed
     */
    public function create(array $data);

    /**
     * Update one moderator
     * @param int $id
     * @param array $data
     * @return mixed
     */
    public function update(int $id, array $data);

    /**
     * Soft delete one moderator
     * @param int $id
     * @return mixed
     */
    public function delete(int $id);

    /**
     * Restore one moderator
     * @param int $id
     * @return mixed
     */
    public function restore(int $id);

    /**
     * Delete forever on moderator
     * @param int $id
     * @return mixed
     */
    public function trash(int $id);

    /**
     * Get amount moderators
     * @return mixed
     */
    public function amountModerators();
}
