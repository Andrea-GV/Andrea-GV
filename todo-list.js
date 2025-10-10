import { LitElement, css, html } from 'https://cdn.jsdelivr.net/npm/lit@3/+esm';
import { repeat } from 'https://cdn.jsdelivr.net/npm/lit@3/directives/repeat.js/+esm';
import './todo-item.js';

export class TodoList extends LitElement {
  static properties = {
    tasks: { state: true } // array reactivo interno
  };

  static styles = css`
    :host {
      display: block;
    }
    .card {
      border: 1px solid color-mix(in oklab, CanvasText 15%, transparent);
      background: color-mix(in oklab, Canvas 95%, transparent);
      border-radius: 12px;
      padding: 1rem;
    }
    header h2 {
      margin: 0 0 0.5rem 0;
      font-size: 1.15rem;
    }
    .list {
      display: grid;
      gap: 0.5rem;
    }
  `;

  constructor() {
    super();
    this.tasks = [
      { id: crypto.randomUUID(), text: 'Comprar pan', completed: false },
      { id: crypto.randomUUID(), text: 'Estudiar Lit', completed: true }
    ];
  }

  #onToggle(event) {
    const { id, completed } = event.detail ?? {};
    if (!id) return;
    this.tasks = this.tasks.map(task => task.id === id ? { ...task, completed } : task);
  }

  #onDelete(event) {
    const { id } = event.detail ?? {};
    if (!id) return;
    this.tasks = this.tasks.filter(task => task.id !== id);
  }

  render() {
    return html`
      <section class="card">
        <header>
          <h2>Tareas</h2>
        </header>
        <div class="list" @todo-toggle=${this.#onToggle} @todo-delete=${this.#onDelete}>
          ${repeat(this.tasks, task => task.id, task => html`
            <todo-item
              .text=${task.text}
              .completed=${task.completed}
              .todoId=${task.id}
            ></todo-item>
          `)}
        </div>
      </section>
    `;
  }
}

customElements.define('todo-list', TodoList);
