<?php

namespace App\Http\Controllers;

use App\Models\Dispenser;
use App\Models\DispenserHistoric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FlowController extends Controller
{

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validator = Validator::make(\request()->all(), [
            'token' => 'required|uuid',
            'entries' => 'required|integer'
        ]);

        if ($validator->fails())
            return response()->json(['mensagem' => 'Requisição inválida'], 422);

        $validated = $validator->safe()->only(
            ['token', 'entries']
        );

        /** @var \App\Models\Dispenser */
        $dispenser = Dispenser::where('token', $validated['token'])->first();

        if (!$dispenser)
            return response()->json(['mensagem' => 'Dispenser não encontrado'], 404);

        /** @var \App\Models\DispenserHistoric */
        $dispenserHistoric = new DispenserHistoric(
            [
                'dispenser_id' => $dispenser->id,
                'entries' => $validated['entries'],
                'type' => 3
            ]
        );

        $dispenserHistoric->save();

        return response()->json(['mensagem' => 'Dados salvos com sucesso.'], 200);
    }
}
