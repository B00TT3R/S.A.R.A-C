<?php

namespace App\Console;

use App\Http\Controllers\ScheduleController;
use App\Models\AutoGen;
use App\Models\Timer;
use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     */
    protected function schedule(Schedule $schedule): void
    {
        $schedule->command("news:shoot")->everyMinute();
        $schedule->command("topic:run")->everyMinute();
        $schedule->command("topic:del")->everyMinute();
        
    }

    /**
     * Register the commands for the application.
     */
    protected function commands(): void
    {
        $this->load(__DIR__.'/Commands');
        $this->load(__DIR__.'/Commands/*');

        require base_path('routes/console.php');
    }
}
