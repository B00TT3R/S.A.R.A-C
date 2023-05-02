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
            'message'=> 'GPTController::textGen("Crie uma noticia sobre uma futura chuva de meteoros de nivel apocalíptico", 512, 0.6, "teste-geração"),'
            //'url'=> GPTController::imageGen("chuva de meteoros", "512x512", "teste-facebook", true),
        ]);
        $this->info(Artisan::output());
    }
}
