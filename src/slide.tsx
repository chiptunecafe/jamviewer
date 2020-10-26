import {For, createSignal, createMemo} from "solid-js";

function SlideWrapper(props: {inner: JSX.Element, n: number, slide_idx: () => number}) {
    const shown = createMemo(() => props.slide_idx() == props.n);
    return <div class="slide-wrapper" style={{"transition-timing-function": shown() ? "ease" : "step-end", opacity: shown() ? 1 : 0}}>{props.inner}</div>;
}

export function Switcher(props: {children: JSX.Element[]}) {
    const [slide_idx, set_slide_idx] = createSignal(0);
    let i = 0;

    document.addEventListener('keydown', (ev: KeyboardEvent) => {
        switch (ev.key) {
            case "Down":
            case "ArrowDown":
                set_slide_idx(Math.min(slide_idx() + 1, props.children.length - 1));
                break;
            case "Up":
            case "ArrowUp":
                set_slide_idx(Math.max(slide_idx() - 1, 0));
                break;
            default:
                return;
        }
    });

    return <For each={props.children}>
        {(slide: JSX.Element) => {
            return <SlideWrapper inner={slide} n={i++} slide_idx={slide_idx} />;
        }}
    </For>;
}
