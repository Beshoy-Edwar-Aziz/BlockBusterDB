import {
    transition,
    trigger,
    query,
    style,
    animate,
    group,
    animateChild
 } from '@angular/animations';
 export const slideInAnimation =
    trigger('routeAnimations', [
         transition('Home => *', [
              query(':enter, :leave', 
                   style({ position: 'fixed',  width: '100%' }), 
                   { optional: true }),
              group([
                   query(':enter', [
                    animate('1s ease-in-out',
                       style({ transform: 'scale(1) translateY(-100%)'})), 
                       animate('1s ease-in-out', 
                       style({ transform: 'scale(1) translateY(0)' }))
                   ], { optional: true }),
                   query(':leave', [
                    animate('1s ease-in-out',
                       style({ transform: 'scale(1) translateY(0)' })),
                       animate('1s ease-in-out', 
                       style({ transform: 'scale(1) translateY(100%)' }))
                       ], { optional: true }),
               ])
         ]),
         transition('details => *', [
               query(':enter, :leave', 
                   style({ position: 'fixed', width: '100%' }), 
                   { optional: true }),
               group([
                query(':enter', [
                    animate('1s ease-in-out',
                       style({ transform: 'scale(1) translateY(100%)'})), 
                       animate('1s ease-in-out', 
                       style({ transform: 'scale(1) translateY(0)' }))
                   ], { optional: true }),
                   query(':leave', [
                    animate('1s ease-in-out',
                       style({ transform: 'scale(1) translateY(0)' })),
                       animate('1s ease-in-out', 
                       style({ transform: 'scale(1) translateY(-100%)' }))
                       ], { optional: true }),
               ])
        ]),
 ]);