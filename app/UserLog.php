<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UserLog extends Model
{
    //
    protected $fillable = ['role_id', 'content', 'week'];

    public function users(){
    	return $this->belongsTo('App\User', 'role_id');
    }
}
