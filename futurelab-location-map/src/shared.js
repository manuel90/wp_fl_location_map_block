import { __ } from '@wordpress/i18n';


export function MapInfo({ selectedCentre }) {
	return (
		<div className="wrap-futurelab-location-info">
			<h4>{selectedCentre.name}</h4>
			{
				Array.isArray(selectedCentre.address) && selectedCentre.address.length > 0 && (
					<div className="flbox-centre">
						<h5>{__('Address', 'futurelab-location-map')}</h5>
						<ul>
							{
								selectedCentre.address.map((item, idx) => (
									<li key={`${selectedCentre.id}_${idx}`}>{item}</li>
								))
							}
						</ul>
					</div>
				)
			}
			{
				Array.isArray(selectedCentre.opening_hours) && selectedCentre.opening_hours.length > 0 && (
					<div className="flbox-centre">
						<h5>{__('Open Hours', 'futurelab-location-map')}</h5>
						<ul>
							{
								selectedCentre.opening_hours.map((item, idx) => (
									<li key={`${selectedCentre.id}_${idx}`}>{item}</li>
								))
							}
						</ul>
					</div>
				)
			}
			{
				(!!selectedCentre.phone_number) && (
					<div className="flbox-centre">
						<h5>{__('Phone', 'futurelab-location-map')}</h5>
						<ul>
							<li>{selectedCentre.phone_number}</li>
						</ul>
					</div>
				)
			}
			{
				(!!selectedCentre.payment_facilities) && (
					<div className="flbox-centre">
						<h5>{__('Payment facilities', 'futurelab-location-map')}</h5>
						<ul>
							<li>{selectedCentre.payment_facilities}</li>
						</ul>
					</div>
				)
			}
			{
				Array.isArray(selectedCentre.test_type) && selectedCentre.test_type.length > 0 && (
					<div className="flbox-centre">
						<h5>{__('Test Type', 'futurelab-location-map')}</h5>
						<ul>
							{
								selectedCentre.test_type.map((item, idx) => (
									<li key={`${selectedCentre.id}_${idx}`}>{item}</li>
								))
							}
						</ul>
					</div>
				)
			}
			{
				Array.isArray(selectedCentre.accessibility) && selectedCentre.accessibility.length > 0 && (
					<div className="flbox-centre">
						<h5>{__('Accessibility', 'futurelab-location-map')}</h5>
						<ul>
							{
								selectedCentre.accessibility.map((item, idx) => (
									<li key={`${selectedCentre.id}_${idx}`}>{item}</li>
								))
							}
						</ul>
					</div>
				)
			}
			{
				selectedCentre.latitude && selectedCentre.longitude && (
					<a className="view-on-maps" href={`http://maps.google.com/maps?q=${selectedCentre.latitude},${selectedCentre.longitude}`} target="_blank" rel="noopener">{__('View on Google Maps', 'futurelab-location-map')}</a>
				)
			}
		</div>
	)
}