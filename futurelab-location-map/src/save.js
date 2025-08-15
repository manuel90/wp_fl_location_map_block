
import { __ } from '@wordpress/i18n';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { MapInfo } from './shared';

/**
 * The save function defines the way in which the different attributes should
 * be combined into the final markup, which is then serialized by the block
 * editor into `post_content`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#save
 *
 * @return {Element} Element to render.
 */
export default function save({ attributes }) {
	
	const _get = (key, def = '') => {
		return (!!attributes[key]) ? attributes[key] : def;
	};
	
	const selectedCentre = _get('selected_centre', {});
	
	const blockProps = useBlockProps.save({ className: '' });
	
	return (
		<div { ...blockProps }>
			<div className="futurelab-location-map" data-centre={JSON.stringify(selectedCentre)}>
				<MapInfo selectedCentre={selectedCentre} />
				<div class="wrap-futurelab-location-map">
					<div className="map-section"></div>
				</div>
			</div>
		</div>
	);
}
