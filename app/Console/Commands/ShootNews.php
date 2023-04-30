<?php

namespace App\Console\Commands;

use App\Http\Controllers\ScheduleController;
use Illuminate\Console\Command;

class ShootNews extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'news:shoot';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        ScheduleController::shoot();
        $this->info("função executada");
    }
}
