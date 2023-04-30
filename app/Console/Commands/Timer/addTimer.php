<?php

namespace App\Console\Commands\Timer;

use App\Models\Timer;
use Illuminate\Console\Command;

class addTimer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'timer:add {time}';

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
        $time = $this->argument("time");
        $this->info(Timer::addMinutes($time));
        
    }
}
