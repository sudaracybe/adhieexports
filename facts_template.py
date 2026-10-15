# ADHIE EXPORTS - VERIFIED COMPANY FACTS
# Fill in ONLY facts you can prove (documents, test reports, real figures).
# Leave "" or [] for anything you cannot prove. Empty items are NOT shown on the website.
FACTS = {
 'company': {
  'registered_name': '',      # legal name as on registration
  'registration_no': '',      # company registration number
  'established': '',          # year
  'facility_address': '',
  'facility_description': '', # one or two factual sentences
  'capacity': '',             # only if verifiable, e.g. "X containers per month"
  'certifications': [],       # {'name': '', 'issuer': '', 'number': '', 'valid_until': ''}
  'quality_steps': [],        # e.g. ['Husk inspection on arrival', 'EC and moisture test per batch']
  'references': [],           # {'client': '', 'country': '', 'note': ''} only with the client's permission
  'photos': [],               # {'file': 'images/factory-1.jpg', 'caption': ''}  (upload the file to /images)
 },
 'export': {
  'incoterms': [],            # e.g. ['FOB Colombo', 'CIF']
  'payment_terms': '',
  'sample_policy': '',
  'lead_time': '',
  'documents': [],            # e.g. ['Commercial invoice', 'Packing list', 'Certificate of origin']
  'ports': '',
  'loading': '',
 },
 'products': {                # per product; blanks are hidden
  'coco-grow-cubes': {}, 'coco-grow-poles': {}, 'cocopeat-discs-pellets': {},
  'coir-pots-basket-liners': {}, 'weed-control-mats': {},
  # keys you can use: moq, lead_time, units_per_carton, carton_size, net_weight, gross_weight,
  #                   grades, loading_20ft, loading_40ft, test_data
 }
}
LABELS = {'moq':'Minimum order quantity','lead_time':'Production lead time','units_per_carton':'Units per carton','carton_size':'Carton dimensions','net_weight':'Net weight','gross_weight':'Gross weight','grades':'Available grades','loading_20ft':'Loading, 20 ft container','loading_40ft':'Loading, 40 ft container','test_data':'Test data (method and verified range)'}
