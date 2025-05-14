# Campaign ID Generator - Authentication & User Management

## Core User Flows

### 1. Authentication & User Management
1. **User Registration Flow**
   - User visits landing page
   - Clicks "Sign Up" button
   - Fills registration form:
     - Email address
     - Password (with strength requirements)
     - Full name
     - Company/Organization
     - Role selection (Admin, Manager, User)
     - Accepts terms and conditions
   - System sends verification email
   - User verifies email
   - Redirected to onboarding process

2. **User Login Flow**
   - User visits login page
   - Enters email and password
   - Optional: "Remember me" selection
   - System validates credentials
   - If valid:
     - Creates session
     - Redirects to dashboard
   - If invalid:
     - Shows error message
     - Offers password reset option

3. **Password Reset Flow**
   - User clicks "Forgot Password"
   - Enters email address
   - System sends reset link
   - User clicks link in email
   - Enters new password
   - System validates and updates password
   - Redirects to login

4. **User Profile Management Flow**
   - User accesses profile settings
   - Can update:
     - Profile information
     - Password
     - Notification preferences
     - Theme preferences
     - Language settings
   - For enterprise users:
     - API key management
     - Usage statistics
     - Team management

5. **Session Management Flow**
   - Automatic session refresh
   - Multiple device handling
   - Session timeout
   - Force logout capability
   - Activity tracking

## User Data Model

```typescript
interface User {
  id: string;
  email: string;
  full_name: string;
  company: string;
  role: 'ADMIN' | 'MANAGER' | 'USER';
  status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED';
  email_verified: boolean;
  last_login: Date;
  created_at: Date;
  updated_at: Date;
  
  // Preferences
  preferences: {
    notifications: {
      email: boolean;
      push: boolean;
      campaign_updates: boolean;
      system_updates: boolean;
    };
    theme: 'LIGHT' | 'DARK' | 'SYSTEM';
    language: string;
  };
  
  // Enterprise features
  api_keys?: {
    key: string;
    name: string;
    created_at: Date;
    last_used: Date;
    status: 'ACTIVE' | 'INACTIVE';
  }[];
  
  // Usage tracking
  usage: {
    campaigns_created: number;
    last_campaign_date: Date;
    api_calls: number;
  };
}

interface UserSession {
  id: string;
  user_id: string;
  token: string;
  refresh_token: string;
  expires_at: Date;
  created_at: Date;
  last_activity: Date;
  device_info: {
    user_agent: string;
    ip_address: string;
    location?: string;
  };
}
``` 