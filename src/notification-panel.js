import { nothing } from "lit";

import styleSheet from "./notification-panel.css";
import { NotificationElement } from "./notification";

/**
 * Notification stacked under the flyout v2 bar.
 *
 * Reuses the toast's logic (which warning to show, auto-dismiss, remembering
 * a dismissal) and only swaps the positioning. The bar keeps a bell to bring
 * an auto-dismissed notification back, which is what ``expanded`` does.
 */
export class NotificationPanelElement extends NotificationElement {
  static elementName = "readthedocs-notification-panel";

  static properties = {
    expanded: { type: Boolean },
  };

  static styles = styleSheet;

  constructor() {
    super();
    this.expanded = false;
    this._lastHasNotification = null;
  }

  // The toast tags itself with layout classes; this element is laid out by
  // the bar instead.
  firstUpdated() {}

  willUpdate(changedProperties) {
    if (changedProperties.has("config") && this.config) {
      this.applyConfig(this.config);
    }
  }

  /** Whether there is a notification for this page that was not dismissed. */
  hasNotification() {
    return (
      this.config !== null &&
      !this.dismissedTimestamp &&
      this.getNotificationType() !== null
    );
  }

  render() {
    if (this.config === null || this.dismissedTimestamp) {
      return nothing;
    }
    if (this.autoDismissed && !this.expanded) {
      return nothing;
    }
    return this.renderNotification();
  }

  updated() {
    const hasNotification = this.hasNotification();
    if (hasNotification !== this._lastHasNotification) {
      this._lastHasNotification = hasNotification;
      this.dispatchEvent(
        new CustomEvent("readthedocs-notification-panel-change", {
          detail: { hasNotification },
          bubbles: true,
        }),
      );
    }
  }
}

customElements.define(
  NotificationPanelElement.elementName,
  NotificationPanelElement,
);
