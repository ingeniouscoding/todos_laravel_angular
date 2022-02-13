import { animate, animation, style } from '@angular/animations';

export const deleteIconEnter = animation([
  style({
    transform: 'translateX(-1.5rem) scale(0.6)',
    width: 0,
    opacity: 0,
  }),
  animate('0.3s ease-out',
    style({
      transform: 'translateX(0) scale(1)',
      width: '1.5rem',
      opacity: 1,
    })
  ),
]);

export const deleteIconLeave = animation(
  animate('0.3s ease-out',
    style({
      transform: 'translateX(-1.5rem) scale(0.6)',
      width: 0,
      opacity: 0,
    })
  )
);

export const completeIconEnter = animation([
  style({
    transform: 'scale(0.6)',
    width: 0,
    opacity: 0,
  }),
  animate('0.3s ease-out',
    style({
      transform: 'scale(1)',
      width: '1.5rem',
      opacity: 1,
    })
  ),
]);

export const completeIconLeave = animation(
  animate('0.3s ease-out',
    style({
      transform: 'scale(0.6)',
      width: 0,
      opacity: 0,
    })
  )
);

export const updateIconEnter = animation([
  style({
    transform: 'translateX(0.5rem) scale(0.6)',
    width: 0,
    opacity: 0,
  }),
  animate('0.3s ease-out',
    style({
      transform: 'translateX(0) scale(1)',
      width: '1.5rem',
      opacity: 1,
    })
  ),
]);

export const updateIconLeave = animation(
  animate('0.3s ease-out',
    style({
      transform: 'translateX(0.5rem) scale(0.6)',
      width: 0,
      opacity: 0,
    })
  )
);
