<?php


namespace App\Console\Commands;

use Illuminate\Console\GeneratorCommand;
use Symfony\Component\Console\Input\InputArgument;

class MakeBaseController extends GeneratorCommand
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $name = 'make:controller';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Create a new contract interface';

    /**
     * The type of class being generated.
     *
     * @var string
     */
    protected $type = 'Controller';

    /**
     * Replace the class name for the given stub.
     *
     * @param string $stub
     * @param string $name
     * @return string
     */
    protected function replaceClass($stub, $name)
    {
        $stub = parent::replaceClass($stub, $name);

        return $this->fillDummys($stub,$name);
    }

    protected function fillDummys($stub,$name){
        $model_name = explode('Controller', $this->argument('name'))[0];
        $request_name = $model_name. 'Request';
        $service_class_name = $model_name.'Service';
        $service_name = strtolower( preg_replace(
            ["/([A-Z]+)/", "/_([A-Z]+)([A-Z][a-z])/"], ["_$1", "_$1_$2"], lcfirst($model_name.'Service') ) );
        $response_name = strtolower( preg_replace(
            ["/([A-Z]+)/", "/_([A-Z]+)([A-Z][a-z])/"], ["_$1", "_$1_$2"], lcfirst($model_name) ) );
        $stub = str_replace('DummyController', $this->argument('name'), $stub);
        $stub = str_replace('DummyRequest', $request_name, $stub);
        $stub = str_replace('DummyServiceClass', $service_class_name, $stub);
        $stub = str_replace('DummyService', $service_name, $stub);
        return str_replace('DummyResponse', $response_name, $stub);
    }

    /**
     * Get the stub file for the generator.
     *
     * @return string
     */
    protected function getStub()
    {
        return 'app/Console/Commands/Stubs/base-controller.stub';
    }

    /**
     * Get the default namespace for the class.
     *
     * @param string $rootNamespace
     * @return string
     */
    protected function getDefaultNamespace($rootNamespace)
    {
        return $rootNamespace . '\Http\Controllers';
    }

    /**
     * Get the console command arguments.
     *
     * @return array
     */
    protected function getArguments()
    {
        return [
            ['name', InputArgument::REQUIRED, 'The name of the contract.'],
        ];
    }
}
