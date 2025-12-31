import type { APIRoute } from 'astro';

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

    // This is a stub endpoint - in a real implementation, this would:
    // 1. Query the Wix CMS database
    // 2. Populate reference fields if requested
    // 3. Return the items
    
    // For now, return empty items array
    return new Response(
      JSON.stringify({
        items: [],
        totalCount: 0,
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

    // This is a stub endpoint - in a real implementation, this would:
    // 1. Validate the item data
    // 2. Create the item in the Wix CMS database
    // 3. Return the created item
    
    // For now, return the item as-is
    return new Response(
      JSON.stringify({
        item: itemData,
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
