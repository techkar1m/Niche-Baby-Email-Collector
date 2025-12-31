import type { APIRoute } from 'astro';

/**
 * API endpoint for individual collection items
 * Handles GET (fetch item), PATCH (update item), and DELETE (delete item) operations
 */
export const GET: APIRoute = async ({ params, url }) => {
  try {
    const { collectionId, itemId } = params;
    
    if (!collectionId || !itemId) {
      return new Response(
        JSON.stringify({ error: 'Missing collectionId or itemId parameter' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('📖 GET /api/collections/:collectionId/items/:itemId', {
      collectionId,
      itemId,
      timestamp: new Date().toISOString(),
    });

    // Get reference fields from query parameters if provided
    const refParams = url.searchParams.getAll('ref');
    console.log('📋 Reference fields requested:', refParams);

    // This is a stub endpoint - in a real implementation, this would:
    // 1. Query the Wix CMS database for the specific item
    // 2. Populate reference fields if requested
    // 3. Return the item
    
    // For now, return a not found error
    return new Response(
      JSON.stringify({
        error: 'Item not found',
        itemId,
        collectionId,
      }),
      { 
        status: 404, 
        headers: { 
          'Content-Type': 'application/json',
          'Cache-Control': 'no-cache, no-store, must-revalidate',
        } 
      }
    );
  } catch (error) {
    console.error('❌ Error in GET /api/collections/:collectionId/items/:itemId:', error);
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

export const PATCH: APIRoute = async ({ params, request }) => {
  try {
    const { collectionId, itemId } = params;
    
    if (!collectionId || !itemId) {
      return new Response(
        JSON.stringify({ error: 'Missing collectionId or itemId parameter' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Parse request body
    let updateData;
    try {
      updateData = await request.json();
    } catch (parseError) {
      console.error('❌ Failed to parse request body:', parseError);
      return new Response(
        JSON.stringify({ error: 'Invalid JSON in request body' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!updateData || typeof updateData !== 'object') {
      return new Response(
        JSON.stringify({ error: 'Request body must be a valid object' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('✏️ PATCH /api/collections/:collectionId/items/:itemId', {
      collectionId,
      itemId,
      timestamp: new Date().toISOString(),
    });

    // This is a stub endpoint - in a real implementation, this would:
    // 1. Validate the update data
    // 2. Update the item in the Wix CMS database
    // 3. Return the updated item
    
    // For now, return the updated item
    return new Response(
      JSON.stringify({
        item: { _id: itemId, ...updateData },
        success: true,
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
    console.error('❌ Error in PATCH /api/collections/:collectionId/items/:itemId:', error);
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

export const DELETE: APIRoute = async ({ params }) => {
  try {
    const { collectionId, itemId } = params;
    
    if (!collectionId || !itemId) {
      return new Response(
        JSON.stringify({ error: 'Missing collectionId or itemId parameter' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    console.log('🗑️ DELETE /api/collections/:collectionId/items/:itemId', {
      collectionId,
      itemId,
      timestamp: new Date().toISOString(),
    });

    // This is a stub endpoint - in a real implementation, this would:
    // 1. Delete the item from the Wix CMS database
    // 2. Return a success response
    
    // For now, return a success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Item deleted successfully',
        itemId,
        collectionId,
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
    console.error('❌ Error in DELETE /api/collections/:collectionId/items/:itemId:', error);
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
