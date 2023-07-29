<?php

namespace App\Console\Commands;

use App\Models\Topic;
use Illuminate\Console\Command;

class DeleteOldTopic extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'topic:del';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Deleta o tópico mais velo gerado por IA.';

    /**
     * Execute the console command.
     */
    public function handle(): void
    {
        $AITopics = Topic::whereNull("user_id");
        if($AITopics->count() > 10){
            $oldest = $AITopics->orderBy('created_at')->first();
            $this->info("Registro: ".$oldest->name. " Foi deletado");
            $oldest->delete();
        }
        else{
            $this->info("Sem registros de IA o suficiente para deletar, existem ".$AITopics->count()." registros");
        }
    }
}
