import { LitElement, css, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';

export class TodoItem extends LitElement {
  static properties = {
    text: { type: String },
    completed: { type: Boolean, reflect: true },
    todoId: { type: String, attribute: 'todo-id' }
  };

  static styles = css`
    :host {
      display: block;
    }
    .item {
      display: grid;
      grid-template-columns: auto 1fr auto;
      gap: 0.5rem;
      align-items: center;
      padding: 0.5rem 0.75rem;
      border-radius: 8px;
      border: 1px solid color-mix(in oklab, CanvasText 15%, transparent);
      background: color-mix(in oklab, Canvas 92%, transparent);
    }
    .text {
      overflow-wrap: anywhere;
    }
    :host([completed]) .text {
      text-decoration: line-through;
      opacity: 0.7;
    }
    button {
      border: 0;
      background: transparent;
      cursor: pointer;
      color: inherit;
      padding: 0.35rem 0.5rem;
      border-radius: 6px;
    }
    button:hover {
      background: color-mix(in oklab, CanvasText 10%, transparent);
    }
  `;

  constructor() {
    super();
    this.text = '';
    this.completed = false;
    this.todoId = undefined;
  }

  #onToggle(event) {
    const isChecked = event.currentTarget.checked;
    this.completed = isChecked;

    this.dispatchEvent(new CustomEvent('todo-toggle', {
      detail: { id: this.todoId, completed: this.completed, text: this.text },
      bubbles: true,
      composed: true
    }));
  }

  #onDelete() {
    this.dispatchEvent(new CustomEvent('todo-delete', {
      detail: { id: this.todoId, text: this.text },
      bubbles: true,
      composed: true
    }));
  }

  render() {
    return html`
      <div class="item" role="group" aria-label="Tarea">
        <input
          type="checkbox"
          .checked=${this.completed}
          @change=${this.#onToggle}
          aria-label=${this.completed ? 'Marcar como pendiente' : 'Marcar como completada'}
        />
        <span class="text">${this.text}</span>
        <button type="button" @click=${this.#onDelete} aria-label="Eliminar tarea">✕</button>
      </div>
    `;
  }
}

customElements.define('todo-item', TodoItem);
