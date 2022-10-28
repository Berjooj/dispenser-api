<?php

namespace App\Http\Controllers;

use App\Models\Dispenser;
use App\Models\DispenserHistoric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DispenserController extends Controller
{
	/**
	 * Display a listing of the resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index()
	{
		$dispensers = \App\Models\Dispenser::with('dispenserHistoric', 'company')->get();

		if ($dispensers) {
			print_r('<pre>');

			foreach ($dispensers as $indexDispenser => $dispenser) {
				print_r("\n------------------------\n");
				print_r('# Dispenser: ' . $dispenser->token . "\n");
				print_r('# Capacidade: ' . $dispenser->capacity . "\n");
				print_r('# Capacidade atual: ' . $dispenser->current_capacity . "\n");
				print_r('# Latitude: ' . $dispenser->lat . "\n");
				print_r('# Longitude: ' . $dispenser->lng . "\n");
				print_r('# Empresa: ' . $dispenser->company->company_name . "\n");
				print_r('# Dt criação: ' . $dispenser->created_at . "\n");
				print_r('# Dt ult. edição: ' . $dispenser->updated_at . "\n");

				if ($dispenser->dispenserHistoric) {
					foreach ($dispenser->dispenserHistoric as $indexHistoric => $historic) {
						print_r("\n## Historico: " . ($indexHistoric + 1) . "\n");
						print_r('## Entradas: ' . $historic->entries . "\n");
						print_r('## Usos: ' . $historic->uses . "\n");
						print_r('## Tipo: ' . ($historic->type == 1 ? 'consumo' : 'reabastecer') . "\n");
						print_r('## Dt criação: ' . $historic->created_at . "\n");
					}
				}

				print_r("\n");
			}

			print_r('</pre>');
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
				'type' => $validated['type']
			]
		);

		$dispenserHistoric->save();

		return response()->json(['mensagem' => 'Dados salvos com sucesso.'], 200);
	}
}
