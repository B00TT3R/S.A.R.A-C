<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use GuzzleHttp\Client;


class Teste extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'teste:teste';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        //guzzle get request to google
        $token = "EAACKJqP5FqMBALgZBU4lo7947Oy2pPc2sBoVtZC2mWmsXCL6JEnkZCSI9KV4Q8hzdmRLytQLZCE0LpeJWAO36hMbMyZAuZCg41RU5RpZBRaAZAgBzoJJQZAcM93ocNQz1sKo4y9iUAxtOXlqn5KaNngKXYT4T8Y9AeKX0B7fVznoSO8f7PGxSRlnkxKjAhpeRXpzrZAk7ZCs1EO3YAS4cVGsyGY";
        $id = "113032176914321";
        $client = new Client();
        /* curl -i -X POST "https://graph.facebook.com/{page-id}/feed
  ?message=Hello Fans!
  &access_token={page-access-token}" */
        $response = $client->request('POST', "https://graph.facebook.com/$id/feed", [
            'query' => [
                'message' => 'Hello Fans!',
                'access_token' => $token,
            ],
        ]);
        //comentario
        $body = $response->getBody();
        $body = $body->getContents();
        $this->info($body);
    }
}
