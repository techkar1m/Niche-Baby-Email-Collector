import type { APIRoute } from 'astro';
import { items } from '@wix/data';

/**
 * API endpoint for collection items
 * Handles GET (list items) and POST (create item) operations
 */
export const GET: APIRoute = async ({ params, url }) => {
  try {
    const { collectionId } = params;
    
    if (!collectionId) {
      return new Response(
        JSON.stringify({ error: 'Missing collectionId parameter' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('📖 GET /api/collections/:collectionId/items', {
      collectionId,
      timestamp: new Date().toISOString(),
    });

    // Get reference fields from query parameters if provided
    const refParams = url.searchParams.getAll('ref');
    console.log('📋 Reference fields requested:', refParams);

    // Query the Wix CMS database
    const query = items.query(collectionId);
    
    const result = await query.find();
    const itemsList = result.items || [];

    return new Response(
      JSON.stringify({
        items: itemsList,
        totalCount: itemsList.length,
      }),
      { 
        status: 200, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        } 
      }
    );
  } catch (error) {
    console.error('❌ Error in GET /api/collections/:collectionId/items:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        } 
      }
    );
  }
};

export const POST: APIRoute = async ({ params, request }) => {
  try {
    const { collectionId } = params;
    
    if (!collectionId) {
      return new Response(
        JSON.stringify({ error: 'Missing collectionId parameter' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    let itemData;
    try {
      itemData = await request.json();
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!itemData || typeof itemData !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Request body must be a valid object' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('📝 POST /api/collections/:collectionId/items', {
      collectionId,
      itemId: itemData._id,
      timestamp: new Date().toISOString(),
    });

    // Create the item in the Wix CMS database
    const createdItem = await items.insert(collectionId, itemData);
    
    console.log('✅ Item created successfully in Wix CMS:', {
      collectionId,
      itemId: createdItem._id,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        item: createdItem,
        success: true,
      }),
      { 
        status: 201, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        } 
      }
    );
  } catch (error) {
    console.error('❌ Error in POST /api/collections/:collectionId/items:', error);
    return new Response(
      JSON.stringify({
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error',
      }),
      { 
        status: 500, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        } 
      }
    );
  }
};
