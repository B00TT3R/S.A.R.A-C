<?php

namespace App\Console\Commands;

use App\Http\Controllers\TopicsController;
use App\Models\TopicTimer;
use Illuminate\Console\Command;

class TopicGeneratorEngine extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'topic:run';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Gera um tópico quando for o tempo adequado';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $timer = TopicTimer::getInstance();
        if($timer->auto_gen){
            if($timer->next && $timer->next->isPast() ){
                TopicsController::newTopic();
                TopicTimer::addNext();
            }
            else{
                TopicTimer::setNext(now());
            }
        }
        else{
            $this->info("geração desativada");
        }
    }
}
