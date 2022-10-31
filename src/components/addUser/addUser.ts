import Block from "core/Block";
import "./addUser.css";

export interface AddUserProps {
  searchResults: any;
  onSearchUser: (login: string) => void;
  onAddUser: (id: number) => void;
  onClose: () => void;
  error: Nullable<string>;
}

export default class AddUser extends Block<AddUserProps> {
  static componentName = "AddUser";

  protected getStateFromProps() {
    this.state = {
      values: {
        login: "",
      },
      errors: {
        login: "",
      },
      onUserSearch: this.handleUserSearch.bind(this),
      onUserClick: this.handleUserClick.bind(this),
      onClose: () => this.props.onClose(),
    };
  }

  handleUserSearch(e: Event) {
    e.preventDefault();

    const input = this.refs.login
      .getContent()
      .querySelector("input") as HTMLInputElement;

    if (input) this.props.onSearchUser(input.value);
  }

  handleUserClick(e: Event) {
    const user = (e.target as HTMLElement).closest("li") as HTMLLIElement;
    const { id } = user.dataset;

    if (id) {
      this.props.onAddUser(parseInt(id, 10));
    }
  }

  protected render(): string {
    const { errors, values } = this.state;

    // language=hbs
    return `
      <div class="add-user__wrapper">
        {{#Layout class="add-user" }}
          {{#WindowLayout title="Добавить контакт в чат" }}
            {{#Form onSubmit=onUserSearch}}
              {{{ControlledInput
                label="Username:"
                id="login"
                name="login"
                value="${values.login}"
                error="${errors.login}"
                type="text"
                ref="login"
                placeholder="Поиск по username"
              }}}
              {{{ErrorComponent text=error}}}
              <ul>
              {{#each searchResults}}
                <li title="Добавить в чат" data-id="{{id}}">
                  {{{Link
                    text=this.login
                    onClick=../onUserClick
                }}}</li>
              {{/each}}
              </ul>
              <div class="align-center">
                {{{Button text="Поиск" type="submit"}}}
                {{{Button text="Закрыть" onClick=onClose}}}
              </div>
            {{/Form}}
          {{/WindowLayout}}
        {{/Layout}}
        </div>
      </div>
    `;
  }
}
