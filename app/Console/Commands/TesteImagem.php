<?php

namespace App\Console\Commands;

use App\Http\Controllers\GPTController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class TesteImagem extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'teste:imagem';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'testa a geração de uma imagem';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $url = GPTController::imageGen(
            prompt: "debugging dragon",
            size: "256x256" ,
            type: "teste-imagem",
            originalUrl:true
        );
        $this->info(Artisan::output());
        $this->info($url);
    }
}
