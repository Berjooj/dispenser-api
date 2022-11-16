<?php

namespace App\Http\Controllers;

use App\Models\Company;
use App\Models\Dispenser;
use App\Models\DispenserHistoric;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CompanyController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $companies = Company::get();

        return response()->json($companies->map->only(['id', 'company_name', 'company_document']), 200);
    }
}
