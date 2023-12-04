<?php

namespace Tests\Feature;

use App\Models\Posts;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;
use Tests\TestCase;

class PostsControllerTest extends TestCase
{
    use RefreshDatabase, WithFaker;

    public function testCreatePost()
    {
        Storage::fake('images');

        $postData = [
            'author' => $this->faker->name,
            'category' => 'Post',
            'description' => $this->faker->paragraph,
            'image' => UploadedFile::fake()->image('test_image.jpg'),
        ];

        $response = $this->json('POST', '/api/posts', $postData);

        $response->assertStatus(201);
        $this->assertDatabaseHas('posts', ['author' => $postData['author']]);
        Storage::disk('images')->assertExists($postData['image']->hashName());
    }

    public function testUpdatePost()
    {
        $post = factory(Posts::class)->create();

        $updatedData = [
            'author' => $this->faker->name,
            'category' => 'Artigo',
            'description' => $this->faker->paragraph,
        ];

        $response = $this->json('PUT', "/api/posts/{$post->id}", $updatedData);

        $response->assertStatus(200);
        $this->assertDatabaseHas('posts', ['id' => $post->id, 'category' => $updatedData['category']]);
    }

    public function testDeletePost()
    {
        $post = factory(Posts::class)->create();

        $response = $this->json('DELETE', "/api/posts/{$post->id}");

        $response->assertStatus(200);
        $this->assertDeleted('posts', ['id' => $post->id]);
    }
}