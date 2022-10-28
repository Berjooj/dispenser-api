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

			$table->foreignId('dispenser_id')->references('id')->on('dispensers');

			$table->integer('entries');
			$table->integer('uses');
			$table->integer('type');

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
