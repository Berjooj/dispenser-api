<?php

namespace App\Http\Controllers;

use App\Models\Dispenser;
use App\Models\DispenserHistoric;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Validator;
use stdClass;

class DispenserController extends Controller
{
	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return \Illuminate\Http\Response
	 */
	public function show($companyId)
	{
		$historicList = DispenserHistoric::join('dispensers', 'dispensers.id', '=', 'dispenser_historics.dispenser_id')
			->where('dispenser.company_id', $companyId)
			->orderBy('created_at', 'asc')
			->get('dispenser_hitorics.*');

		foreach ($historicList as $historic) {
		}
	}

	/**
	 * Display the specified resource.
	 *
	 * @return \Illuminate\Http\Response
	 */
	public function index($companyId)
	{
		$dispensers = Dispenser::with('dispenserHistoric')
			->where('dispensers.company_id', $companyId)
			->orderBy('id')
			->get();

		$dataSets = [];
		$labels = [];
		$historicList = [];

		$colorList = [
			'#007bff', '#6610f2', '#e83e8c', '#fd7e14', '#ffc107', '#17a2b8', '#343a40'
		];

		foreach ($dispensers as $key => $dispenser) {
			$dispenserHistoric = [];

			foreach ($dispenser->dispenserHistoric as $historic) {
				$historic->created_at = !empty($historic->created_at)
					? Carbon::parse($historic->created_at)->subHour(3)->format('H:i d/M/Y')
					: null;

				$historicList[] = $historic;

				if ($historic->type === 3)
					continue;

				$labels[] = $historic->created_at;
				$dispenserHistoric[count($labels)] = $historic->uses;
			}

			$color = $colorList[$key];

			$dataSet = new stdClass();
			$dataSet->data = $dispenserHistoric;
			$dataSet->label = 'Dispenser #' . $dispenser->id;
			$dataSet->lineTension = 0;
			$dataSet->backgroundColor = $color . '4D';
			$dataSet->borderColor = $color;
			$dataSet->borderWidth = 4;
			$dataSet->pointBackgroundColor = $color;

			$dataSets[] = $dataSet;
		}

		$tempDataSet = array_fill(0, count($labels), 0);

		foreach ($dataSets as &$dataSet) {
			array_map(
				function ($key) use ($dataSet) {
					if (!array_key_exists($key, $dataSet->data))
						$dataSet->data[$key] = 0;
				},
				array_keys($tempDataSet)
			);

			ksort($dataSet->data);
			$dataSet->data = array_values($dataSet->data);
		}


		$series = [
			'labels' => array_unique($labels),
			'datasets' => $dataSets
		];

		usort($historicList, function ($cur, $prev) {
			return strtotime($prev['created_at']) - strtotime($cur['created_at']);
		});

		$counter = [
			'dispensers' => count($dispensers),
			'usage' => count(array_filter($historicList, function ($historic) {
				return $historic->type === 1;
			})),
			'recharges' => count(array_filter($historicList, function ($historic) {
				return $historic->type === 2;
			})),
			'entries' => count(array_filter($historicList, function ($historic) {
				return $historic->type === 3;
			}))
		];

		return response()->json(['table' => $historicList, 'series' => $series, 'counter' => $counter]);
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
			'type' => 'required|integer'
		]);

		if ($validator->fails())
			return response()->json(['mensagem' => 'Requisição inválida'], 422);

		$validated = $validator->safe()->only(
			['token', 'uses', 'type']
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

		$currentCapacity = $currentCapacity < 0 ? 0 : $currentCapacity;

		$dispenser->update(['current_capacity' => $currentCapacity]);

		// if ($capacidadeAtual < 0)
		// TODO: alertar que acabou

		/** @var \App\Models\DispenserHistoric */
		$dispenserHistoric = new DispenserHistoric(
			[
				'dispenser_id' => $dispenser->id,
				'uses' => $validated['uses'],
				'type' => $validated['type'],
				'percentage' => (($currentCapacity * 100) / $dispenser->capacity)
			]
		);

		$dispenserHistoric->save();

		return response()->json(['mensagem' => 'Dados salvos com sucesso.'], 200);
	}
}
