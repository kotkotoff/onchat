import { animate, style, transition, query, stagger, trigger } from '@angular/animations';

export const fadeAnimation =  trigger("fade", [
  transition("void <=> *", [
    style([{ backgroundColor: "darkgray", "box-shadow": "0px 0px 0px" }]),
    animate("1.5s ease-out", style([{ backgroundColor: "dimgray",  "box-shadow": "5px 5px 5px" }])
    )
  ])
]);

export const listAnimation = trigger("listAnimation", [
  transition("* => *", [
    query(
      ":enter",
      [
        style({ opacity: 0, transform: "scale(0) translateY(-100%)" }),
        stagger(100, [
          animate(
            "0.25s",
            style({ opacity: 1, transform: "scale(1) translateY(0)" })
          )
        ])
      ],
      { optional: true }
    ),
    query(
      ":leave",
      [
        style({ opacity: 1, transform: "scale(1) rotate(0deg)" }),
        stagger(100, [
          animate(
            "0.25s",
            style({ opacity: 0, transform: "scale(0) rotate(360deg)" })
          )
        ])
      ],
      { optional: true }
    )
  ])
]);
