import { nothing } from "lit";

import styleSheet from "./notification-panel.css";
import { NotificationElement } from "./notification";

/**
 * Notification shown under the flyout v2 bell.
 *
 * Reuses the toast's logic (which warning applies, remembering a dismissal)
 * and only swaps the styling. Showing and hiding is the bar's job, so the
 * toast's own auto-dismiss timer is switched off.
 */
export class NotificationPanelElement extends NotificationElement {
  static elementName = "readthedocs-notification-panel";

  static styles = styleSheet;

  constructor() {
    super();
    this._lastHasNotification = null;
  }

  // The toast tags itself with layout classes; this element is laid out by
  // the bar instead.
  firstUpdated() {}

  // The bar times the dropdown, not the element.
  triggerAutoDismissTimer() {}

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
