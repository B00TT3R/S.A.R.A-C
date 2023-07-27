<?php

namespace App\Console\Commands;

use App\Http\Controllers\FacebookController;
use App\Http\Controllers\GPTController;
use Illuminate\Console\Command;
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
        FacebookController::post(null,[
            'message'=> GPTController::textGen(
                prompt:"crie um texto breve e curto dizendo que um teste de posts deu certo ",
                max_tokens:256,
                temperature:0.6,
                type:"teste-geração",
            ),
        ]);
        $this->info(Artisan::output());
    }
}
