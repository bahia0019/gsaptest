import { __ } from "@wordpress/i18n";
import { useContext, useState, useEffect, RawHTML } from "@wordpress/element";
import {
	useBlockProps,
	PlainText,
	BlockControls,
} from "@wordpress/block-editor";
import "./editor.scss";
import { ToolbarButton, Disabled, ToolbarGroup } from "@wordpress/components";
import { Fragment } from "react";

export default function Edit(props) {
	const { attributes, setAttributes, isSelected, clientId } = props;
	const { blockId, markup, styles, scripts, callBack } = attributes;

	const [isPreview, setIsPreview] = useState();
	const [isHTML, setIsHTML] = useState(true);
	const [isCSS, setIsCSS] = useState();
	const [isJS, setIsJS] = useState();
	const isDisabled = useContext(Disabled.Context);

	useEffect(() => {
		if (!blockId) {
			setAttributes({ blockId: clientId });
		}
	}, []);

	function switchToPreview() {
		setIsCSS(false);
		setIsJS(false);
		setIsHTML(false);
		setIsPreview(true);
	}

	function switchToHTML() {
		setIsCSS(false);
		setIsJS(false);
		setIsPreview(false);
		setIsHTML(true);
	}

	function switchToCSS() {
		setIsJS(false);
		setIsPreview(false);
		setIsHTML(false);
		setIsCSS(true);
	}

	function switchToJS() {
		setIsPreview(false);
		setIsHTML(false);
		setIsCSS(false);
		setIsJS(true);
	}

	return (
		<div {...useBlockProps({ className: "gsap-block__edit" })}>
			<BlockControls>
				<ToolbarGroup>
					<ToolbarButton
						className="components-tab-button"
						isPressed={isHTML}
						onClick={switchToHTML}
					>
						HTML
					</ToolbarButton>
					<ToolbarButton
						className="components-tab-button"
						isPressed={isCSS}
						onClick={switchToCSS}
					>
						CSS
					</ToolbarButton>
					<ToolbarButton
						className="components-tab-button"
						isPressed={isJS}
						onClick={switchToJS}
					>
						JS
					</ToolbarButton>
					<ToolbarButton
						className="components-tab-button"
						isPressed={isPreview}
						onClick={switchToPreview}
					>
						{__("Preview")}
					</ToolbarButton>
				</ToolbarGroup>
			</BlockControls>

			{isPreview && (
				<>
					<RawHTML class="markup">{markup}</RawHTML>
					<div class="controls">
						<button
							class="gsap-button wp-element-button wp-block-button__link"
							id="press"
							onclick={callBack}
						>
							Press Me
						</button>
					</div>
					<style>{styles}</style>
					<script data-call-back={callBack}>{scripts}</script>
				</>
			)}
			{isHTML && (
				<PlainText
					value={markup}
					onChange={(markup) => setAttributes({ markup })}
					placeholder={__("Write HTML or SVG here…")}
				></PlainText>
			)}
			{isCSS && (
				<PlainText
					value={styles}
					onChange={(styles) => setAttributes({ styles })}
					placeholder={__("Write CSS here…")}
				></PlainText>
			)}
			{isJS && (
				<>
					<PlainText
						value={scripts}
						onChange={(scripts) => setAttributes({ scripts })}
						placeholder={__(`Write Javascript here… 
                    example: 
                    const functionName = () => {
                        //function stuff happens here.
                    }`)}
					></PlainText>
					<PlainText
						value={callBack}
						onChange={(callBack) => setAttributes({ callBack })}
						placeholder={__(`Function callback goes here. (Include parenthesis). 
                    example: 
                    functionName()`)}
					></PlainText>
				</>
			)}
		</div>
	);
}
