<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Restaurant extends Model
{
    protected $fillable = ['role_id', 'variety', 'price', 'seller'];

    public function users()
    {
    	return $this->belongsTo('App\User', 'role_id');
    }
}
