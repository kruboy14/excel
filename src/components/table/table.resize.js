import { $ } from "../../core/dom";

export function tableResize($root, event) {
  return new Promise((resolve) => {
    const $resizer = $(event.target);
    const $parent = $resizer.closest(`[data-type="resizable"]`);
    const cords = $parent.getCords();
    const type = $resizer.data.resize;

    const sideProp = type === "col" ? "bottom" : "right";
    let value = null;

    $resizer.css({
      opacity: 1,
      [sideProp]: "-2000px",
    });

    document.onmousemove = (e) => {
      if (type === "col") {
        const delta = e.screenX - cords.right;
        value = cords.width + delta;
        $resizer.css({
          right: -delta + "px",
        });
      } else if (type === "row") {
        const delta = e.pageY - cords.bottom;
        value = cords.height + delta;
        $resizer.css({
          bottom: -delta + "px",
        });
      }
    };

    document.onmouseup = () => {
     
      if (type === "col") {
        if(value < 40) { 
          value = 40
        }
        $root
          .findAll(`[data-col="${$resizer.data.col}"]`)
          .forEach((elem) => (elem.style.width = value + "px"));
        $parent.css({
          width: value + "px",
        });
        resolve({
          value,
          id: $parent.data.col,
          type,
        });
      } else if (type === "row") {
        if(value < 24) { 
          value = 24
        }
        $parent.css({
          height: value + "px",
        });
        console.log($parent.data);
        resolve({
          value,
          id: $parent.data.row,
          type,
        });
      }

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0,
      });
      document.onmouseup = null;
      document.onmousemove = null;
    };
  });
}
