import { Component, OnInit } from "@angular/core";
import { MenuItem } from "primeng/api";
import { User } from "src/app/Models/Security/User.model";
import { SecurityService } from "../../../services/security.service";
import { Router } from "@angular/router";
import { BlockUI, NgBlockUI } from "ng-block-ui";
//import { url } from 'inspector';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit {
  items: MenuItem[];
  items2: MenuItem[];
  display: boolean;
  displayPassChangeModal: boolean;
  user: User = new User();
  svgElement: any;
  @BlockUI() blockUI: NgBlockUI;
  iframeUrlStr: string;
  userName: string;

  constructor(
    private securityService: SecurityService,
    private router: Router
  ) {}

  ngOnInit() {
    this.buildMenu();
    this.router.navigate(["/ciudades"]);
  }

  buildMenu() {
    if (this.isLoggedIn()) {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.userName = this.user.name;

      this.items2 = [
        {
          label: "Cambiar contraseña",
          command: (event) => {
            this.displayPassChangeModal = false;
            this.showPassModal();
          },
        },
        {
          label: "Salir",
          command: (event) => {
            this.logout();
          },
        },
      ];
    } else {
      this.userName = "Invitado";
      this.items2 = [
        {
          label: "Login",
          routerLink: ["login"],
        },
      ];
    }

    this.items = [
      {
        label: "Datos Maestros",
        icon: "fa fa-fw fa-edit",
        items: [
          { label: "Ciudades", routerLink: ["ciudades"] }, //, visible: this.securityService.hasPermission('LEER_CIUDAD') },
          { label: "Provincias", routerLink: ["provincias"] }, //, visible: this.securityService.hasPermission('LEER_PROVINCIA') },
        ],
      },
    ];
  }

  logout() {
    this.securityService.logoutKillSession().subscribe(() => {
      this.securityService.logout();
      window.location.reload();
      //this.router.navigate(['ciudades']);
      this.svgElement = undefined;
    });
  }

  isLoggedIn() {
    return this.securityService.isLoggedIn();
  }

  get() {
    setTimeout(() => {}, 3000);
  }

  getHamburger() {
    if (this.svgElement == undefined) {
      this.svgElement = document.getElementById("svgHamburguer");
    }
  }

  toggleHamburger() {
    if (this.svgElement != undefined) {
      this.svgElement.classList.toggle("active");
    }
  }

  showPassModal() {
    this.displayPassChangeModal = !this.displayPassChangeModal;
  }

  cambiarPass(form) {
    this.displayPassChangeModal = !this.displayPassChangeModal;
  }
}
