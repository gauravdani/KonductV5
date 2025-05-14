# Campaign ID Generator - Campaign Management

## Core User Flows

### 1. Campaign Creation Flow
1. **Campaign Setup Tab**
   - Marketing Manager name input
   - Website full domain name (e.g., https://www.example.com)
   - Platform selection (Facebook, Instagram, Google Ads, TikTok, LinkedIn, Twitter, YouTube, Other)
   - Campaign Objective selection (Brand Awareness, Reach, Traffic, Engagement, etc.)
   - Campaign Period (Start Date and End Date)
   - Budget allocation

2. **Audience Targeting Tab**
   - Demographics Section
     - Age Range selection (13-65)
     - Gender targeting (Male, Female, All)
     - Language preferences
     - Location targeting with multiple options:
       - Countries
       - Regions
       - Cities
       - Radius
       - Custom locations
   
   - Interests & Behaviors Section
     - Interest categories (Technology, Fashion, Sports, etc.)
     - Behavior targeting (Frequent Travelers, Online Shoppers, etc.)
     - Device targeting (Desktop, Mobile, Tablet, All)
     - Custom audience integration
   
   - Additional Targeting
     - Custom targeting criteria
     - Special requirements

3. **Campaign ID Generation**
   - One-click ID generation
   - Copy to clipboard functionality
   - Campaign summary display
   - Export options (JSON)
   - Email campaign details

4. **UTM Parameter Tracking**
   - **Level 1 - Source (utm_source)**
     - Primary traffic source (e.g., facebook, google, email)
     - Description: Identifies the platform or channel where the traffic originates
     - Example: facebook, google, email, twitter
   
   - **Level 2 - Campaign (utm_campaign)**
     - Campaign identifier (using generated campaign ID)
     - Description: Links to the main campaign tracking
     - Example: summer_sale_2024, product_launch
   
   - **Level 3 - Medium (utm_medium)**
     - Ad group or placement level
     - Description: Specifies the marketing medium or ad group
     - Example: cpc, display, social, email
   
   - **Level 4 - Creative (utm_creative)**
     - Ad or creative level
     - Description: Identifies specific ad creatives or variations
     - Example: banner_1, video_ad, carousel_2

   - **URL Generation**
     - Automatic URL construction with UTM parameters
     - Preview of final URL
     - Copy URL functionality
     - QR code generation for mobile sharing
     - URL validation and testing

### 2. Campaign History & Search
- Sidebar campaign history display
- Search functionality by:
  - Campaign ID
  - Platform
  - Creation date
  - Campaign objective
  - UTM parameters

## Campaign Data Model

```typescript
interface Campaign {
  id: string;
  campaign_id: string; // Generated unique ID
  created_by: string; // User ID
  platform: string;
  campaign_objective: string;
  start_date: Date;
  end_date: Date;
  budget: number;
  status: 'DRAFT' | 'ACTIVE' | 'COMPLETED' | 'ARCHIVED';
  created_at: Date;
  updated_at: Date;
  
  // Targeting
  targeting: {
    age_range: {
      min: number;
      max: number;
    };
    gender: string[];
    languages: string[];
    location_type: 'COUNTRY' | 'REGION' | 'CITY' | 'RADIUS' | 'CUSTOM';
    locations: string[];
    interests: string[];
    behaviors: string[];
    devices: string[];
    custom_audience?: string;
    additional?: string;
  };

  // UTM Parameters
  utm_tracking: {
    source: string;      // Level 1
    campaign: string;    // Level 2 (campaign_id)
    medium: string;      // Level 3
    creative: string;    // Level 4
    generated_url: string;
    qr_code_url?: string;
  };
}
``` 