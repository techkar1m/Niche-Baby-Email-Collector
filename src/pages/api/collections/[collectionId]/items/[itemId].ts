import type { APIRoute } from 'astro';
import { items } from '@wix/data';

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

    // Query the Wix CMS database for the specific item
    const item = await items.get(collectionId, itemId);
    
    if (!item) {
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
    }

    return new Response(
      JSON.stringify({
        item,
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

    // Update the item in the Wix CMS database
    const updatedItem = await items.update(collectionId, { ...updateData, _id: itemId });
    
    console.log('✅ Item updated successfully in Wix CMS:', {
      collectionId,
      itemId,
      timestamp: new Date().toISOString(),
    });

    return new Response(
      JSON.stringify({
        item: updatedItem,
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

    // Delete the item from the Wix CMS database
    await items.remove(collectionId, itemId);
    
    console.log('✅ Item deleted successfully from Wix CMS:', {
      collectionId,
      itemId,
      timestamp: new Date().toISOString(),
    });

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
