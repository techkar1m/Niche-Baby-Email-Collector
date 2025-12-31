/**
 * BaseCrudService - Database CRUD operations for CMS collections
 * Handles Create, Read, Update, Delete operations for all collections
 */

interface CrudResponse<T> {
  items: T[];
  totalCount?: number;
}

class BaseCrudServiceClass {
  /**
   * Create a new item in a collection
   * @param collectionId - The ID of the collection
   * @param itemData - The item data to create
   * @param multiRefData - Optional multi-reference fields
   */
  async create<T>(
    collectionId: string,
    itemData: T,
    multiRefData?: Record<string, string[]>
  ): Promise<T> {
    try {
      const payload: any = { ...itemData };

      // Add multi-reference fields if provided
      if (multiRefData) {
        Object.assign(payload, multiRefData);
      }

      const response = await fetch(`/api/collections/${collectionId}/items`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to create item in ${collectionId}`);
      }

      const result = await response.json();
      return result.item || result;
    } catch (error) {
      console.error(`Error creating item in ${collectionId}:`, error);
      throw error;
    }
  }

  /**
   * Get all items from a collection
   * @param collectionId - The ID of the collection
   * @param referenceFields - Optional array of reference fields to populate
   */
  async getAll<T>(
    collectionId: string,
    referenceFields?: string[]
  ): Promise<CrudResponse<T>> {
    try {
      let url = `/api/collections/${collectionId}/items`;

      // Add reference fields as query parameters if provided
      if (referenceFields && referenceFields.length > 0) {
        const params = new URLSearchParams();
        referenceFields.forEach((field) => {
          params.append('ref', field);
        });
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to fetch items from ${collectionId}`);
      }

      const result = await response.json();
      return {
        items: result.items || [],
        totalCount: result.totalCount,
      };
    } catch (error) {
      console.error(`Error fetching items from ${collectionId}:`, error);
      throw error;
    }
  }

  /**
   * Get a single item by ID
   * @param collectionId - The ID of the collection
   * @param itemId - The ID of the item
   * @param referenceFields - Optional array of reference fields to populate
   */
  async getById<T>(
    collectionId: string,
    itemId: string,
    referenceFields?: string[]
  ): Promise<T> {
    try {
      let url = `/api/collections/${collectionId}/items/${itemId}`;

      // Add reference fields as query parameters if provided
      if (referenceFields && referenceFields.length > 0) {
        const params = new URLSearchParams();
        referenceFields.forEach((field) => {
          params.append('ref', field);
        });
        url += `?${params.toString()}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to fetch item ${itemId} from ${collectionId}`);
      }

      const result = await response.json();
      return result.item || result;
    } catch (error) {
      console.error(`Error fetching item ${itemId} from ${collectionId}:`, error);
      throw error;
    }
  }

  /**
   * Update an item in a collection
   * @param collectionId - The ID of the collection
   * @param itemData - The item data with _id field and fields to update
   */
  async update<T>(collectionId: string, itemData: Partial<T> & { _id: string }): Promise<T> {
    try {
      const { _id, ...updateData } = itemData;

      const response = await fetch(`/api/collections/${collectionId}/items/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to update item ${_id} in ${collectionId}`);
      }

      const result = await response.json();
      return result.item || result;
    } catch (error) {
      console.error(`Error updating item in ${collectionId}:`, error);
      throw error;
    }
  }

  /**
   * Delete an item from a collection
   * @param collectionId - The ID of the collection
   * @param itemId - The ID of the item to delete
   */
  async delete(collectionId: string, itemId: string): Promise<void> {
    try {
      const response = await fetch(`/api/collections/${collectionId}/items/${itemId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || `Failed to delete item ${itemId} from ${collectionId}`);
      }
    } catch (error) {
      console.error(`Error deleting item ${itemId} from ${collectionId}:`, error);
      throw error;
    }
  }
}

// Export singleton instance
export const BaseCrudService = new BaseCrudServiceClass();
