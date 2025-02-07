import { createWidget } from "discourse/widgets/widget";
import { iconNode } from "discourse-common/lib/icon-library";

export default createWidget("post-voting-button", {
  tagName: "button.btn.btn-flat.no-text.post-voting-button",

  buildAttributes(attrs) {
    const attributes = {};

    if (attrs.loading) {
      attributes.disabled = "true";
    }

    return attributes;
  },

  buildClasses(attrs) {
    const result = [];

    if (attrs.direction === "up") {
      result.push("post-voting-button-upvote");
    }

    if (attrs.direction === "down") {
      result.push("post-voting-button-downvote");
    }

    if (attrs.voted) {
      result.push("post-voting-button-voted");
    }

    return result;
  },

  html(attrs) {
    return iconNode(`caret-${attrs.direction}`);
  },

  click() {
    if (this.attrs.loading) {
      return false;
    }

    this.sendWidgetAction(
      this.attrs.voted ? "removeVote" : "vote",
      this.attrs.direction
    );
  },
});
