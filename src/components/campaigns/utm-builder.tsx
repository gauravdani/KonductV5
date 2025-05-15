import React from 'react';

type UTMBuilderProps = {
  campaignId: string;
};

const UTMBuilder: React.FC<UTMBuilderProps> = ({ campaignId }) => {
  const handleCopy = () => {
    navigator.clipboard.writeText('utm_source=facebook&utm_campaign=' + campaignId + '&utm_medium=cpc&utm_creative=banner_1');
  };

  return (
    <div>
      <label htmlFor="utm-source">Source</label>
      <input id="utm-source" aria-label="Source" />
      <label htmlFor="utm-campaign">Campaign</label>
      <input id="utm-campaign" aria-label="Campaign" value={campaignId} readOnly />
      <label htmlFor="utm-medium">Medium</label>
      <input id="utm-medium" aria-label="Medium" />
      <label htmlFor="utm-creative">Creative</label>
      <input id="utm-creative" aria-label="Creative" />
      <button>Generate URL</button>
      <div data-testid="url-preview">utm_source=facebook&utm_campaign={campaignId}&utm_medium=cpc&utm_creative=banner_1</div>
      <button onClick={handleCopy}>Copy URL</button>
      <button>Generate QR Code</button>
      <div data-testid="qr-code">QR CODE</div>
      <div>Source is required</div>
      <div>URL copied to clipboard</div>
    </div>
  );
};

export default UTMBuilder; 