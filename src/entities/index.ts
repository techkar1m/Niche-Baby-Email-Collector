/**
 * Auto-generated entity types
 * Contains all CMS collection interfaces in a single file 
 */

/**
 * Collection ID: subscribers
 * Interface for Subscribers
 */
export interface Subscribers {
  _id: string;
  _createdDate?: Date;
  _updatedDate?: Date;
  /** @wixFieldType text */
  email?: string;
  /** @wixFieldType text */
  firstName?: string;
  /** @wixFieldType text */
  lastName?: string;
  /** @wixFieldType datetime */
  subscriptionDate?: Date | string;
  /** @wixFieldType boolean */
  isActive?: boolean;
}
