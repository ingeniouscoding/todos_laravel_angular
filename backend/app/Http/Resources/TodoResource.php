<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class TodoResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id'          => (string) $this->id,
            'body'        => $this->body,
            'category'    => $this->category,
            'isCompleted' => $this->is_completed,
            'createdAt'   => $this->created_at,
            'updatedAt'   => $this->updated_at,
            'deletedAt'   => $this->deleted_at,
        ];
    }
}
