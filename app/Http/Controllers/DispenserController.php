<?php

namespace App\Http\Controllers;

use App\Models\Dispenser;
use App\Models\DispenserHistoric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DispenserController extends Controller
{
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($id)
	{
		$historicList = DispenserHistoric::join('dispensers', 'dispensers.id', '=', 'dispenser_historics.dispenser_id')
			->where('dispenser.company_id', $id)
			->orderBy('created_at', 'desc')
			->get('dispenser_hitorics.*');

		foreach ($historicList as $historic) {
		}
	}

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
			'uses' => 'required|integer',
			'entries' => 'required|integer',
			'type' => 'required|integer'
		]);

		if ($validator->fails())
			return response()->json(['mensagem' => 'Requisição inválida'], 422);

		$validated = $validator->safe()->only(
			['token', 'uses', 'entries', 'type']
		);

		if (!in_array($validated['type'], [1, 2]))
			return response()->json(['mensagem' => 'Operação inválida'], 422);

		/** @var \App\Models\Dispenser */
		$dispenser = Dispenser::where('token', $validated['token'])->first();

		if (!$dispenser)
			return response()->json(['mensagem' => 'Dispenser não encontrado'], 404);

		$currentCapacity = $validated['type'] == 1
			? ($dispenser->current_capacity - ($validated['uses'] * 5))
			: $dispenser->capacity;

		$dispenser->update(['current_capacity' => $currentCapacity]);

		// if ($capacidadeAtual < 0)
		// TODO: alertar que acabou

		/** @var \App\Models\DispenserHistoric */
		$dispenserHistoric = new DispenserHistoric(
			[
				'dispenser_id' => $dispenser->id,
				'entries' => $validated['entries'],
				'uses' => $validated['uses'],
				'type' => $validated['type'],
				'percentage' => (($currentCapacity * 100) / $dispenser->capacity)
			]
		);

		$dispenserHistoric->save();

		return response()->json(['mensagem' => 'Dados salvos com sucesso.'], 200);
	}
}
