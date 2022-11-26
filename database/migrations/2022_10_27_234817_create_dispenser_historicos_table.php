<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
	/**
	 * Run the migrations.
	 *
	 * @return void
	 */
	public function up()
	{
		Schema::create('dispenser_historics', function (Blueprint $table) {
			$table->id();

			$table->foreignId('dispenser_id')->references('id')->on('dispensers')->onDelete('cascade');

			$table->integer('uses')->nullable()->default(0);
			$table->integer('entries')->nullable()->default(0);

			// 1 - Uso, 2 - Reabastecer, 3 - Log do sensor de entrada
			$table->integer('type');

			$table->decimal('percentage')->default(0);

			$table->timestamps();
		});
	}

	/**
	 * Reverse the migrations.
	 *
	 * @return void
	 */
	public function down()
	{
		Schema::dropIfExists('dispenser_historicos');
	}
};
