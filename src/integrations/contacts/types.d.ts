export interface WixContact {
  id: string;
  primaryEmail: string;
  firstName?: string;
  lastName?: string;
}

export declare function createWixContact(
  email: string,
  firstName?: string,
  lastName?: string
): Promise<WixContact>;

export declare function getWixContact(email: string): Promise<WixContact | null>;

export declare function updateWixContact(
  contactId: string,
  updates: any
): Promise<WixContact>;

export declare function upsertWixContact(
  email: string,
  firstName?: string,
  lastName?: string
): Promise<WixContact>;
