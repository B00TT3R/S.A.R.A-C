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
        $client = new Client();
        $response = $client->request('GET', 'https://www.google.com');
        //comentario
        $body = $response->getBody();
        $body = $body->getContents();
        $this->info($body);
    }
}
