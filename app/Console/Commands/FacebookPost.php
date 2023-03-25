<?php

namespace App\Console\Commands;

use App\Models\Errors;
use Error;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class FacebookPost extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'post:facebook {--id=} {--token=} {--message=} {--imgUrl=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cria um post no facebook';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $client = new Client();
        $id = $this->option("id");
        $token = $this->option("token");
        $imgUrl = $this->option("imgUrl");
        $message = $this->option("message");
        $error = new Errors();
        $error->tipo = "Criação de post por facebook";
        $error->mensagem = "id=$id, token=$token, message=$message";
        $error->save();

        if($id  === null || $token === null){
            $this->error('é necessário um token e um id');
            $error = new Errors();
            $error->tipo = "Criação de post por facebook";
            $error->mensagem = "Token ou Id não informado";
            $error->save();
            return;
        }
        try{
            $response = $client->request('POST', "https://graph.facebook.com/$id/photos", [
                'query' => [
                    'message' => $message,
                    'url' => $imgUrl,
                    'access_token' => $token
                ],
            ]);
            $body = $response->getBody();
            $body = $body->getContents();
            $this->info($body);
        } catch(Error $e){
            $this->error('Não foi possível criar o post');
            $error = new Errors();
            $error->mensagem = $e->getMessage();
            $error->tipo = "Criação de post por facebook";
            $error->save();
        }
        
    }
}
