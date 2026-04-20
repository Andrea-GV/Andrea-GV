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
    form {
      display: grid;
      grid-template-columns: 1fr auto;
      gap: 0.5rem;
      margin-bottom: 0.75rem;
    }
    input[type="text"] {
      border: 1px solid color-mix(in oklab, CanvasText 20%, transparent);
      background: color-mix(in oklab, Canvas 100%, transparent);
      border-radius: 8px;
      padding: 0.5rem 0.75rem;
      font: inherit;
    }
    input[type="text"]:focus-visible {
      outline: 2px solid color-mix(in oklab, CanvasText 35%, transparent);
      outline-offset: 2px;
    }
    button[type="submit"] {
      border: 0;
      border-radius: 8px;
      padding: 0.55rem 0.9rem;
      font: inherit;
      cursor: pointer;
      background: color-mix(in oklab, CanvasText 85%, Canvas);
      color: color-mix(in oklab, Canvas 100%, CanvasText 0%);
    }
    button[type="submit"]:hover {
      filter: brightness(1.03);
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

  #onSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector('input[name="task"]');
    const value = (input?.value ?? '').trim();
    if (!value) return;
    const newTask = { id: crypto.randomUUID(), text: value, completed: false };
    this.tasks = [newTask, ...this.tasks];
    input.value = '';
    input.focus();
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
        <form @submit=${this.#onSubmit} novalidate>
          <input name="task" type="text" autocomplete="off" placeholder="Nueva tarea..." aria-label="Nueva tarea" />
          <button type="submit">Añadir</button>
        </form>
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
