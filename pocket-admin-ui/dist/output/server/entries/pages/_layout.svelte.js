import { f as slot } from "../../chunks/index.js";
function default_slot($$props) {
  var children = $$props.$$slots?.default;
  if (children === true) {
    return $$props.children;
  } else {
    return children;
  }
}
function _layout($$payload, $$props) {
  $$payload.out += `<!---->`;
  slot($$payload, default_slot($$props), {});
  $$payload.out += `<!---->`;
}
export {
  _layout as default
};
