import {createEffect} from "solid-js";

export default function Scroller(props: {text: string, ty: string}) {
    let el: HTMLParagraphElement | undefined = undefined;
    let scrolling = false;
    let scrollpos = 0;

    const scroll_routine = (width: number) => () => {
        if (scrolling) {
            if ((scrollpos += 1.5) > width) {
                scrollpos = 0;
            }
            el!.scrollLeft = scrollpos;

            window.requestAnimationFrame(scroll_routine(width));
        } else {
            scrollpos = 0;
            el!.scrollLeft = 0;
            el!.style.setProperty("mask-image", "linear-gradient(to right, rgba(0,0,0,1), rgba(0,0,0,1))");
        }
    };

    createEffect(() => {
        el!.innerText = props.text;

        const display_width = el!.clientWidth;
        const total_width = el!.scrollWidth;

        const already_scrolling = scrolling;
        scrolling = display_width < total_width;
        if (scrolling) {
            el!.innerHTML += "&nbsp;~&nbsp;";
            const w = el!.scrollWidth;
            el!.innerHTML += el!.innerHTML;
            el!.style.setProperty("mask-image", "linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,1) 10%, rgba(0,0,0,1) 90%, rgba(0,0,0,0))");

            if (!already_scrolling) {
                window.requestAnimationFrame(scroll_routine(w));
            } else {
                scrollpos = 0;
            }
        }
    });

    return <p ref={el} className={"scroller " + props.ty}></p>;
}
