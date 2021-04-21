import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CanActivateRouteGuard } from './can-activate-route-guard';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AllProgramsComponent } from './components/all-programs/all-programs.component';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { CustomerEnrolledProgramsComponent } from './components/customer-enrolled-programs/customer-enrolled-programs.component';
import { LoginComponent } from './components/login/login.component';
import { MarkteamDashboardComponent } from './components/markteam-dashboard/markteam-dashboard.component';
import { RegisterComponent } from './components/register/register.component';

const routes:Routes=[
    {
        path:"login",
        component:LoginComponent
    },
    {
        path:"register",
        component:RegisterComponent
    },
    {
        path:"dashboard/admin",
        component:AdminDashboardComponent,
        // canActivate:[CanActivateRouteGuard]
    },
    {
        path:"dashboard/customer",
        component:CustomerDashboardComponent,
        canActivate:[CanActivateRouteGuard],
        children:[
            {
                path:'all',component:AllProgramsComponent
            },
            {
                path:'enrolled',component:CustomerEnrolledProgramsComponent
            },
            {
                path:'',redirectTo:'all',pathMatch:'full'
            }
        ]
    },
    {
        path:"dashboard/marketing-team",
        component:MarkteamDashboardComponent,
        canActivate:[CanActivateRouteGuard]
    },
    {
        path:"",
        redirectTo:"/login",
        pathMatch:"full"
    }
]

@NgModule({
    imports:[RouterModule.forRoot(routes)],
    exports:[RouterModule]
})
export class AppRoutingModule{}