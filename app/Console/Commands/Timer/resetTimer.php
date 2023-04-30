<?php

namespace App\Console\Commands\Timer;

use App\Models\Timer;
use Illuminate\Console\Command;

class resetTimer extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'timer:reset';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Reseta o temporizador';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $this->info(Timer::resetTimer());
    }
}
