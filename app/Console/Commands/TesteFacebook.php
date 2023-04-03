<?php

namespace App\Console\Commands;

use App\Http\Controllers\FacebookController;
use App\Http\Controllers\GPTController;
use App\Models\Tokens;
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
        $accounts = Tokens::where("type", "facebook")->get();
        $this->info("Preparando para postar em ".$accounts->count()." Registros" );
        
        foreach ($accounts as $account) {
            FacebookController::handle(
                [
                    'account' => $account,
                    'message' => GPTController::textGen("Crie um texto implicando que um teste de geração de texto foi bem-sucedido:", 128, 0.7, "teste-geração"),
                    'imgUrl' => "https://i.seadn.io/gae/2hDpuTi-0AMKvoZJGd-yKWvK4tKdQr_kLIpB_qSeMau2TNGCNidAosMEvrEXFO9G6tmlFlPQplpwiqirgrIPWnCKMvElaYgI-HiVvXc?auto=format&w=1000",
                ]
            );
            $this->info(Artisan::output());
        }
    }
}
