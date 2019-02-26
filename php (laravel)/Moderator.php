<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;


class Moderator extends Authenticatable
{
    use Notifiable, HasApiTokens, SoftDeletes;

    /**
     * The guard that should be used in auth
     *
     * @var string
     */
    protected $guard = 'moderators';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'username',
        'password',
        'email',
        'phone',
        'role',
        'first_name',
        'last_name',
        'creator_id',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password'
    ];


    /**
     * Get moderator who created current moderator.
     */
    public function creator()
    {
        return $this->belongsTo('App\Models\Moderator', 'creator_id');
    }

    /**
     * Get those moderators who created by current moderator.
     */
    public function createdBy()
    {
        return $this->hasMany('App\Models\Moderator', 'creator_id');
    }

}
