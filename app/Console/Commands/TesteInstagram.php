<?php

namespace App\Console\Commands;

use App\Http\Controllers\GPTController;
use App\Http\Controllers\SocialMedias\InstagramController;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Artisan;

class TesteInstagram extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'teste:instagram';

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
        $this->info("Testando post do instagram, página: ". InstagramController::getPageName());
        $post = InstagramController::post(
            topic:null,
            caption: GPTController::textGen(
                prompt:"crie um texto breve e curto dizendo que um teste de posts deu certo ",
                max_tokens:256,
                temperature:0.6,
                type:"teste-geração",
            ),
            image_url: "https://placehold.co/600x400"
        );
        $this->info(Artisan::output());
        $this->info(InstagramController::getPostUrl($post));
    }
}
