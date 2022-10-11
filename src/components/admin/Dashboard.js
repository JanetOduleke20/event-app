import React from 'react';
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';
import ViewProduct from './ViewProduct';
import Orders from './Orders';
import Payments from './Payments';

export default function Dashboard() {
  return (
    <div className="container mt-3">
        <nav>
        <div class="nav nav-tabs" id="nav-tab" role="tablist">
            <button class="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Categories</button>
            <button class="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Add Products</button>
            <button class="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">View Products</button>
            <button class="nav-link" id="nav-orders-tab" data-bs-toggle="tab" data-bs-target="#nav-orders" type="button" role="tab" aria-controls="nav-orders" aria-selected="false">Orders</button>
            <button class="nav-link" id="nav-payments-tab" data-bs-toggle="tab" data-bs-target="#nav-payments" type="button" role="tab" aria-controls="nav-payments" aria-selected="false">View Product</button>
        </div>
        </nav>
        <div class="tab-content" id="nav-tabContent">
          <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab"><AddCategory></AddCategory></div>
          <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab"><AddProduct></AddProduct></div>
          <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab"><ViewProduct></ViewProduct></div>
          <div class="tab-pane fade" id="nav-orders" role="tabpanel" aria-labelledby="nav-orders-tab"><Orders></Orders></div>
          <div class="tab-pane fade" id="nav-payments" role="tabpanel" aria-labelledby="nav-payments-tab"><Payments></Payments></div>
        </div>
    </div>
  )
}
