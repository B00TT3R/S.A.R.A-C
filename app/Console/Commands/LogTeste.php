<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;

class LogTeste extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'teste:log';

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
        error_log("Teste de log completo!");
        $this->info("Teste de log completo!");
    }
}
