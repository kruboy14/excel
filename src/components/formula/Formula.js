import { ExcelComponent } from "../../core/ExcelComponent";

export class Formula extends ExcelComponent {
  static className = "excel__formula";

  constructor($root, options) {
    super($root, {
      name: "Formula",
      listeners: ["input", "keydown"],
      ...options,
    });

    this.curCell = {};
  }

  toHTML() {
    return `
    <div class="formula__info">fx</div>

    <div class="formula__input" contenteditable spellcheck="false"></div>`;
  }

  init() {
    super.init();
    this.$on("table:selected", ($next) => {
      this.curCell = $next
      console.log($next);
    });
  }

  onInput(event) {
    const text = event.target.textContent.trim();
    this.$emit("formula:input", text);
  }

  onKeydown(event) {
    const { key } = event;
    if (key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      console.log("Enter from form");
      const text = event.target.textContent.trim();
      const val = this.curCell
      this.$emit("formula:enter", text, val);
    }
  }
}
