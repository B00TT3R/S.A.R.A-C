<?php

namespace App\Console\Commands;

use App\Http\Controllers\FacebookController;
use App\Http\Controllers\GPTController;
use Illuminate\Console\Command;
use GuzzleHttp\Client;
use Illuminate\Support\Facades\Artisan;

class TesteFacebook extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'teste:facebook';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Testa a requisição do facebook';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->info("Postando em: " . FacebookController::getPageName());
        FacebookController::post([
            'message'=> GPTController::textGen("Crie um texto extremamente absurdo e alarmante sobre uma futura invasão de cangurus ao brasil, mencionando um possível ataque surpresa da australia", 512, 0.6, "teste-geração"),
            'url'=> GPTController::imageGen("banner de canguru, estilo soviético", "512x512", "teste-facebook"),
        ]);
        $this->info(Artisan::output());
    }
}
