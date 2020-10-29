import {Switcher, CompoSlide, IntermissionSlide} from "../slide";
import {Compo} from "../compo";

export default function Slides(props: {compos: Compo[]}) {
    // TODO is there a way we can get things to work without wrapping slides in closures?
    return <Switcher>
        {() => <CompoSlide uri="assets/TheBuildup/TBLOOP.mp4" compo={props.compos[0]} />}
        {() => <IntermissionSlide uri="assets/Intermission/INTSTILL.png" text="BE RIGHT BACK!" length={15 * 60} />}
        {() => <CompoSlide uri="assets/TheChase/TCLOOP.mp4" compo={props.compos[1]} />}
        {() => <IntermissionSlide uri="assets/Intermission/INTSTILL.png" text="BE RIGHT BACK!" length={15 * 60} />}
        {() => <CompoSlide uri="assets/SpookyCovers/CVLOOP.mp4" compo={props.compos[2]} />}
    </Switcher>;
}
