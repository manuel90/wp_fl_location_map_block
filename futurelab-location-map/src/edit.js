/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';

import { 
	TextControl,
	PanelBody,
} from '@wordpress/components';


/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import {
	InspectorControls,
	useBlockProps,
} from '@wordpress/block-editor';



/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';
import { useEffect, useState } from 'react';
import { debounce, fetchDataMap, findCollectionCentres } from './api';
import { MapInfo } from './shared';

let timeroutSearch = 0;
/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {Element} Element to render.
 */
export default function Edit(props) {
	
	const { attributes, setAttributes } = props;
	
	const [inputSelection, setInputSelection] = useState('');
	const [resultsSearch, setResultsSearch] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [isError, setIsError] = useState(false);
	
	
	const onUpdateSetting = (key) => {
		return (val) => {
			setAttributes({ [key]: val });
		}
	};
	
	const startSearch = (value) => {
		
		clearTimeout(timeroutSearch);
		
		timeroutSearch = setTimeout(() => {
			
			if(value && value.length > 2) {
				setIsError(false);
				setIsLoading(true);
				findCollectionCentres(value).then((results) => {
					setIsLoading(false);
					if(results && results.length > 0) {
						setResultsSearch(results);
					} else {
						setResultsSearch([]);
					}
				}).catch(error => {
					setIsLoading(false);
					setIsError(true);
					setResultsSearch([]);
				});
			} else {
				setIsLoading(false);
				setResultsSearch([]);
			}
			
		}, 500);
	};
	
	const _get = (key, def = '') => {
		return (!!attributes[key]) ? attributes[key] : def;
	};
	
	const onSelectCentre = (itemCentre) => {
		setAttributes({ 'selected_centre': {
			id: itemCentre.id,
			slug: itemCentre.slug,
			name: itemCentre.name,
			address: [
				itemCentre.address,
				itemCentre.region,
				itemCentre.city,
				itemCentre.post_code,
			],
			latitude: itemCentre.latitude,
			longitude: itemCentre.longitude,
			phone_number: itemCentre.phone_number,
			opening_hours: itemCentre.opening_hours,
			payment_facilities: itemCentre.payment_facilities,
			accessibility: itemCentre.accessibility,
			test_type: itemCentre.test_type,
		} });
		setResultsSearch([]);
		setInputSelection('');
	};
	
	const onChangeSelectedCentre = (value) => {
		setInputSelection(value);
		startSearch(value);
	};
	
	const selectedCentre = _get('selected_centre', {});
	
	const blockProps = useBlockProps({ className: '' });
	
	

	return (
		<>
			<div { ...blockProps }>
				<br/>
				<TextControl
					label={__('Search a Collection Centre to be selected:', 'futurelab-location-map')}
					value={ inputSelection }
					onChange={onChangeSelectedCentre}
				/>
				{
					isLoading && (
						<b>{__('Loading...', 'futurelab-location-map')}</b>
					)
				}
				<br/>
				{
					(!isLoading) && resultsSearch.length > 0 ? (
						<div>
							<label><i>{__('Select one of the following options:', 'futurelab-location-map')}</i></label>
							<br/>
							<ul className="search-results">
								{
									resultsSearch && (
										resultsSearch.map((item, idx) => (
											<li key={idx} onClick={() => onSelectCentre(item)}>
												#{item.id} - {item.name}
											</li>
										))
									)
								}
							</ul>
						</div>
					) : (
						(!!inputSelection) && !isLoading && (
							<p><b>{__("There's no results", 'futurelab-location-map')}</b></p>
						)
					)
				}
				{
					isError && (
						<p><i>{__("Something went wrong loading the data.", 'futurelab-location-map')}</i></p>
					)
				}
				{
					selectedCentre && Object.keys(selectedCentre).length > 0 && (
						<div className="futurelab-location-map">
							<MapInfo selectedCentre={selectedCentre} />
							<div className="wrap-futurelab-location-map"></div>
						</div>
					)
				}
			</div>
		</>
	);
	
}