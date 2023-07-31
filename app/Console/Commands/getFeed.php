<?php

namespace App\Console\Commands;

use App\Http\Controllers\SocialMedias\FacebookController;
use Illuminate\Console\Command;

class getFeed extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'teste:feed';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Obtém o feed do facebook';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->info(FacebookController::getFeed());
    }
}
