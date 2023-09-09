import { useBlockProps } from "@wordpress/block-editor";
import { RawHTML } from "@wordpress/element";

export default function save(props) {
	const { attributes } = props;
	const { blockId, markup, styles, scripts, callBack } = attributes;

	return (
		<div {...useBlockProps.save()}>
			<RawHTML class="markup">{markup}</RawHTML>
			{callBack && (
				<div class="controls">
					<button
						class="gsap-button wp-element-button wp-block-button__link"
						id="press"
						onclick={callBack}
					>
						Press Me
					</button>
				</div>
			)}
			{styles && <style>{styles}</style>}
			{scripts && <script data-call-back={callBack}>{scripts}</script>}
		</div>
	);
}
