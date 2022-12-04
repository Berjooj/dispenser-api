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

		$colorListHover = [
			'#94c8ff', '#ae88eb', '#e6a5c3', '#f7c79e', '#fadf8e', '#b4dae0', '#343a40'
		];

		foreach ($dispensers as $key => $dispenser) {
			$dispenserHistoric = [];

			foreach ($dispenser->dispenserHistoric as $historic) {
				$created_at = Carbon::parse($historic->created_at)->subHour(3)->format("H:00 d/m/Y");

				$historicList[] = $historic;

				if ($historic->type === 3)
					continue;

				$labels["{$historic->created_at}"] = $created_at;
				$dispenserHistoric[$created_at] = $historic->uses;
			}

			$color = $colorList[$key];
			$colorHover = $colorListHover[$key];

			$dataSet = new stdClass();
			$dataSet->data = $dispenserHistoric;
			$dataSet->label = 'Dispenser #' . $dispenser->id;
			$dataSet->lineTension = 0;
			$dataSet->backgroundColor = $colorHover;
			$dataSet->borderColor = $color;
			$dataSet->borderWidth = 4;
			$dataSet->pointBackgroundColor = $color;

			$dataSets[] = $dataSet;
		}

		$labels = array_unique($labels);

		ksort($labels);

		$labels = array_values($labels);

		foreach ($dataSets as &$dataSet) {
			$sortedDataSet = array_fill(0, count($labels), 0);

			foreach ($dataSet->data as $key => $data) {
				if (in_array($key, $labels)) {
					$sortedDataSet[array_search($key, $labels)] = $data;
				}
			}

			$dataSet->data = $sortedDataSet;
		}

		$series = [
			'labels' => $labels,
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
