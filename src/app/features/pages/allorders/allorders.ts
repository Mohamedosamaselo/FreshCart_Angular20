import { AfterViewInit, Component, inject, OnInit, ElementRef, viewChild, ViewChild } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth-service';
import { IOrder } from '../../../shared/interfaces/Iorder';
import { CurrencyPipe } from "@angular/common";
import { Order } from '../../../shared/services/Order/order';
import { Modal, ModalOptions, ModalInterface } from 'flowbite';


@Component({
  selector: 'app-allorders',
  imports: [CurrencyPipe],
  templateUrl: './allorders.html',
  styleUrl: './allorders.scss',
})
export class Allorders implements OnInit, AfterViewInit {
  // ================= DI ====================
  private readonly _authService = inject(AuthService);
  private readonly _orderService = inject(Order);
  // ================= variables =============
  userId !: string;
  allOrders: IOrder[] = [];
  @ViewChild('modalEl') modalEl!: ElementRef<HTMLElement>; // catch modalEl from View
  private modal!: ModalInterface;
  selectedOrder !: IOrder;




  ngOnInit(): void {
    this.getUserId();
  }

  ngAfterViewInit(): void {
    const modalOptions: ModalOptions = {
      placement: 'center',
      backdrop: 'dynamic',
      closable: true,
      onHide: () => {
        console.log('modal is hidden');
      },
      onShow: () => {
        console.log('modal is shown');
      },
      onToggle: () => {
        console.log('modal has been toggled');
      },
    };

    this.modal = new Modal(
      this.modalEl.nativeElement,
      modalOptions, {
      id: 'default-modal',
      override: true
    }
    )
  }

  openModal(order: IOrder) {
    this.selectedOrder = order;
    this.modal.show();
  }
  closeModal() {
    this.modal.hide();
  }



  getUserId(): void {
    this._authService.user.subscribe({
      next: (res) => {
        console.log(res);
        res.id && this.getAllOrder(res.id);
      },
      error: (err) => {
        console.log(err);

      },
    })
  }


  getAllOrder(userId: string): void {
    this._orderService.getUserOrder(userId).subscribe({
      next: (res) => {
        console.log(res, 'AllOrders')
        this.allOrders = res;
      },
    })

  }




}
