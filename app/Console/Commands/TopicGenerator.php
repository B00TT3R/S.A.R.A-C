<?php

namespace App\Console\Commands;

use App\Http\Controllers\TopicsController;
use Illuminate\Console\Command;

class TopicGenerator extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'topic:shoot';

    protected $description = 'Cria um tópico novo';

    public function handle(): void
    {
        TopicsController::newTopic();
    }
}
