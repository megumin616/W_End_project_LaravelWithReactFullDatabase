<?php

namespace App\Http\Controllers;

use App\Models\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $customer = Customer::all();
        return $customer;
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Validate ข้อมูลที่ส่งเข้ามา
        $validatedData = $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:customers,username',
            'email' => 'required|email|unique:customers,email',
            'address' => 'nullable|array',
            'address.street' => 'nullable|string|max:255',
            'address.suite' => 'nullable|string|max:255',
            'address.city' => 'nullable|string|max:255',
            'address.zipcode' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:15',
            'website' => 'nullable',
            'company' => 'nullable|array',
            'company.name' => 'nullable|string|max:255',
            'company.catchPhrase' => 'nullable|string|max:255',
            'company.bs' => 'nullable|string|max:255',
        ]);

        // สร้าง Customer ใหม่ในฐานข้อมูล
        $customer = new Customer();
        $customer->name = $validatedData['name'];
        $customer->username = $validatedData['username'];
        $customer->email = $validatedData['email'];
        $customer->address = $validatedData['address'] ?? null; // ตรวจสอบว่ามีค่า address หรือไม่
        $customer->phone = $validatedData['phone'] ?? null; // ตรวจสอบว่ามีค่า phone หรือไม่
        $customer->website = $validatedData['website'] ?? null; // ตรวจสอบว่ามีค่า website หรือไม่
        $customer->company = $validatedData['company'] ?? null; // ตรวจสอบว่ามีค่า company หรือไม่
        $customer->save();

        // ส่ง response กลับไปยังผู้ใช้งาน
        return response()->json([
            'message' => 'Customer created successfully',
            'customer' => $customer
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $customer = Customer::find($id);
        return $customer;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        // ค้นหาลูกค้าตาม ID
        $customer = Customer::find($id);
    
        // ตรวจสอบว่าลูกค้าตัวนี้มีอยู่ในฐานข้อมูล
        if (!$customer) {
            return response()->json(['message' => 'Customer not found'], 404);
        }
    
        // Validate ข้อมูลที่ส่งเข้ามา
        $validatedData = $request->validate([
            'name' => 'nullable|string|max:255',
            'username' => 'nullable|string|max:255|unique:customers,username,' . $id,
            'email' => 'nullable|email|unique:customers,email,' . $id,
            'address' => 'nullable|array',
            'address.street' => 'nullable|string|max:255',
            'address.suite' => 'nullable|string|max:255',
            'address.city' => 'nullable|string|max:255',
            'address.zipcode' => 'nullable|string|max:20',
            'phone' => 'nullable|string|max:15',
            'website' => 'nullable',
            'company' => 'nullable|array',
            'company.name' => 'nullable|string|max:255',
            'company.catchPhrase' => 'nullable|string|max:255',
            'company.bs' => 'nullable|string|max:255',
        ]);
    
        // อัปเดตข้อมูลลูกค้า
        $customer->update($validatedData);
    
        // ส่ง response กลับไปยังผู้ใช้งาน
        return response()->json([
            'message' => 'Customer updated successfully',
            'customer' => $customer
        ], 200);
    }
    

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $customer = Customer::find($id);
        $customer->delete();
        return response()->json(["message" => "Delete data successfully"]);
    }
}
