# JSON Parsing Error Fix - Complete Guide

## Problem Summary

The application was encountering the error:
```
Unexpected token <, <!DOCTYPE ... is not valid JSON
```

This error occurs when the browser tries to parse HTML as JSON. The root cause was **missing API endpoints** that the frontend was trying to call.

## Root Cause Analysis

### Missing API Endpoints

The `BaseCrudService` in `/src/integrations/cms/service.ts` was making fetch calls to these endpoints:

1. **GET** `/api/collections/{collectionId}/items` - List all items
2. **POST** `/api/collections/{collectionId}/items` - Create new item
3. **GET** `/api/collections/{collectionId}/items/{itemId}` - Get single item
4. **PATCH** `/api/collections/{collectionId}/items/{itemId}` - Update item
5. **DELETE** `/api/collections/{collectionId}/items/{itemId}` - Delete item

**These endpoints did not exist**, so when the frontend tried to call them:
- Astro returned a 404 error
- The 404 response was HTML (error page), not JSON
- The frontend tried to parse HTML as JSON
- Result: `Unexpected token <, <!DOCTYPE ...` error

### Where the Error Occurred

The error happened when the HomePage form was submitted:

```typescript
// Step 0: Check if email already exists
const { items: existingSubscribers } = await BaseCrudService.getAll('subscribers');
// ↑ This calls GET /api/collections/subscribers/items
// ↑ Which didn't exist → 404 HTML error → JSON parse error
```

## Solutions Implemented

### 1. Created Missing API Endpoints

#### File: `/src/pages/api/collections/[collectionId]/items.ts`

Handles:
- **GET** - List all items from a collection
- **POST** - Create new item in a collection

Features:
- Validates collection ID parameter
- Extracts reference fields from query parameters
- Returns proper JSON responses
- Handles errors gracefully

#### File: `/src/pages/api/collections/[collectionId]/items/[itemId].ts`

Handles:
- **GET** - Fetch single item by ID
- **PATCH** - Update item
- **DELETE** - Delete item

Features:
- Validates both collection ID and item ID
- Extracts reference fields from query parameters
- Returns proper JSON responses
- Handles errors gracefully

### 2. Enhanced Error Handling in BaseCrudService

Updated `/src/integrations/cms/service.ts` with robust error handling:

**Before:**
```typescript
if (!response.ok) {
  const error = await response.json();  // ❌ Assumes JSON response
  throw new Error(error.message || `Failed to create item`);
}
```

**After:**
```typescript
if (!response.ok) {
  let errorMessage = `Failed to create item in ${collectionId}`;
  try {
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const error = await response.json();
      errorMessage = error.message || errorMessage;
    } else {
      const text = await response.text();
      console.error('Non-JSON error response:', text);
      errorMessage = `API error: ${response.status} ${response.statusText}`;
    }
  } catch (parseError) {
    console.error('Failed to parse error response:', parseError);
    errorMessage = `API error: ${response.status} ${response.statusText}`;
  }
  throw new Error(errorMessage);
}
```

**Key improvements:**
- ✅ Checks Content-Type header before parsing JSON
- ✅ Falls back to text parsing if not JSON
- ✅ Handles parse errors gracefully
- ✅ Always returns meaningful error messages

### 3. Enhanced Error Handling in HomePage

Updated `/src/components/pages/HomePage.tsx` email notification fetch:

**Before:**
```typescript
fetch('/api/send-email', {...})
  .then(() => {
    console.log('✅ Email notification sent');
  })
  .catch((emailError) => {
    console.error('⚠️ Error sending email:', emailError);
  });
```

**After:**
```typescript
fetch('/api/send-email', {...})
  .then((response) => {
    if (!response.ok) {
      console.error('⚠️ Email API returned error status:', {
        status: response.status,
        statusText: response.statusText,
      });
      return response.json().then((data) => {
        console.error('⚠️ Email API error details:', data);
      });
    }
    return response.json();
  })
  .then((data) => {
    console.log('✅ Email notification sent successfully:', data);
  })
  .catch((emailError) => {
    console.error('⚠️ Error sending email:', {
      error: emailError instanceof Error ? emailError.message : String(emailError),
      timestamp: new Date().toISOString(),
    });
  });
```

**Key improvements:**
- ✅ Validates response status before parsing
- ✅ Logs detailed error information
- ✅ Handles both network and API errors
- ✅ Provides timestamps for debugging

## API Endpoint Specifications

### GET /api/collections/{collectionId}/items

**Purpose:** List all items from a collection

**Query Parameters:**
- `ref` (optional, repeatable) - Reference fields to populate

**Response (200 OK):**
```json
{
  "items": [],
  "totalCount": 0
}
```

**Error Response (400/500):**
```json
{
  "error": "Error message",
  "message": "Detailed error message"
}
```

### POST /api/collections/{collectionId}/items

**Purpose:** Create new item in a collection

**Request Body:**
```json
{
  "_id": "unique-id",
  "field1": "value1",
  "field2": "value2"
}
```

**Response (201 Created):**
```json
{
  "item": { "_id": "unique-id", "field1": "value1", "field2": "value2" },
  "success": true
}
```

### GET /api/collections/{collectionId}/items/{itemId}

**Purpose:** Fetch single item by ID

**Query Parameters:**
- `ref` (optional, repeatable) - Reference fields to populate

**Response (200 OK):**
```json
{
  "item": { "_id": "item-id", "field1": "value1" }
}
```

**Error Response (404):**
```json
{
  "error": "Item not found",
  "itemId": "item-id",
  "collectionId": "collection-id"
}
```

### PATCH /api/collections/{collectionId}/items/{itemId}

**Purpose:** Update item

**Request Body:**
```json
{
  "field1": "new-value"
}
```

**Response (200 OK):**
```json
{
  "item": { "_id": "item-id", "field1": "new-value" },
  "success": true
}
```

### DELETE /api/collections/{collectionId}/items/{itemId}

**Purpose:** Delete item

**Response (200 OK):**
```json
{
  "success": true,
  "message": "Item deleted successfully",
  "itemId": "item-id",
  "collectionId": "collection-id"
}
```

## Testing the Fix

### 1. Test Form Submission

1. Navigate to the homepage
2. Enter an email address
3. Click "Get My Niche Baby"
4. Check browser console for logs
5. Verify no JSON parsing errors

### 2. Check Console Logs

Look for these success messages:
```
📋 Form submission started: { email: "test@example.com", ... }
🔍 Checking if email already exists...
📖 GET /api/collections/:collectionId/items
📝 Creating subscriber in database...
📧 Sending email notification...
✅ Subscription successful, navigating to result page...
```

### 3. Verify API Responses

Open DevTools → Network tab:
- All API calls should return `200` or `201` status
- All responses should have `Content-Type: application/json`
- Response bodies should be valid JSON

## Common Issues and Solutions

### Issue: Still getting JSON parse errors

**Solution:**
1. Check browser console for detailed error messages
2. Open DevTools → Network tab
3. Find the failing API call
4. Check the response status and content-type
5. Verify the response body is valid JSON

### Issue: API returns 404

**Solution:**
1. Verify the endpoint path is correct
2. Check that the API file exists in `/src/pages/api/`
3. Verify the file has proper route parameters `[collectionId]` and `[itemId]`
4. Restart the development server

### Issue: Email notification not sending

**Solution:**
1. Check `/src/pages/api/send-email.ts` exists
2. Verify the endpoint returns JSON with proper headers
3. Check browser console for error details
4. Note: This is a stub endpoint - actual email sending requires Wix Email service integration

## Files Modified

1. **Created:** `/src/pages/api/collections/[collectionId]/items.ts`
2. **Created:** `/src/pages/api/collections/[collectionId]/items/[itemId].ts`
3. **Modified:** `/src/integrations/cms/service.ts` - Enhanced error handling
4. **Modified:** `/src/components/pages/HomePage.tsx` - Enhanced email fetch error handling
5. **Modified:** `/src/pages/api/send-email.ts` - Enhanced error handling (previous fix)

## Next Steps

### To Implement Real Database Operations

The current API endpoints are stubs. To implement real database operations:

1. **For Wix CMS Collections:**
   - Use Wix CMS API to query/create/update/delete items
   - Implement reference field population
   - Add proper validation and error handling

2. **For Email Notifications:**
   - Integrate with Wix Email service
   - Implement actual email sending
   - Add email templates

3. **For Contact Management:**
   - Integrate with Wix Contacts API
   - Implement contact creation/update
   - Add contact field mapping

## Summary

✅ **Fixed:** Missing API endpoints causing 404 HTML responses  
✅ **Fixed:** JSON parsing errors from HTML error pages  
✅ **Enhanced:** Error handling in all API calls  
✅ **Improved:** Logging for better debugging  
✅ **Ensured:** All API responses are valid JSON  

The application should now work without JSON parsing errors!
