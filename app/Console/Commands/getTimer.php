<?php

namespace App\Console\Commands;

use App\Models\Timer;
use Illuminate\Console\Command;

class getTimer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'get:timer';

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
        $this->info(Timer::getNextTime());
    }
}
