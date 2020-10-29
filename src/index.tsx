import {render} from "solid-js/dom";
import Slides from "./user/slides";
import compo_data from "./user/data.json";

const root = document.getElementById("root")!;
window.addEventListener("resize", (_: UIEvent) => {
    root.style.setProperty("font-size", (root.clientHeight * 32 / 1080).toString() + "px");
});
root.style.setProperty("font-size", (root.clientHeight * 32 / 1080).toString() + "px");

render(() => <Slides compos={compo_data} />, root);
