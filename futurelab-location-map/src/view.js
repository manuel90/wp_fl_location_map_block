/**
 * Use this file for JavaScript code that you want to run in the front-end
 * on posts/pages that contain this block.
 *
 * When this file is defined as the value of the `viewScript` property
 * in `block.json` it will be enqueued on the front end of the site.
 *
 * Example:
 *
 * ```js
 * {
 *   "viewScript": "file:./view.js"
 * }
 * ```
 *
 * If you're not making any changes to this file because your project doesn't need any
 * JavaScript running in the front-end, then you should delete this file and remove
 * the `viewScript` property from `block.json`.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-metadata/#view-script
 */

import jQuery from 'jquery';

const GOOGLE_API_KEY = '{YOUR-API-MAP-KEY}';

(g=>{var h,a,k,p="The Google Maps JavaScript API",c="google",l="importLibrary",q="__ib__",m=document,b=window;b=b[c]||(b[c]={});var d=b.maps||(b.maps={}),r=new Set,e=new URLSearchParams,u=()=>h||(h=new Promise(async(f,n)=>{await (a=m.createElement("script"));e.set("libraries",[...r]+"");for(k in g)e.set(k.replace(/[A-Z]/g,t=>"_"+t[0].toLowerCase()),g[k]);e.set("callback",c+".maps."+q);a.src=`https://maps.${c}apis.com/maps/api/js?`+e;d[q]=f;a.onerror=()=>h=n(Error(p+" could not load."));a.nonce=m.querySelector("script[nonce]")?.nonce||"";m.head.append(a)}));d[l]?console.warn(p+" only loads once. Ignoring:",g):d[l]=(f,...n)=>r.add(f)&&u().then(()=>d[l](f,...n))})({
key: GOOGLE_API_KEY,
v: "weekly",
});

async function init() {
	
	await google.maps.importLibrary("maps");
	
	/*if(google.maps.Map === undefined) {
		setTimeout(init, 100);
		return;
	}*/
	const mapSettings = new Map();
	
	const onCreate = (idx, el) => {
		const $el = jQuery(el);
		
		const renderMap = async (itemMap) => {
			const location = { lat: parseFloat(itemMap.latitude), lng: parseFloat(itemMap.longitude) };
			const map = new google.maps.Map($el.find('.wrap-futurelab-location-map .map-section')[0], {
				center: location,
				zoom: 12,
				mapId: `futurelab-map-id-${idx}`,
			});
			
			const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
			const customImage = document.createElement('img');
			customImage.src = "https://www.awanuilabs.co.nz/north/auckland/wp-content/themes/healthscope-common/assets/images/map-marker.png";

			new AdvancedMarkerElement({
				map: map,
				position: location,
				content: customImage,
			});
			
		}
		
		const settings = {
			website: $el.data('website'),
			slug: $el.data('slug'),
		};
		const keyMap = `${settings.website}-${settings.slug}`;
		
		if(mapSettings.has(keyMap)) {
			renderMap(mapSettings.get(keyMap));
			return;
		}
		
		if($el.data('centre')) {
			renderMap($el.data('centre'));
			return;
		}
		
		/*fetchDataMap(settings).then(data => {
			if(data && data['map_data']) {
				const itemMap = data['map_data'].find((itemMap) => itemMap.slug === settings.slug);
				if(itemMap) {
					mapSettings.set(keyMap, itemMap);
					renderMap(itemMap);
				} else {
					console.warn(`No map data found for slug: ${settings.slug}`);
				}
			}
		}).catch(error => {
			console.error('Error fetching data:', error);
		});*/
		
	};
	
	const listBlocksInstance = jQuery('.futurelab-location-map');
	
	listBlocksInstance.each(onCreate);
}
window.addEventListener('DOMContentLoaded', init, false);


