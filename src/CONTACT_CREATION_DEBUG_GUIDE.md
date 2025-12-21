# Wix Contact Creation - Debugging Guide

## Overview
This guide explains how the contact creation system works and how to troubleshoot issues.

## Architecture

### Files Involved
1. **`/src/components/pages/HomePage.tsx`** - Frontend form submission
2. **`/src/integrations/contacts/service.ts`** - Wix Contacts API integration
3. **`/src/integrations/contacts/index.ts`** - Module exports
4. **`/src/entities/index.ts`** - Subscribers collection schema

### Contact Creation Flow

```
User submits email
    ↓
[HomePage.tsx] onSubmit handler
    ↓
Step 1: Create Subscriber in Database (BaseCrudService)
    ↓
Step 2: Create/Update Contact in Wix Contacts (upsertWixContact)
    ↓
Step 3: Send Email Notification
    ↓
Step 4: Play Audio
    ↓
Step 5: Navigate to Result Page
```

## How It Works

### 1. Frontend Form Submission (HomePage.tsx)
```typescript
const onSubmit = async (data: { email: string }) => {
  // Step 1: Save to Subscribers collection
  await BaseCrudService.create('subscribers', { ... });
  
  // Step 2: Create/Update in Wix Contacts
  await upsertWixContact(data.email);
  
  // Step 3-5: Email, audio, navigation
};
```

### 2. Wix Contacts Integration (service.ts)

#### `upsertWixContact(email, firstName?, lastName?)`
- **Purpose**: Create a new contact OR update existing one
- **Logic**:
  1. Check if contact with this email already exists
  2. If exists: Update with new data
  3. If not exists: Create new contact
- **Returns**: Contact object with ID

#### `createWixContact(email, firstName?, lastName?)`
- **Purpose**: Create a new contact in Wix Contacts
- **Uses**: `contacts.createContact()` from `@wix/contacts` SDK
- **Returns**: Contact object with ID

#### `getWixContact(email)`
- **Purpose**: Query existing contacts by email
- **Uses**: `contacts.queryContacts().eq('primaryEmail', email).find()`
- **Returns**: Contact object or null

#### `updateWixContact(contactId, updates)`
- **Purpose**: Update an existing contact
- **Uses**: `contacts.updateContact(contactId, { contact: updates })`
- **Returns**: Updated contact object

## Debugging Steps

### Step 1: Check Browser Console
Open your browser's Developer Tools (F12) and look for these logs:

**Success Logs:**
```
✅ Subscriber created successfully in database
✅ Contact successfully created/updated in Wix Contacts: { contactId: "...", email: "..." }
✅ Email notification sent
```

**Error Logs:**
```
❌ Failed to create Wix contact: { email: "...", error: "..." }
⚠️ Error creating contact in Wix Contacts: { email: "...", error: "..." }
```

### Step 2: Check Wix Contacts App
1. Go to your Wix site's admin dashboard
2. Navigate to **Contacts** app
3. Search for the email address you submitted
4. Verify the contact appears in the list

### Step 3: Check Subscribers Collection
1. Go to your Wix site's admin dashboard
2. Navigate to **CMS Collections**
3. Open the **Subscribers** collection
4. Verify the email appears in the list

### Step 4: Check Network Requests
In Browser DevTools → Network tab:
1. Look for requests to Wix APIs
2. Check response status codes (should be 2xx for success)
3. Look for error messages in response bodies

## Common Issues & Solutions

### Issue 1: Contact Not Appearing in Wix Contacts
**Possible Causes:**
- Wix SDK not properly initialized
- Missing API permissions
- Network error during creation
- Email validation failed

**Solutions:**
1. Check browser console for error messages
2. Verify email format is valid
3. Check Wix site permissions for Contacts app
4. Try submitting again - might be temporary network issue

### Issue 2: Duplicate Contacts
**Possible Causes:**
- `upsertWixContact` not finding existing contact
- Query timeout or failure

**Solutions:**
1. The `upsertWixContact` function should prevent duplicates
2. If duplicates appear, manually delete in Wix Contacts app
3. Check console logs for query errors

### Issue 3: Subscriber in Database but Not in Wix Contacts
**Possible Causes:**
- Wix Contacts API call failed (but error was caught)
- API permissions issue
- Network timeout

**Solutions:**
1. Check console for "⚠️ Error creating contact in Wix Contacts" message
2. Verify Wix site has Contacts app enabled
3. Check Wix site permissions/settings

### Issue 4: Email Not Sent
**Possible Causes:**
- Email API endpoint not working
- Invalid recipient email
- Network error

**Solutions:**
1. Check console for email error logs
2. Verify `/api/send-email` endpoint is working
3. Check email configuration

## Testing the System

### Manual Test
1. Open the app in browser
2. Open DevTools Console (F12)
3. Submit an email address
4. Watch console logs for success/error messages
5. Check Wix Contacts app for the new contact
6. Check Subscribers collection for the new subscriber

### Test with Different Scenarios
- **Valid email**: `test@example.com`
- **Duplicate email**: Submit same email twice (should update, not duplicate)
- **Invalid email**: `notanemail` (should fail validation)
- **Special characters**: `test+tag@example.com` (should work)

## API Reference

### Wix Contacts SDK
```typescript
import { contacts } from '@wix/contacts';

// Create contact
const result = await contacts.createContact({
  contact: {
    primaryEmail: 'email@example.com',
    firstName: 'John',
    lastName: 'Doe',
  }
});

// Query contacts
const result = await contacts.queryContacts()
  .eq('primaryEmail', 'email@example.com')
  .find();

// Update contact
const result = await contacts.updateContact(contactId, {
  contact: {
    firstName: 'Jane',
  }
});
```

## Logs to Monitor

### Success Flow
```
📝 Creating subscriber in database... { email: "test@example.com" }
✅ Subscriber created successfully in database
👤 Creating/updating contact in Wix Contacts... { email: "test@example.com" }
✅ Contact successfully created/updated in Wix Contacts: { contactId: "...", email: "test@example.com" }
📧 Sending email notification...
✅ Email notification sent
```

### Error Flow
```
📝 Creating subscriber in database... { email: "test@example.com" }
✅ Subscriber created successfully in database
👤 Creating/updating contact in Wix Contacts... { email: "test@example.com" }
❌ Failed to create Wix contact: { email: "test@example.com", error: "..." }
⚠️ Error creating contact in Wix Contacts: { email: "test@example.com", error: "..." }
📧 Sending email notification...
✅ Email notification sent
```

## Next Steps

If contacts are still not appearing:
1. **Check Wix Site Settings**: Ensure Contacts app is enabled
2. **Verify API Permissions**: Check Wix site has proper permissions
3. **Test Wix SDK**: Try creating contact directly in Wix dashboard
4. **Check Network**: Ensure no firewall/proxy blocking Wix APIs
5. **Review Logs**: Check all console logs for specific error messages

## Support Resources

- [Wix Contacts API Documentation](https://www.wix.com/velo/reference/wix-contacts)
- [Wix Data Collections API](https://www.wix.com/velo/reference/wix-data)
- Browser DevTools Console for real-time debugging
