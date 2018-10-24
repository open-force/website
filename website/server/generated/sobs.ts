import { RestObject, SObject, sField, SalesforceFieldType, SFLocation, SFieldProperties } from "ts-force";

/**
 * Immutable Property Interface for Resource
 */
export interface ResourceFields {
    readonly _TYPE_?: 'Resource__c';
    readonly id?: string;
    readonly ownerId?: string;
    readonly isDeleted?: boolean;
    readonly name?: string;
    readonly createdDate?: Date;
    readonly createdById?: string;
    readonly lastModifiedDate?: Date;
    readonly lastModifiedById?: string;
    readonly systemModstamp?: Date;
    readonly lastViewedDate?: Date;
    readonly lastReferencedDate?: Date;
    readonly canonicalURL?: string;
    readonly type?: string;
}

/**
 * Generated class for Resource__c
 */
export class Resource extends RestObject implements ResourceFields {
    @sField({ apiName: 'Id', createable: false, updateable: false, required: false, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.ID, salesforceLabel: 'Record ID', externalId: false })
    public id: string;
    @sField({ apiName: 'OwnerId', createable: true, updateable: true, required: true, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.REFERENCE, salesforceLabel: 'Owner ID', externalId: false })
    public ownerId: string;
    @sField({ apiName: 'IsDeleted', createable: false, updateable: false, required: false, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.BOOLEAN, salesforceLabel: 'Deleted', externalId: false })
    public isDeleted: boolean;
    @sField({ apiName: 'Name', createable: false, updateable: false, required: false, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.STRING, salesforceLabel: 'Resource Id', externalId: false })
    public name: string;
    @sField({ apiName: 'CreatedDate', createable: false, updateable: false, required: false, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.DATETIME, salesforceLabel: 'Created Date', externalId: false })
    public createdDate: Date;
    @sField({ apiName: 'CreatedById', createable: false, updateable: false, required: false, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.REFERENCE, salesforceLabel: 'Created By ID', externalId: false })
    public createdById: string;
    @sField({ apiName: 'LastModifiedDate', createable: false, updateable: false, required: false, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.DATETIME, salesforceLabel: 'Last Modified Date', externalId: false })
    public lastModifiedDate: Date;
    @sField({ apiName: 'LastModifiedById', createable: false, updateable: false, required: false, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.REFERENCE, salesforceLabel: 'Last Modified By ID', externalId: false })
    public lastModifiedById: string;
    @sField({ apiName: 'SystemModstamp', createable: false, updateable: false, required: false, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.DATETIME, salesforceLabel: 'System Modstamp', externalId: false })
    public systemModstamp: Date;
    @sField({ apiName: 'LastViewedDate', createable: false, updateable: false, required: false, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.DATETIME, salesforceLabel: 'Last Viewed Date', externalId: false })
    public lastViewedDate: Date;
    @sField({ apiName: 'LastReferencedDate', createable: false, updateable: false, required: false, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.DATETIME, salesforceLabel: 'Last Referenced Date', externalId: false })
    public lastReferencedDate: Date;
    /**
     * The official URL for this resource.
     */
    @sField({ apiName: 'Canonical_URL__c', createable: true, updateable: true, required: true, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.STRING, salesforceLabel: 'Canonical URL', externalId: true })
    public canonicalURL: string;
    /**
     * The flavor of Resource this is.
     */
    @sField({ apiName: 'Type__c', createable: true, updateable: true, required: true, reference: undefined, childRelationship: false, salesforceType: SalesforceFieldType.PICKLIST, salesforceLabel: 'Type', externalId: false })
    public type: string;

    constructor(fields?: ResourceFields) {
        super('Resource__c');
        this.id = void 0;
        this.ownerId = void 0;
        this.isDeleted = void 0;
        this.name = void 0;
        this.createdDate = void 0;
        this.createdById = void 0;
        this.lastModifiedDate = void 0;
        this.lastModifiedById = void 0;
        this.systemModstamp = void 0;
        this.lastViewedDate = void 0;
        this.lastReferencedDate = void 0;
        this.canonicalURL = void 0;
        this.type = void 0;
        Object.assign(this, fields)
    }

    public static API_NAME: 'Resource__c' = 'Resource__c';
    public _TYPE_: 'Resource__c' = 'Resource__c';
    private static _fields: { [P in keyof ResourceFields]: SFieldProperties; };

    public static get FIELDS() {
        return this._fields = this._fields ? this._fields : Resource.getPropertiesMeta<ResourceFields, Resource>(Resource)
    }

    public static async retrieve(qry: string): Promise<Resource[]> {
        return await RestObject.query<Resource>(Resource, qry);
    }

    public static fromSFObject(sob: SObject): Resource {
        return new Resource().mapFromQuery(sob);
    }

    public toImmutable(): ResourceFields {
        return this.clone();
    }
}
