import {For, Show, createSignal, createMemo, createEffect, createContext, useContext} from "solid-js";
import {Compo} from "./compo";
import Scroller from "./scroller";

export const VisibilityContext = createContext(() => false as boolean);
function SlideWrapper(props: {children: JSX.Element}) {
    const shown = useContext(VisibilityContext);
    return <div class="slide-wrapper" style={{
        opacity: shown() ? 1 : 0,
        "pointer-events": shown() ? "all" : "none",
    }}>
        {props.children}
    </div>;
}

export function Switcher(props: {children: JSX.Element[]}) {
    const [slide_idx, set_slide_idx] = createSignal(0);
    const n_slides = props.children.length;

    document.addEventListener('keydown', (ev: KeyboardEvent) => {
        switch (ev.key) {
            case "PageDown":
                set_slide_idx(Math.min(slide_idx() + 1, n_slides - 1));
                break;
            case "PageUp":
                set_slide_idx(Math.max(slide_idx() - 1, 0));
                break;
            default:
                return;
        }
    });

    return <For each={props.children}>
        {(slide: JSX.Element, index: () => number) => {
            const shown = createMemo(() => slide_idx() == index());
            return <VisibilityContext.Provider value={shown}>
                <SlideWrapper>{slide}</SlideWrapper>
            </VisibilityContext.Provider>;
        }}
    </For>;
}

export function IntermissionSlide(props: {uri: string, text: string, length: number}) {
    const [time, set_time] = createSignal(props.length);
    const shown = useContext(VisibilityContext);
    let timer: number | undefined;

    createEffect(() => {
        if (shown()) {
            set_time(props.length);
            timer = window.setInterval(() => set_time(time() - 1), 1000);
        } else {
            window.clearInterval(timer);
        }
    });

    const formatted_time = createMemo(() => {
        if (time() >= 0) {
            const date = new Date(time() * 1000);
            return "IN " + date.getUTCMinutes().toString().padStart(2, '0') + ':' + date.getUTCSeconds().toString().padStart(2, '0');
        } else {
            return "SOON";
        }
    });

    // FIXME workaround for improper handling of spellcheck attribute
    // need to open an issue on dom-expressions...
    let textp: HTMLParagraphElement | undefined = undefined;
    createEffect(() => textp?.setAttribute("spellcheck", "false"));

    return <>
        <img className="slide-image" src={props.uri} />
        <div className="slide-contents intermission">
            <div className="perspective">
                <p className="text" contentEditable ref={textp}>{props.text}</p>
                <p className="countdown">NEXT CATEGORY STARTING {formatted_time()}</p>
            </div>
        </div>
    </>
}

export function CompoSlide(props: {uri: string, outline?: string, compo: Compo}) {
    const [entry, set_entry] = createSignal(0);
    const n_entries = props.compo.entries.length;

    const shown = useContext(VisibilityContext);

    const on_keydown = (ev: KeyboardEvent) => {
        switch (ev.key) {
            case "Left":
            case "ArrowLeft":
                set_entry(Math.max(entry() - 1, 0));
                break;
            case "Right":
            case "ArrowRight":
                set_entry(Math.min(entry() + 1, n_entries - 1));
                break;
        }
    };
    createEffect(() => {
        if (shown()) {
            document.addEventListener("keydown", on_keydown);
        } else {
            document.removeEventListener("keydown", on_keydown);
        }
    });

    return <>
        <video className="slide-video" loop autoplay preload="auto" src={props.uri}></video>
        <Show when={props.outline != undefined}>
            <img className="slide-image" src={props.outline} />
        </Show>
        <div className={"slide-contents " + props.compo.directory_name}>
            <Scroller ty="title" text={props.compo.entries[entry()].title} />
            <Scroller ty="author" text={props.compo.entries[entry()].author} />
            <p className="comment">{props.compo.entries[entry()].comment}</p>
        </div>
    </>;
}
