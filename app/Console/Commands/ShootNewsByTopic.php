<?php

namespace App\Console\Commands;

use App\Http\Controllers\ScheduleController;
use App\Models\Topic;
use Illuminate\Console\Command;

class ShootNewsByTopic extends Command
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
    protected $description = 'Roda o foreach por todos os tópicos, e, se algum deles estiver na hora, gera uma noticia';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        //Para fazer debug USE COM CUIDADO!
        $forceGeneration = false;
        $topics = Topic::all();
        foreach($topics as $topic){
            if($topic->auto_gen && $topic->next && $topic->next->isPast() || $forceGeneration){
                $this->info($topic->name." deve gerar");
                ScheduleController::fullGeneration($topic);
                $topic->addNext();
            }
            elseif(is_null($topic->next && $topic->auto_gen)){
                $topic->addNext();
            }
            else{
                $this->info($topic->name." não deve gerar");

            }
        }
    }
}
