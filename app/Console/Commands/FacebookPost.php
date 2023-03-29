<?php

namespace App\Console\Commands;

use App\Http\Controllers\FacebookController;
use App\Models\Errors;
use Error;
use GuzzleHttp\Client;
use Illuminate\Console\Command;

class FacebookPost extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'post:facebook {--id=} {--token=} {--message=} {--imgUrl=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Cria um post no facebook';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $id = $this->option("id");
        $token = $this->option("token");
        $imgUrl = $this->option("imgUrl");
        $message = $this->option("message");
        FacebookController::handle(
            [
                'id' => $id,
                'token' => $token,
                'message' => $message,
                'imgUrl' => $imgUrl,
            ]
        );
        
    }
}
