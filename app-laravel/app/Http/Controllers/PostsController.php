<?php

namespace App\Http\Controllers;

use App\Models\Posts;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;

class PostsController extends Controller
{
    public function create(Request $request)
    {
        try {
            $request->validate([
                'author' => 'required|string',
                'category' => 'required|string',
                'description' => 'required|string',
                'image' => 'image|mimes:jpeg,png,jpg',
            ]);

            $author = $request->input('author');
            $category = $request->input('category');
            $description = $request->input('description');

            $post = new Posts;
            $post->author = $author;
            $post->category = $category;
            $post->description = $description;

            if ($request->hasFile('image')) {
                $filenameWithExt = $request->file('image')->getClientOriginalName();
                $filename = pathinfo($filenameWithExt, PATHINFO_FILENAME);
                $extension = $request->file('image')->getClientOriginalExtension();
                $fileNameToStore = $filename . '_' . time() . '.' . $extension;
                $path = $request->file('image')->storeAs('images', $fileNameToStore);
            }

            $post->image = $fileNameToStore ?? null;
            $post->save();

            return response()->json($post, 201);

        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage(), "line_error" => $e->getLine()], 500);
        }
    }

    public function get()
    {
        try {
            $posts = Posts::orderBy('created_at', 'desc')->get()->toArray();

            $postsList = array_map(function ($post) {
                $rsFile = is_string($post['image']) ? $post['image'] : 'notFound.jpg';
                $filePath = storage_path('public/images/' . $rsFile);

                if (File::exists($filePath)) {
                    $fileContent = File::get($filePath);
                    $post['image'] = base64_encode($fileContent);
                }

                return $post;
            }, $posts);

            return response()->json($postsList);

        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage(), "line_error" => $e->getLine()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        try {
            $post = Posts::find($id);

            if (!$post) {
                return response()->json(["error" => "Post não encontrado"], 404);
            }

            $post->update($request->only(['author', 'category', 'description']));

            return response()->json($post);

        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage(), "line_error" => $e->getLine()], 500);
        }
    }

    public function destroy($id)
    {
        try {
            $post = Posts::findOrFail($id);

            $rsFile = is_string($post['image']) ? $post['image'] : 'notFound.jpg';
            $filePath = storage_path('public/images/' . $rsFile);

            if (File::exists($filePath)) {
                File::delete($filePath);
            }

            $post->delete();

        } catch (\Exception $e) {
            return response()->json(["error" => $e->getMessage(), "line_error" => $e->getLine()], 500);
        }
    }
}