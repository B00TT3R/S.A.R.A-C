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
        $pageName = FacebookController::getPageName();
        $this->info("Postando em: ".$pageName);
        FacebookController::post(
            GPTController::textGen("Crie um texto implicando que um teste foi bem-sucedido:", 128, 0.6, "teste-geração"),
            //"https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&w=1000",
        );
        $this->info(Artisan::output());
        
    }
}
