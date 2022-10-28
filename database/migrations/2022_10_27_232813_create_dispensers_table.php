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
		Schema::create('dispensers', function (Blueprint $table) {
			$table->id();

			$table->uuid('token');

			$table->float('capacity');
			$table->float('current_capacity');

			$table->decimal('lat', 11, 8)->nullable();
			$table->decimal('lng', 11, 8)->nullable();

			$table->foreignId('company_id')->references('id')->on('companies');

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
		Schema::dropIfExists('dispensers');
	}
};
