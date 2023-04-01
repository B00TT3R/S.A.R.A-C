<?php

namespace App\Console\Commands;

use App\Http\Controllers\GPTController;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class TesteGPT extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'teste:gpt';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Testa se a geração por IA está funcionando';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->info(
            GPTController::textGen(
                "Crie um texto de teste, implicando que foi executado com sucesso: ",
                64,
                0.5,
                "teste"
            )
        );
    }
}
