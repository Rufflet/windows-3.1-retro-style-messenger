import Block from "core/Block";
import "./removeUser.css";

export interface RemoveUserProps {
  users: Nullable<User[]>;
  onClose: () => void;
  onRemoveUser: (id: number) => void;
  error: Nullable<string>;
}

export default class RemoveUser extends Block<RemoveUserProps> {
  static componentName = "RemoveUser";

  protected getStateFromProps() {
    this.state = {
      onUserClick: this.handleUserClick.bind(this),
      onClose: () => this.props.onClose(),
    };
  }

  handleUserClick(e: Event) {
    const user = (e.target as HTMLElement).closest("li") as HTMLLIElement;
    const { id } = user.dataset;

    if (id) {
      this.props.onRemoveUser(parseInt(id, 10));
    }
  }

  protected render(): string {
    // language=hbs
    return `
      <div class="remove-user__wrapper">
        {{#Layout class="remove-user" }}
          {{#WindowLayout title="Удалить пользователя из чата чат" }}
            <ul>
            {{#each users}}
              <li title="Удлить из чата" data-id="{{id}}">
                {{{Link
                  text=this.login
                  onClick=../onUserClick
              }}}</li>
            {{/each}}
            </ul>
            {{{ErrorComponent text=error}}}
            <div class="align-center">
              {{{Button text="Закрыть" onClick=onClose}}}
            </div>
          {{/WindowLayout}}
        {{/Layout}}
        </div>
      </div>
    `;
  }
}
